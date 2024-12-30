import  { useState } from "react";

function DefaultTimetableManager() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    weekday: "",
    time: "",
  });
  const [draggedEvent, setDraggedEvent] = useState(null);

  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateOrUpdateEvent = () => {
    if (!formData.title || !formData.weekday || !formData.time) {
      alert("Please fill all fields.");
      return;
    }

    if (formData.id) {
      // Update event
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === formData.id
            ? { ...event, title: formData.title.toUpperCase(), weekday: formData.weekday, time: formData.time }
            : event
        )
      );
    } else {
      // Create new event
      const newEvent = {
        id: new Date().getTime().toString(),
        title: formData.title.toUpperCase(),
        weekday: formData.weekday,
        time: formData.time,
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }

    setFormData({ id: "", title: "", weekday: "", time: "" });
  };

  const handleCancel = () => {
    setFormData({ id: "", title: "", weekday: "", time: "" });
  };

  const handleEventClick = (event) => {
    setFormData({
      id: event.id,
      title: event.title,
      weekday: event.weekday,
      time: event.time,
    });
  };

  const handleDeleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  const handleDragStart = (event, draggedItem) => {
    setDraggedEvent(draggedItem);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (weekday) => {
    if (draggedEvent) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === draggedEvent.id ? { ...event, weekday } : event
        )
      );
      setDraggedEvent(null);
    }
  };

  const handleDeleteDrop = () => {
    if (draggedEvent) {
      handleDeleteEvent(draggedEvent.id);
      setDraggedEvent(null);
    }
  };

  const groupEventsByWeekday = (events) => {
    const groupedEvents = weekdays.reduce((acc, weekday) => {
      acc[weekday] = [];
      return acc;
    }, {});

    events.forEach((event) => {
      groupedEvents[event.weekday].push(event);
    });

    return groupedEvents;
  };

  const getColorForTitle = (title) => {
    const hash = Array.from(title).reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F39C12", "#8E44AD", "#16A085"];
    return colors[hash % colors.length];
  };

  const groupedEvents = groupEventsByWeekday(events);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
      <div className="max-w-4xl mx-auto bg-white text-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Default Timetable manager
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
                  onClick={handleCreateOrUpdateEvent}
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
                onClick={handleCreateOrUpdateEvent}
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
                  <td
                    key={weekday}
                    className="p-3 border-b text-center"
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(weekday)}
                  >
                    {groupedEvents[weekday].length > 0 ? (
                      <ul>
                        {groupedEvents[weekday].map((event) => (
                          <li
                            key={event.id}
                            className="mb-2 p-2 border rounded-md bg-blue-50 cursor-grab hover:bg-blue-100"
                            draggable
                            onDragStart={(e) => handleDragStart(e, event)}
                            onClick={() => handleEventClick(event)}
                            style={{ backgroundColor: getColorForTitle(event.title) }}
                          >
                            <h4 className="font-semibold text-white">{event.title}</h4>
                            <p>{event.time}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400">No events</p>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td colSpan={6} className="p-4 text-center">
                  <div
                    className="p-4 bg-red-500 hover:bg-red-600 text-white text-center rounded-md shadow-lg cursor-pointer"
                    onDragOver={handleDragOver}
                    onDrop={handleDeleteDrop}
                  >
                    Drag here to delete 🗑️
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DefaultTimetableManager;