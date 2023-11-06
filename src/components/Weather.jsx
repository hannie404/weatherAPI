import React, { useEffect, useState } from 'react';
import cloud from './../assets/cloud.svg';

const Weather = () => {
  // edit key, cityId, and cityNameApi to fetch the data on your API
  const key = "9mw045x3Uf7ItXUcnLHnXAdhvAoMzVy2";
  const cityId = 264885; 
  const cityNameApi = "manila";

  /* You could try this details below:
      key = "[your-own-personal-key]"
      const cityId = 3414753; 
      const cityNameApi = "Cagayan";
  */

  const [cityName, setCityName] = useState("Cagayan City");
  const [countryName, setCountryName] = useState("Philippines");
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const cityResponse = await getCityName(cityNameApi);
        if (cityResponse) {
          setCityName(cityResponse.EnglishName);
          setCountryName(cityResponse.Country.EnglishName);
        }

        const weatherResponse = await getWeather(cityId);
        if (weatherResponse) {
          setWeatherData(weatherResponse);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { month: 'short', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const toCelsius = (fahrenheit) => {
    return Math.round((fahrenheit - 32) * 5/9);
  };

  const renderDate = (date, index) => {
    if (index === 0) {
      return "Today";
    } else {
      return formatDate(date);
    }
  };
  
  // Update your getWeather function to use the updated URLs and convert temperature to Celsius
  const getWeather = async (cityId) => {
    try {
      const baseUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityId}`;
      const query = `?apikey=${key}`;
      const res = await fetch(baseUrl + query);
      const data = await res.json();

      if (data.DailyForecasts) {
        const forecasts = data.DailyForecasts.map((forecast, index) => {
          return {
            ...forecast,
            Date: renderDate(forecast.Date, index),
            Temperature: {
              Maximum: {
                Value: toCelsius(forecast.Temperature.Maximum.Value),
                Unit: '°C',
              }
            }
          };
        });
        return forecasts;
      }

      return [];
    } catch (error) {
      throw error;
    }
  };

  const getCityName = async (cityNameApi) => {
    try {
      const baseUrlCity = `http://dataservice.accuweather.com/locations/v1/cities/search`;
      const query = `?apikey=${key}&q=${cityNameApi}`; 
      const res = await fetch(baseUrlCity + query);
      const data = await res.json();
      console.log(data[0])
      return data[0];
    } catch (error) {
      throw error;
    }
  };


  // return (
  //   <div className="h-screen bg-gradient-to-r from-sky-500 to-indigo-500">
  //     <div className="h-screen bg-radial1">
  //       <div className="h-screen bg-radial2 flex flex-col items-center justify-center">

  //         {/* First Card - Contains the Information of the Day */}

  //         <div className='h-fit w-3/6 blurred p-8 outline-2 flex flex-col items-center justify-evenly mb-10'>
  //           <h1 className='date text-white text-2xl mb-10'>Today's</h1>
  //           <div className='flex flex-row mb-8'>
  //             <h1 className='text-9xl text-white me-3'>
  //             {weatherData.length > 0 && (
  //               <span>
  //                 {`${weatherData[0].Temperature.Maximum.Value}`}
  //                   <sup className="text-7xl mb-3">
  //                     {`${weatherData[0].Temperature.Maximum.Unit}`}
  //                   </sup>
  //               </span>
  //             )}
  //             </h1>
  //             <img src={cloud} className='w-40 ms-3' alt='Weather Icon' />
  //           </div>
  //           <h1 className='text-4xl font-semibold text-white mb-2' id='city'>{cityName} City</h1>
  //           <p className='text-2xl text-white' id='country'>{countryName}</p>
  //         </div>
          
  //         {/* Second Card - Contains the Days */}
          
  //         <div className='h-fit w-3/6 blurred p-5 outline-2 flex flex-col items-center justify-center'>
  //           <p className='text-white mb-5 text-lg'>Next 5 Days</p>
  //           <div className='text-white flex flex-row items-center justify-center'>
  //             {weatherData.slice(0, 6).map((forecast, index) => (
  //               <div
  //                 className={`p-5 flex flex-col justify-center items-center ${index === 4 ? '' : 'border-r-2'}`}
  //                 key={index}
  //               >
  //                 <p className='text-white mb-3' id='day'>{forecast.Date}</p>
  //                 <img src={cloud} className='w-10 mb-3' alt='Weather Icon' />
  //                 <h1 className='text-4xl text-white me-3'>
  //                   {forecast.Temperature.Maximum.Value}<sub className='text-4xl'><sup>{forecast.Temperature.Maximum.Unit}</sup></sub>
  //                 </h1>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="h-screen bg-gradient-to-r from-sky-500 to-indigo-500">
      <div className="h-screen bg-radial1">
        <div className="h-screen bg-radial2 flex flex-col items-center justify-center">

          {/* First Card - Contains the Information of the Day */}
          <div className='w-full blurred md:w-2/3 lg:w-1/2 p-4 md:p-5 lg:p-8 outline-2 flex flex-col items-center justify-center mb-10'>
            <h1 className='date text-white text-1xl md:text-2xl lg:text-3xl mb-4 md:mb-6'>Today's</h1>
            <div className='flex flex-row mb-6 md:mb-8'>
              <h1 className='text-5xl md:text-6xl lg:text-9xl text-white me-3'>
                {weatherData.length > 0 && (
                  <span>
                    {`${weatherData[0].Temperature.Maximum.Value}`}
                    <sup className="text-3xl md:text-4xl lg:text-7xl mb-2 md:mb-3">
                      {`${weatherData[0].Temperature.Maximum.Unit}`}
                    </sup>
                  </span>
                )}
              </h1>
              <img src={cloud} className='w-16 md:w-20 lg:w-40 ms-3' alt='Weather Icon' />
            </div>
            <h1 className='text-xl md:text-2xl lg:text-4xl font-semibold text-white mb-2' id='city'>{cityName} City</h1>
            <p className='text-base md:text-lg lg:text-xl text-white' id='country'>{countryName}</p>
          </div>
          
          {/* Second Card - Contains the Days */}
          <div className='w-full blurred md:w-2/3 lg:w-1/2 p-4 md:p-5 lg:p-8 outline-2 flex flex-col items-center justify-center'>
            <p className='text-white text-lg md:text-xl lg:text-2xl mb-4 md:mb-5 lg:mb-6'>Next 5 Days</p>
            <div className='text-white flex flex-row items-center justify-center'>
              {weatherData.slice(0, 6).map((forecast, index) => (
                <div
                  className={`p-4 md:p-5 lg:p-6 flex flex-col justify-center items-center ${index === 4 ? '' : 'border-r-2'}`}
                  key={index}
                >
                  <p className='text-white mb-2 md:mb-3 lg:mb-4' id='day'>{forecast.Date}</p>
                  <img src={cloud} className='w-10 md:w-12 lg:w-14 mb-2 md:mb-3 lg:mb-4' alt='Weather Icon' />
                  <h1 className='text-base md:text-lg lg:text-xl text-white me-3'>
                    {forecast.Temperature.Maximum.Value}<sub className='text-sm md:text-base lg:text-lg'><sup>{forecast.Temperature.Maximum.Unit}</sup></sub>
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;

