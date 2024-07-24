from flask import Flask, render_template, jsonify
import plotly.express as px
import plotly.io as pio
import firebase_admin
from firebase_admin import credentials, db

app = Flask(__name__)

# Initialize Firebase Admin SDK
cred = credentials.Certificate("path/to/your/firebase_config.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://mini-1bdfc-default-rtdb.firebaseio.com/'
})

def fetch_sensor_data():
    ref = db.reference('/sensorData')
    sensor_data = ref.get()
    return sensor_data

def create_plot(sensor_data):
    time_stamps = [value for key, value in sensor_data['time'].items()]
    readings = [value for key, value in sensor_data['s1'].items()]
    
    # Convert Unix timestamps to readable dates
    dates = [pd.to_datetime(ts, unit='s') for ts in time_stamps]
    
    fig = px.line(x=dates, y=readings, labels={'x': 'Time', 'y': 'Sensor 1 Readings'}, title='Sensor 1 Data Over Time')
    return pio.to_html(fig, full_html=False)

@app.route('/')
def index():
    sensor_data = fetch_sensor_data()
    plot_html = create_plot(sensor_data)
    return render_template('s1.html', plot_html=plot_html)

if __name__ == '__main__':
    app.run(debug=True)
