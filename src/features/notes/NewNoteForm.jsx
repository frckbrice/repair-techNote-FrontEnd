import { useAddNewNoteMutation } from "./notesApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import PropTypes from "prop-types";

//eslint-disable-next-line
const NewNoteForm = ({ users }) => {
  
  const [addNewNote, { isSuccess, isError, isLoading, error }] =
    useAddNewNoteMutation();

  const { username, isAdmin, isManager } = useAuth();

  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setText("");
      setTitle("");
      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);

  const onUserChange = (e) => setUser(e.target.value);
  const onTitleChange = (e) => setTitle(e.target.value);
  const onTextChange = (e) => setText(e.target.value);

  const onSaveNoteClicked = async (e) => {
    e.preventDefault();
    await addNewNote({ user, title, text });
    console.log({ user, title, text });
  };

  const canSave = [user, title, text].every(Boolean) && !isLoading;

  let filterUser;
  if (isManager || isAdmin) {
    filterUser = [...users];
  } else {
    filterUser = users?.filter((user) => user.username === username);
  }
  const options = filterUser?.map((user) => {
    return (
      <option value={user?.id} key={user?.id}>
        {user.username}
      </option>
    );
  });

  const errorClass = isError ? "errmsg" : "offscreen";

  const content = (
    <div className="form-container">
      <p className={errorClass}>{error?.data?.message}</p>
      <form action="" onSubmit={onSaveNoteClicked} className="form">
        <div className="form__title-row">
          <h2>New Note</h2>
          <div className="form__action-button">
            <button
              className="icon-button"
              title="Save"
              disabled={!canSave}
              type="submit"
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="user">
          ASSINGNED TO:
        </label>
        <br />
        <select
          name="user"
          id="user"
          className="form__select"
          value={user}
          onChange={onUserChange}
        >
         {isManager || isAdmin && <option value="">Select user</option>}
          {options}
        </select>
        <br />
        <label htmlFor="title" className="form__label">
          Title:
        </label>
        <br />
        <input
          type="text"
          name="title"
          id="title"
          className={`form__input`}
          autoComplete="off"
          value={title}
          onChange={onTitleChange}
        />
        <br />
        <label htmlFor="text" className="form__label">
          Text:
        </label>
        <br />
        <textarea
          name="title"
          id="title"
          className={`form__textarea`}
          value={text}
          onChange={onTextChange}
        />
        <br />
      </form>
    </div>
  );

  return content;
};

NewNoteForm.prototype = {
  addNewNote: PropTypes.func,
  username: PropTypes.string,
  users: PropTypes.array,
  isError: PropTypes.bool,
  isSuccess: PropTypes.bool,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  user: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  onTextChange: PropTypes.func,
  onTitleChange: PropTypes.func,
  onUserChange: PropTypes.func,
  canSave: PropTypes.bool,
  onSaveNoteClicked: PropTypes.func,
  options: PropTypes.array,
};

//eslint-disable-next-line
export default React.memo(NewNoteForm);
