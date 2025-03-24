import { useState, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

function DateView() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const formattedTime = format(time, "HH:mm");
  const formattedDate = format(time, "EEEE dd 'de' MMMM", { locale: es });

  return (
    <div className="relative w-full p-6 text-center text-white bg-transparent rounded-lg shadow-lg md:w-1/2">
      <h2 className="text-6xl font-bold md:text-9xl">{formattedTime}</h2>
      <h3 className="mt-2 text-xl md:text-3xl">{formattedDate}</h3>
    </div>
  );
}

export default DateView;
