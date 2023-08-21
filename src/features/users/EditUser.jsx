import { useParams } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectUserById } from "./usersApiSlice";
import { EditUserForm } from "./EditUserForm";

const EditUser = () => {
  const { id } = useParams();
   console.log(id);
  const user = useSelector((state) => selectUserById(state, id));
  console.log(user);

  const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>;

  return content;
};

export default EditUser;
