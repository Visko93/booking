import { observer } from "mobx-react";
import { BookingActions } from "../booking/BookingActions";
import bookingStore, { Booking } from "@/store/BookingStore";

export const Hero = observer(() => {
  const handleSubmission = (data: Booking) => {
    if (!data) return;
    bookingStore.createBooking(data);
  };
  return (
    <div className="flex flex-col justify-center items-center bg-hero-pattern bg-cover bg-center bg-no-repeat h-[500px]">
      <h1 className="text-4xl font-bold text-slate-100 text-center mb-2">
        Book your staying!
      </h1>
      <BookingActions handleSubmission={handleSubmission} />
    </div>
  );
});
