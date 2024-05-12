import React from 'react'
import Header from '../component/Header'
import { Outlet } from 'react-router'

function Layout() {
  return (
    <div className='p-4 px-8 flex flex-col min-h-screen'>
        <Header/>
        <Outlet/>
    </div>
  )
}

export default Layout