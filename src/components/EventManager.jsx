import { useState } from 'react';

function EventManager() {
 const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    weekday: '',
    time: ''
  });

    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  
  const handleCreateEvent = () => {
    if (!formData.title || !formData.weekday || !formData.time) {
      alert("Please fill all fields.");
      return;
    }
    const newEvent = {
      id: new Date().getTime().toString(), 
      title: formData.title,
      weekday: formData.weekday,
      time: formData.time,
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setFormData({ id: '', title: '', weekday: '', time: '' }); 
  };

  
  const handleUpdateEvent = () => {
    if (!formData.title || !formData.weekday || !formData.time) {
      alert("Please fill all fields.");
      return;
    }
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === formData.id
          ? { ...event, title: formData.title, weekday: formData.weekday, time: formData.time }
          : event
      )
    );
    setFormData({ id: '', title: '', weekday: '', time: '' }); 
  };

  
  const handleDeleteEvent = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
  };

 
  const handleEventClick = (event) => {
    setFormData({
      id: event.id,
      title: event.title,
      weekday: event.weekday,
      time: event.time
    });
  };

 
  const groupEventsByWeekday = (events) => {
    const groupedEvents = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
    };

    events.forEach((event) => {
      groupedEvents[event.weekday].push(event);
    });

    return groupedEvents;
  };

  const groupedEvents = groupEventsByWeekday(events);

  
  const handleCancel = () => {
    setFormData({ id: '', title: '', weekday: '', time: '' }); 
  };

  return (
    <div className="container p-4">
      <h2 className="text-xl font-bold mb-4">Event Manager</h2>

      {/* Event Form */}
      <div className="mb-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Event Title"
          className="mb-2 p-2 w-full border"
        />
        <select
          name="weekday"
          value={formData.weekday}
          onChange={handleChange}
          className="mb-2 p-2 w-full border"
        >
          <option value="">Select Weekday</option>
          {weekdays.map((weekday) => (
            <option key={weekday} value={weekday}>
              {weekday}
            </option>
          ))}
        </select>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          placeholder="Event Time"
          className="mb-2 p-2 w-full border"
        />

        
        <div className="flex space-x-2">
          {formData.id ? (
            <>
              <button
                onClick={handleUpdateEvent}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Update Event
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleCreateEvent}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Create Event
            </button>
          )}
        </div>
      </div>

      
      <div>
        <h3 className="font-semibold mb-2">Event List</h3>
        {events.length === 0 ? (
          <p>No events created yet.</p>
        ) : (
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                {weekdays.map((weekday) => (
                  <th key={weekday} className="p-2 border-b">{weekday}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {weekdays.map((weekday) => (
                  <td key={weekday} className="p-2 border-b">
                    {groupedEvents[weekday].length > 0 ? (
                      <ul>
                        {groupedEvents[weekday].map((event) => (
                          <li key={event.id} className="mb-2 p-1 border rounded-md">
                            <div onClick={() => handleEventClick(event)} className="cursor-pointer">
                              <h4 className="font-semibold">{event.title}</h4>
                              <p>{event.time}</p>
                            </div>
                            <div className="flex justify-between">
                              <button
                                onClick={() => handleDeleteEvent(event.id)}
                                className="px-2 py-1 bg-red-500 text-white rounded-md"
                              >
                                Delete
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No events</p>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default EventManager;
