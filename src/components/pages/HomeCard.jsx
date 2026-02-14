
import React from 'react'
import Card from './Card'
import { useLocation } from "react-router-dom";
import Navbar from '../Navbar';

export default function HomeCard() {
   const location = useLocation();
  const role = location.state?.role;
  return (
    <div>

  
       <div dir="rtl" className=" min-h-screen bg-gray-100 flex flex-col items-center ">
      {/* الصف العلوي */}
      <div className="mt-15 flex flex-wrap justify-center gap-8">
        <Card title="المرحله الاولى" />
        <Card title="المرحله الثانيه" />
        <Card title="المرحله الثالثه" />
        <Card title="المرحله الرابعه" />
      </div>
  
      </div>

    </div>
  
  )
}
