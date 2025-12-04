import { CalendarHeart, Droplet, Flag, MapPin, MapPinned, Phone } from 'lucide-react'
import React from 'react'

const Userinfo = ({ info }) => {
    return (
        <div className='p-4 border shadow-md rounded-lg my-3'>
            <h2 className='font-bold text-lg font-serif border-b'>{info.name}</h2>
            <div className='grid sm:grid-cols-2 sm:gap-2'>
                <div>
                    <span className='flex gap-2 items-center my-2 p-2 text-xl font-bold'><Phone /> {info.mobile}</span>
                    <span className='flex gap-2 items-center my-2 p-2 text-xl'><CalendarHeart />{info.age}</span>
                    <span className='flex gap-2 items-center my-2 p-2 text-2xl font-bold'><Droplet /> {info.bloodgroup}</span>
                </div>
                <div>
                    <span className='flex gap-2 items-center my-2 p-2 text-xl'><Flag /> {info.country}</span>
                    <span className='flex gap-2 items-center my-2 p-2 text-xl'><MapPinned /> {info.state}</span>
                    <span className='flex gap-2 items-center my-2 p-2 text-xl'><MapPin /> {info.city}</span>
                </div>
            </div>
        </div>
    )
}

export default Userinfo