'use client'
import React, { useEffect, useState } from 'react'
import { City, Country, State } from 'country-state-city'
import toast from 'react-hot-toast'
import { db } from '@/config'
import { bloodBankData } from '@/config/schema'
import { and, eq } from 'drizzle-orm'
import { MapPin, Phone, Droplet, Flag, Plus } from 'lucide-react'
import InputDialogBox from './_components/InputDialogBox'

const BloodBankInfo = ({ info }) => {
  return (
    <div className='p-4 transition border-2 border-red-400 rounded-lg shadow-md hover:shadow-lg'>
      <h3 className='mb-3 text-xl font-bold text-red-600'>{info.name}</h3>
      <div className='space-y-2 text-sm'>
        <div className='flex items-center gap-2'>
          <MapPin width={18} height={18} className='text-red-500' />
          <span>{info.address}</span>
        </div>
        <div className='flex items-center gap-2'>
          <Flag width={18} height={18} className='text-blue-500' />
          <span>{info.city}, {info.state}, {info.country}</span>
        </div>
        <div className='flex items-center gap-2'>
          <Phone width={18} height={18} className='text-green-500' />
          <a href={`tel:${info.telephoneNumber}`} className='text-blue-600 hover:underline'>
            {info.telephoneNumber}
          </a>
        </div>
        <div className='flex items-center gap-2'>
          <Droplet width={18} height={18} className='text-red-500' />
          <span className='font-semibold'>Blood Groups: {info.bloodGroups}</span>
        </div>
      </div>
    </div>
  )
}

const BloodBank = () => {
  const [loading, setloading] = useState(false)
  
  {/* Getting country */}
  const [countrycode] = useState("IN");
  const [country] = useState(Country.getCountryByCode("IN"));

  {/* Getting State */}
  const statedata = State.getStatesOfCountry("IN")
  const [statecode, setstatecode] = useState()
  const [state, setState] = useState('')

  {/* Getting City */}
  const citydata = City.getCitiesOfState(countrycode, statecode)
  const [city, setcity] = useState('')

  {/* Setting variable for blood bank data */}
  const [bloodBankInfo, setBloodBankInfo] = useState()

  {/* Get total blood banks */}
  const [totalBanks, setTotalBanks] = useState(0)

  useEffect(() => {
    getAllBanks()
  }, [])

  const getAllBanks = async () => {
    try {
      const result = await db.select().from(bloodBankData)
      setTotalBanks(result.length)
    } catch (error) {
      console.error('Error fetching blood banks:', error)
    }
  }

  {/* Submitting the search details */}
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!country || !state || !city) {
      toast.error("Fill all credentials!")
    } else {
      setloading(true)
      try {
        const result = await db.select().from(bloodBankData)
          .where(and(
            eq(bloodBankData.country, country.name),
            eq(bloodBankData.state, state.name),
            eq(bloodBankData.city, city)
          ))
        if (result) {
          setBloodBankInfo(result)
          setloading(false)
        }
      } catch (error) {
        toast.error('Error searching blood banks')
        setloading(false)
      }
    }
  }

  return (
    <div data-theme='' className='p-10 pb-32'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='font-serif text-2xl font-bold'>Find Blood Banks</h2>
        <div className='flex items-center gap-2'>
          <button className='gap-2 rounded-full btn btn-sm btn-success' onClick={() => document.getElementById('blood_bank_dialog').showModal()}>
            <Plus width={18} height={18} />
            <span className='hidden md:block'>Add Blood Bank</span>
          </button>
          <div className='text-black rounded-full btn-error btn btn-sm'>
            <Droplet className='w-4 font-bold' />
            <span className='hidden md:block'>Total Banks</span>: <span className='text-xl font-bold'>{totalBanks}</span>
          </div>
        </div>
      </div>

      <InputDialogBox onBankAdded={getAllBanks} />

      <form
        onSubmit={handleSubmit}
        className='w-full p-4 mx-auto my-4 border-4 rounded-lg shadow-md'>
        <div className='grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3'>
        

          {/* State */}
          <select
            onChange={(v) => {
              setstatecode(v.target.value)
              setState(State.getStateByCodeAndCountry((v.target.value), countrycode))
            }}
            className="flex w-full max-w-xs mx-auto my-5 select select-error">
            <option disabled selected>Enter State</option>
            {statedata.map((option, idx) => (
              <option key={idx} value={option.isoCode}>{option.name}</option>
            ))}
          </select>

          {/* City */}
          <select
            onChange={(v) => setcity(v.target.value)}
            className="flex w-full max-w-xs mx-auto my-5 select select-error">
            <option disabled selected>Enter City</option>
            {citydata.map((option, idx) => (
              <option key={idx}>{option.name}</option>
            ))}
          </select>
        </div>

        <button
          disabled={loading}
          className='w-full my-5 rounded-lg btn btn-primary'
          type='submit'>
          {loading && <span className='loading loading-bars'></span>}
          {!loading && <span>Search Blood Banks</span>}
        </button>
      </form>

      {/* Displaying Data of blood banks */}
      {bloodBankInfo &&
        <div className='w-full p-4 mx-auto my-4 border-4 rounded-lg shadow-md'>
          <h2 className='mb-4 font-serif text-2xl font-bold'>
            Blood Banks in {city}, {state.name}
          </h2>
          {bloodBankInfo.length > 0 ?
            <div className='grid grid-cols-1 gap-4 my-3 md:grid-cols-2 lg:grid-cols-3'>
              {bloodBankInfo.map((info, idx) => (
                <BloodBankInfo key={idx} info={info} />
              ))}
            </div>
            :
            <h2 className='text-xl font-bold text-center text-red-700'>No Blood Banks registered in this city</h2>
          }
        </div>
      }
    </div>
  )
}

export default BloodBank