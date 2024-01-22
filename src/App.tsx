import React, { useState, useEffect } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import './App.css';

export default function App() {
    // State for tracking the current time of the stopwatch
    const [time, setTime] = useState<number>(0);

    // State to track whether the stopwatch is running
    const [isRunning, setIsRunning] = useState<boolean>(false);

    // State for storing lap times
    const [laps, setLaps] = useState<number[]>([]);

    // Effect hook to update the time every 10 milliseconds when the stopwatch is running
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10); 
            }, 10);
        }
        // Clear interval when component unmounts or stopwatch stops running
        return () => clearInterval(interval);
    }, [isRunning]);

    // Handler to stop the stopwatch
    const handleStop = () => {
        setIsRunning(false);
    };
    
    // Handler to start the stopwatch
    const handleStart = () => {
        setIsRunning(true);
    };

    // Handler to reset the stopwatch and clear laps
    const handleReset = () => {
        setTime(0);
        setLaps([]);
        setIsRunning(false);
    };

    // Handler to record a lap time
    const handleLap = () => {
        setLaps([...laps, time]);
    };

    // Function to calculate the time difference between laps
    const calculateLapDifference = (index: number) => {
        if (index === 0){
            return laps[0];
        } else {
            return laps[index] - laps[index - 1];
        }
    };

    // Function to format time in mm:ss.SS format
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);

        return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="app">
            <h1 className="title">Stopwatch</h1>
            <div className="stopwatch-display">
                {/* Display the formatted time */}
                <StopWatch time={formatTime(time)} />
            </div>
            <div className="buttons">
                {/* Render buttons and pass event handlers */}
                <StopWatchButton
                    isRunning={isRunning}
                    onStart={handleStart}
                    onStop={handleStop}
                    onReset={handleReset}
                    onLap={handleLap}
                />
            </div>
            <div className="laps-chart">
                {/* Lap chart header */}
                <div className="lap-record title">
                    <span>Index</span>
                    <span>Total Time</span>
                    <span>Lap Time</span>
                </div>
                {/* Map each lap to a row in the lap chart */}
                {laps.map((lap, index) => (
                    <div key={index} className="lap-record">
                        <span>Lap {index + 1}</span>
                        <span>{formatTime(lap)}</span>
                        <span>{formatTime(calculateLapDifference(index))}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}