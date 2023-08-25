import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux/es/hooks/useSelector";
// import { selectUserById } from "./usersApiSlice";
import { EditUserForm } from "./EditUserForm";

import { useGetUsersQuery } from "./usersApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import PropTypes from "prop-types";

const EditUser = () => {
  const { id } = useParams();

  // const user = useSelector((state) => selectUserById(state, id));

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  if (!user) return <PulseLoader color={"#fff"} />;

  const content = <EditUserForm user={user} />;

  return content;
};

EditUser.prototype = {
  id: PropTypes.string,
  user: PropTypes.object,
};

export default EditUser;
