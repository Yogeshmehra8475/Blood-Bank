'use client'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    const { isSignedIn } = useUser()
    return (
        <div className='p-5 bg-white border-b shadow-sm'>
            <div className='flex items-center justify-between'>
                <Link href={'/'} className='flex items-center justify-between w-3/5 gap-3'>
                    <Image src={'/Blood.png'} height={50} width={100} alt='logo' />
                    <Image src={'/logo.png'} height={100} width={250} alt='logo text' className='hidden md:block'/>
                </Link>


                {isSignedIn
                    ?
                    <div className='flex items-center gap-3' >
                        <Link href={'/dashboard'}>
                            <button className='btn btn-primary'>Dashboard</button>
                        </Link>
                        <UserButton/>
                    </div>


                    :
                    <SignInButton>
                        <button className='btn btn-primary'>Get Started</button>
                    </SignInButton>
                }
            </div>
        </div>
    )
}

export default Header 