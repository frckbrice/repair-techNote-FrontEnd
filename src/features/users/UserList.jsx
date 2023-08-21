
import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";

export default function UserList() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(null, { // this helps to have up-to-dated data everytime we are on the page.
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

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
    const tableContent = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId} />)
      : null;

    content = (
      <table className="table table--users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="tale__th user__username">
              {" "}
              Username
            </th>
            <th scope="col" className="tale__th user__role">
              {" "}
              Roles
            </th>
            <th scope="col" className="tale__th user__ediit">
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