import React, { Fragment } from "react";
import Addmodal from "./AddModal";

const Home = () => {
  return (
    <Fragment>
      <div id="showcase"  className="home-text">
        <p>Welcome To Food Beat</p>
        <Addmodal/>
      </div>
    </Fragment>
  );
};

export default Home;
