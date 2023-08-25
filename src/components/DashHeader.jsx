import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
// import { icon } from "@fortawesome/fontawesome-svg-core";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

function DashHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isSuccess, isError, isLoading, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const onLogOutClicked = () => sendLogout();

  if (isLoading) return <p>Logging Out ...</p>;
  if (isError) return <p>Error:{error.date?.message}</p>;

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "dash-header__container--small";
  }

  const logoutButton = (
    <button className="icon-button" title="logout" onClick={onLogOutClicked}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  const content = (
    <header className="dash-header">
      <div className={`dash-header__container ${dashClass}`}>
        <Link to="/dash">
          <h1 className="dash-header__title">techNotes </h1>
        </Link>
        <nav className="dash-header__nav">
          {/* add nav button later */}
          {logoutButton}
        </nav>
      </div>
    </header>
  );

  return content;
}

export default DashHeader;
