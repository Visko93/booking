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
import { BookingCardDialog } from "./BookingDialog";

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

type updateBookingProps = Partial<Booking>;
const BookingsList = observer(() => {
  const handleEdit = ({
    id,
    values,
  }: {
    id: number;
    values: Partial<Booking>;
  }) => {
    const currentBooking = bookingStore.getBooking(id);
    if (!currentBooking) return;

    const updatedBooking = {
      ...currentBooking,
      ...values,
    };

    bookingStore.updateBooking({ id, updatedBooking });
  };
  const handleDelete = (id: number) => {
    bookingStore.deleteBooking(id);
  };

  if (bookingStore.bookings.length === 0) {
    return <EmptyBookings />;
  }

  const handleToggleEdit = (id: number) => {
    return;
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 rounded-md p-4 space-y-4">
      <h1 className="text-4xl font-bold  text-start mb-2">Your Bookings</h1>
      <Carousel
        className="w-full md:w-[500px]"
        opts={{
          align: "start",
        }}
      >
        <CarouselContent className="-ml-1">
          {bookingStore.bookings.map((booking) => (
            <CarouselItem
              key={booking.id}
              data-testid="booking"
              className="pl-1 lg:max-w-[350px] "
            >
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
                  <BookingCardDialog id={booking.id} />
                  <Button
                    variant="default"
                    onClick={() => handleDelete(booking.id)}
                    data-testid="delete"
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious hidden={bookingStore.bookings.length <= 1} />
        <CarouselNext hidden={bookingStore.bookings.length <= 1} />
      </Carousel>
    </div>
  );
});

export { BookingsList };
