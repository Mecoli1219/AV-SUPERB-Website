import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [date, setDate] = useState(new Date());
    const refreshClock = () => {
        setDate(new Date());
    };

    const padTo2Digits = (num: number) => {
        return num.toString().padStart(2, '0');
    }

    const formatDate = (date: Date) => {
        return (
            [
                date.getFullYear(),
                padTo2Digits(date.getMonth() + 1),
                padTo2Digits(date.getDate()),
            ].join('-') +
            ' ' +
            [
                padTo2Digits(date.getHours()),
                padTo2Digits(date.getMinutes()),
                padTo2Digits(date.getSeconds()),
            ].join(':')
        );
    }

    useEffect(() => {
        const timer = setInterval(() => refreshClock(), 1000);
        return function cleanup() {
            clearInterval(timer);
        };
    });
    return <div className="mt-2 text-md text-gray-400">{formatDate(date)}</div>
}
export default Clock;