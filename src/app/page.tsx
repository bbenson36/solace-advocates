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

    const lowerValue = value.toLowerCase();

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      const specialtiesMatch = advocate.specialties
        ? advocate.specialties.some((s) => s.toLowerCase().includes(lowerValue))
        : false;

      return (
        advocate.firstName.toLowerCase().includes(lowerValue) ||
        advocate.lastName.toLowerCase().includes(lowerValue) ||
        advocate.city.toLowerCase().includes(lowerValue) ||
        advocate.degree.toLowerCase().includes(lowerValue) ||
        specialtiesMatch ||
        String(advocate.yearsOfExperience).includes(value)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
    setSearchTerm("");
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-primary-500" />
            <h1 className="text-xl font-semibold">Solace Advocates</h1>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="md:flex md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Find an Advocate</h2>
              <p className="mt-1 text-slate-600">Search by name, city, degree or specialty.</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="mb-4">
                <div className="font-semibold">Search</div>
                { searchTerm && (<div className="text-sm text-slate-500">Searching for: <span id="search-term" className="font-medium">{searchTerm || '—'}</span></div>)}
              </div>
              <div className="flex gap-2 items-center">
                <input
                  className="border border-slate-200 rounded-lg px-3 py-2 flex-1 focus:ring-2 focus:ring-primary-200"
                  onChange={onChange}
                  aria-label="search"
                  value={searchTerm}
                />
                <Button variant="secondary" onClick={onClick}>Reset</Button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <AdvocateTable advocates={filteredAdvocates} />
          </div>
        </div>
      </section>
    </main>
  )
}
