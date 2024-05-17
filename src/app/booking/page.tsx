import React from 'react';
import { getEvents } from '@/lib/firebase/firestore';
import BookingCalendar from '@/components/booking-calendar';

export default async function Home() {
  const events = await getEvents();

  return <BookingCalendar events={events} />;
}
