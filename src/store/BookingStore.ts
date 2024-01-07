import { observable, action, computed } from "mobx";

interface Booking {
  id: number;
  name: string;
}

class BookingStore {
  @observable bookings: Booking[] = [];

  @action createBooking(booking: Booking) {
    this.bookings.push(booking);
  }

  @action updateBooking(bookingId: number, updatedBooking: Booking) {
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
