import Note from "./Note";
import { useGetNotesQuery } from "./notesApiSlice";
// import useTitle from "../../hooks/useTitle";
import PulseLoader from "react-spinners/PulseLoader";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectAllUsers } from "../users/usersApiSlice";

const NoteList = () => {
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery('notesList', {
    // this helps to have up-to-dated data everytime we are on the page.
    pollingInterval: 15000, // more than  one persone can work on those data that's why we put the update time to 15s
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if(!notes?.ids?.length) {
    content = <p className="errmsg">Unauthorized{error?.data?.message}</p>;
}
  if (isLoading) content = <PulseLoader color={"#FFF"} />;

  if (isError) {
    content = (
      <p className="errmsg">
        {error?.data?.message}
       
      </p>
    );
  }

  if (isSuccess) {
    const { ids } = notes;
    const tableContent = ids?.length
      ? ids.map((noteId) => {
          return <Note key={noteId} noteId={noteId} />;
        })
      : null;

    content = (
      <table className="table table--notes">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th note__title">
              {" "}
              Title
            </th>
            <th scope="col" className="table__th note__created">
              {" "}
              Created
            </th>
            <th scope="col" className="table__th note__updated">
              {" "}
              Updated
            </th>

            <th scope="col" className="table__th note__status">
              {" "}
              Status
            </th>
            <th scope="col" className="table__th note__username">
              {" "}
              Owner
            </th>
            <th scope="col" className="table__th note__edit">
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
};

export default NoteList;
