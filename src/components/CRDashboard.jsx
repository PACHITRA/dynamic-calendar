import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import {
  viewDay,
  viewWeek,
  viewMonthGrid,
  viewMonthAgenda,
} from '@schedule-x/calendar';

import '@schedule-x/theme-default/dist/index.css';

function App() {
  const calendarControls = createCalendarControlsPlugin();

  const calendar = useCalendarApp({
    isDark: true,
    weekOptions: {
      gridHeight: 300,
      nDays: 6,
    },
    defaultView: viewWeek.name,
    views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
    plugins: [
      createEventModalPlugin(),
      createDragAndDropPlugin(),
      calendarControls, 
    ],
    dayBoundaries: {
      start: '08:55',
      end: '18:00', 
    },
    events: [
      { id: '1', title: 'OS', start: '2024-12-28 09:00', end: '2024-12-28 09:55' },
      { id: '2', title: 'CNC', start: '2024-12-28 10:00', end: '2024-12-28 10:55' },
    ],
    backgroundEvents: [
 
      
      {
        title: 'Out of office',
        start: '2024-09-03',
        end: '2024-09-03',
        style: {
          
          backgroundImage: 'repeating-linear-gradient(45deg, #ccc, #ccc 5px, transparent 5px, transparent 10px)',
          opacity: 0.5,
        },
      },
   
    
      {
        title: 'Out of office',
        start: '2024-09-02 00:00',
        end: '2024-09-02 02:00',
        style: {
          background: 'linear-gradient(45deg, #f91c45, #1c7df9)',
          opacity: 0.5,
        },
      },
   
      {
        title: 'Holiday',
        start: '2024-09-05',
        end: '2024-09-07',
        style: {
          backgroundImage: 'repeating-linear-gradient(45deg, #1cf9b0, #1cf9b0 5px, transparent 5px, transparent 10px)',
          opacity: 0.5,
        },
      }
    ],
  });
  calendarControls.setView('week');
  

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-blue-400 to-purple-500">
       
        
        <ScheduleXCalendar calendarApp={calendar} />
      
    </div>
  );
}

export default App;
