import { useRouteError } from "react-router-dom"

const ErrorPage = () => {
  const error = useRouteError()
  return (
    <div>
      <h1>Oops!</h1>
      <p>An Sorry, an unexpected error has occurred.! </p>
      <p>Please contact the admin for more information</p>
      <p>
        {" "}
        <i>{error.status || error.statusText} </i>
        <i>{error.data || error.message} </i>
      </p>
    </div>
  );
}

ErrorPage.propTypes = {

}

export default ErrorPage
