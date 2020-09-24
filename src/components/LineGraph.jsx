import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const Linegraph = () => {
    const [data, setData] = useState({});

    // https://disease.sh/v3/..
    // covid-19/historical/all?lastdays=120

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(res => res.json())
        .then(data => {

        });
    }, [])

    return (
        <div>
            <Line 
                data
                options
            />
        </div>
    );
};

export default Linegraph;
