import { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Button, ButtonGroup, Paper, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate } from "../../app/calendarSlice";

const locales = {
  'en-US': enUS
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

const mapDataToEvents = (data) => {
  if (!data) return [];

  return Object.keys(data).map(dateStr => {
    const [day, month, year] = dateStr.split('-');

    return {
      title: "", 
      start: new Date(year, month - 1, day),
      end: new Date(year, month - 1, day),
      allDay: true,
    };
  });
};


const CalenderView = ({ onDateSelect }) => {
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());

  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.calendar.selectedDate);
  const calendarData = useSelector((state) => state.calendar.data);
  
  const events = mapDataToEvents(calendarData);

  const handleSelectSlot = (slotInfo) => {
    const formattedDate = format(slotInfo.start, "dd-MM-yyyy");
    dispatch(setSelectedDate(formattedDate));
    if (onDateSelect) {
      onDateSelect();
    }
  };

  const handleSelectEvent = (event) => {
    const formattedDate = format(event.start, "dd-MM-yyyy");
    dispatch(setSelectedDate(formattedDate));
    if (onDateSelect) {
      onDateSelect();
    }
  };

  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const CustomToolbar = ({ label, onNavigate, onView }) => (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 3,
      flexWrap: 'wrap',
      gap: 2
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => onNavigate('TODAY')}
          sx={{
            borderColor: '#2196F3',
            color: '#2196F3',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              borderColor: '#1976D2',
              bgcolor: '#E3F2FD'
            }
          }}
        >
          Today
        </Button>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => onNavigate('PREV')}
            sx={{
              minWidth: '40px',
              borderColor: '#E0E0E0',
              color: '#666',
              '&:hover': {
                borderColor: '#2196F3',
                bgcolor: '#E3F2FD',
                color: '#2196F3'
              }
            }}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => onNavigate('NEXT')}
            sx={{
              minWidth: '40px',
              borderColor: '#E0E0E0',
              color: '#666',
              '&:hover': {
                borderColor: '#2196F3',
                bgcolor: '#E3F2FD',
                color: '#2196F3'
              }
            }}
          >
            <ChevronRightIcon />
          </Button>
        </Box>
      </Box>

      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: '#1A1A1A',
          display: 'flex',
          // alignItems: 'center',
          gap: 1
        }}
      >
        <CalendarTodayIcon sx={{ fontSize: 20,mt:0.5 }} />
        {label}
      </Typography>

      <ButtonGroup variant="outlined" size="small">
        <Button
          onClick={() => onView('month')}
          sx={{
            bgcolor: view === 'month' ? '#2196F3' : 'transparent',
            color: view === 'month' ? 'white' : '#666',
            borderColor: view === 'month' ? '#2196F3' : '#E0E0E0',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              bgcolor: view === 'month' ? '#1976D2' : '#E3F2FD',
              borderColor: '#2196F3',
              color: view === 'month' ? 'white' : '#2196F3'
            }
          }}
        >
          Month
        </Button>
        <Button
          onClick={() => onView('week')}
          sx={{
            bgcolor: view === 'week' ? '#2196F3' : 'transparent',
            color: view === 'week' ? 'white' : '#666',
            borderColor: view === 'week' ? '#2196F3' : '#E0E0E0',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              bgcolor: view === 'week' ? '#1976D2' : '#E3F2FD',
              borderColor: '#2196F3',
              color: view === 'week' ? 'white' : '#2196F3'
            }
          }}
        >
          Week
        </Button>
        <Button
          onClick={() => onView('day')}
          sx={{
            bgcolor: view === 'day' ? '#2196F3' : 'transparent',
            color: view === 'day' ? 'white' : '#666',
            borderColor: view === 'day' ? '#2196F3' : '#E0E0E0',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              bgcolor: view === 'day' ? '#1976D2' : '#E3F2FD',
              borderColor: '#2196F3',
              color: view === 'day' ? 'white' : '#2196F3'
            }
          }}
        >
          Day
        </Button>
      </ButtonGroup>
    </Box>
  );

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        bgcolor: 'white',
        borderRadius: 2,
        border: '1px solid #E0E0E0',
        '& .rbc-calendar': {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
        },
        '& .rbc-header': {
          padding: '12px 0',
          fontWeight: 600,
          color: '#666',
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          borderBottom: '2px solid #E3F2FD'
        },
        '& .rbc-date-cell': {
          padding: '8px',
          textAlign: 'right'
        },
        '& .rbc-today': {
          bgcolor: '#E3F2FD'
        },
        '& .rbc-off-range-bg': {
          bgcolor: '#FAFAFA'
        },
        '& .rbc-event': {
          bgcolor: '#2196F3',
          borderRadius: '4px',
          border: 'none',
          padding: '4px 8px',
          fontSize: '0.875rem',
          fontWeight: 500,
          boxShadow: '0 1px 3px rgba(33, 150, 243, 0.3)'
        },
        '& .rbc-event:hover': {
          bgcolor: '#1976D2'
        },
        '& .rbc-day-bg:hover': {
          bgcolor: '#F5F5F5',
          cursor: 'pointer'
        },
        '& .rbc-selected-cell': {
          bgcolor: '#BBDEFB'
        },
        '& .rbc-month-view, & .rbc-time-view, & .rbc-agenda-view': {
          border: 'none',
          borderRadius: '8px',
          overflow: 'hidden'
        },
        '& .rbc-month-row': {
          borderTop: '1px solid #E0E0E0',
          minHeight: '100px'
        },
        '& .rbc-day-slot': {
          borderTop: '1px solid #E0E0E0'
        },
        '& .rbc-time-slot': {
          borderTop: '1px solid #F5F5F5'
        },
        '& .rbc-current-time-indicator': {
          bgcolor: '#2196F3',
          height: '2px'
        }
      }}
    >
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        views={['month', 'week', 'day']}
        view={view}
        onView={handleViewChange}
        date={date}
        onNavigate={handleNavigate}
        style={{ height: 600 }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        components={{
          toolbar: CustomToolbar
        }}
        eventPropGetter={() => ({
  style: {
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
  },
})}

dayPropGetter={(date) => {
  const formatted = format(date, "dd-MM-yyyy");
  const hasData = calendarData?.[formatted];

  if (selectedDate === formatted) {
    return {
      className: hasData ? "has-data" : "",
      style: {
        backgroundColor: "#BBDEFB",
        border: "2px solid #2196F3",
        borderRadius: "8px",
      },
    };
  }

  if (hasData) {
    return {
      className: "has-data",
    };
  }
}}

      />
    </Paper>
  );
};

export default CalenderView;