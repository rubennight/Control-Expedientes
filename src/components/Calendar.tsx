import { Calendar, Divider } from "antd";
import { useEffect, useState } from "react";


const Calendario = () => {
    const width = window.innerWidth;
    const [hora, setHora] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setHora(new Date());
        }, 1000);
    
        return () => clearInterval(timer); // Cleanup interval on component unmount
    }, []);

    const formatTime = (date: Date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
      };

    return(
        <div>
            <h2 style={{ textAlign: 'left'}}>{formatTime(hora)}</h2>
            <Divider />
            <Calendar fullscreen={false} style={{ width: width * 0.35 }}/>
        </div>   
    )
}

export default Calendario;