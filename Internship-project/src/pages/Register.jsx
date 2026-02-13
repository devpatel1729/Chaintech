import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { data, backendURL, getData, user } = useContext(UserContext);
    const navigate = useNavigate()

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const userExists = data.some(
            (dt) => dt.email === email
        );
        if (userExists) {
            alert("User already exists.Please Login");
            navigate('/login');
            return;
        }
        const res = await axios.post(backendURL + '/add-user', { name, email, password, phone })
        console.log(res)
        getData();
        navigate('/login')
        alert('User Registered,Please Login')
    }
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [])

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='prata-regular text-3xl'>Register</p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
            </div>
            <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />
            <input onChange={(e) => {
                const num = e.target.value.replace(/\D/g, "");
                setPhone(num)
            }} value={phone} maxLength={10} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Phone Number (Whatsapp Enabled)' required />
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
                <p onClick={() => navigate('/login')} className='cursor-pointer'>Already registered?&nbsp;<span className='text-blue-600 underline'>Login</span></p>
            </div>
            <button className='bg-black text-white font-light px-8 py-2 mt-4'>Sign up</button>
        </form>
    )
}

export default Register