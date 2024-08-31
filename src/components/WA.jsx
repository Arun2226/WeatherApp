import React from 'react'
import  { useEffect, useState } from 'react'

function WA() {
    let citychange= (e)=>{
        setCity(e.target.value)
      }
      const[city,setCity]=useState("New Delhi")
      const[weatherData,setWeatherData]=useState(null)
      const [error, setError] = useState('');
      useEffect(() => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a7a79dca1f109034d5aff21c6dabd7a6&units=metric`;
        fetch(apiUrl)
          .then((res) => {
            if (!res.ok) {
              throw new Error("Could not get data");
            }
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setWeatherData(data);
          })
          .catch((e) => {
            console.log(e);
          });
      }, [city]);
     
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0'); 
      const day = now.getDate().toString().padStart(2, '0');

      //dark mode
      const themeSwitch=()=>{
        document.documentElement.classList.toggle('dark');
      };

  return (
    <div className='bg-[#1f213a] dark:bg-white dark:text-black h-screen flex justify-center align-top transition-colors duration-700 ease-in-out'>
    <button onClick={themeSwitch} className='bg-blue-300 p-2 mt-[20px] rounded-3xl absolute left-[90%] ' >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 dark:hidden">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 dark:block hidden">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>

    </button>
    {/* left section */}
    <div className=' mt-40 h-1/2  w-1/6 mr-5  dark:bg-zinc-400 dark:rounded-xl' >
       {/* input box */}
     <div className='flex justify-between m-1  rounded-sm transition-colors duration-700 ease-in-out'>
        <input type="text" className='bg-slate-600 border-slate-500  text-white placeholder-slate-300 text-md w-60 p-2 focus:outline-none  rounded-[10px] focus:border-slate-400 dark:bg-slate-300 dark:text-black transition-colors duration-700 ease-in-out '
        placeholder='Enter City Here'
        onChange={citychange} defaultValue="New Delhi" />

        
        <div className='ml-5 pt-1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-8   ">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
        </div>
      </div> 
    
    {/* tempareture details */}

      <div className='flex-row justify-center mt-10 '>

        {/* icon */}
        {weatherData &&(
          <div className='pl-11'>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="not ava" className="h-[100px] w-[100px]   text-transform scale-100 hover:scale-105 transition-transform duration-400 easse-in-out"/>
            
        </div>
        ) }

        {/* temperature */}
        {weatherData &&(
         <div className='text-white  dark:text-black text-center mt- pr-[30px] text-transform scale-100 hover:scale-105 transition-transform duration-400 easse-in-out '>
         <p className='font-semibold text-[45px]'>
           {weatherData.main.temp}
         <span className='text-[40px]'><sup>o</sup>C</span>
         </p>
       </div>
        ) }

        {/* place */}
        {weatherData &&(
        <div className='text-white  dark:text-black text-center mt-5 pr-[40px] text-[23px] text-transform scale-100 hover:scale-105 transition-transform duration-400 easse-in-out'>
            {weatherData.weather[0].description}
        </div> 
        ) }

        {/* date */}
        {weatherData &&(
        <div className='text-white  dark:text-black text-center mt-5 pr-[50px] text-[14px] '>
        Today {day}:{month}:{year} | {weatherData.name}|{weatherData.sys.country}
      </div>  
        ) }
        
         
      </div>

    
      
      
    
    </div>
     {/* right section */}
    <div className='mt-40 h-1/2 w-1/3 text-white dark:bg-zinc-400 dark:rounded-3xl dark:text-black p-10 grid grid-cols-3 gap-3 transition-colors duration-700 ease-in-out'>
      <h2 className='text-2xl col-span-3'>Today's Weather Details </h2>
     
     
      {/* Feels Like */}
      {weatherData &&(
        <div className='bg-slate-700  dark:bg-slate-200  p-2 flex flex-col justify-start items-center '>
        <h2 className='text-sm mt-2 '>Feels Like</h2>
        <div className='m-4'>
            <span className='text-3xl font-bold'>{weatherData.main.feels_like}</span>
            <span className='text-2xl'><sup>o</sup>C</span>
        </div>
      </div> 
        ) }

        {/* humidity */}
        {weatherData &&(
      <div className='bg-slate-700 p-2 flex flex-col justify-start items-center dark:bg-slate-200'>
        <h2 className='text-sm mt-2'>Humidity</h2>
        <div >
            <span className='text-4xl font-bold'>{weatherData.main.humidity}</span>
            <span className='text-2xl'>%</span>
            
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-4 mb-4 dark:bg-gray-700">
            <div className="bg-blue-600 h-1.5 rounded-full dark:bg-black" style={{width: weatherData.main.humidity}}></div>    
        </div>
      </div>
       ) }
     {/* Speed */}
     {weatherData &&(
      <div className='bg-slate-700 p-2 flex flex-col justify-start items-center dark:bg-slate-200'>
        <h2 className='text-sm mt-2'>wind status</h2>
        <div className='m-4'>
            <span className='text-3xl font-bold'>{weatherData.wind.speed}</span>
            <span className='text-2xl'>mph</span>
            
        </div>
        
      </div>
       ) }
        {/* Latitude */}
        {weatherData &&(
          <div className='bg-slate-700 p-2 flex flex-col justify-start items-center dark:bg-slate-200'>
            <h2 className='text-sm mt-2'> Latitude</h2>
            <div>
                <span className='text-2xl font-bold'>{weatherData.coord.lat}</span>
            
            </div>
            
          </div> 
      ) }

        {/* LONGITUDE */}
        {weatherData &&(
          <div className='bg-slate-700 p-2 flex flex-col justify-start items-center dark:bg-slate-200'>
            <h2 className='text-sm mt-2'> Longitude</h2>
            <div>
                <span className='text-2xl font-bold'>{weatherData.coord.lon}</span>
              
            </div>
            
          </div>
      ) }
     
     {/* ground level */} 
     {weatherData &&(
      <div className='bg-slate-700 p-2 flex flex-col justify-start items-center dark:bg-slate-200'>
        <h2 className='text-sm mt-2'>Ground Level</h2>
        <div>
            <span className='text-4xl font-bold'>{weatherData.main.grnd_level}</span>
           
            
        </div>
       
      </div>
       ) }
     


    </div>
  </div>
  )
}

export default WA
