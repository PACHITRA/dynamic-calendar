
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import {
  viewWeek,
  viewDay,
  viewMonthGrid,
  viewMonthAgenda,
} from '@schedule-x/calendar';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';

// Remember to also set your styles to the wrapper element .sx-react-calendar-wrapper
// For example:
// .sx-react-calendar-wrapper {
//   width: 100%;
//   height: 800px;
//   max-height:90vh;
// }
//
// For best mobile experience, you might consider 100vw and 100% of the container element's height
import '@schedule-x/theme-default/dist/index.css';
import CustomTimeGridEvent from '../components/CustomTimeGridEvent';
import CustomDateGridEvent from '../components/CustomDateGridEvent';

function App() {
  const calendar = useCalendarApp({
    defaultView: viewWeek.name,
    views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
    plugins: [createEventModalPlugin(), createDragAndDropPlugin()],
    events: [
      {
        id: '1',
        title: 'OS',
        start: '2024-12-28 09:00',
        end: '2024-12-28 09:55',
      },
      {
        id: '2',
        title: 'CNC',
        start: '2024-12-28 10:00',
        end: '2024-12-28 10:55',
      },
    ],
  });

  return (
    <div>
      <ScheduleXCalendar
        calendarApp={calendar}
        customComponents={{
          timeGridEvent: CustomTimeGridEvent,
          dateGridEvent: CustomDateGridEvent,
        }}
      />
    </div>
  );
}

export default App;
