import logo from '../assets/logo.png';
import { useState, useEffect } from 'react';
import { FaBars, FaXmark } from 'react-icons/fa6';
import { Link } from 'react-scroll';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <header className='w-full bg-transparent fixed top-0 right-0 left-0'>

            <nav  className='bg-white md:px-14 p-4 max-w-screen-2xl border-b mx-auto text-primary fixed top-0 right-0 left-0 bg-opacity-80'>
                <div className=' text-center text-lg container mx-auto flex justify-between items-center front-medium'>
                    <div className='flex space-x-14 justify-between items-center'>
                        <a href="/" className='text-2xl font-semibold flex items-center space-x-3'>
                            <img src={logo} className='w-10 inline-block items-center' alt="" />
                            <span>SIGC</span>
                        </a>

                        <ul className='md:flex space-x-12 hidden navitems font-bold'>
                        <li className='block hover:text-secondary' >
                            <a href="/">Menu</a>
                        </li>
                        <li  className='block hover:text-secondary'>  <a href="/upload">Upload</a></li>
                        <li  className='block hover:text-secondary'>  <a href="/about">About</a></li>

                    </ul>
                    </div>


                    {/* <div className='space-x-4 hidden md:flex items-center flex '>
                        <a href="/login">
                            <button className='ml-3 px-3 rounded-sm py-2 hover:bg-gray-300 focus:shadow-outline focus:outline-none'>Login</button>
                        </a>
                        <a href="/signup" className='hidden lg:flex items-center hover:text-secondary'>
                            <button className='button'>Sign up</button>
                        </a>
                    </div> */}

                    <div className='md:hidden'>
                        <button onClick={toggleMenu} className='text-white focus:outline-none focus:text-gray-300 text-lg'>
                            {isMenuOpen ? <FaXmark className='w-6 h-6 text-primary' /> : <FaBars className='w-6 h-6 text-primary' />}
                        </button>
                    </div>
                </div>
            </nav>
            
        <div className={`space-y-4 px-4 pt-24 pb-5 bg-secondary text-xl ${isMenuOpen ? "block fixed top-0 right-0 left-0 rounded-t-lg rounded-b-lg bg-opacity-75 backdrop-blur-md" : "hidden"}`}>
            <ul className='list-none font-bold'>

                <li className='list-none block text-white hover:text-gray-300 block hover:text-secondary' >
                            <a href="/">Menu</a>
                        </li>
                <li  className='list-none block text-white hover:text-gray-300 block hover:text-secondary'>  <a href="/upload">Upload</a></li>
                <li  className='list-none block text-white hover:text-gray-300 block hover:text-secondary'>  <a href="/about">About Us</a></li>
            </ul>
        </div>
        </header>
    );
};

export default Navbar;
