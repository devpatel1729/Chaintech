import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='flex py-4 items-center px-8 bg-black-200 justify-between'>
            <h2 className='text-2xl font-bold'>Internship-Project</h2>
            <div className='flex gap-10'>
                <Link className='text-lg font-medium' to='/'>Home</Link>
                <Link className='text-lg font-medium' to='/profile'>Profile</Link>
            </div>
        </div>  
    )
}

export default Navbar