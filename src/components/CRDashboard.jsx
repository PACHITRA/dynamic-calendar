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
  const calendarControls = createCalendarControlsPlugin(); // Create the controls plugin

  const calendar = useCalendarApp({
    defaultView: viewWeek.name,
    views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
    plugins: [
      createEventModalPlugin(),
      createDragAndDropPlugin(),
      calendarControls, // Include controls plugin
    ],
    dayBoundaries: {
      start: '09:00',
      end: '16:30', // Set day boundaries here
    },
    events: [
      { id: '1', title: 'OS', start: '2024-12-28 09:00', end: '2024-12-28 09:55' },
      { id: '2', title: 'CNC', start: '2024-12-28 10:00', end: '2024-12-28 10:55' },
    ],
  });

  // Optional: Programmatically set view and date
  calendarControls.setView('week');
  calendarControls.setDate('2024-12-28');

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default App;
