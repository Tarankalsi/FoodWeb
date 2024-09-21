// Navbar.js
import { useState } from 'react';
import SearchBar from './general/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {

    const [showSearchBar, setShowSearchBar] = useState(false)
    return (
        <div>
            <nav className='bg-white shadow-md sticky top-0 z-50 w-full'>
                <div className='w-full px-4 py-6 flex items-center justify-between'>
                    {/* Brand Logo */}
                    <div className='text-4xl font-extrabold text-indigo-600 ml-4'>
                        Food<span className='text-gray-800'>Web</span>
                    </div>

                    {/* Search and Cart */}
                    <div className='flex items-center gap-4 mr-4 '>
                        <div className='hidden md:flex w-full'>
                            <SearchBar />
                        </div>

                        <div 
                        className='md:hidden'
                        onClick={() => { setShowSearchBar(!showSearchBar) }} >
                            <FontAwesomeIcon icon={faSearch} className={`text-xl text-gray-800 hover:text-indigo-600 cursor-pointer transition duration-200 ease-in-out `} />
                        </div>

                        {/* Cart Icon */}
                        <div className='relative'>
                            <FontAwesomeIcon
                                icon={faCartShopping}
                                className='text-2xl text-gray-800 hover:text-indigo-600 cursor-pointer transition duration-200 ease-in-out'
                            />
                            {/* Badge for cart items */}
                            <span className='absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5'>2</span>
                        </div>
                    </div>
                </div>
            </nav>
            {showSearchBar &&
                <div className='flex md:hidden justify-center my-5'>
                    <SearchBar />
                </div>
            }

        </div>

    );
}
