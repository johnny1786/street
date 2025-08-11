import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/auth/signup", form);
    alert("Signup successful! Please login.");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <input className="border p-2 w-full mb-3" placeholder="Name" onChange={(e) => setForm({...form, name: e.target.value})} />
        <input className="border p-2 w-full mb-3" placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} />
        <input className="border p-2 w-full mb-3" placeholder="Password" type="password" onChange={(e) => setForm({...form, password: e.target.value})} />
        <button className="bg-blue-500 text-white p-2 w-full">Signup</button>
      </form>
    </div>
  );
}
