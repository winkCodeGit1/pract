import { useState } from 'react';
import './style.css';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
//
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { isBefore } from 'date-fns';
//
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function Days({ currentDate, selectedDates, setSelectedDates, selectedShift, isMouseEnter }) {
  const handleDateClick = (date) => {
    const selectedDateIndex = selectedDates.findIndex(
      (selectedDate) => selectedDate.date.getTime() === date.getTime()
    );

    if (selectedDateIndex === -1) {
      setSelectedDates([...selectedDates, { date, type: selectedShift }]);
    } else {
      const updatedDates = selectedDates.filter(
        (selectedDate) => selectedDate.date.getTime() !== date.getTime()
      );
      setSelectedDates(updatedDates);
    }
  };

  function isDayInDate(day, date, offset) {
    if (typeof day === 'string') {
      if (day) {
        const dayOfWeek = date.getDay();
        return daysOfWeek[dayOfWeek] === day;
      }
    } else {
      const weekNumber = day;
      if (day !== '') {
        const currentWeekNumber = Math.floor((date.getDate() + offset) / 7);
        return currentWeekNumber === weekNumber;
      }
    }

    return false;
  }

  return Array.from(
    { length: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate() },
    (_, index) => {
      const day = index + 1;
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const firstDayOfWeek = firstDayOfMonth.getDay();
      const offset = (firstDayOfWeek === 0 ? 7 : firstDayOfWeek) - 1;

      const isSelected = selectedDates.find(
        (selectedDate) => selectedDate.date.getTime() === date.getTime()
      );
      const isPast = isBefore(date, newDate);

      return (
        <button
          type='button'
          key={day}
          className={`calendar-day${isPast ? ' disabled' : ''}${
            isSelected ? ` selected ${isSelected.type}` : ''
          }${isDayInDate(isMouseEnter, date, offset) ? ` hovered ${selectedShift}` : ''}`}
          onClick={() => handleDateClick(date)}
          disabled={isPast}
        >
          {day}
        </button>
      );
    }
  );
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}
function getWeeksInMonth(currentDate) {
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

  // Calculate the number of full weeks in the month including first week (+1)
  const numFullWeeks = Math.floor((lastDayOfMonth - (7 - getFirstDayOfMonth(year, month))) / 7) + 1;

  // Calculate the remaining days after the full weeks
  const remainingDays = (lastDayOfMonth - (7 - getFirstDayOfMonth(year, month))) % 7;

  // Calculate the total number of weeks in the month (including partial weeks)
  const totalWeeks = numFullWeeks + (remainingDays > 0 ? 1 : 0);

  return totalWeeks;
}
const newDate = new Date();

function getDatesInWeekOfMonth(targetWeek, currentDate) {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const firstDayOfTargetWeek = (targetWeek - 1) * 7 - firstDayOfMonth + 1;
  const datesInTargetWeek = [];
  for (let i = 0; i < 7; i++) {
    const day = firstDayOfTargetWeek + i;
    if (day >= 1 && day <= new Date(currentYear, currentMonth + 1, 0).getDate()) {
      datesInTargetWeek.push(new Date(currentYear, currentMonth, day));
    }
  }
  return datesInTargetWeek;
}

const Calendar = ({ selectedDates, setSelectedDates }) => {
  const [currentDate, setCurrentDate] = useState(newDate);
  const [selectedShift, setSelectedShift] = useState('morning');
  const [isMouseEnter, setIsMouseEnter] = useState('');

  const handleShiftChange = (event) => {
    setSelectedShift(event.target.value);
  };

  const handleMonthChange = (monthOffset, yearOffset) => {
    const newDate = new Date(
      currentDate.getFullYear() + yearOffset,
      currentDate.getMonth() + monthOffset,
      1
    );
    setCurrentDate(newDate);
  };

  function handleSelectWeekDay(dayOfWeek) {
    const updatedDates = [...selectedDates];
    const dates = [];

    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    while (date.getMonth() === currentDate.getMonth()) {
      if (date.getDay() === dayOfWeek) {
        const existingIndex = updatedDates.findIndex(
          (selectedDate) => selectedDate.date.getTime() === date.getTime()
        );

        if (existingIndex === -1 && !isBefore(date, newDate)) {
          dates.push({ date: new Date(date), type: selectedShift });
        } else if (existingIndex !== -1) {
          updatedDates.splice(existingIndex, 1);
        }
      }
      date.setDate(date.getDate() + 1);
    }

    setSelectedDates([...updatedDates, ...dates]);
  }

  function handleSelectMonth() {
    const updatedDates = [...selectedDates];
    const dates = [];

    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    while (date.getMonth() === currentDate.getMonth()) {
      const existingIndex = updatedDates.findIndex((sd) => sd.date.getTime() === date.getTime());

      if (existingIndex === -1 && !isBefore(date, newDate)) {
        dates.push({ date: new Date(date), type: selectedShift });
      } else if (existingIndex !== -1) {
        updatedDates.splice(existingIndex, 1);
      }

      date.setDate(date.getDate() + 1);
    }
    setSelectedDates([...updatedDates, ...dates]);
  }

  function handleSelectWeek(weekNo) {
    const updatedDates = [...selectedDates];
    const dates = [];
    const targetDates = getDatesInWeekOfMonth(weekNo, currentDate);

    for (let i = 0; i < targetDates.length; i++) {
      const date = targetDates[i];
      const existingIndex = updatedDates.findIndex((sd) => sd.date.getTime() === date.getTime());

      if (existingIndex === -1 && !isBefore(date, newDate)) {
        dates.push({ date: new Date(date), type: selectedShift });
      } else if (existingIndex !== -1) {
        updatedDates.splice(existingIndex, 1);
      }
    }
    setSelectedDates([...updatedDates, ...dates]);
  }

  function handleMouseEnter(day) {
    setIsMouseEnter(day);
  }
  function handleMouseLeave() {
    setIsMouseEnter('');
  }

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const emptyCells = Array.from({ length: firstDayOfMonth }, (_, index) => (
    <div key={`empty-${index}`} className='empty-cell'></div>
  ));

  return (
    <Box maxWidth={1000} display='flex' direction='row'>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <div>
          <FormControl>
            <FormLabel id='group-label-shift-change'>
              Select an appropriate Shift and mark the calendar
            </FormLabel>
            <RadioGroup
              aria-labelledby='group-label-shift-change'
              value={selectedShift}
              onChange={handleShiftChange}
            >
              <FormControlLabel
                value='morning'
                control={<Radio sx={{ '&.MuiRadio-root.Mui-checked': { color: '#038003' } }} />}
                label={
                  <div>
                    {' '}
                    <div
                      style={{
                        backgroundColor: '#038003',
                        width: 12,
                        height: 12,
                        display: 'inline-block',
                      }}
                    >
                      {' '}
                    </div>{' '}
                    Morning
                  </div>
                }
              />
              <FormControlLabel
                value='evening'
                control={<Radio sx={{ '&.MuiRadio-root.Mui-checked': { color: '#FCA909' } }} />}
                label={
                  <div>
                    {' '}
                    <div
                      style={{
                        backgroundColor: '#FCA909',
                        width: 12,
                        height: 12,
                        display: 'inline-block',
                      }}
                    >
                      {' '}
                    </div>{' '}
                    Evening
                  </div>
                }
              />
              <FormControlLabel
                value='night'
                control={<Radio sx={{ '&.MuiRadio-root.Mui-checked': { color: '#7C9CAA' } }} />}
                label={
                  <div>
                    {' '}
                    <div
                      style={{
                        backgroundColor: '#7C9CAA',
                        width: 12,
                        height: 12,
                        display: 'inline-block',
                      }}
                    >
                      {' '}
                    </div>{' '}
                    Night
                  </div>
                }
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <Typography variant='caption' color='text.secondary'>
            <b>The days are clickable</b>
            <br />
            (E.g. when Monday is clicked, all Mondays of the month will be selected)
          </Typography>
          <br />
          <br />
          <Typography variant='caption' color='text.secondary'>
            Week and Days are toggle button
          </Typography>
        </div>
      </Box>

      <Divider flexItem orientation='vertical' />

      <div className='calendar-container'>
        <div className='calendar-header'>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <IconButton
              color='error'
              onClick={() => handleMonthChange(0, -1)}
              title='Previous Year'
            >
              <KeyboardDoubleArrowLeftIcon />
            </IconButton>
            <Typography variant='subtitle1'> {currentDate.getFullYear()}</Typography>
            <IconButton color='error' onClick={() => handleMonthChange(0, 1)} title='Next Year'>
              <KeyboardDoubleArrowRightIcon />
            </IconButton>
          </div>
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <IconButton onClick={() => handleMonthChange(-1, 0)} title='Previous Month'>
              <ChevronLeftIcon />
            </IconButton>
            <Typography
              variant='h4'
              color='text.secondary'
              title='Select All day'
              style={{ cursor: 'pointer' }}
              onClick={handleSelectMonth}
            >
              {months[currentDate.getMonth()]}
            </Typography>
            <IconButton onClick={() => handleMonthChange(1, 0)} title='Next Month'>
              <ChevronRightIcon />
            </IconButton>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
              gap: '10px',
              marginTop: '10px',
            }}
          >
            <Button disabled>#Weeks</Button>
            {Array.from({ length: getWeeksInMonth(currentDate) }, (_, index) => (
              <Button
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                onClick={() => handleSelectWeek(index + 1)}
              >
                Week - {index + 1}
              </Button>
            ))}
          </div>
          <div className='calendar'>
            {daysOfWeek.map((day, i) => (
              <Button
                onMouseEnter={() => handleMouseEnter(day)}
                onMouseLeave={() => handleMouseLeave(day)}
                key={day}
                className='day-of-week'
                onClick={() => handleSelectWeekDay(i)}
              >
                {day}
              </Button>
            ))}
            {emptyCells}
            <Days
              currentDate={currentDate}
              selectedDates={selectedDates}
              setSelectedDates={setSelectedDates}
              selectedShift={selectedShift}
              isMouseEnter={isMouseEnter}
            />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Calendar;
