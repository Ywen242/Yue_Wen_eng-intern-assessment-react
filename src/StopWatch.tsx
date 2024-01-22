import React from 'react';

type StopWatchProps = {
    time: string; 
};

export default function StopWatch({ time }: StopWatchProps) {
    return <div>{time}</div>;
}