document.addEventListener('DOMContentLoaded', function () {
    fetch('JsonforForcaster.json')
        .then(response => response.json())
        .then(fuelData => {
            const ctx = document.getElementById('fuelChart').getContext('2d');
            let currentMonthIndex = Math.max(fuelData.length - 12, 0);

            let myChart = new Chart(ctx, {
                type: 'line',

                data: {
                    labels: fuelData.slice(currentMonthIndex, currentMonthIndex + 12).map(item => item.Month + ' ' + item['Year and dataset code row']),
                    datasets: [
                        {
                            label: 'Solid Fuels',
                            data: fuelData.slice(currentMonthIndex, currentMonthIndex + 12).map(item => item['Current price indices: Solid fuels']),
                            borderColor: 'red',
                            fill: false,
                        },
                        {
                            label: 'Gas',
                            data: fuelData.slice(currentMonthIndex, currentMonthIndex + 12).map(item => item['Current price indices: Gas ']),
                            borderColor: 'green',
                            fill: false,
                        },
                        {
                            label: 'Electricity',
                            data: fuelData.slice(currentMonthIndex, currentMonthIndex + 12).map(item => item['Current price indices: Electricity ']),
                            borderColor: 'blue',
                            fill: false,
                        },
                        {
                            label: 'Liquid Fuels',
                            data: fuelData.slice(currentMonthIndex, currentMonthIndex + 12).map(item => item['Current price indices: Liquid fuels']),
                            borderColor: 'purple',
                            fill: false,
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });

            function updateChart() {
                myChart.data.labels = fuelData.slice(currentMonthIndex, currentMonthIndex + 12).map(item => item.Month + ' ' + item['Year and dataset code row']);
                myChart.data.datasets.forEach((dataset, index) => {
                    switch (index) {
                        case 0: dataset.data = fuelData.slice(currentMonthIndex, currentMonthIndex + 12).map(item => item['Current price indices: Solid fuels']); break;
                        case 1: dataset.data = fuelData.slice(currentMonthIndex, currentMonthIndex + 12).map(item => item['Current price indices: Gas ']); break;
                        case 2: dataset.data = fuelData.slice(currentMonthIndex, currentMonthIndex + 12).map(item => item['Current price indices: Electricity ']); break;
                        case 3: dataset.data = fuelData.slice(currentMonthIndex, currentMonthIndex + 12).map(item => item['Current price indices: Liquid fuels']); break;
                    }
                });
                myChart.update();
            }

            function handleScroll(direction) {
                // Logic to handle scrolling direction and update chart
                updateChart();
            }

            document.getElementById('prev').addEventListener('click', function () {
                if (currentMonthIndex > 0) {
                    currentMonthIndex--;
                    handleScroll('backward');
                } else {
                    document.getElementById('error').innerText = 'Reached the start of the dataset.';
                }
            });

            document.getElementById('next').addEventListener('click', function () {
                if (currentMonthIndex < fuelData.length - 12) {
                    currentMonthIndex++;
                    handleScroll('forward');
                } else {
                    document.getElementById('error').innerText = 'Reached the end of the dataset.';
                }
            });
            document.getElementById('historicalMode').addEventListener('click', function () {
                // Set historical mode
                currentMonthIndex = Math.max(fuelData.length - 12, 0); 
                document.getElementById('error').innerText = ''; 
                updateChart();
            });
            
            document.getElementById('forecastMode').addEventListener('click', function () {
                // Set forecast mode
                currentMonthIndex = Math.max(fuelData.length - 12, 0); 
                document.getElementById('error').innerText = '';
                updateChart();
            });
            

        })

        .catch(error => {
            console.error('Error fetching the JSON file:', error);
            document.getElementById('error').innerText = 'Failed to load data.';
        });
});