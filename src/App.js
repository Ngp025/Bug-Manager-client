import "./css/App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import BugDashboard from "./pages/BugDashboard";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <div id="bug-manager" className="App">
        <ToastContainer containerId={"react-toastify"} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bugdashboard" element={<BugDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
