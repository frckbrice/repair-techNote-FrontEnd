import { useState, useEffect } from "react";
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

//* challenge

const EditNoteForm = ({ note, users }) => {
  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();

  const [
    deleteNote,
    { isError: isDelError, isSuccess: isDelSuccess, error: delerror },
  ] = useDeleteNoteMutation();

  const navigate = useNavigate();

  const [user, setUser] = useState(note.user);
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [completed, setCompleted] = useState(note.completed);

  useEffect(() => {  
    if (isSuccess || isDelSuccess) {
      setUser("");
      setText("");
      setTitle("");
      setCompleted(false)
      navigate("/dash/notes");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onUserChange = (e) => setUser(e.target.value);
  const onTitleChange = (e) => setTitle(e.target.value);
  const onTextChange = (e) => setText(e.target.value);
  const onCompletedChange = () => setCompleted((prev) => !prev);

  const onSaveNoteClicked = async (e) => {
    console.log({ id: note.id, user, title, text, completed });
    await updateNote({ id: note.id, user, title, text, completed });
  };

  const onDeleteNoteClicked = async (e) => {
    await deleteNote({ id: note.id });
  };

  const canSave =
    [{ id: note.id }, user, title, text].every(Boolean) && !isLoading;

  const optionUsers = users.map((user) => {
    return (
      <option value={user.id} key={user.id}>
        {user.username}{" "}
      </option>
    );
  });

  const errClass = isError || isDelError ? "errmsg" : "offscreen";

  const errContent = (error?.data?.message || delerror?.data.message) ?? "";
  const content = (
    <>
      <p className={errClass}>{errContent}</p>
      <form action="" className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Note</h2>
          <div className="form__action-button">
            <button
              className="icon-button"
              title="Save"
              disabled={!canSave}
              onClick={onSaveNoteClicked}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={onDeleteNoteClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <label htmlFor="username" className="form__label">
          User:
        </label><br />
        <select
          name="user"
          id="user"
          className="form__select"
          value={user}
          onChange={onUserChange}
        >
          <option value=""></option>
          {optionUsers}
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
        <label
          htmlFor="user-active"
          className="form__label form__checkbox-container"
        >
          Completed:
          <input
            type="checkbox"
            name="completed"
            id="user-active"
            className={`form__checkbox`}
            checked={completed}
            onChange={onCompletedChange}
            value="Complete"
          />{" "}
        </label>
        <br />
      </form>
    </>
  );

  return content;
};

EditNoteForm.propTypes = {
  errContent: PropTypes.bool,
  canSave: PropTypes.bool,
  optionUsers: PropTypes.array,
  completed: PropTypes.bool,
  updateNote: PropTypes.func,
  deleteNote: PropTypes.func,
  navigate: PropTypes.func,
  isSuccess: PropTypes.bool,
  isError: PropTypes.bool,
  isDelError: PropTypes.bool,
  isDelSuccess: PropTypes.bool,
  error: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
};

export default EditNoteForm;
