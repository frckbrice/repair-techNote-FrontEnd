import { store } from "../../app/store";
import { notesApiSlice } from "../notes/notesApiSlice";
import { useEffect } from "react";
import { usersApiSlice } from "../users/usersApiSlice";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    console.log('subscribing');
    // we manually subscribes to notes and users. this give us access to that state and it will not expire in 60 seconds. or 5 as we did
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    return () => {
      console.log("unsubscribe");
      notes.unsubscribe();
      users.unsubscribe();
    };
  },[]);

  return <Outlet/>;
 
}

export default Prefetch;
