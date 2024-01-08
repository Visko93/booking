import { observable, action, computed, makeObservable } from "mobx";

export interface Booking {
  id: number;
  name: string;
  destination: string;
  initialDate: Date;
  finalDate: Date;
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
    bookingId,
    updatedBooking,
  }: {
    bookingId: number;
    updatedBooking: Booking;
  }) {
    const index = this.bookings.findIndex(
      (booking) => booking.id === bookingId
    );
    if (index !== -1) {
      this.bookings[index] = updatedBooking;
    }
  }

  @action deleteBooking(bookingId: number) {
    this.bookings = this.bookings.filter((booking) => booking.id !== bookingId);
  }

  @computed get bookingsCount() {
    return this.bookings.length;
  }
}

const bookingStore = new BookingStore();
export default bookingStore;
