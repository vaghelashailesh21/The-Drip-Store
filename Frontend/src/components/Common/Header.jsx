import React from 'react'

import Navbar from './Navbar'

const Header = () => {
  return (
    <header className='border-b sticky top-0 z-50 w-full bg-white border-gray-200 '>
       
        <Navbar/>
        {/* Cart Drawer */}
    </header>
  )
}

export default Header