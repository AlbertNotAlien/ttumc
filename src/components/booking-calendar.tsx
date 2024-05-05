'use client';

import React, { useState } from 'react';
import { ChevronsRight, ChevronsLeft, ChevronsUp, Plus } from 'lucide-react';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const DUMMY_DATA = {
  currentYear: '2024',
  currentMonth: 'April',
  currentWeek: [
    { year: 2024, month: 4, date: 28, day: 0 },
    { year: 2024, month: 4, date: 29, day: 1 },
    { year: 2024, month: 4, date: 30, day: 2 },
    { year: 2024, month: 5, date: 1, day: 3 },
    { year: 2024, month: 5, date: 2, day: 4 },
    { year: 2024, month: 5, date: 3, day: 5 },
    { year: 2024, month: 5, date: 4, day: 6 },
  ],
  bookedData: [
    {
      bandName: '大同大同',
      date: { year: 2024, month: 4, date: 5, day: 0 },
      times: ['01:00', '05:00'],
    },
  ],
};

const MONTHS_OF_YEAR = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const HOURS_OF_DAY = [
  { value: '00:00', label: '12 AM' },
  { value: '01:00', label: '1 AM' },
  { value: '02:00', label: '2 AM' },
  { value: '03:00', label: '3 AM' },
  { value: '04:00', label: '4 AM' },
  { value: '05:00', label: '5 AM' },
  { value: '06:00', label: '6 AM' },
  { value: '07:00', label: '7 AM' },
  { value: '08:00', label: '8 AM' },
  { value: '09:00', label: '9 AM' },
  { value: '10:00', label: '10 AM' },
  { value: '11:00', label: '11 AM' },
  { value: '12:00', label: '12 PM' },
  { value: '13:00', label: '1 PM' },
  { value: '14:00', label: '2 PM' },
  { value: '15:00', label: '3 PM' },
  { value: '16:00', label: '4 PM' },
  { value: '17:00', label: '5 PM' },
  { value: '18:00', label: '6 PM' },
  { value: '19:00', label: '7 PM' },
  { value: '20:00', label: '8 PM' },
  { value: '21:00', label: '9 PM' },
  { value: '22:00', label: '10 PM' },
  { value: '23:00', label: '11 PM' },
];

function getWeekFromDate(date: Date) {
  return Array.from({ length: 7 }, (_, index) => {
    const currentDate = new Date(date);
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() - currentDate.getDay());
    const day = new Date(firstDayOfWeek);
    day.setDate(day.getDate() + index);
    return day;
  });
}

function isHourBooked(date: Date, hour: string) {
  return DUMMY_DATA.bookedData.some(
    (booking) =>
      booking.date.year === date.getFullYear() &&
      booking.date.month === date.getMonth() &&
      booking.date.date === date.getDate() &&
      booking.times.includes(hour),
  );
}

type CalendarControlsProps = {
  switchToPreviousWeek: React.MouseEventHandler<HTMLButtonElement>;
  switchToThisWeek: React.MouseEventHandler<HTMLButtonElement>;
  switchToNextWeek: React.MouseEventHandler<HTMLButtonElement>;
};

function CalendarControls({
  switchToPreviousWeek,
  switchToThisWeek,
  switchToNextWeek,
}: CalendarControlsProps) {
  return (
    <div className="flex">
      <Button variant="ghost" size="icon" onClick={switchToPreviousWeek}>
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      <Button variant="ghost" onClick={switchToThisWeek}>
        Today
      </Button>
      <Button variant="ghost" size="icon" onClick={switchToNextWeek}>
        <ChevronsRight name="chevrons-right" className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function BookingCalendar() {
  const [date, setDate] = useState(new Date());
  const currentWeek = getWeekFromDate(date);

  const switchToThisWeek = () => {
    const today = new Date();
    setDate(today);
  };

  const switchToPreviousWeek = () => {
    const dateBeforeAWeek = new Date(date);
    dateBeforeAWeek.setDate(dateBeforeAWeek.getDate() - 7);
    setDate(dateBeforeAWeek);
  };

  const switchToNextWeek = () => {
    const dateAfterAWeek = new Date(date);
    dateAfterAWeek.setDate(dateAfterAWeek.getDate() + 7);
    setDate(dateAfterAWeek);
  };

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between py-1 md:py-2">
        <h3 className="text-2xl font-semibold md:text-3xl">{`${date.getFullYear()} ${MONTHS_OF_YEAR[date.getMonth()]}`}</h3>
        <CalendarControls
          switchToPreviousWeek={switchToPreviousWeek}
          switchToThisWeek={switchToThisWeek}
          switchToNextWeek={switchToNextWeek}
        />
      </div>
      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-8 md:w-14" />
            {currentWeek.map((_date, index) => (
              <TableHead key={_date.toString()} className="p-0 text-xs">
                <div className="flex flex-col items-center justify-center md:flex-row md:gap-x-2 md:text-base">
                  <p>{currentWeek[index].getDate()}</p>
                  <p>{DAYS_OF_WEEK[_date.getDay()]}</p>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={8} className="p-0">
              <Button
                variant="ghost"
                className="flex h-10 w-full items-center justify-center"
              >
                <ChevronsUp
                  name="chevrons-up"
                  className="h-4 stroke-muted-foreground"
                />
              </Button>
            </TableCell>
          </TableRow>
          {HOURS_OF_DAY.map((hour) => (
            <TableRow key={hour.value}>
              <TableCell className="p-0 text-2xs text-muted-foreground md:text-xs">
                {hour.label}
              </TableCell>
              {currentWeek.map((_date) => (
                <TableCell
                  key={_date.toString()}
                  className="px-0.5 py-2 md:px-2 md:py-4"
                >
                  {isHourBooked(_date, hour.value) ? (
                    <Button
                      variant="outline"
                      className="h-10 max-h-10 w-full whitespace-normal px-1 py-0"
                    >
                      <p className="line-clamp-2 text-2xs md:line-clamp-1 md:text-xs">
                        {DUMMY_DATA.bookedData[0].bandName}
                      </p>
                    </Button>
                  ) : (
                    <Button variant="outline" className="h-10 w-full">
                      <Plus name="plus" className="w-4 min-w-2" />
                    </Button>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
