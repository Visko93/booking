import { Input } from "components/ui/input";
import { NavBar } from "components/common";
import { Button } from "components/ui/button";
import { DatePickerWithRange } from "components/booking/DatePicker";
import { Combobox } from "components/common/ComboBox";
import bookingStore, { Booking } from "@/store/BookingStore";
import { format } from "date-fns";
import { useState } from "react";

function BookingsList() {
  const handleEdit = () => {
    const mockBooking: Booking = {
      id: 1,
      name: "John Doe",
      destination: "Paris",
      initialDate: new Date(),
      finalDate: new Date(),
    };

    bookingStore.updateBooking({ bookingId: 1, updatedBooking: mockBooking });
  };
  const handleDelete = (id: number) => {
    bookingStore.deleteBooking(id);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Your Bookings</h1>
      <ul className="flex flex-col justify-center items-center">
        {bookingStore.bookings.map((booking) => (
          <li key={booking.id}>
            <div className="flex flex-row justify-center items-center space-x-2">
              <span>{booking.name}</span>
              <span>{booking.destination}</span>
              <span>{format(booking.initialDate, "DD/mm/yyyy")}</span>
              <span>{format(booking.finalDate, "DD/mm/yyyy")}</span>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={() => handleDelete(booking.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BookingActions() {
  const [booking, setBooking] = useState<Booking>({
    id: bookingStore.bookings.length + 1,
    name: "",
    destination: "",
    initialDate: new Date(),
    finalDate: new Date(),
  });

  const handleCreate = () => {
    const mockBooking: Booking = {
      id: 1,
      name: "John Doe",
      destination: "Paris",
      initialDate: new Date(),
      finalDate: new Date(),
    };

    bookingStore.createBooking(mockBooking);
  };
  console.log(booking);
  return (
    <div className={`flex flex-row justify-center items-center space-x-2`}>
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
        onSelect={(value) => {
          setBooking((prev) => ({
            ...prev,
            destination: value,
          }));
        }}
      />
      <Button variant="default">Book</Button>
    </div>
  );
}

function Hero() {
  return (
    <div className="flex flex-col justify-center items-center bg-hero-pattern bg-cover bg-center bg-no-repeat h-[500px]">
      <h1 className="text-4xl font-bold text-slate-100 text-center mb-2">
        Book your staying!
      </h1>
      <div className="flex flex-col justify-center items-center">
        <Input className="my-2 h-[50px] rounded-md border-2 " />
        <BookingActions />
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <section
        className="flex flex-col justify-center items-center"
        style={{
          backgroundImage: "url('/assets/images/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <header className="flex flex-1 justify-center ">
          <NavBar />
        </header>
        <div>
          <Hero />
        </div>
      </section>
      <section>
        <BookingsList />
      </section>
    </>
  );
}

export default App;
