import React from "react";
import Card from "./Card";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import { getAllStages } from "../../service/stages";
import { useQuery } from "@tanstack/react-query";

export default function HomeCard() {
  const location = useLocation();
  const role = location.state?.role;

  const { data } = useQuery({
    queryKey: ["all-stags"],
    queryFn: getAllStages,
  });
  return (
    <div>
      <div
        dir="rtl"
        className=" min-h-screen bg-gray-100 flex flex-col items-center "
      >
        {/* الصف العلوي */}
        <div className="mt-15 flex flex-wrap justify-center gap-8">
          {data?.map((item) => (
            <Card id={item.id} title={item.name} />
          ))}
        </div>
      </div>
    </div>
  );
}
