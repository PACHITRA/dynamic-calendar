/* eslint-disable react/prop-types */
export default function CustomDateGridEvent({ calendarEvent }) {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          background: 'green',
          color: 'white',
          padding: '2px',
          borderRadius: 5,
          border: '1px solid white',
        }}
      >
        {calendarEvent.title}
      </div>
    );
  }
  