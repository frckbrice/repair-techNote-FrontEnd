import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const { username, isAdmin, isManager } = useAuth();

  const content = (
    <section className="welcome">
      <p>{today}</p>
      <h1>Welcome M. {username}</h1>
      <p>
        <Link to={"/dash/notes"}>
          <span>=&gt;</span> View techNotes
        </Link>
      </p>

      <p>
        <Link to={"/dash/notes/new"}>
          <span>=&gt;</span> Add new techNote
        </Link>
      </p>
      {(isManager || isAdmin) && (
        <p>
          <Link to={"/dash/users"}>
            <span>=&gt;</span> View User settings
          </Link>
        </p>
      )}
      {(isManager || isAdmin) && (
        <p>
          <Link to={"/dash/users/new"}>
            <span>=&gt;</span>
            Add New User
          </Link>
        </p>
      )}
    </section>
  );
  return content;
};

export default Welcome;
