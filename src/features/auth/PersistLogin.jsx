import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCurrentToken } from "./authSlice";
import PulseLoader from "react-spinners/PulseLoader";

//*this component help us to remain logged in, even if we refresh the application.

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);

  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict mode
      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          // const response =
          await refresh();
          //  const {accessToken} = response.data;
          setTrueSuccess(true);
        } catch (error) {
          console.log(error);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    //cleanup the useEffect side effect
    return () => (effectRan.current = true);

    //eslint-disable-next-line
  }, []);

  let content;
  if (!persist) {
    // persist :no
    console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {
    // persist: yes, token: no
    console.log("loading");
    content = <PulseLoader color="#fff"/>;
  } else if (isError) {
    // persist: yes, token: no
    console.log("error");
    content = (
      <p className="errmsg ">
        {`${error?.data?.message} - `}
        <Link to={"/login"} className=" persistloginmsg">
          Please login again
        </Link>
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    // persist: yes, token: yes
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    // persist: yes, token: yes
    console.log("token and uninit");
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;


