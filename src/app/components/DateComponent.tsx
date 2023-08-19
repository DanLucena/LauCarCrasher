'use client'

import { useEffect, useState } from "react"

interface Props {
  type: string,
  value: number
}

export function DateComponent({type, value}: Props) {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    setTime(value);
  }, [value]);

  return (
    <div className="border border-zinc-600 lg:w-20 lg:h-20 w-14 h-14 rounded-md flex flex-col items-center justify-center">
      <span className="lg:text-3xl text-xl">{time <= 9 ? `0${time}` : time}</span>
      <span className="lg:text-sm text-[0.6rem] justify-end">{type}</span>
    </div>
  )
}