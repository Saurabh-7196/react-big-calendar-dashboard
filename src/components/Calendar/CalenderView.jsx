import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate } from "../../app/calendarSlice";
import { mapDataToEvents } from "./calendarUtils";

const locales = {
  "en-US": enUS
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});


const CalendarView = () => {
  const dispatch = useDispatch();
  const calendarData = useSelector((state) => state.calendar.data);

  const events = mapDataToEvents(calendarData);

  const handleSelectSlot = (slotInfo) => {
    dispatch(setSelectedDate(slotInfo.start));
  };

  const handleSelectEvent = (event) => {
    dispatch(setSelectedDate(event.start));
  };

  const selectedDate = useSelector(
    (state) => state.calendar.selectedDate
  );


  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      selectable
      views={["month", "week", "day"]}
      style={{ height: 500 }}
      onSelectSlot={handleSelectSlot}
      onSelectEvent={handleSelectEvent}
      dayPropGetter={(date) => {
        if (
          selectedDate &&
          date.toDateString() === new Date(selectedDate).toDateString()
        ) {
          return {
            style: {
              backgroundColor: "#90CAF9"
            }
          };
        }
      }}
    />
  );
};

export default CalendarView;
