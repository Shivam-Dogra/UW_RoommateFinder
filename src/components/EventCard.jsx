import React from 'react';

function EventCard({ event }) {
  return (
    <div style={{
      flex: '1 1 25%', // Adjusts the width to be 45% to fit two cards per row with some spacing
      margin: '20px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      borderRadius: '8px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column', // Ensures content is aligned column-wise
      maxWidth: '500px' // Max width for larger screens
    }}>
      <img src={event.imgSrc} alt={event.title} style={{
        width: '100%',
        height: '350px', // Increased height to make the image square
        objectFit: 'cover'
      }} />
      <div style={{ padding: '10px' }}>
        <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>{event.title}</h3>
        <p><strong>Date:</strong> {event.eventDate}</p>
        <p style={{ marginBottom: '0' }}><strong>Detail:</strong> {event.description}</p>
      </div>
    </div>
  );
}

export default EventCard;
