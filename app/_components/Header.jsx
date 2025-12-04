'use client'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    const { isSignedIn } = useUser()
    return (
        <div className='bg-white p-5 border-b shadow-sm sticky top-0'>
            <div className='flex items-center justify-between'>
                <Link href={'/'}>
                    <Image src={'/Blood.png'} height={50} width={100} alt='logo' />
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