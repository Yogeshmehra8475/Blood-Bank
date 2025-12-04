"use client";
import BloodGroup from "@/app/_data/BloodGroup";
import { db } from "@/config";
import { userdata } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { City, Country, State } from "country-state-city";
import { and, eq } from "drizzle-orm";
import {
  CalendarClock,
  CalendarHeart,
  Droplet,
  Flag,
  Mail,
  MapPin,
  MapPinned,
  Phone,
  SquareUserRound,
} from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Update = () => {
  const { user } = useUser();
  const [userInfo, setUserinfo] = useState([]);

  {
    /* Getting the users */
  }
  useEffect(() => {
    user && getUserData();
  }, [user]);

  const getUserData = async () => {
    const result = await db
      .select()
      .from(userdata)
      .where(eq(userdata.usermail, user?.primaryEmailAddress?.emailAddress));
    setUserinfo(result[0]);
  };

  {
    /* Country Selection */
  }
  const countrydata = Country.getAllCountries();
  const [UserCountryCode, setUserCountryCode] = useState(userInfo?.country);
  const [UserCountry, setUserCountry] = useState("");

  {
    /* State selection */
  }
  const statedata = State.getStatesOfCountry(UserCountryCode);
  const [UserState, setUserState] = useState(userInfo?.state);
  const [UserStateCode, setUserStateCode] = useState("");

  {
    /* City Selection */
  }
  const citydata = City.getCitiesOfState(UserCountryCode, UserStateCode);
  const [UserCity, setUserCity] = useState();

  {
    /* Saving the information of the user if not created account or updating the data of the previous user */
  }

  const [name, setname] = useState();
  const [dob, setdob] = useState(userInfo?.birthdate);
  const [mobileNumber, setmobileNumber] = useState();
  const [bloodgrp, setbloodgrp] = useState();
  const [loading, setloading] = useState(false);

  let age = 0;
  const today = moment().format("yyyy");
  console.log(today);

  if (userInfo && userInfo.birthdate) {
    age = Number(today) - Number(userInfo.birthdate.slice(0, 4));
  } else {
    if (dob) {
      age = Number(today) - Number(dob.slice(0, 4));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    {
      /* Inserting the Data */
    }
    if (UserCity && UserCountry && UserState) {
      setloading(true);

      const userinDB = await db
        .select()
        .from(userdata)
        .where(eq(userdata.usermail, user?.primaryEmailAddress?.emailAddress));

      if (!userinDB[0]) {
        const result = await db.insert(userdata).values({
          name: name,
          usermail: user?.primaryEmailAddress?.emailAddress,
          birthdate: dob,
          mobile: mobileNumber,
          bloodgroup: bloodgrp,
          country: UserCountry.name,
          state: UserState.name,
          city: UserCity,
          age: age,
        });
        if (result) {
          setloading(false);
          toast.success("User Created Successfull");
          reloadData();
        }
      } else {
        {
          /* Updating the Data */
        }
        const result = await db
          .update(userdata)
          .set({
            name: name,
            usermail: user?.primaryEmailAddress?.emailAddress,
            birthdate: dob,
            mobile: mobileNumber,
            bloodgroup: bloodgrp,
            country: UserCountry.name,
            state: UserState.name,
            city: UserCity,
            age: age,
          })
          .where(
            eq(userdata.usermail, user?.primaryEmailAddress?.emailAddress)
          );

        if (result) {
          setloading(false);
          toast.success("Updated Successfull");
          reloadData();
        }
      }
    } else {
      toast.error("Fill all credentilas...");
    }
  };

  const reloadData = () => {
    getUserData();
  };

  return (
    <div className="flex flex-col p-10 pb-32 md" data-theme="">
      <h2 className="font-serif text-2xl font-bold">Update your Data</h2>
      {userInfo && (
        <p className="font-mono text-sm font-semibold text-red-600">
          If updating your data, reselect Country, State and City also
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full p-4 mx-auto my-4 border-4 rounded-lg shadow-md"
      >
        {/* UserName */}
        <div className="grid grid-cols-1 my-5 md:grid-cols-2">
          <label className="flex items-center grid-cols-2 gap-4 my-2 md:grid md:justify-center">
            <span className="flex justify-end">
              <SquareUserRound width={40} height={40} />
            </span>
            <span className="text-lg font-bold">Name</span>
          </label>
          <label className="w-full">
            <input
              onChange={(e) => setname(e.target.value)}
              type="text"
              placeholder="Enter Your Name"
              className="w-full input input-bordered"
              defaultValue={userInfo && userInfo.name}
            />
          </label>
        </div>

        {/* Date of Birth */}
        <div className="grid grid-cols-1 my-5 md:grid-cols-2">
          <label className="flex items-center grid-cols-2 gap-4 my-2 md:grid md:justify-center">
            <span className="flex md:justify-end">
              <CalendarHeart width={40} height={40} />
            </span>
            <span className="text-lg font-bold">Date of Birth</span>
          </label>
          <label className="w-full">
            <input
              onChange={(e) => setdob(e.target.value)}
              type="date"
              placeholder="Enter age"
              className="w-full input input-bordered"
              defaultValue={userInfo && userInfo.birthdate}
            />
          </label>
        </div>

        {/* age */}
        {userInfo && (
          <div className="grid grid-cols-1 my-5 md:grid-cols-2">
            <label className="flex items-center grid-cols-2 gap-4 my-2 md:grid md:justify-center">
              <span className="flex justify-end">
                <CalendarClock width={40} height={40} />
              </span>
              <span className="text-lg font-bold">Age</span>
            </label>
            <label className="w-full">
              <input
                type="number"
                placeholder="Type here"
                className="w-full input input-bordered"
                defaultValue={
                  userInfo && userInfo.age != 0 ? userInfo.age : age
                }
                disabled
              />
            </label>
          </div>
        )}

        {/* Email */}
        <div className="grid grid-cols-1 my-5 md:grid-cols-2">
          <label className="flex items-center grid-cols-2 gap-4 my-2 md:grid md:justify-center">
            <span className="flex justify-end">
              <Mail width={40} height={40} />
            </span>
            <span className="text-lg font-bold">E-mail</span>
          </label>
          <label className="w-full">
            <input
              required
              type="text"
              placeholder="Type here"
              className="w-full input input-bordered"
              defaultValue={
                userInfo
                  ? userInfo.usermail
                  : user?.primaryEmailAddress?.emailAddress
              }
              disabled
            />
          </label>
        </div>

        {/* Contact Number */}
        <div className="grid grid-cols-1 my-5 md:grid-cols-2">
          <label className="flex items-center grid-cols-2 gap-4 my-2 md:grid md:justify-center">
            <span className="flex justify-end">
              <Phone width={40} height={40} />
            </span>
            <span className="text-lg font-bold">Contact Number</span>
          </label>
          <label className="w-full">
            <input
              required
              onChange={(e) => setmobileNumber(e.target.value)}
              type="tel"
              placeholder="XXXXXXXXXX"
              className="w-full input input-bordered"
              defaultValue={
                userInfo
                  ? userInfo.mobile
                  : user?.primaryPhoneNumber?.phoneNumber
              }
            />
          </label>
        </div>

        {/* Blood Group */}
        <div className="grid grid-cols-1 my-5 md:grid-cols-2">
          <label className="flex items-center grid-cols-2 gap-4 my-2 md:grid md:justify-center">
            <span className="flex justify-end">
              <Droplet width={40} height={40} className="text-red-500" />
            </span>
            <span className="text-lg font-bold">Blood Group</span>
          </label>
          <select
            onChange={(e) => setbloodgrp(e.target.value)}
            className="w-full select select-bordered"
          >
            <option disabled selected>
              {userInfo ? userInfo.bloodgroup : "Select Blood Group"}
            </option>
            {BloodGroup.map((option, idx) => (
              <option key={idx}>{option}</option>
            ))}
          </select>
        </div>

        {/* Country */}
        <div className="grid grid-cols-1 my-5 md:grid-cols-2">
          <label className="flex items-center grid-cols-2 gap-4 my-2 md:grid md:justify-center">
            <span className="flex justify-end">
              <Flag width={40} height={40} />
            </span>
            <span className="text-lg font-bold">Country</span>
          </label>
          <label className="w-full">
            <select
              onChange={(e) => {
                setUserCountryCode(e.target.value);
                setUserCountry(Country.getCountryByCode(e.target.value));
              }}
              className="w-full select select-bordered"
            >
              <option disabled selected>
                {userInfo ? userInfo.country : "Select Country"}{" "}
              </option>
              {countrydata.map((option, idx) => (
                <option value={option.isoCode} key={idx}>
                  {option.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* State */}
        <div className="grid grid-cols-1 my-5 md:grid-cols-2">
          <label className="flex items-center grid-cols-2 gap-4 my-2 md:grid md:justify-center">
            <span className="flex justify-end">
              <MapPinned width={40} height={40} />
            </span>
            <span className="text-lg font-bold">State</span>
          </label>
          <label className="w-full">
            <select
              onChange={(e) => {
                setUserStateCode(e.target.value);
                setUserState(
                  State.getStateByCodeAndCountry(e.target.value, "IN")
                );
              }}
              className="w-full select select-bordered"
            >
              <option disabled selected>
                {userInfo ? userInfo.state : "Select State"}
              </option>
              {statedata.map((option, idx) => (
                <option value={option.isoCode} key={idx}>
                  {option.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* City */}
        <div className="grid grid-cols-1 my-5 md:grid-cols-2">
          <label className="flex items-center grid-cols-2 gap-4 my-2 md:grid md:justify-center">
            <span className="flex justify-end">
              <MapPin width={40} height={40} />
            </span>
            <span className="text-lg font-bold">City</span>
          </label>
          <label className="w-full">
            <select
              onChange={(v) => setUserCity(v.target.value)}
              className="w-full select select-bordered"
            >
              <option disabled selected>
                {userInfo ? userInfo.city : "Select City"}
              </option>
              {citydata.map((option, idx) => (
                <option value={option.name} key={idx}>
                  {option.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Submit button */}
        <div className="flex items-center justify-center">
          <button className="btn btn-primary" type="submit">
            {loading && <span className="loading loading-bars"></span>}
            {!loading && "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
