import { useState, useContext, type ChangeEvent } from "react";
import { AuthContext } from "../context/AuthContext";

function RegisterPage() {
  const { register } = useContext(AuthContext); //i need to check for null before register so i did to my context export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e:ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => { //
    e.preventDefault();
    await register(form);  // Sends formData to backend
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div>
      <h2 className="text-3xl mb-6 font-bold">Create an Account</h2>

      <form className="w-80 space-y-4" onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required className="w-full p-3 border rounded"/>
        <input name="email" placeholder="Email" onChange={handleChange} required className="w-full p-3 border rounded"/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-3 border rounded"/>

        <button className="w-full p-3 bg-green-600 text-white rounded" type="submit">
          Register
        </button>
      </form>
      </div>
    </div>
  );
}

export default RegisterPage;
