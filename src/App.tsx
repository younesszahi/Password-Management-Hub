import React, { useState, useEffect } from "react";
import { HiSaveAs } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import photo from "./younes.png";
export default function App() {
  const [password, setpassword] = useState([
    { url: "", username: "", password: "" },
  ]);
  const [form, setform] = useState({ url: "", username: "", password: "" });
  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(password));
  }, [password]);
  useEffect(() => {
    const storedPasswords = localStorage.getItem("passwords");
    if (storedPasswords) {
      setpassword(JSON.parse(storedPasswords));
    }
  }, []);
  return (
    <div
      className="w-full h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-700 flex items-center flex-col pt-16 backdrop-blur-sm"
      style={{ fontFamily: "Poppins" }}
    >
      <img src={photo} alt="" className="w-[300px] h-[300px]" />
      <h1 className="text-4xl font-bold text-white shadow-lg ">🔐 PassZAHI</h1>
      <h2 className="text-xl text-gray-200 mt-2">
        Your Password Management Hub
      </h2>

      {/* Input Fields */}
      <div className="mt-10 w-full max-w-lg px-5">
        <input
          type="text"
          placeholder="Website URL"
          className="w-full px-4 py-3 rounded-lg border border-gray-300/50 backdrop-blur-lg bg-white/10 placeholder-gray-300 focus:outline-none focus:border-white transition"
          value={form.url}
          onChange={(e) => setform({ ...form, url: e.target.value })}
        />
        <div className="flex gap-5 mt-4">
          <input
            type="text"
            placeholder="Username"
            className="flex-grow px-4 py-3 rounded-lg border border-gray-300/50 backdrop-blur-lg bg-white/10 placeholder-gray-300 focus:outline-none focus:border-white transition"
            value={form.username}
            onChange={(e) => setform({ ...form, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-1/3 px-4 py-3 rounded-lg border border-gray-300/50 backdrop-blur-lg bg-white/10 placeholder-gray-300 focus:outline-none focus:border-white transition"
            value={form.password}
            onChange={(e) => setform({ ...form, password: e.target.value })}
          />
        </div>
      </div>

      {/* Save Button */}
      <button
        className="mt-8 px-6 py-3 flex items-center text-lg bg-gradient-to-r from-yellow-500 to-red-500 text-white rounded-full shadow-md hover:scale-105 transition"
        onClick={() => {
          setform({ url: "", username: "", password: "" });
          setpassword((prev) => [
            ...prev,
            {
              id: Date.now(),
              name: form.url,
              email: form.username,
              role: form.password,
            },
          ]);
          console.log(`Saved ${form.url}`);
        }}
      >
        <HiSaveAs className="mr-2" />
        Save Password
      </button>

      {/* Table */}
      <table className="mt-10 w-3/4 max-w-xl border border-gray-300/50 backdrop-blur-lg shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-black/40 text-white text-lg">
            <th className="px-6 py-3 border border-gray-300/50">Website</th>
            <th className="px-6 py-3 border border-gray-300/50">Username</th>
            <th className="px-6 py-3 border border-gray-300/50">Password</th>
          </tr>
        </thead>
        <tbody>
          {password.map((item) => (
            <tr
              key={item.id}
              className="bg-black/20 text-white text-lg hover:bg-black/30 transition"
            >
              <td className="px-6 py-3 border border-gray-300/50">
                {item.name}
              </td>
              <td className="px-6 py-3 border border-gray-300/50">
                {item.email}
              </td>
              <td className="px-6 py-3 border border-gray-300/50  ">
                <div className="flex items-center justify-between">
                  {item.role}
                  <MdDelete
                    onClick={() => {
                      setpassword((prev) =>
                        prev.filter((user) => user.id !== item.id)
                      );
                      console.log(`Deleted ${item.name}`);
                    }}
                    className="text-red-500 cursor-pointer hover:scale-x-125 duration-300 easy-in-out"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
