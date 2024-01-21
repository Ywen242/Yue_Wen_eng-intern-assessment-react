import React, { useState, useEffect } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import './App.css';

export default function App() {
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [laps, setLaps] = useState<number[]>([]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10); 
            }, 10);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const handleStop = () => {
        setIsRunning(false);
    };
    
    const handleStart = () => {
        setIsRunning(true);
    };

    const handleReset = () => {
        setTime(0);
        setLaps([]);
        setIsRunning(false);
    };

    const handleLap = () => {
        setLaps([...laps, time]);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);

        return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    };

    const calculateLapDifference = (index: number) => {
        if (index === 0){
            return laps[0];
        } else {
            return laps[index] - laps[index - 1];
        }
    };

    return (
        <div className="app">
            <h1 className="title">Stopwatch</h1> {/* Title Added */}
            <div className="stopwatch-display">
                <StopWatch time={formatTime(time)} />
            </div>
            <div className="buttons">
                <StopWatchButton
                    isRunning={isRunning}
                    onStart={handleStart}
                    onStop={handleStop}
                    onReset={handleReset}
                    onLap={handleLap}
                />
            </div>
            <div className="laps-chart">
                <div className="lap-record title"> {/* Header Row for Laps Chart */}
                    <span>Index</span>
                    <span>Total Time</span>
                    <span>Lap Time</span>
                </div>
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