import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import PulseLoader from "react-spinners/PulseLoader";

export default function UserList() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    // this helps to have up-to-dated data everytime we are on the page.
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <PulseLoader color="#fff"/>;

  if (isError) {
    content = (
      <p className={isError ? "failed to load user data" : "offcreen"}>
        {error?.data?.message}
      </p>
    );
  }

  if (isSuccess) {
    const { ids } = users;
    // console.log(ids);
    const tableContent =
      ids?.length && ids.map((userId) => <User key={userId} userId={userId} />);

    content = (
      <table className="table table--users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">
              {" "}
              Username
            </th>
            <th scope="col" className="table__th user__role">
              {" "}
              Roles
            </th>
            <th scope="col" className="table__th user__ediit">
              {" "}
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
}

// export default UserList;
