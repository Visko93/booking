import bookingStore, { Booking } from "@/store/BookingStore";
import { useState } from "react";
import { DateRange } from "react-day-picker";

interface BookingErrors {
  name: string | null;
  destination: string | null;
  initialDate: string | null;
  finalDate: string | null;
}

export const initialState = {
  id: bookingStore.bookings.length + 1,
  name: "",
  destination: "",
  initialDate: "",
  finalDate: "",
};

const initialStateErrors = {
  name: null,
  destination: null,
  initialDate: null,
  finalDate: null,
};

export const useBooking = () => {
  const [currentBooking, setCurrentBooking] = useState(initialState);
  const [error, setError] = useState<BookingErrors>(initialStateErrors);

  const validateBooking = (booking: Booking) => {
    if (!booking.name || booking.name === "") {
      setError((prev) => ({ ...prev, name: "Name is required" }));
      return false;
    }
    if (!booking.destination || booking.destination === "") {
      setError((prev) => ({ ...prev, destination: "Destination is required" }));
      return false;
    }
    if (!booking.initialDate) {
      setError((prev) => ({
        ...prev,
        initialDate: "Initial date is required",
      }));
      return false;
    }
    if (!booking.finalDate) {
      setError((prev) => ({ ...prev, finalDate: "Final date is required" }));
      return false;
    }
  };

  const handleCreate = () => {
    const isValid = validateBooking(currentBooking);
    if (!isValid) return;

    bookingStore.createBooking({
      id: currentBooking.id,
      name: currentBooking.name,
      destination: currentBooking.destination,
      initialDate: currentBooking.initialDate,
      finalDate: currentBooking.finalDate,
    });

    setCurrentBooking(initialState);
  };

  const handleUpdate = (booking: Booking) => {
    bookingStore.updateBooking({
      id: booking.id,
      updatedBooking: booking,
    });
  };

  const handleDelete = (bookingId: number) => {
    bookingStore.deleteBooking(bookingId);
  };

  return {
    currentBooking,
    error,
    setCurrentBooking,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};
