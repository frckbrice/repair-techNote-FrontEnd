import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";

const Login = () => {
  const userRef = useRef();
  const errorRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //  we use unwrap() because we have not use RTK native error request standard like isError, ... then we used try ... catch instead
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else if (err.status === 403) {
        setErrMsg("Forbidden");
      } else {
        setErrMsg(err.data?.message);
        console.error(err.data?.message);
      }
      errorRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = (e) => setPersist((prev) => !prev);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return <p>Loading ...</p>;

  const content = (
    <section className="public">
      <header>
        <h1>Employee Login</h1>
      </header>
      <main className="login">
        {/* aria-live is for screen reader to be able to read */}
        <p ref={errorRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>

        <form action="" className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            type="text"
            className="form__input"
            id="username"
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            autoCapitalize="on"
            required
            ref={userRef}
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form__input"
            id="password"
            onChange={handlePwdInput}
            value={password}
            required
          />
          <br />
          <button className="form__submit-button">Sign In</button>

          <label htmlFor="persist" className="form__persist">
            <input
              type="checkbox"
              className="form__checkbox"
              id="persist"
              onChange={handleToggle}
              checked={persist}
            />
            Trust This Device
          </label>
        </form>
      </main>
      <footer>
        <Link to={"/"}>Back to Home</Link>
      </footer>
    </section>
  );

  return content;
};

export default Login;
