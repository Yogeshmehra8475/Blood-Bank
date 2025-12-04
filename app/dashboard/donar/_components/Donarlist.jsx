
import { db } from '@/config';
import { userdata } from '@/config/schema';
import { and, eq, ne } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import Userinfo from '../../_components/Userinfo';

const Donarlist = ({ me }) => {
    console.log(me);

    useEffect(() => {
        me && getDonar()
    }, [me])

    const [Donars, setDonars] = useState([]);

    const getDonar = async () => {
        const result = await db.select().from(userdata)
            .where(and(eq(userdata.country, me.country), eq(userdata.state, me.state), eq(userdata.city, me.city), eq(userdata.bloodgroup, me.bloodgroup)))
        setDonars(result)

    }
    return (
        <div className={`${Donars.length > 0 ? 'grid grid-cols-1 xl:grid-cols-2 my-3 gap-4' : 'flex items-center justify-center'} `}>
            {Donars.length > 0 ?
                Donars.map((info, idx) => (
                    <Userinfo key={idx} info={info} />
                ))
                :
                <h2 className='text-xl text-center text-red-700 font-bold'>No Donars registered in this city</h2>
            }
        </div>
    )
}

export default Donarlist