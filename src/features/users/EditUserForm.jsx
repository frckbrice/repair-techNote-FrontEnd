import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";
import PropTypes from "prop-types";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#%]{4,12}$/;

export const EditUserForm = ({ user }) => {
  const [updateUser, { g, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setPassword("");
      setUsername("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isDelSuccess, isSuccess, navigate]);

  const onUsernamechange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const onRolesChange = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  const onActiveChange = () => setActive((prev) => !prev);

  const onSaveUserClicked = async () => {
    if (password) {
      await updateUser({ id: user.id, username, password, roles, active });
    } else {
      await updateUser({ id: user.id, username, roles, active });
    }
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  let canSave;
  if (password) {
    canSave =
      [roles.length, validPassword, validUsername].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  }

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validPwdClass =
    password && !validPassword ? "form__input--incomplete" : "";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  const errContent = (error?.data?.message || delerror?.data.message) ?? "";

  const content = (
    <>
      <p className={errClass}> {errContent} </p>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit User</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              disabled={!canSave}
              onClick={onSaveUserClicked}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={onDeleteUserClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <label htmlFor="username" className="form__label">
          Username: <span className="nowrap">[3-20 letters]</span>
        </label>
        <br />
        <input
          type="text"
          name="username"
          id="username"
          className={`form__input${validUserClass}`}
          autoComplete="off"
          value={username}
          onChange={onUsernamechange}
        />
        <br />
        <label htmlFor="password" className="form__label">
          Password:{" "}
          <span className="nowrap">
            [empty = no change]{" "}
            <span className="nowrap"> [4-12 chars incl. !#@%]</span>{" "}
          </span>
        </label>
        <br />
        <input
          type="text"
          name="password"
          id="password"
          className={`form__input ${validPwdClass}`}
          value={password}
          onChange={onPasswordChange}
        />
        <br />
        <label
          htmlFor="user-active"
          className="form__label form__checkbox-container"
        >
          ACTIVE:
        </label>
        <input
          type="checkbox"
          name="user-active"
          id="user-active"
          className="form__checkbox"
          checked={active}
          onChange={onActiveChange}
        />{" "}
        <br />
        <label htmlFor="roles" className="form__label">
          ASSIGNED ROLES:
        </label>{" "}
        <br />
        <select
          name="roles"
          id="roles"
          className={`form__select ${validRolesClass}`}
          multiple={true}
          size={3}
          value={roles}
          onChange={onRolesChange}
        >
          {options}
        </select>
      </form>
    </>
  );

  return content;
};

EditUserForm.prototype = {
  // id: PropTypes.string,
};
EditUserForm.propTypes = {
  errContent: PropTypes.bool,
  canSave: PropTypes.bool,
  options: PropTypes.array,
  status: PropTypes.bool,
  updateUser: PropTypes.func,
  deleteUser: PropTypes.func,
  navigate: PropTypes.func,
  isSuccess: PropTypes.bool,
  isError: PropTypes.bool,
  isDelError: PropTypes.bool,
  isDelSuccess: PropTypes.bool,
  error: PropTypes.string,
  role: PropTypes.array,
  password: PropTypes.string,
  username: PropTypes.string,
  active: PropTypes.bool,
};

// export default EditUserForm;
