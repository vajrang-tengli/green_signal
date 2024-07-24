// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Function to convert Unix timestamp to readable date
const convertTimestampToDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
};

// Function to fetch data and create chart
const fetchDataAndCreateChart = () => {
    database.ref('/sensorData').on('value', (snapshot) => {
        const sensorData = snapshot.val();
        const labels = [];
        const data1 = [];

        // Assuming 's1' and 'time' keys exist in the data
        for (const [key, value] of Object.entries(sensorData.s1)) {
            labels.push(convertTimestampToDate(sensorData.time[key]));
            data1.push(value);
        }

        const ctx = document.getElementById('sensorChart').getContext('2d');
        if (window.sensorChart) {
            window.sensorChart.destroy();
        }
        window.sensorChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Sensor 1 Readings',
                    data: data1,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: false,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'minute'
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
};

// Call the function to fetch data and create the chart
fetchDataAndCreateChart();
