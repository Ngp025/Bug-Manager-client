import axios from "axios";

const devENV = process.env.NODE_ENV !== "production";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({
  baseURL: `${devENV ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
});

// Bugs API
export const assignBug = (formData) => API.post("/bugs", { formData });

export const getBugs = () => API.get("/bugs");

export const filterBugs = (userId, projectId, startDate, endDate) => API.get(`/bugs/userid:${userId}&projectid:${projectId}&startDate:${startDate}&endDate:${endDate}`);

export const updateBug = (id, formData) =>
  API.patch(`/bug/${id}`, { formData });

export const deleteBug = (id) => API.delete(`/bugs/${id}`);
