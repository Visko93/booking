import { observer } from "mobx-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { Button } from "components/ui/button";
import { Booking } from "@/store/BookingStore";
import { format } from "date-fns";

interface BookingCardProps {
  booking: Booking;
  handleToggleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

export const BookingCard = observer(
  ({ booking, handleDelete, handleToggleEdit }: BookingCardProps) => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{booking.name}</CardTitle>
          <CardDescription>
            {booking.destination} - {format(booking.initialDate, "dd/MM/yyyy")}{" "}
            - {format(booking.finalDate, "dd/MM/yyyy")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Some content</p>
        </CardContent>
        <CardFooter className="flex flex-row justify-end items-center space-x-2">
          <Button
            variant="default"
            onClick={() => handleToggleEdit(booking.id)}
          >
            Edit
          </Button>
          <Button
            variant="default"
            onClick={() => handleDelete(booking.id)}
            data-testid="delete"
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    );
  }
);
