import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'
import axios from 'axios';

const Profile = () => {
  const { user, data, backendURL, getData } = useContext(UserContext);
  const navigate = useNavigate()
  const [edit, setEdit] = useState(false)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const res = await axios.put(backendURL + `/update-user/${email}`, { name, password, phone })
    console.log(res)
    const updatedUser = { ...user, name, password, phone };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    getData();
    setEdit(false);
    alert('Details Updated')
  }

  const logout = () => {
    const cnf = window.confirm('Are you sure you want to Logout ?')
    if (cnf) {
      localStorage.removeItem('user')
      navigate('/login')
      getData()
    }
  }

  useEffect(() => {
    if (user) {
      setEmail(user?.email)
      setName(user?.name)
      setPassword(user?.password)
      setPhone(user?.phone)
    } else {
      navigate('/login')
    }
  }, [])
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-6 shadow-sm">

        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-4 text-gray-800"
        >
          {/* Heading */}
          <div className="text-center">
            <p className="prata-regular text-2xl">Manage Your Profile</p>
            <div className="w-10 h-0.5 bg-gray-800 mx-auto mt-2"></div>
          </div>

          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!edit}
            className={`w-full px-3 py-2 border outline-none focus:ring-1 focus:ring-black
        ${edit ? "bg-white" : "bg-gray-100 cursor-not-allowed"}`}
            required
          />

          {/* Phone */}
          <input
            type="text"
            placeholder="Phone Number (Whatsapp Enabled)"
            value={phone}
            maxLength={10}
            onChange={(e) => {
              const num = e.target.value.replace(/\D/g, "");
              setPhone(num);
            }}
            disabled={!edit}
            className={`w-full px-3 py-2 border outline-none focus:ring-1 focus:ring-black
        ${edit ? "bg-white" : "bg-gray-100 cursor-not-allowed"}`}
            required
          />

          {/* Email */}
          <input
            type="email"
            value={email}
            disabled
            className="w-full px-3 py-2 border bg-gray-100 cursor-not-allowed"
          />

          {/* Password */}
          <div className="flex">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!edit}
              className={`w-full px-3 py-2 border border-r-0 outline-none focus:ring-1 focus:ring-black
          ${edit ? "bg-white" : "bg-gray-100 cursor-not-allowed"}`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="px-3 border flex items-center justify-center bg-gray-50"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => setEdit(!edit)}
              className="w-1/2 border border-black py-2 hover:bg-gray-100 transition"
            >
              {!edit ? "Update" : "Discard"}
            </button>

            <button
              type="submit"
              className="w-1/2 bg-black text-white py-2 hover:opacity-90 transition"
            >
              Save
            </button>
          </div>
        </form>

        {/* Logout */}
        <button onClick={() => { logout() }} className="w-full mt-4 text-sm text-red-600 hover:underline">
          Logout
        </button>
      </div>
    </div>
  )
}

export default Profile