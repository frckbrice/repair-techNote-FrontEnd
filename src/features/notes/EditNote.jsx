import { useParams } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectNoteById } from "./notesApiSlice";
import { selectAllUsers } from "../users/usersApiSlice";
import EditNoteForm from "./EditNoteForm";

import { useGetNotesQuery } from "./notesApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import useAuth from "../../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";

const EditNote = () => {
  const { id } = useParams();

  const { username, isManager, isAdmin } = useAuth();
  // const note = useSelector((state) => selectNoteById(state, id));

  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids?.map((id) => data?.entities[id]),
    }),
  });

  // const users = useSelector(selectAllUsers);
  //* we prevent an employee to edit the note id in the url and get access to the note and edit note

  if (!note || !users?.length) return <PulseLoader color="#fff" />;

  if (!isManager && !isAdmin) {
    if (note?.username !== username) {
      return <p className="errmsg">No Access</p>;
    }
  }

  const content = <EditNoteForm note={note} users={users} />;

  return content;
};

export default EditNote;
