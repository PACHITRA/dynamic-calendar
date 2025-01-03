import React, { useState, useMemo } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createCalendarControlsPlugin } from "@schedule-x/calendar-controls";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { viewDay, viewWeek, viewMonthAgenda } from "@schedule-x/calendar";
import { LogOut } from "lucide-react";
import "@schedule-x/theme-default/dist/index.css";

const CALENDAR_CONFIG = {
  isDark: true,
  weekOptions: {
    gridHeight: 300,
    nDays: 6,
  },
  defaultView: viewWeek.name,
  views: [viewDay, viewWeek, viewMonthAgenda],
  dayBoundaries: {
    start: "08:55",
    end: "18:00",
  },
};

const INITIAL_EVENTS = [
  { 
    id: "1", 
    title: "ME", 
    start: "2024-12-28 09:00", 
    end: "2024-12-28 09:55" 
  },
  { 
    id: "2", 
    title: "CNC", 
    start: "2024-12-28 10:00", 
    end: "2024-12-28 10:55" 
  },
];

const BACKGROUND_EVENTS = [
  {
    title: "Out of office",
    start: "2024-09-03",
    end: "2024-09-03",
    style: {
      backgroundImage:
        "repeating-linear-gradient(45deg, #ccc, #ccc 5px, transparent 5px, transparent 10px)",
      opacity: 0.5,
    },
  },
  {
    title: "Out of office",
    start: "2024-09-02 00:00",
    end: "2024-09-02 02:00",
    style: {
      background: "linear-gradient(45deg, #f91c45, #1c7df9)",
      opacity: 0.5,
    },
  },
  {
    title: "Holiday",
    start: "2024-09-05",
    end: "2024-09-07",
    style: {
      backgroundImage:
        "repeating-linear-gradient(45deg, #1cf9b0, #1cf9b0 5px, transparent 5px, transparent 10px)",
      opacity: 0.5,
    },
  },
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const handleSignOut = () => {
    setIsAuthenticated(false);
    console.log("User signed out!");
  };

  const plugins = useMemo(() => {
    const calendarControls = createCalendarControlsPlugin();
    return [
      createEventModalPlugin(),
      createDragAndDropPlugin(),
      calendarControls,
    ];
  }, []);

  const calendar = useCalendarApp({
    ...CALENDAR_CONFIG,
    plugins,
    events: INITIAL_EVENTS,
    backgroundEvents: BACKGROUND_EVENTS,
  });

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen w-screen bg-gradient-to-r from-blue-400 to-purple-500 p-4">
        <h1 className="text-xl md:text-2xl font-bold text-white text-center">
          You have been signed out. Please log in again.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-r from-blue-400 to-purple-500">
      {/* Header area with sign-out button */}
      <div className="h-16 md:h-20 relative px-4 md:px-6">
        <div className="absolute top-4 md:top-6 right-4 md:right-6">
          <button
            onClick={handleSignOut}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="group relative flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/10 
                     backdrop-blur-md border border-white/20 rounded-lg
                     hover:bg-white/20 hover:border-white/30 transition-all duration-300 ease-in-out
                     shadow-lg hover:shadow-xl text-sm md:text-base"
          >
            <span className="text-white font-medium hidden sm:inline">Sign out</span>
            <LogOut 
              className={`w-4 h-4 text-white transition-transform duration-300 ${
                isHovering ? 'translate-x-1' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Centered calendar container */}
      <div className="flex-1 p-2 sm:p-4 md:px-8 md:pb-8">
        <div className="w-full h-full max-w-7xl mx-auto bg-transparent ">
          <div className="w-full h-full min-h-[500px] md:min-h-[600px] overflow-auto">
            <ScheduleXCalendar calendarApp={calendar} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;