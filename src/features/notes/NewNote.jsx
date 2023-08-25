// import { useSelector } from "react-redux/es/hooks/useSelector";
// import { selectAllUsers } from "../users/usersApiSlice";
import NewNoteForm from "./NewNoteForm";

import { useGetUsersQuery } from "../users/usersApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import PropTypes from "prop-types";

const NewNote = () => {
  // const users = useSelector(selectAllUsers);

  const { users } = useGetUsersQuery("notesList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!users?.length) return <PulseLoader color={"#FFF"} />;

  const content = <NewNoteForm users={users} />;

  return content;
};

NewNote.prototype = {
  users: PropTypes.array.isRequired,
};

export default NewNote;
