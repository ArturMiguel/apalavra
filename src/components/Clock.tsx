import { useEffect, useState } from "react"
import moment from "moment-timezone";

export default function Clock({ ...props }) {
  const [time, setTime] = useState<string>(null);

  function fd(d: number) {
    return d.toString().padStart(2, "0");
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment().tz("America/Sao_Paulo");
      const final = moment(moment().endOf("day"));
      const duration = moment.duration(final.diff(now));
      setTime(`${fd(duration.hours())}:${fd(duration.minutes())}:${fd(duration.seconds())}`);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <span style={props.style}>{time}</span>
  )
}