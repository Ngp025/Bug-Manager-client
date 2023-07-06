import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import {
  MDBCard,
  MDBCardHeader,
  MDBBtn,
  MDBIcon,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCardTitle,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBModalDialog,
  MDBModalContent,
  MDBModalTitle,
} from "mdb-react-ui-kit";
import { getBugs, deleteBug, filterBugs } from "../redux/features/bugSlice";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import BugForm from "../components/BugForm";

const initialState = {
  userId: "",
  projectId: "",
  startDate: "",
  endDate: "",
};

const BugDashboard = () => {
  const dispatch = useDispatch();
  const { loading, bugs, fBugs, error } = useSelector((state) => ({
    ...state.bug,
  }));
  const [renderFix, setRenderFix] = useState(false);
  const [basicModal, setBasicModal] = useState(false);
  const [bugToEdit, setBugToEdit] = useState({});

  const [bugsArray, setBugsArray] = useState([]);
  const [fBugsArray, setfBugsArray] = useState([]);

  const [formData, setformData] = useState(initialState);
  const { userId, projectId, startDate, endDate } = formData;

  useEffect(() => {
    getBugsList();
  }, []);

  useEffect(() => {
    renderFix ? error && toast.error(error) : setRenderFix(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    setBugsArray(bugs);
    setfBugsArray(fBugs);
  }, [bugs, fBugs]);

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSearchSubmit = () => {
    if (startDate || endDate || userId || projectId) {
      const startDateToCompare = moment().diff(startDate, "minutes");
      const endDateToCompare = moment().diff(endDate, "minutes");
      if (startDateToCompare && endDateToCompare) {
        if (startDateToCompare > endDateToCompare) {
          dispatch(filterBugs({ formData }));
        } else {
          toast.error("Start date must be less than end date  ");
        }
      } else {
        dispatch(filterBugs({ formData }));
      }
    } else {
      toast.error("You must enter some filtering data ");
    }
  };

  const toggleShow = (bug) => {
    setBugToEdit(bug);
    setBasicModal(!basicModal);
  };
  const [view, setView] = useState("List");

  const getBugsList = () => dispatch(getBugs({}));

  if (loading)
    return (
      <div
        id="spinner-content"
        className="col-md-6 text-center spinner-content"
      >
        <Spinner />
      </div>
    );
  else
    return (
      <div id="dashBoard-content" className="content col-md-10">
        <>
          <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
            <MDBModalDialog>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>
                    Bug project related{" "}
                    <span id="span-tag-0" className="span-tag">
                      {bugToEdit.projectid}
                    </span>
                  </MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={toggleShow}
                  ></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <BugForm bug={bugToEdit} setBasicModal={setBasicModal} />
                </MDBModalBody>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </>
        <Link id="dashboard-router-dom-link" to="/">
          <p id="bugAssignament-link">Go to Bug assignament </p>
        </Link>
        <MDBCard id="home-bug-assign-card">
          <MDBCardHeader id="dashBoard-card-header" className="d-flex">
            <MDBCardTitle id="dashBoard-card-header-title" className="col-md-5">
              Bugs dashboard
              <span id="span-tag" className="span-tag">
                {` ${view}`}
              </span>
            </MDBCardTitle>
            <MDBBtn
              id="list-button"
              disabled={view === "List"}
              className="text-center col-2 dashboard-button"
              onClick={() => {
                setView("List");
                getBugsList();
              }}
            >
              List
            </MDBBtn>
            <MDBBtn
              id="filter-button"
              className="text-center col-2 dashboard-button"
              disabled={view === "Filter"}
              onClick={() => setView("Filter")}
            >
              Filter
            </MDBBtn>
            <MDBBtn
              id="edit-button"
              className="text-center col-2 dashboard-button"
              disabled={view === "Edit"}
              onClick={() => {
                setView("Edit");
                if (bugsArray.length === 0) {
                  getBugsList();
                }
              }}
            >
              Edit & Delete
            </MDBBtn>
          </MDBCardHeader>
          {view === "List" ? (
            <MDBTable id="dashBoard-table-list">
              <MDBTableHead id="dashBoard-table-head-list">
                <tr id="dashBoard-table-tr-list">
                  <th id="dashBoard-table-th-user-list" className="dashboard-label" scope="col">
                    User Id
                  </th>
                  <th id="dashBoard-table-th-project-list" className="dashboard-label" scope="col">
                    Project Id
                  </th>
                  <th id="dashBoard-table-th-description-list" className="dashboard-label" scope="col">
                    Description
                  </th>
                  <th id="dashBoard-table-th-date-list" className="dashboard-label" scope="col">
                    Create Date
                  </th>
                </tr>
              </MDBTableHead>
              <MDBTableBody id="dashboard-table-body-list">
                {bugsArray?.map((bug, index) => {
                  return (
                    <tr key={`bug-tr-${index}`} id={`bug-tr-${index}-list`}>
                      <th id={`bug-th-${index}-userId-list`} scope="row">
                        {bug.userid}
                      </th>
                      <td id={`bug-td-${index}-projectId-list`}>
                        {bug.projectid}
                      </td>
                      <td id={`bug-td-${index}-description-list`}>
                        {bug.description}
                      </td>
                      <td id={`bug-td-${index}-createData-list`}>
                        {moment(bug.creationDate).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </td>
                    </tr>
                  );
                })}
              </MDBTableBody>
            </MDBTable>
          ) : view === "Filter" ? (
            <>
              <MDBTable id="dashboard-edit-table-filter">
                <MDBTableHead id="dashBoard-table-head-filter">
                  <tr id="dashBoard-table-tr-filter">
                    <th id="dashBoard-table-th-user-filter" scope="col">
                      <label id="user-id-search-label" className="search-label">
                        User id
                      </label>
                      <input
                        id="user-id-search-input"
                        name="userId"
                        onChange={onInputChange}
                        min={0}
                        value={userId}
                        type="number"
                      />
                    </th>
                    <th id="dashBoard-table-th-project-filter" scope="col">
                      <label
                        id="project-id-search-label"
                        className="search-label"
                      >
                        Project id
                      </label>
                      <input
                        id="project-id-search-input"
                        name="projectId"
                        onChange={onInputChange}
                        min={0}
                        value={projectId}
                        type="number"
                      />
                    </th>
                    <th id="dashBoard-table-th-startDate-filter" scope="col">
                      <label
                        id="startDate-search-label"
                        className="search-label"
                      >
                        Start Date
                      </label>
                      <input
                        id="startDate-search-input"
                        name="startDate"
                        onChange={onInputChange}
                        value={startDate}
                        type="date"
                      />
                    </th>
                    <th id="dashBoard-table-th-endDate-filter" scope="col">
                      <label id="endDate-search-label" className="search-label">
                        End Date
                      </label>
                      <input
                        id="endDate-search-input"
                        name="endDate"
                        onChange={onInputChange}
                        value={endDate}
                        type="date"
                      />
                    </th>
                    <th id="dashBoard-table-th-searchButton-filter" scope="col">
                      <MDBIcon
                        id="user-id-search-icon"
                        size="2x"
                        className="icon search"
                        onClick={handleSearchSubmit}
                        icon="search"
                      />
                    </th>
                    <th id="dashBoard-table-th-clearButton-filter" scope="col">
                      <MDBIcon
                        id="user-id-search-icon"
                        size="2x"
                        className="icon search"
                        onClick={() => {
                          setformData(initialState);
                          setfBugsArray([]);
                        }}
                        icon="times-circle"
                      />
                    </th>
                    <th id="dashBoard-table-th-clearButton-filter-fix" scope="col">
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableHead id="dashBoard-table-head-1-filter">
                  <tr id="dashBoard-table-head-1-tr-filter">
                    <th id="dashBoard-table-th-user-filter" scope="col">
                      <label id="user-id-search-label-head-1" className="dashboard-label">Bug Id</label>
                    </th>
                    <th
                      id="dashBoard-table-th-project-filter-head-1"
                      scope="col"
                    >
                      <label
                        id="project-id-search-label-head-1"
                        className="dashboard-label"
                      >
                        User name
                      </label>
                    </th>
                    <th
                      id="dashBoard-table-th-startDate-filter-head-1"
                      scope="col"
                    >
                      <label
                        id="startDate-search-label-head-1"
                        className="dashboard-label"
                      >
                        Project Name
                      </label>
                    </th>
                    <th
                      id="dashBoard-table-th-description-filter-head-1"
                      scope="col"
                    >
                      <label id="endDate-search-label" className="dashboard-label">
                        Description
                      </label>
                    </th>
                    <th
                      id="dashBoard-table-th-creationDate-filter-head-1"
                      scope="col"
                    ></th>
                    <th
                      id="dashBoard-table-th-searchButton-filter-head-1-fix"
                      scope="col"
                    >
                      <label id="endDate-search-label" className="dashboard-label">
                        Creation Date
                      </label>
                    </th>
                    <th
                      id="dashBoard-table-th-clearButton-filter-head-1-fix"
                      scope="col"
                    ></th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody id="dashboard-edit-table-body-filter">
                  {fBugsArray.length !== 0 ? (
                    fBugsArray?.map((bug, index) => {
                      return (
                        <tr
                          key={`bug-tr-${index}`}
                          id={`bug-tr-${index}-filter`}
                        >
                          <th id={`bug-th-${index}-bug-id-filter`} scope="row">
                            {bug.id}
                          </th>
                          <td id={`bug-td-${index}-username-filter`}>
                            {bug.username}
                          </td>
                          <td id={`bug-td-${index}-projectname-filter`}>
                            {bug.projectname}
                          </td>
                          <td id={`bug-td-${index}-filter`}>
                            {bug.description}
                          </td>
                          <td id={`bug-td-${index}-filter-fix`}></td>
                          <td id={`bug-td-${index}-createData`}>
                            {moment(bug.creationDate).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </td>
                          <td id={`bug-td-${index}-filter-fix-0`}>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr id="bug-tr-no-errors-filter">
                      <th id="bug-th-no-bugs-filter" scope="row">
                        No bugs found
                      </th>
                      <th id="bug-tr-no-bugs-filter-fix-0"></th>
                      <th id="bug-tr-no-bugs-filter-fix-1"></th>
                      <th id="bug-tr-no-bugs-filter-fix-2"></th>
                      <th id="bug-tr-no-bugs-filter-fix-3"></th>
                      <th id="bug-tr-no-bugs-filter-fix-4"></th>
                      <th id="bug-tr-no-bugs-filter-fix-5"></th>
                    </tr>
                  )}
                </MDBTableBody>
              </MDBTable>
            </>
          ) : (
            <MDBTable id="dashboard-edit-table">
              <MDBTableHead id="dashBoard-table-head">
                <tr id="dashBoard-table-tr" className="dashboard-label">
                  <th id="dashBoard-table-th-user" scope="col">
                    User Id
                  </th>
                  <th id="dashBoard-table-th-project" scope="col">
                    Project Id
                  </th>
                  <th id="dashBoard-table-th-description" scope="col">
                    Description
                  </th>
                  <th id="dashBoard-table-th-date" scope="col">
                    Create Date
                  </th>
                  <th id="dashBoard-table-th-edit" scope="col">
                    Edit
                  </th>
                  <th id="dashBoard-table-th-delete" scope="col">
                    Delete
                  </th>
                </tr>
              </MDBTableHead>
              <MDBTableBody id="dashboard-edit-table-body">
                {bugsArray?.map((bug, index) => {
                  return (
                    <tr key={`bug-tr-${index}`} id={`bug-tr-${index}`} >
                      <th id={`bug-th-${index}-userId`} scope="row">
                        {bug.userid}
                      </th>
                      <td id={`bug-td-${index}-projectId`}>{bug.projectid}</td>
                      <td id={`bug-td-${index}-description`}>
                        {bug.description}
                      </td>
                      <td id={`bug-td-${index}-createData`}>
                        {moment(bug.creationDate).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </td>
                      <td id={`bug-td-${index}-editButton`}>
                        <MDBIcon
                          id="editeIcon"
                          className="icon"
                          fas
                          color="primary"
                          icon="edit"
                          size="2x"
                          onClick={() => toggleShow(bug)}
                        />
                      </td>
                      <td id={`bug-td-${index}-deleteButton`}>
                        <MDBIcon
                          id="deleteIcon"
                          className="icon"
                          fas
                          color="danger"
                          icon="trash"
                          size="2x"
                          onClick={() => {
                            const id = bug._id;
                            dispatch(deleteBug({ id, toast }));
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </MDBTableBody>
            </MDBTable>
          )}
        </MDBCard>
      </div>
    );
};

export default BugDashboard;
