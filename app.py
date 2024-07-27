import firebase_admin
from firebase_admin import credentials, db
import pandas as pd
import plotly.express as px

# Initialize the Firebase Admin SDK
cred = credentials.Certificate('mini-1bdfc-firebase-adminsdk-crl4f-23afa51b38.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://mini-1bdfc-default-rtdb.firebaseio.com/'
})

# Reference to your Firebase RTDB
ref = db.reference('sensorData')

# Retrieve data from the database
data = ref.get()

# Extract sensor values and timestamps for 's1'
sensor_data = data['s1']
timestamps = data['time']

# Convert to Pandas DataFrame for easier handling
df = pd.DataFrame({
    'timestamp': list(timestamps.values()),
    'sensor_value': list(sensor_data.values())
})

# Convert timestamps to datetime
df['timestamp'] = pd.to_datetime(df['timestamp'], unit='s')

# Plot the data
fig = px.line(df, x='timestamp', y='sensor_value', title='Sensor Data Over Time')
fig.write_htm
