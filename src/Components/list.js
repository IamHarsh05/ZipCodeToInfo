import React, { useEffect, useState } from "react";

export default function List({ postalCode, setPostalCode }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [error, setError] = useState(null);

  function getPlace() {
    setLoading(true);
    setData("");
    fetch(`https://api.zippopotam.us/in/${postalCode}`, {
      method: "GET",
    })
      .then(async (res) => {
        const datas = await res.json();
        setData(datas);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error while Loading");
        setLoading(false);
        console.log(err);
      });
  }

  useEffect(() => {
    if (!postalCode) return;
    getPlace();
  }, [postalCode]);

  const handleClear = (e) => {
    e.preventDefault();
    setData("");
    setPostalCode("");
  };

  return (
    <div className="flex justify-center md:basis-3/4 overflow-y-hidden">
      {loading && <div className="text-4xl my-4">Loading...</div>}
      {error && <div>{error}</div>}
      {data.length !== 0 && (
        <>
          <div className="flex flex-col">
            <div className="flex md:justify-between items-center flex-col md:flex-row">
              {data["post code"] ? (
                <p className="text-2xl mt-2">
                  Locations For{" "}
                  <span className="font-bold">{data["post code"]}</span>
                </p>
              ) : (
                <p className="text-2xl mt-2">
                  <span className="font-bold">No Location</span>
                </p>
              )}
              <div className="mt-2 ">
                <button
                  type="button"
                  className="py-1 px-3 rounded transition ease-in-out delay-150 bg-white hover:-translate-y-1 hover:scale-110 hover:bg-white-500 duration-300"
                  onClick={(e) => handleClear(e)}
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="place-items-center my-4 mx-10 md:mx-28 overflow-y-scroll">
              <ul>
                {data.places ? (
                  data.places.map((place, index) => (
                    <div
                      key={index}
                      className="my-8 py-2 shadow-lg shadow-black-800 rounded-xl md:w-4/5 w-full flex items-center flex-col bg-white md:flex-row"
                    >
                      <div className="text-5xl md:basis-1/4 my-2 md:px-8">
                        <p className="bg-gray-500 px-4 py-4 text-gray-300 rounded">
                          {place["state abbreviation"]}
                        </p>
                      </div>
                      <div className="flex flex-col md:basis-3/4 px-8">
                        <div className="flex text-lg my-1">
                          <p>Place: {place["place name"]}</p>
                        </div>
                        <div className="flex text-lg my-1 md:justify-between flex-col md:flex-row">
                          <p className="mb-1 md:mb-0">State: {place.state}</p>
                          <p>Country: {data.country}</p>
                        </div>
                        <div className="flex text-lg my-1 md:justify-between flex-col md:flex-row">
                          <p className="mb-1 md:mb-0">
                            Latitude: {place.latitude}
                          </p>
                          <p>Longitude: {place.longitude}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-2xl md:bg-black md:text-white  rounded-full md:py-2 md:px-2 px-4 py-4">
                    <p className="text-center">
                      😢 There is No Locations Added for this PostalCode
                    </p>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
