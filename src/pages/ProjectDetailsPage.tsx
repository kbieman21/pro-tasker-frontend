import { useEffect, useState } from "react";
import { apiClient } from "../clients/api";
import { Link, useParams } from "react-router-dom";
import type { Project, Task } from "../types";
import CommonButton from "../components/CommonButtons";

function ProjectDetailsPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { projectId } = useParams();

  // fetching project info
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(`/api/projects/${projectId}`);
        console.log(res.data);
        setProject(res.data);
      } catch (error: any) {
        console.log(error);
        setError(error.message);
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
        console.error(error);
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
        description,
      });
      setTasks((prev) => [...prev, res.data]);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setTitle("");
      setDescription("");
    }
  };

  const updateProject = async (e: React.FormEvent) => {};

  const deleteProject = async (e: React.FormEvent) => {};

  return (
    <div className="text-white">
      <h1 className="text-4xl">Project Details</h1>

      

      <div className="mt-10">
        <div className="text-3xl font-semibold">{project?.name}</div>
        <div className="text-xl text-gray-300">{project?.description}</div>
      </div>

      <div className="flex gap-3 my-4">
        <CommonButton label="Update" color="blue" onClick={() => {}} />
        <CommonButton label="Delete" color="red" onClick={() => {}} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="border p-2 h-50 mt-10 flex flex-col gap-2 rounded"
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="submit"
          value="Create Task"
          className="mt-auto bg-sky-500 rounded"
        />
        {/* <button className="bg-sky-500 px-4 py-2 rounded w-full mt-2">
          Create Task
        </button> */}
      </form>

      <div>
        <Link to="/projects" className="mt-auto bg-sky-500 rounded px-3 py-1">
          Back to Projects
        </Link>
      </div>

    
      <div className="w-full flex gap-5 mt-10">
        {tasks &&
          tasks.map((task) => (
            <div
              key={task._id}
              className="text-white w-50 flex flex-col h-50 border border-red-500 p-2 text-center rounded"
            >
              <div className="font-bold">{task.title}</div>
              <div>{task.description}</div>
              <Link
                to={`/projects/${projectId}/tasks/${task._id}`}
                className="mt-auto bg-sky-500 rounded"
              >
                Back to Projects
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProjectDetailsPage;
