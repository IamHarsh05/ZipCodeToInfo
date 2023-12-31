import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function Form({ onSubmit }) {
  const [postalcode, setPostalcode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(postalcode);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center basis-1/4 items-center mx-4 py-4 px-8 h-40">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row justify-center"
      >
        <div className="flex flex-row justify-center items-center bg-white px-4 py-2 rounded-full">
          <button type="submit">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
          <input
            type="text"
            id="postalcode"
            className="bg-transparent outline-none border-b-[3px] mx-2 px-4"
            placeholder="Enter Postal Code"
            value={postalcode}
            onChange={(e) => setPostalcode(e.target.value)}
          />
        </div>
        <div className="mx-2 my-2 flex justify-center">
          <button
            type="submit"
            className="py-2 px-2 rounded bg-white text-base"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
