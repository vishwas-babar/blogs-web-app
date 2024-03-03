import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, TopNav } from '../components/index.js'


function Layout() {
  return (
    <>
        <TopNav />
            <Outlet />
        <Footer />
    </>
  )
}

export default Layout