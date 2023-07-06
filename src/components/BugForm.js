import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  MDBCardBody,
  MDBCardFooter,
  MDBInput,
  MDBRow,
  MDBBtn,
  MDBCardText,
  MDBValidation,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { assignBug, updateBug } from "../redux/features/bugSlice";

const initialState = {
  userId: "",
  projectId: "",
  description: "",
};

const BugForm = ({ bug, setBasicModal }) => {
  const dispatch = useDispatch();
  const [formData, setformData] = useState(initialState);
  const { userId, projectId, description } = formData;

  useEffect(() => {
    if (bug) {
      const bugData = {
        userId: bug.userid,
        projectId: bug.projectid,
        description: bug.description,
      };
      setformData(bugData);
    }
  }, [bug]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId && projectId) {
      if (bug) {
        setBasicModal(false);
        const id = bug._id;
        dispatch(updateBug({ formData, setformData, id, toast }));
      } else {
        dispatch(assignBug({ formData, setformData, toast }));
      }
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  return (
    <>
      <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
        <MDBCardBody id="bug-assign-card-body">
          <MDBRow id="row">
            <div id="body-card-container-0" className="col-md-6">
              <MDBCardText>User Id</MDBCardText>
              <MDBInput
                id="user-id"
                type="number"
                label={bug?.userid ? "" : "User Id"}
                name="userId"
                required
                invalid
                min={0}
                validation="Please provide a user id"
                onChange={onInputChange}
                value={userId || ""}
              />
            </div>
            <div id="body-card-container" className="col-md-6">
              <MDBCardText>Project Id</MDBCardText>
              <MDBInput
                id="project-id"
                type="number"
                label={bug?.projectid ? "" : "Project Id"}
                name="projectId"
                required
                invalid
                min={0}
                validation="Please provide a project id"
                onChange={onInputChange}
                value={projectId || ""}
              />
            </div>
          </MDBRow>
          <MDBRow id="row">
            <div id="body-card-container-1" className="col-md-12">
              <MDBCardText>Bug description</MDBCardText>
              <textarea
                id="description-textArea"
                className="form-control"
                name="description"
                maxLength={100}
                onChange={onInputChange}
                value={description}
              />
            </div>
          </MDBRow>
        </MDBCardBody>
        <MDBCardFooter className="text-end">
          <MDBBtn
            id="clear-button"
            className="btn-danger col-3 clear-button"
            onClick={(e) => {
              e.preventDefault();
              setformData({ userId: "", projectId: "", description: "" });
            }}
          >
            Clear
          </MDBBtn>
          <MDBBtn id="save-button" className="col-3" type="submit">
            Save
          </MDBBtn>
        </MDBCardFooter>
      </MDBValidation>
    </>
  );
};

export default BugForm;
