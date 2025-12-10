import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import NavBar from "./components/NavBar";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import TaskPage from "./pages/TaskPage";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

// console.log(import.meta.env.VITE_BACKEND_URL);

function App() {
  return (
    <>
      <div className="p-5 bg-zinc-900 h-screen">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path='/projects' element={
            <AuthenticatedRoute>
            <ProjectsPage/> 
            </AuthenticatedRoute>
          }
          />
          {/* <Route path="/projects" element={<ProjectsPage />} /> */}

          <Route path='/projects/:projectId' element={ 
            <AuthenticatedRoute>
            <ProjectDetailsPage/>
            </AuthenticatedRoute>
          }
          />
          {/* <Route path="/projects/:projectId" element={<ProjectDetailsPage />} /> */}

          <Route path='/projects/:projectId/tasks/:taskId' element={ 
            <AuthenticatedRoute>
            <TaskPage/>
            </AuthenticatedRoute>
          }
          />
          {/* <Route path="/projects/:projectId/tasks/:taskId" element={<TaskPage />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
