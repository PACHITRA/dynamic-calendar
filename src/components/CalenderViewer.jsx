/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function CalendarViewer({ events = [] }) {
  const [currentView, setCurrentView] = useState('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [groupedEvents, setGroupedEvents] = useState({});

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    const eventsArray = Array.isArray(events) ? events : [];
    const grouped = eventsArray.reduce((acc, event) => {
      const eventKey = new Date(event.date).toDateString();
      acc[eventKey] = [...(acc[eventKey] || []), event];
      return acc;
    }, {});
    setGroupedEvents(grouped);
  }, [currentDate, events]);

  const navigateDate = (amount) => {
    const newDate = new Date(currentDate);
    switch (currentView) {
      case 'day':
        newDate.setDate(currentDate.getDate() + amount);
        break;
      case 'week':
        newDate.setDate(currentDate.getDate() + amount * 7);
        break;
      case 'month':
        newDate.setMonth(currentDate.getMonth() + amount);
        break;
    }
    setCurrentDate(newDate);
  };

  const getWeekday = (date) => {
    let day = date.getDay();
    return day === 0 ? 6 : day - 1;
  };

  const EventCard = ({ event }) => (
    <div className="p-2 my-1 bg-blue-50 rounded hover:bg-blue-100 transition-colors">
      <p className="text-sm font-medium">{event.title}</p>
      <p className="text-xs text-gray-600">{event.time}</p>
    </div>
  );

  const DayColumn = ({ date }) => (
    <div className="flex-1 min-w-[120px] p-2 border-r last:border-r-0">
      <div className={`text-center mb-2 p-1 rounded ${
        date.toDateString() === new Date().toDateString() ? 'bg-blue-100' : ''
      }`}>
        <p className="font-medium">{weekdays[getWeekday(date)]}</p>
        <p className="text-sm text-gray-600">{date.toLocaleDateString()}</p>
      </div>
      <div className="space-y-1">
        {groupedEvents[date.toDateString()]?.map(event => (
          <EventCard key={event.id} event={event} />
        )) || (
          <p className="text-sm text-gray-500 text-center">No events</p>
        )}
      </div>
    </div>
  );

  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    const currentWeekday = getWeekday(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentWeekday);
    
    return (
      <div className="flex overflow-x-auto">
        {Array.from({ length: 7 }).map((_, index) => {
          const date = new Date(startOfWeek);
          date.setDate(startOfWeek.getDate() + index);
          return <DayColumn key={date.toDateString()} date={date} />;
        })}
      </div>
    );
  };

  const renderMonthView = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const firstWeekday = getWeekday(firstDay);
    firstDay.setDate(1 - firstWeekday);
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {weekdays.map(day => (
          <div key={day} className="text-center font-medium p-2">
            {day.slice(0, 3)}
          </div>
        ))}
        {Array.from({ length: 42 }).map((_, index) => {
          const date = new Date(firstDay);
          date.setDate(firstDay.getDate() + index);
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          
          return (
            <div key={date.toDateString()} 
                 className={`p-2 min-h-[100px] border rounded ${
                   isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                 }`}>
              <p className={`text-sm ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}`}>
                {date.getDate()}
              </p>
              <div className="space-y-1">
                {groupedEvents[date.toDateString()]?.slice(0, 2).map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
                {(groupedEvents[date.toDateString()]?.length || 0) > 2 && (
                  <p className="text-xs text-gray-500">
                    +{groupedEvents[date.toDateString()].length - 2} more
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDayView = () => (
    <div className="min-h-[400px] p-4 border rounded">
      <div className="mb-4">
        <h3 className="text-lg font-medium">
          {currentDate.toLocaleDateString(undefined, { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </h3>
      </div>
      <div className="space-y-2">
        {groupedEvents[currentDate.toDateString()]?.map(event => (
          <EventCard key={event.id} event={event} />
        )) || (
          <p className="text-gray-500">No events scheduled</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto border rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="space-x-2">
            <button
              onClick={() => setCurrentView('day')}
              className={`px-3 py-1 text-sm border rounded hover:bg-gray-50 ${
                currentView === 'day' ? 'bg-blue-100' : ''
              }`}>
              Day
            </button>
            <button
              onClick={() => setCurrentView('week')}
              className={`px-3 py-1 text-sm border rounded hover:bg-gray-50 ${
                currentView === 'week' ? 'bg-blue-100' : ''
              }`}>
              Week
            </button>
            <button
              onClick={() => setCurrentView('month')}
              className={`px-3 py-1 text-sm border rounded hover:bg-gray-50 ${
                currentView === 'month' ? 'bg-blue-100' : ''
              }`}>
              Month
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateDate(-1)}
              className="p-1 border rounded hover:bg-gray-50"
              aria-label="Previous">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
              Today
            </button>
            <button
              onClick={() => navigateDate(1)}
              className="p-1 border rounded hover:bg-gray-50"
              aria-label="Next">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        {currentView === 'week' && renderWeekView()}
        {currentView === 'month' && renderMonthView()}
        {currentView === 'day' && renderDayView()}
      </div>
    </div>
  );
}

export default CalendarViewer;