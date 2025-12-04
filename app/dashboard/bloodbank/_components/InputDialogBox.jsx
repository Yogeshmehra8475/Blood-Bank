'use client'
import React, { useState } from 'react'
import { City, Country, State } from 'country-state-city'
import toast from 'react-hot-toast'
import { db } from '@/config'
import { bloodBankData } from '@/config/schema'
import { MapPin, Phone, Droplet, Flag, SquareUserRound, X } from 'lucide-react'

const InputDialogBox = ({ onBankAdded }) => {
  const [loading, setloading] = useState(false)

  {/* Getting country */}
  const countrydata = Country.getAllCountries()
  const [countrycode, setCountrycode] = useState()
  const [country, setCountry] = useState('')

  {/* Getting State */}
  const statedata = State.getStatesOfCountry(countrycode)
  const [statecode, setstatecode] = useState()
  const [state, setState] = useState('')

  {/* Getting City */}
  const citydata = City.getCitiesOfState(countrycode, statecode)
  const [city, setcity] = useState('')

  {/* Form states */}
  const [name, setname] = useState('')
  const [address, setaddress] = useState('')
  const [bloodGroups, setbloodGroups] = useState('')
  const [telephoneNumber, settelephoneNumber] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !address || !country || !state || !city || !bloodGroups || !telephoneNumber) {
      toast.error("Fill all credentials!")
      return
    }

    setloading(true)
    try {
      const result = await db.insert(bloodBankData).values({
        name: name,
        address: address,
        country: country.name,
        state: state.name,
        city: city,
        bloodGroups: bloodGroups,
        telephoneNumber: telephoneNumber,
      })

      if (result) {
        toast.success("Blood Bank Added Successfully!")
        {/* Reset form */}
        setname('')
        setaddress('')
        setCountrycode('')
        setCountry('')
        setstatecode('')
        setState('')
        setcity('')
        setbloodGroups('')
        settelephoneNumber('')
        
        {/* Close dialog */}
        document.getElementById('blood_bank_dialog').close()
        
        {/* Refresh blood banks list */}
        onBankAdded && onBankAdded()
      }
    } catch (error) {
      console.error('Error adding blood bank:', error)
      toast.error('Error adding blood bank')
    } finally {
      setloading(false)
    }
  }

  return (
    <dialog id="blood_bank_dialog" className="modal">
      <div className="modal-box w-11/12 max-w-4xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg font-serif">Add Blood Bank</h3>
          <button
            onClick={() => document.getElementById('blood_bank_dialog').close()}
            className="btn btn-sm btn-ghost"
          >
            <X width={20} height={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Blood Bank Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <SquareUserRound width={20} height={20} />
                  Blood Bank Name
                </span>
              </div>
              <input
                type="text"
                placeholder="Enter Blood Bank Name"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </label>

            {/* Address */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <MapPin width={20} height={20} />
                  Address
                </span>
              </div>
              <input
                type="text"
                placeholder="Enter Address"
                className="input input-bordered w-full"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
              />
            </label>
          </div>

          {/* Telephone Number */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold flex items-center gap-2">
                <Phone width={20} height={20} />
                Telephone Number
              </span>
            </div>
            <input
              type="tel"
              placeholder="Enter Telephone Number"
              className="input input-bordered w-full"
              value={telephoneNumber}
              onChange={(e) => settelephoneNumber(e.target.value)}
            />
          </label>

          {/* Country */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <Flag width={20} height={20} />
                  Country
                </span>
              </div>
              <select
                onChange={(e) => {
                  setCountrycode(e.target.value)
                  setCountry(Country.getCountryByCode(e.target.value))
                }}
                className="select select-bordered w-full"
              >
                <option disabled selected>Select Country</option>
                {countrydata.map((option, idx) => (
                  <option key={idx} value={option.isoCode}>{option.name}</option>
                ))}
              </select>
            </label>

            {/* State */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold">State</span>
              </div>
              <select
                onChange={(v) => {
                  setstatecode(v.target.value)
                  setState(State.getStateByCodeAndCountry((v.target.value), countrycode))
                }}
                className="select select-bordered w-full"
              >
                <option disabled selected>Select State</option>
                {statedata.map((option, idx) => (
                  <option key={idx} value={option.isoCode}>{option.name}</option>
                ))}
              </select>
            </label>

            {/* City */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold">City</span>
              </div>
              <select
                onChange={(v) => setcity(v.target.value)}
                className="select select-bordered w-full"
              >
                <option disabled selected>Select City</option>
                {citydata.map((option, idx) => (
                  <option key={idx}>{option.name}</option>
                ))}
              </select>
            </label>
          </div>

          {/* Blood Groups */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold flex items-center gap-2">
                <Droplet width={20} height={20} className="text-red-500" />
                Available Blood Groups (comma separated)
              </span>
            </div>
            <input
              type="text"
              placeholder="e.g., O+, O-, A+, A-, B+, B-, AB+, AB-"
              className="input input-bordered w-full"
              value={bloodGroups}
              onChange={(e) => setbloodGroups(e.target.value)}
            />
          </label>

          {/* Submit and Cancel Buttons */}
          <div className="modal-action">
            <button
              type="button"
              onClick={() => document.getElementById('blood_bank_dialog').close()}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading && <span className="loading loading-bars"></span>}
              {!loading && "Add Blood Bank"}
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

export default InputDialogBox
