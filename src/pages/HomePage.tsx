import { Link } from "react-router-dom";


function HomePage() {
  //const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-5xl font-bold mb-4">Project Manager App</h1>

      <p className="text-gray-300 text-lg mb-8">
        Organize your projects and tasks with ease. New users please register; or login if you have an account.
      </p>

     <div className="space-x-4">
        <Link 
          to="/login" 
          className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Login
        </Link>
        
        

        <Link 
          to="/register" 
          className="px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700"
        >
          Register
        </Link>
      </div>

      {/* <ProjectsPage/> */}
    </div>
  );
}
export default HomePage;
