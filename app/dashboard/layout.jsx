'use client'
import { SignedIn } from '@clerk/nextjs'
import React from 'react'
import Sidenav from './_components/Sidenav'
import Bottomnav from './_components/BottonNav'

const DashboardLayout = ({ children }) => {
    return (
        <SignedIn>
            <div className='fixed md:w-64 hidden md:block'>
                <Sidenav />
            </div>
            <div className='md:ml-64'>
                {children}
            </div>
            <div className='md:hidden w-full fixed bottom-0 left-0 right-0'>
                <Bottomnav />
            </div>
        </SignedIn>
    )
}

export default DashboardLayout