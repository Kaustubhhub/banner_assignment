import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialEndTime, setIsVisible }: { initialEndTime: string, setIsVisible: any }) => {
    const [endTime, setEndTime] = useState(Number(initialEndTime));

    useEffect(() => {
        if (endTime > 0) {
            const timer = setInterval(() => {
                setEndTime(prevTime => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else {
            setIsVisible(false);
        }
    }, [endTime, setIsVisible]);

    return (
        <div className="flex items-center justify-center">
            <div className="flex items-center justify-center text-white">
                {endTime}
            </div>
        </div>
    );
};

export default CountdownTimer;
