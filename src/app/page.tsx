'use client'

import { CarFront } from "lucide-react";
import { DateComponent } from "./components/DateComponent";
import { useEffect, useState } from "react";
import axios from 'axios';

interface TimeDifference {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Home() {
  const calculateTimeDifference = (targetDate: Date): TimeDifference => {
    const currentDate = new Date();
    const timeDifference =  currentDate.getTime() - targetDate.getTime();

    const seconds = Math.floor(timeDifference / 1000) % 60;
    const minutes = Math.floor(timeDifference / (1000 * 60)) % 60;
    const hours = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
  };

  const [timeDifference, setTimeDifference] = useState<TimeDifference>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const fetchLastDate = async () => {
      console.log(process.env.NEXT_PUBLIC_API_URL)
      const lastDate = await axios.get(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/time');
      const targetDateTime = new Date(lastDate.data.lastDate);

      const initialDifference = calculateTimeDifference(targetDateTime);
      setTimeDifference(initialDifference);

      const interval = setInterval(() => {
        const newTimeDifference = calculateTimeDifference(targetDateTime);
        setTimeDifference(newTimeDifference);
      }, 1000);

      return () => clearInterval(interval);
    };

    fetchLastDate();
  }, []);

  return (
    <div className='h-screen w-full flex items-center justify-center flex-col'>
      <div className="mt-auto">
        <div className="lg:text-6xl text-4xl font-bold flex items-center lg:gap-3 gap-1 flex-col lg:flex-row">
          <CarFront size={48} className="text-violet-700 rotate-45" />
          <span className="text-zinc-800">LAU CAR</span> 
          <span className="text-violet-700">CRASHER</span>
        </div>
        <p className="flex lg:justify-end justify-center text-zinc-600">Nois capota mas não breca !</p>
      </div>
      <div className="mt-14 text-zinc-700 lg:text-base text-sm">Tempo sem novos incidentes:</div>
      <div className="flex gap-3 mt-3">
        <DateComponent value={timeDifference.days} type="Dias" />
        <DateComponent value={timeDifference.hours} type="Horas" />
        <DateComponent value={timeDifference.minutes} type="Minutos" />
        <DateComponent value={timeDifference.seconds} type="Segundos" />
      </div>
      <div className="mt-6 max-w-sm text-center">
        <p className="text-zinc-500 text-sm">Esse projeto é apenas uma <span className="text-violet-700 font-bold">brincadeira</span> com permissão da própria <span className="text-violet-700 font-bold">Lau</span>, não levem a sério !</p>
      </div>
      <div className="mt-10">
        <a href="/create" className="bg-violet-700 text-white px-6 py-2">De novo nãaao!</a>
      </div>
      <div className="mt-auto text-sm">
        <span className="text-zinc-600">Made with 💜 by <a className="hover:text-violet-700 ease-out duration-300 font-semibold" href="https://github.com/DanLucena" target="_blank">Daniel Lucena</a></span>
      </div>
    </div>
  )
}
