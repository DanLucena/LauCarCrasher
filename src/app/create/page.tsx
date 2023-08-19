'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function PaginaVazia() {
  const currentDate = new Date().toISOString().slice(0, 16);
  const [selectedDate, setSelectedDate] = useState('');
  const [token, setToken] = useState('');

  const handleDateChange = (event: any) => {
    setSelectedDate(event.target.value);
  };

  const handleTokenChange = (event: any) => {
    setToken(event.target.value);
  }

  const cleanFields = () => {
    setSelectedDate('');
    setToken('');
  }

  const createCrash = async () => {
    if(!token.length || !selectedDate.length) return toast.error('Falha ao criar !');
    try{
      await axios.post(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/time', { token: token, date: selectedDate });
      cleanFields();
      toast.success("Criado com sucesso !");
    } catch(e: any) {
      toast.error("Falha ao criar !");
    }
  }

  return (
    <div className='w-full h-screen flex flex-col'>
      <div className='flex items-center justify-center flex-col mt-auto'>
        <Image src='/cat.png' alt='cat-image' width={300} height={300} className='lg:w-80 lg:h-80 w-60 h-60'/>
        <h1 className='md:text-2xl lg:px-0 px-5 text-xl font-semibold max-w-md text-center'>Auto lá <span className='text-violet-700'>gatinha!</span> Parece que tivemos mais uma infração aqui !</h1>
        <div className='flex lg:flex-row flex-col lg:gap-11 gap-2 items-center justify-center mt-10'>
          <div className='flex flex-col'>
            <label htmlFor="birthdaytime">Dia e hora do ocorrido:</label>
            <input className="border border-zinc-300 py-2 px-3 focus:outline-violet-700 w-64" type="datetime-local" id="birthdaytime" name="birthdaytime"  value={selectedDate} onChange={handleDateChange} max={currentDate} />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="token">Token para criação.</label>
            <input className="border border-zinc-300 py-2 px-3 focus:outline-violet-700 w-64" type="text" id="token" onChange={handleTokenChange} />
          </div>
          <button className='border-2 w-64 mt-auto border-violet-700 text-violet-700 font-medium py-2 px-10 hover:bg-violet-700 hover:text-white ease-in-out duration-300' onClick={createCrash}>CRIAR</button>
        </div>
      </div>
      <div className="mt-auto text-sm flex items-center justify-center">
        <span className="text-zinc-600">Made with 💜 by <a className="hover:text-violet-700 ease-out duration-300 font-semibold" href="https://github.com/DanLucena" target="_blank">Daniel Lucena</a></span>
      </div>
      <ToastContainer />
    </div>
  );
}