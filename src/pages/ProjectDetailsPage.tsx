import { useEffect, useState } from "react";
import { apiClient } from "../clients/api";
import { Link, useParams, useNavigate } from "react-router-dom";
import type { Project, Task } from "../types";
import CommonButton from "../components/CommonButtons";

function ProjectDetailsPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [descriptionP, setDescriptionP] = useState("");

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [descriptionT, setDescriptionT] = useState("");
  const [status, setStatus] = useState("todo");

  const { projectId } = useParams();
  const navigate = useNavigate();

  // fetching project info
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(`/api/projects/${projectId}`);
        console.log(res.data);
        setProject(res.data);

        //populate fields
        setName(res.data.name);
        setDescriptionP(res.data.description);
      } catch (error: any) {
        // console.log(error);
        // setError(error.message);
        console.error(error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  // Another useEfect for fetching tasks
  useEffect(() => {
    const fetchProjectTasks = async () => {
      try {
        const res = await apiClient.get(`/api/projects/${projectId}/tasks`);
        // state
        setTasks(res.data);
        // loading error
      } catch (error) {
       // console.error(error);
       console.error(error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
      }
    };
    fetchProjectTasks();
  }, [projectId]);

  if (loading) return <div className="text-3xl text-white">Loading...</div>;

  if (error) return <div className="text-3xl text-white">{error}</div>;

  // create a task
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiClient.post(`/api/projects/${projectId}/tasks`, {
        title,
        description: descriptionT,
        status,
      });
      setTasks((prev) => [...prev, res.data]);
    } catch (error) {
      // console.error(error);
      // setError(error.message);
      console.error(error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setTitle("");
      setDescriptionT("");
      setStatus("todo");
    }
  };

  const updateProject = async () => {
    try {
      const res = await apiClient.put(`/api/projects/${projectId}`, {
        name,
        descriptionP,
      });

      setProject(res.data);
      alert("Project updated successfully");
    } catch (error) {
     // console.error(error);
     console.error(error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const deleteProject = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await apiClient.delete(`/api/projects/${projectId}`);
      console.log(res.data);

      alert("Project deleted");
      //navigate("/projects");
    } catch (error) {
      //console.error(error);
      console.error(error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="text-white">
      {/* Project Form */}
      <div className="text-white max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow-lg">
        <h1 className="text-4xl">Project Details</h1>
        {project && (
        <div>
          <label className="block text-gray-300 mb-1">Name</label>
          <input
            className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>)}

        <div>
          <label className="block text-gray-300 mb-1">Description</label>
          <textarea
            className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white"
            rows={3}
            value={descriptionP}
            onChange={(e) => setDescriptionP(e.target.value)}
          ></textarea>
        </div>

        <div className="flex gap-3 my-4">
          <CommonButton
            label="Update Project"
            color="blue"
            onClick={updateProject}
          />
          <CommonButton
            label="Delete Project"
            color="red"
            onClick={deleteProject}
          />
          <CommonButton
            label="Back to Projects"
            color="gray"
            onClick={() => navigate("/projects")}
          />
        </div>
      </div>

      {/* <div className="mt-10">
        <div className="text-3xl font-semibold">{project?.name}</div>
        <div className="text-xl text-gray-300">{project?.description}</div>
      </div> */}

      <form
        onSubmit={handleSubmit}
        className=" p-2 h-50 mt-10 flex flex-col gap-2 rounded"
      >
        <label htmlFor="project-name">Task Title: </label>
        <input
          type="text"
          name="task-title"
          className="border"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="task-description">Task Description</label>
        <input
          type="text"
          name="task-description"
          className="border"
          value={descriptionT}
          onChange={(e) => setDescriptionT(e.target.value)}
        />

        <label htmlFor="task-status">Task Status</label>
        <input
          type="text"
          name="task-status"
          className="border"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <input
          type="submit"
          value="Create Task"
          className="mt-5 bg-sky-500 rounded mb-5"
        />
        {/* <button className="bg-sky-500 px-4 py-2 rounded w-full mt-5 mb-5">
          Create Task
        </button> */}
      </form>

      {/* <div>
        <Link to="/projects" className="mt-auto bg-sky-500 rounded px-3 py-1">
          Back to Projects
        </Link>
      </div> */}

      <div className="w-full flex gap-5 mt-5">
        {tasks &&
          tasks.map((task) => (
            <div
              key={task._id}
              className="text-white w-50 flex flex-col h-50 border border-red-500 p-2 text-center rounded mt-5 mb-5"
            >
              <div className="font-bold">{task.title}</div>
              <div>{task.description}</div>
              <Link
                to={`/projects/${projectId}/tasks/${task._id}`}
                className="mt-auto bg-sky-500 rounded"
              >
                See Task
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProjectDetailsPage;
