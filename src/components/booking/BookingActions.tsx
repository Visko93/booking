import bookingStore, { Booking } from "@/store/BookingStore";
import { observer } from "mobx-react";
import { useState } from "react";
import { Input } from "components/ui/input";
import { Button } from "components/ui/button";
import { DatePickerWithRange } from "components/booking/DatePicker";
import { Combobox } from "components/common/ComboBox";

const initialState = {
  id: 1,
  name: "",
  destination: "",
  initialDate: new Date(),
  finalDate: new Date(),
};

const BookingActions = observer(() => {
  const [booking, setBooking] = useState<Booking>(initialState);

  const handleCreate = () => {
    bookingStore.createBooking({
      id: booking.id,
      name: booking.name,
      destination: booking.destination,
      initialDate: booking.initialDate,
      finalDate: booking.finalDate,
    });

    setBooking(initialState);
  };
  return (
    <div className="flex flex-col justify-center items-center ">
      <Input
        className="my-2 rounded-md border-2 "
        value={booking.name}
        onChange={(e) => {
          setBooking((prev) => ({
            ...prev,
            name: e.target.value,
          }));
        }}
        placeholder="Give a name to your booking..."
      />
      <div className="flex flex-col md:flex-row md:justify-center md:items-center space-y-2 md:space-x-2">
        <DatePickerWithRange
          initialDate={booking.initialDate}
          finalDate={booking.finalDate}
          onSelect={(value) => {
            setBooking((prev) => ({
              ...prev,
              initialDate: value.from ? value.from : new Date(),
              finalDate: value.to ? value.to : new Date(),
            }));
          }}
        />
        <Combobox
          value={booking.destination}
          onSelect={(value) => {
            setBooking((prev) => ({
              ...prev,
              destination: value,
            }));
          }}
        />
        <Button
          variant="default"
          className="flex-1 justify-between"
          onClick={handleCreate}
        >
          Book
        </Button>
      </div>
    </div>
  );
});

export { BookingActions };
