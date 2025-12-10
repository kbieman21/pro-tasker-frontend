import { useState, useContext, type ChangeEvent } from "react";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e:ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(form.email, form.password);
  };

  return (
    <div>
      <h2 className="text-3xl mb-6 font-bold">Login</h2>

      <form className="w-80 space-y-4" onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} required className="w-full p-3 border rounded"/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-3 border rounded"/>

        <button className="w-full p-3 bg-blue-600 text-white rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
