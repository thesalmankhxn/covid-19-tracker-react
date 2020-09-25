import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const Linegraph = () => {
    const [data, setData] = useState({});

    // https://disease.sh/v3/..
    // covid-19/historical/all?lastdays=120

    const buildChartData = (data, casesType='cases') => {
        const chartData = [];
        let lastDataPoint; //diff b/w two dates

        for(let date in data.cases) {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][data];
        };
        return chartData;
    };

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(res => res.json())
        .then(data => {

            // byDefault it is cases if wanna change it add 2nd param caseType
            const chartData = buildChartData(data);
            setData(chartData);
        });
    }, []);

    return (
        <div>
            <Line 
                data = {{
                    datasets: [{
                        backgroundColor: "",
                        borderColor: "#CC1034",
                        data: data
                    }]
                }}
                options
            />
        </div>
    );
};

export default Linegraph;
