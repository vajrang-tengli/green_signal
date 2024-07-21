// Firebase configuration
var firebaseConfig = {
        apiKey: "AIzaSyAsM2jzcUBfs1Op60hZS0RbcGxzVXzhT6E",
        authDomain: "mini-1bdfc.firebaseapp.com",
        databaseURL: "https://mini-1bdfc-default-rtdb.firebaseio.com",
        projectId: "mini-1bdfc",
        storageBucket: "mini-1bdfc.appspot.com",
        messagingSenderId: "221002077061",
        appId: "1:221002077061:web:9911ece47b674f3aed2aec",
        measurementId: "G-7G77GXBE6H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// Function to fetch data and plot graph
function fetchDataAndPlot(variable) {
    database.ref(variable).on('value', (snapshot) => {
        const data = snapshot.val();
        const labels = [];
        const values = [];
        for (let key in data) {
            labels.push(new Date(key).toLocaleString());
            values.push(data[key]);
        }
        plotGraph(labels, values, variable);
    });
}

// Function to plot graph
function plotGraph(labels, values, variable) {
    var ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: variable,
                data: values,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
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
}

// Call fetchDataAndPlot with appropriate variable based on the page
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    if (path.includes('variable1')) {
        fetchDataAndPlot('variable1');
    } else if (path.includes('variable2')) {
        fetchDataAndPlot('variable2');
    } else if (path.includes('variable3')) {
        fetchDataAndPlot('variable3');
    } else if (path.includes('variable4')) {
        fetchDataAndPlot('variable4');
    } else {
        // For combined graph
        const variables = ['variable1', 'variable2', 'variable3', 'variable4'];
        const datasets = [];
        let counter = 0;
        variables.forEach(variable => {
            database.ref(variable).on('value', (snapshot) => {
                const data = snapshot.val();
                const labels = [];
                const values = [];
                for (let key in data) {
                    labels.push(new Date(key).toLocaleString());
                    values.push(data[key]);
                }
                datasets.push({
                    label: variable,
                    data: values,
                    borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
                    borderWidth: 2,
                    fill: false
                });
                counter++;
                if (counter === variables.length) {
                    plotCombinedGraph(labels, datasets);
                }
            });
        });
    }
});

// Function to plot combined graph
function plotCombinedGraph(labels, datasets) {
    var ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
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
}
