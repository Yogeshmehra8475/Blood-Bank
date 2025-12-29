import { Droplet, Hospital, UserRound, UserRoundCog } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const Sidenav = () => {
    const path = usePathname();
    useEffect(()=>{

    },[path])
        const menuList = [
        {
            id: '1',
            name: "Want Blood",
            icon: Droplet,
            path: '/dashboard'
        },
        {
            id: '2',
            name: "Donar",
            icon: UserRound,
            path: '/dashboard/donar'
        },
        {
            id: '3',
            name: "Blood Bank",
            icon: Hospital,
            path: '/dashboard/bloodbank'
        },
        {
            id: '4',
            name: "Update",
            icon: UserRoundCog,
            path: '/dashboard/update'
        },
    ]
    return (
        <div data-theme='' className='min-h-screen border shadow-md'>
            <div className='p-4'>
                {menuList.map((menu, idx) => (
                    <Link href={menu.path} key={idx} className={`flex items-center gap-3 p-4 my-5 hover:bg-primary hover:text-white rounded-lg ${(path == menu.path) ? 'bg-primary text-white' : ''}`}>
                        <menu.icon /> 
                        {menu.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Sidenav