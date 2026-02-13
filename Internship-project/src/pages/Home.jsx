import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  })

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-sm text-center">

        <h2 className="text-2xl font-medium text-gray-800">
          Welcome {user?.name}
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Manage your data in your profile
        </p>

        <div className="w-10 h-[2px] bg-gray-800 mx-auto my-4"></div>

        <button
          onClick={() => navigate('/profile')}
          className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 transition"
        >
          Go to Profile
        </button>

      </div>
    </div>
  )
}

export default Home