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
    <div className="min-h-screen w-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
      <div className="max-w-4xl mx-auto bg-white text-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Event Manager
        </h2>

        {/* Event Form */}
        <div className="mb-6">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Event Title"
            className="mb-3 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="weekday"
            value={formData.weekday}
            onChange={handleChange}
            className="mb-3 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="mb-3 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex space-x-3">
            {formData.id ? (
              <>
                <button
                  onClick={handleUpdateEvent}
                  className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                >
                  Update Event
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleCreateEvent}
                className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
              >
                Create Event
              </button>
            )}
          </div>
        </div>

        {/* Event List */}
        <div>
          <h3 className="font-semibold text-xl mb-4 text-center">Event List</h3>
          {events.length === 0 ? (
            <p className="text-center">No events created yet.</p>
          ) : (
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr>
                  {weekdays.map((weekday) => (
                    <th key={weekday} className="p-3 border-b text-center text-blue-600">
                      {weekday}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {weekdays.map((weekday) => (
                    <td key={weekday} className="p-3 border-b text-center">
                      {groupedEvents[weekday].length > 0 ? (
                        <ul>
                          {groupedEvents[weekday].map((event) => (
                            <li key={event.id} className="mb-2 p-2 border rounded-md bg-gray-100">
                              <div
                                onClick={() => handleEventClick(event)}
                                className="cursor-pointer text-gray-800"
                              >
                                <h4 className="font-semibold">{event.title}</h4>
                                <p>{event.time}</p>
                              </div>
                              <div className="flex justify-between mt-2">
                                <button
                                  onClick={() => handleDeleteEvent(event.id)}
                                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                                >
                                  Delete
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-400">No events</p>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventManager;
