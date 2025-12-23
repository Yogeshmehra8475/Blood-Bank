'use client'
import React, { useState } from 'react'
import { City, Country, State } from 'country-state-city'
import toast from 'react-hot-toast'
import { db } from '@/config'
import { bloodBankData } from '@/config/schema'
import { MapPin, Phone, Droplet, Flag, SquareUserRound, X } from 'lucide-react'

const InputDialogBox = ({ onBankAdded }) => {
  const [loading, setloading] = useState(false)

  // Fixed country to India
  const country = Country.getCountryByCode("IN")
  
  {/* Getting State */}
  const statedata = State.getStatesOfCountry("IN")
  const [statecode, setstatecode] = useState()
  const [state, setState] = useState('')

  {/* Getting City */}
  const citydata = City.getCitiesOfState("IN", statecode)
  const [city, setcity] = useState('')

  {/* Form states */}
  const [name, setname] = useState('')
  const [address, setaddress] = useState('')
  const [bloodGroups, setbloodGroups] = useState('')
  const [telephoneNumber, settelephoneNumber] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !address || !state || !city || !bloodGroups || !telephoneNumber) {
      toast.error("Fill all credentials!")
      return
    }

    setloading(true);
    const bloodGroupArray = bloodGroups.split(',');
    try {
      const result = await db.insert(bloodBankData).values({
        name: name,
        address: address,
        country: country.name,
        state: state.name,
        city: city,
        bloodGroups: bloodGroupArray,
        telephoneNumber: telephoneNumber,
      });

      if (result) {
        toast.success("Blood Bank Added Successfully!")
        {/* Reset form */}
        setname('')
        setaddress('')
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
      <div className="w-11/12 max-w-4xl modal-box">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg font-bold">Add Blood Bank</h3>
          <button
            onClick={() => document.getElementById('blood_bank_dialog').close()}
            className="btn btn-sm btn-ghost"
          >
            <X width={20} height={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Blood Bank Name */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="w-full form-control">
              <div className="label">
                <span className="flex items-center gap-2 font-semibold label-text">
                  <SquareUserRound width={20} height={20} />
                  Blood Bank Name
                </span>
              </div>
              <input
                type="text"
                placeholder="Enter Blood Bank Name"
                className="w-full input input-bordered"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </label>

            {/* Address */}
            <label className="w-full form-control">
              <div className="label">
                <span className="flex items-center gap-2 font-semibold label-text">
                  <MapPin width={20} height={20} />
                  Address
                </span>
              </div>
              <input
                type="text"
                placeholder="Enter Address"
                className="w-full input input-bordered"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
              />
            </label>
          </div>

          {/* Telephone Number */}
          <label className="w-full form-control">
            <div className="label">
              <span className="flex items-center gap-2 font-semibold label-text">
                <Phone width={20} height={20} />
                Telephone Number
              </span>
            </div>
            <input
              type="tel"
              placeholder="Enter Telephone Number"
              className="w-full input input-bordered"
              value={telephoneNumber}
              onChange={(e) => settelephoneNumber(e.target.value)}
            />
          </label>

          {/* Country */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <label className="w-full form-control">
              <div className="label">
                <span className="flex items-center gap-2 font-semibold label-text">
                  <Flag width={20} height={20} />
                  Country
                </span>
              </div>
              <select
                disabled
                className="w-full select select-bordered"
                value="IN"
              >
                <option value="IN">India</option>
              </select>
            </label>

            {/* State */}
            <label className="w-full form-control">
              <div className="label">
                <span className="font-semibold label-text">State</span>
              </div>
              <select
                onChange={(v) => {
                  setstatecode(v.target.value)
                  setState(State.getStateByCodeAndCountry((v.target.value), "IN"))
                }}
                className="w-full select select-bordered"
              >
                <option disabled selected>Select State</option>
                {statedata.map((option, idx) => (
                  <option key={idx} value={option.isoCode}>{option.name}</option>
                ))}
              </select>
            </label>

            {/* City */}
            <label className="w-full form-control">
              <div className="label">
                <span className="font-semibold label-text">City</span>
              </div>
              <select
                onChange={(v) => setcity(v.target.value)}
                className="w-full select select-bordered"
              >
                <option disabled selected>Select City</option>
                {citydata.map((option, idx) => (
                  <option key={idx}>{option.name}</option>
                ))}
              </select>
            </label>
          </div>

          {/* Blood Groups */}
          <label className="w-full form-control">
            <div className="label">
              <span className="flex items-center gap-2 font-semibold label-text">
                <Droplet width={20} height={20} className="text-red-500" />
                Available Blood Groups (comma separated)
              </span>
            </div>
            <input
              type="text"
              placeholder="e.g., O+, O-, A+, A-, B+, B-, AB+, AB-"
              className="w-full input input-bordered"
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
