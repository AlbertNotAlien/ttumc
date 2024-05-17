import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';

export type Event = {
  bandName: string;
  date: { year: number; month: number; date: number; day: number };
  times: string[];
};

export async function getEvents(): Promise<Event[] | undefined> {
  try {
    const colRef = collection(db, 'events');
    const colSnapshot = await getDocs(colRef);
    const data: Event[] = colSnapshot.docs.map((doc) => {
      const { band_name, date, times, ...rest } = doc.data();
      return {
        bandName: band_name,
        date: date,
        times: times,
        ...rest,
      };
    });
    return data;
  } catch (error) {
    console.error('[Firestore] Failed to get events data: ', error);
  }
}
