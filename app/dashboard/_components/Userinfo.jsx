import {
  CalendarHeart,
  Droplet,
  Flag,
  MapPin,
  MapPinned,
  Phone,
} from "lucide-react";
import Image from "next/image";
import React from "react";

const Userinfo = ({ info }) => {
  const handleSendWhatsAppMessage = () => {
    const phoneNumber = info.mobile;
    const message = `Hello ${info.name}, I found your contact on the रक्त Blood Donation Platform. I would like to get in touch with you regarding blood donation. The blood group is 
        ${info.bloodgroup}. Please let me know how we can proceed. Thank you!`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="p-4 my-3 border rounded-lg shadow-md">
      <h2 className="font-serif text-lg font-bold border-b">{info.name}</h2>
      <div className="grid sm:grid-cols-2 sm:gap-2">
        <div>
          <span
            onClick={handleSendWhatsAppMessage}
            className="flex items-center gap-2 p-2 my-2 text-xl font-bold"
          >
            <Image src={"/Whatsapp.svg"} width={10} height={10} className="size-9"/>
            {info.mobile}
          </span>
          <span className="flex items-center gap-2 p-2 my-2 text-xl">
            <CalendarHeart />
            {info.age}
          </span>
          <span className="flex items-center gap-2 p-2 my-2 text-2xl font-bold">
            <Droplet /> {info.bloodgroup}
          </span>
        </div>
        <div>
          <span className="flex items-center gap-2 p-2 my-2 text-xl">
            <Flag /> {info.country}
          </span>
          <span className="flex items-center gap-2 p-2 my-2 text-xl">
            <MapPinned /> {info.state}
          </span>
          <span className="flex items-center gap-2 p-2 my-2 text-xl">
            <MapPin /> {info.city}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Userinfo;
