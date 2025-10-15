"use client";

import { useEffect, useState } from "react";
import Button from "../components/Button";
import AdvocateTable from "../components/AdvocateTable";

type Advocate = {
  id?: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number | string;
};

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || "";
    setSearchTerm(value);

    console.log("filtering advocates...");
    const filtered = advocates.filter((advocate) => {
      const specialtiesMatch = advocate.specialties
        ? advocate.specialties.some((s) => s.toLowerCase().includes(value.toLowerCase()))
        : false;

      return (
        advocate.firstName.toLowerCase().includes(value.toLowerCase()) ||
        advocate.lastName.toLowerCase().includes(value.toLowerCase()) ||
        advocate.city.toLowerCase().includes(value.toLowerCase()) ||
        advocate.degree.toLowerCase().includes(value.toLowerCase()) ||
        specialtiesMatch ||
        String(advocate.yearsOfExperience).includes(value)
      );
    });

    setFilteredAdvocates(filtered);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
    setSearchTerm("");
  };

  return (
    <main className="m-6">
      <h1 className="text-2xl font-bold">Solace Advocates</h1>

      <div className="mt-6 space-y-3">
        <div>
          <p className="font-semibold">Search</p>
          <p className="text-sm text-gray-600">
          Searching for: <span id="search-term" className="font-medium">{searchTerm}</span>
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <input
            className="border border-gray-300 rounded px-3 py-2 flex-1"
              onChange={onChange}
              aria-label="search"
              value={searchTerm}
            />
          <Button variant="secondary" onClick={onClick}>
            Reset Search
          </Button>
        </div>
      </div>

      <AdvocateTable advocates={filteredAdvocates} />
    </main>
  );
}
