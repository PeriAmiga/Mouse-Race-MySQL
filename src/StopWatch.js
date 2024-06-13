import React, { useEffect } from "react";
import "./StopWatch.css";


function Stopwatch({ time, setTime, isRunning }) {

    useEffect(() => {
        let intervalId;
        if (isRunning) {
            // Setting time from 0 to 1 every 10 millisecond using javascript setInterval method
            intervalId = setInterval(() => setTime(time + 1), 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, time, setTime]);

    // Hours calculation
    const hours = Math.floor(time / 360000);

    // Minutes calculation
    const minutes = Math.floor((time % 360000) / 6000);

    // Seconds calculation
    const seconds = Math.floor((time % 6000) / 100);

    // Milliseconds calculation
    const milliseconds = time % 100;

    return (
        <div className="stopwatch-container">
            <p className="stopwatch-time">
                {hours}:{minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}:
                {milliseconds.toString().padStart(2, "0")}
            </p>
        </div>
    );
};

export default Stopwatch;