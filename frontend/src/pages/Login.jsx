import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/auth/login", form);
    localStorage.setItem("token", res.data.token);
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <input className="border p-2 w-full mb-3" placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} />
        <input className="border p-2 w-full mb-3" placeholder="Password" type="password" onChange={(e) => setForm({...form, password: e.target.value})} />
        <button className="bg-green-500 text-white p-2 w-full">Login</button>
      </form>
    </div>
  );
}
