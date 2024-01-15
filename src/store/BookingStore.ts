import { observable, action, computed, makeObservable } from "mobx";

export interface Booking {
  id: number;
  name: string;
  destination: string;
  initialDate: string;
  finalDate: string;
}

class BookingStore {
  constructor() {
    makeObservable(this);
  }
  @observable bookings: Booking[] = [];

  @action createBooking(booking: Booking) {
    this.bookings.push(booking);
  }

  @action updateBooking({
    id,
    updatedBooking,
  }: {
    id: number;
    updatedBooking: Booking;
  }) {
    const index = this.bookings.findIndex((booking) => booking.id === id);
    if (index !== -1) {
      this.bookings[index] = updatedBooking;
    }
  }

  @action deleteBooking(bookingId: number) {
    this.bookings = this.bookings.filter((booking) => booking.id !== bookingId);
  }

  @action getBooking(id: number) {
    return this.bookings.find((booking) => booking.id === id);
  }

  @computed get bookingsCount() {
    return this.bookings.length;
  }
}

const bookingStore = new BookingStore();
export default bookingStore;
