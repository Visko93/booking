import { observer } from "mobx-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import { Button } from "components/ui/button";
import { useEffect, useState } from "react";
import bookingStore, { Booking } from "@/store/BookingStore";
import { BookingActions } from "./BookingActions";

export const BookingCardDialog = observer(({ id }: { id: number }) => {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    try {
      const booking = bookingStore.getBooking(id);
      if (!booking) return;
      setBooking(booking);
    } catch (error) {
      throw new Error(error as any);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleSubmission = (data: Booking) => {
    if (!booking) return;
    bookingStore.updateBooking({
      id: booking.id,
      updatedBooking: data,
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[300px] lg:max-w-[500px] p-4">
        {loading ? (
          <>
            <DialogHeader>
              <DialogTitle>Loading...</DialogTitle>
            </DialogHeader>
          </>
        ) : (
          <>
            {" "}
            <DialogHeader>
              <DialogTitle>{booking?.name}</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <BookingActions
              id={booking?.id}
              handleSubmission={handleSubmission}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
});
