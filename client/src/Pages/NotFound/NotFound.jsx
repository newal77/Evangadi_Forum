import React from "react";
import "./notFound.css";
import Layout from "../../Components/Layout/Layout";
function NotFound() {
  return (
    <Layout>
      <div className="notFound ">
        <h3>Sorry, the page you are looking for couldn't be found.</h3>
        <br />

        <p>
          
          Please go back to the <a className="notFound_toHome" href="/">home page</a> and try again.
          If it still doesn't work for you, please reach out to our team at
          contact <a className="toHome_notFound" href="/">support@evangadi.com</a>
        </p>
      </div>
    </Layout>
  );
}

export default NotFound;
