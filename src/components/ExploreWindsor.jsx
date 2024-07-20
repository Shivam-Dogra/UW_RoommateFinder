import React, { useEffect, useState } from 'react';
import EventHeader from './EventHeader';
import EventCard from './EventCard';

function ExploreWindsor() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/events')
      .then(response => response.json())
      .then(setEvents)
      .catch(console.error);
  }, []);

  return (
    <div style={{ background: '#f0f0f0', minHeight: '100vh' }}>
      <EventHeader />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '20px' }}>
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
}

export default ExploreWindsor;
