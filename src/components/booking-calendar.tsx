'use client';

import React, { useState } from 'react';
import { ChevronsRight, ChevronsLeft, ChevronsUp, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Event } from '@/lib/firebase/firestore';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

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

function getHourBookedData(events: Event[], date: Date, hour: string) {
  if (events.length === 0) return undefined;

  return events.find(
    (event) =>
      event.date.year === date.getFullYear() &&
      event.date.month === date.getMonth() &&
      event.date.date === date.getDate() &&
      event.times.includes(hour),
  );
}

function BookingForm({
  className,
}: React.ComponentProps<'form'> & { className?: string }) {
  return (
    <form className={cn('grid items-start gap-4', className)}>
      {/* TODO: complete form layout */}
      <select className="grid gap-2">
        <option value="test">test</option>
      </select>
      <Button type="submit">Save changes</Button>
    </form>
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
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

type BookingCalendarProps = {
  events: Event[] | undefined;
};

export default function BookingCalendar({ events = [] }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const selectedWeek = getWeekFromDate(selectedDate);

  const switchToThisWeek = () => setSelectedDate(new Date());

  const switchToPreviousWeek = () =>
    setSelectedDate(
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() - 7,
      ),
    );

  const switchToNextWeek = () =>
    setSelectedDate(
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() + 7,
      ),
    );

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between py-1 md:py-2">
        <h3 className="text-2xl font-semibold md:text-3xl">{`${selectedDate.getFullYear()} ${MONTHS_OF_YEAR[selectedDate.getMonth()]}`}</h3>
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
            {selectedWeek.map((date, index) => (
              <TableHead key={date.toString()} className="p-0 text-xs">
                <div className="flex flex-col items-center justify-center md:flex-row md:gap-x-2 md:text-base">
                  <p>{selectedWeek[index].getDate()}</p>
                  <p>{DAYS_OF_WEEK[date.getDay()]}</p>
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
                <ChevronsUp className="h-4 stroke-muted-foreground" />
              </Button>
            </TableCell>
          </TableRow>
          {isDesktop ? (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              {HOURS_OF_DAY.map((hour) => (
                <TableRow key={hour.value}>
                  <TableCell className="p-0 text-2xs text-muted-foreground md:text-xs">
                    {hour.label}
                  </TableCell>
                  {selectedWeek.map((currentDate) => {
                    const bookedData = getHourBookedData(
                      events,
                      currentDate,
                      hour.value,
                    );
                    return (
                      <TableCell
                        key={currentDate.toString()}
                        className="px-0.5 py-2 md:px-2 md:py-4"
                      >
                        <DialogTrigger asChild>
                          {bookedData ? (
                            <Button
                              variant="outline"
                              className="h-10 max-h-10 w-full whitespace-normal px-1 py-0"
                            >
                              <p className="line-clamp-2 text-2xs md:line-clamp-1 md:text-xs">
                                {bookedData.bandName}
                              </p>
                            </Button>
                          ) : (
                            <Button variant="outline" className="h-10 w-full">
                              <Plus className="w-4 min-w-2" />
                            </Button>
                          )}
                        </DialogTrigger>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    {`Make changes to your profile here. Click save when you're done.`}
                  </DialogDescription>
                </DialogHeader>
                <BookingForm />
              </DialogContent>
            </Dialog>
          ) : (
            <Drawer open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              {HOURS_OF_DAY.map((hour) => (
                <TableRow key={hour.value}>
                  <TableCell className="p-0 text-2xs text-muted-foreground md:text-xs">
                    {hour.label}
                  </TableCell>
                  {selectedWeek.map((date) => {
                    const bookedData = getHourBookedData(
                      events,
                      date,
                      hour.value,
                    );
                    return (
                      <TableCell
                        key={date.toString()}
                        className="px-0.5 py-2 md:px-2 md:py-4"
                      >
                        <DrawerTrigger asChild>
                          {bookedData ? (
                            <Button
                              variant="outline"
                              className="h-10 max-h-10 w-full whitespace-normal px-1 py-0"
                            >
                              <p className="line-clamp-2 text-2xs md:line-clamp-1 md:text-xs">
                                {bookedData.bandName}
                              </p>
                            </Button>
                          ) : (
                            <Button variant="outline" className="h-10 w-full">
                              <Plus className="w-4 min-w-2" />
                            </Button>
                          )}
                        </DrawerTrigger>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Edit profile</DrawerTitle>
                  <DrawerDescription>
                    {`Make changes to your profile here. Click save when you're done.`}
                  </DrawerDescription>
                </DrawerHeader>
                <BookingForm className="px-4" />
                <DrawerFooter className="pt-2">
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
