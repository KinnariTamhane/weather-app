"use client";

import React, { useState, useEffect } from 'react';
import { FaTemperatureHigh, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { WiDaySunny, WiRain, WiCloud } from 'react-icons/wi';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState<any[]>([])
  const [isCelsius, setIsCelsius] = useState<Boolean>(true);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<any>('');


  useEffect (()=>{
     fetch ('https://freetestapi.com/api/v1/weathers')
     .then(response => response.json())
     .then(data =>setWeatherData(data))
  },[])

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCode = event.target.value;
    setSelectedCountry(selectedCode);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
  };
  

  const city = weatherData.filter((data) => selectedCountry ? data.country === selectedCountry : '');
  const selectedCityData =  city.filter((data) => selectedCity ? data.city === selectedCity : '');

  const getTemperature = () => {
    if (isCelsius) {
      return `${selectedCityData[0].temperature}°C`;
    }
    return `${Math.round((selectedCityData[0].temperature * 9/5) + 32)}°F`;
  };

  const getWeatherIcon = () => {
    switch(selectedCityData[0]?.weather_description) {
      case 'Sunny' :
      case 'Clear sky':
        return <WiDaySunny size={48} color="orange" />;
      case 'Partly cloudy' :
      case 'Cloudy' :
        return <WiCloud size={48} color="gray" />;
      case 'Rainy' :
      case 'Rain showers':
        return <WiRain size={48} color="blue" />;
      default:
        return <WiDaySunny size={48} color="orange" />;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 to-indigo-300">
      <div className="bg-white bg-opacity-80 rounded-3xl shadow-2xl p-8 m-4 w-full max-w-md transition-all duration-500 ease-in-out transform hover:scale-105">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Weather App</h1>
         {
          selectedCityData.length >0 &&
          <button
            onClick={() => setIsCelsius(!isCelsius)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
            aria-label="Toggle temperature unit"
          >
          {isCelsius ? '°C' : '°F'}
        </button>
         }
        </div>

        <div className='mb-6 flex items-center justify-left mt-3'>
          <label htmlFor="country-select" className='text-black text-sm pr-4'>Select a Country:</label>
          <select id="country-select" value={selectedCountry} onChange={handleCountryChange} className='text-black border border-black text-sm hover:border-black focus-visible:border-black px-2 py-1 rounded-md'>
            <option value="">-- Choose a country --</option>
            {weatherData && weatherData.map((data) => (
              <option key={data.country} value={data.country} className='text-black border border-black text-sm'>
                {data.country}
              </option>
            ))}
          </select>
        </div>

        {
          selectedCountry &&
          <div className='mb-6 flex items-center justify-left mt-3'>
          <label htmlFor="country-select" className='text-black text-sm pr-4'>Select a City:</label>
          <select id="country-select" value={selectedCity} onChange={handleCityChange} className='text-black border border-black text-sm hover:border-black focus-visible:border-black px-2 py-1 rounded-md'>
            <option value="">-- Choose a city --</option>
            {city && city.map((data) => (
              <option key={data.city} value={data.city} className='text-black border border-black text-sm'>
                {data.city}
              </option>
            ))}
          </select>
        </div>
        }

      {
        selectedCityData && selectedCityData.map((item)=>{
          return(
            <>
            <div className="mb-6 flex items-center justify-center" key={item.id}>
            <div className="relative flex mt-3">
            {getWeatherIcon()}
              <div className=" inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-800 mr-4">{getTemperature()}</span>
              </div>

            </div>
            </div>  
            <div className="space-y-4">
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-red-500 mr-2" />
                <span className="text-gray-700">{item.city || ''}</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-orange-500 mr-2" />
                <span className="text-gray-700">Latitude: {item.latitude || ''}°</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-orange-500 mr-2" />
                <span className="text-gray-700">Longitude: {item.longitude || ''}°</span>
              </div>
              <div className="flex items-center">
                <FaTemperatureHigh className="text-orange-500 mr-2" />
                <span className="text-gray-700">Weather: {item.weather_description || ''}</span>
              </div>
              <div className="flex items-center">
                <FaClock className="text-blue-500 mr-2" />
                <span className="text-gray-700">{item.forecast[0].date}</span>
              </div>
            </div> 
          </>
          )
        })

      }

        {/* <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Last updated: {new Date().toLocaleString()}</p>
        </div> */}
      </div>
    </div>
  );

};

export default WeatherApp;
