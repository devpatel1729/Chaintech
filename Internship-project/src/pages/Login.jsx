import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { data, user, getData } = useContext(UserContext);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const user = data.find(
            (dt) => dt.email === email && dt.password === password
        );
        if (user) {
            console.log("Login successful", user);
            localStorage.setItem('user', JSON.stringify(user))
            navigate('/');
            getData()
        } else {
            console.log("Invalid email or password");
        }
    }

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='prata-regular text-3xl'>Login</p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
            </div>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
            <div className='w-full flex'>
                <input onChange={(e) => setPassword(e.target.value)} value={password} type={showPassword ? 'text' : 'password'} className='w-[90%] px-3 py-2 border border-gray-800' placeholder='Password' required />
                <button
                    type="button"
                    className="border w-[10%] border-gray-800 border-l-0 flex items-center justify-center"
                    onClick={() => setShowPassword(prev => !prev)}
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
            <div className='w-full flex justify-between text-sm mt-[-8px]'>
                <p className='cursor-pointer'></p>
                <p onClick={() => navigate('/register')} className='cursor-pointer'>New User? &nbsp;<span className='text-blue-600 underline'>Create Account</span></p>
            </div>
            <button className='bg-black text-white font-light px-8 py-2 mt-4'>Sign In</button>
        </form>
    )
}

export default Login