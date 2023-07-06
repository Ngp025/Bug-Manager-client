import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MDBCard, MDBCardHeader, MDBCardTitle } from "mdb-react-ui-kit";
import BugForm from "../components/BugForm";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Home = () => {
  const { error } = useSelector((state) => ({ ...state.bug }));
  const [renderFix, setRenderFix] = useState(false)
  useEffect(() => {
    renderFix ?
      (error && toast.error(error)) : setRenderFix(true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);
  return (
    <div id="home-content" className="content col-md-6">
      <Link id="router-dom-link" to="/bugdashboard">
        <p id="dashboard-link">Go to Bug Dashboard </p>
      </Link>
      <MDBCard id="home-bug-assign-card">
        <MDBCardHeader id="bug-assign-card-header"  >
          <MDBCardTitle id="bug-assign-card-header-title">
            Bugs assignment
          </MDBCardTitle>
        </MDBCardHeader>
        <BugForm />
      </MDBCard>
    </div>
  );
};

export default Home;
