import { store } from "../../app/store";
import { notesApiSlice } from "../notes/notesApiSlice";
import { useEffect } from "react";
import { usersApiSlice } from "../users/usersApiSlice";
import { Outlet } from "react-router-dom";


//* this component is initiating the state for redux and make sure the queries have data all the times. it keeps refreshing the page and wraps those data quickly
const Prefetch = () => {
  useEffect(() => {
    console.log('subscribing');
    // we manually subscribes to notes and users. this give us access to that state and it will not expire in 60 seconds. or 5 as we did in users/notesApiSliice

    // const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());
    // const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    // return () => {
    //   console.log("unsubscribe");
    //   notes.unsubscribe();
    //   users.unsubscribe();
    // };

    //* instead of the initiata() above we can better use the built-in prefetch method. we use force:true to force querying new data even if there is still data in the page.
    store.dispatch(notesApiSlice.util.prefetch('getNotes','notesList', {force: true})); 
    store.dispatch(usersApiSlice.util.prefetch('getUsers','usersList', {force: true}));
  },[]);
  
  // the we wrap all the roads that need those data under this prefetch component in main.js file.
  return <Outlet/>;
 
}

export default Prefetch;
