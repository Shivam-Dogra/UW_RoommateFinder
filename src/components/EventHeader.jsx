import React from 'react';
import carnival from '../assets/carnival.jpg'; // Make sure the path is correct

function EventHeader() {
  return (
    <div style={{ marginBottom: '30px' }}>
      <div style={{ position: 'relative' }}>
        <img
          src={carnival}
          alt="Event Calendar"
          style={{ width: '100%', height: 'auto' }}
        />
        <h1 style={{
          textAlign: 'center',
          position: 'absolute',
          width: '100%',
          bottom: '20px', // Adjust the bottom spacing to better fit your design
          fontSize: '48px',
          color: 'white',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.6)'
        }}>
          Upcoming Events in Windsor
        </h1>
      </div>
      <div style={{
        padding: '20px',
        backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent black background for readability
        color: 'white',
        textAlign: 'center',
        fontSize: '18px',
        lineHeight: '1.6'
      }}>
        <h2>Get Out & About</h2>
        <p>Let us entertain you! Check out the latest and greatest events going on in Windsor Essex! The full list of events happening in our region can be found below. Search by date or by event type to make your trip planning to Windsor Essex even easier. Dates, times and locations are subject to change, so please consult event websites for accurate details.</p>
      </div>
    </div>
  );
}

export default EventHeader;
