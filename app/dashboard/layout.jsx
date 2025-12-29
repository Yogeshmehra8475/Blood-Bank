'use client'
import { SignedIn } from '@clerk/nextjs'
import React from 'react'
import Sidenav from './_components/Sidenav'
import Bottomnav from './_components/BottonNav'

const DashboardLayout = ({ children }) => {
    return (
        <SignedIn>
            <div className='fixed hidden md:w-64 md:block'>
                <Sidenav />
            </div>
            <div className='md:ml-64'>
                {children}
            </div>
            <div className='fixed bottom-0 left-0 right-0 w-full md:hidden'>
                <Bottomnav />
            </div>
        </SignedIn>
    )
}

export default DashboardLayout