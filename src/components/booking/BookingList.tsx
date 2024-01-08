import { Button } from "components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "components/ui/carousel";
import bookingStore, { Booking } from "@/store/BookingStore";
import { format } from "date-fns";
import { observer } from "mobx-react";

const EmptyBookings = () => (
  <div className="flex flex-col justify-center items-center bg-gray-100 rounded-md p-4 space-y-4">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width="200"
      height="200"
    >
      <circle
        cx="100"
        cy="100"
        r="90"
        stroke="#ccc"
        strokeWidth="8"
        fill="none"
      />
      <text x="50%" y="50%" textAnchor="middle" fill="#ccc" fontSize="22">
        No Bookings Yet
      </text>
      {/* Add any other SVG elements or icons related to bookings */}
    </svg>
  </div>
);

const BookingsList = observer(() => {
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

  if (bookingStore.bookings.length === 0) {
    return <EmptyBookings />;
  }

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 rounded-md p-4 space-y-4">
      <h1 className="text-4xl font-bold  text-start mb-2">Your Bookings</h1>
      <Carousel
        className="w-full max-w-sm"
        opts={{
          align: "start",
        }}
      >
        <CarouselContent className="-ml-1">
          {bookingStore.bookings.map((booking) => (
            <CarouselItem key={booking.id} className="pl-1">
              <Card>
                <CardHeader>
                  <CardTitle>{booking.name}</CardTitle>
                  <CardDescription>
                    {booking.destination} -{" "}
                    {format(booking.initialDate, "dd/MM/yyyy")} -{" "}
                    {format(booking.finalDate, "dd/MM/yyyy")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Some content</p>
                </CardContent>
                <CardFooter className="flex flex-row justify-end items-center space-x-2">
                  <Button variant="default" onClick={handleEdit}>
                    Edit
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => handleDelete(booking.id)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
});

export { BookingsList };
