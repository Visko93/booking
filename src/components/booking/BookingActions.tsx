import { observer } from "mobx-react";
import { Input } from "components/ui/input";
import { Button } from "components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Popover, PopoverContent } from "components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { cn, createEnumFromObjectArray } from "@/lib/utils";
import { CalendarIcon, CheckIcon, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "components/ui/command";
import { format } from "date-fns";
import { Calendar } from "components/ui/calendar";
import { DateRange } from "react-day-picker";
import bookingStore, { Booking } from "@/store/BookingStore";
import { useMemo } from "react";

import destinations from "@/fixtures/bookings.destinations.json";

const enumLike = createEnumFromObjectArray(destinations);
const DestinationsEnum = z.nativeEnum(enumLike);
type DestinationsEnum = z.infer<typeof DestinationsEnum>;

const schema = z.object({
  id: z.number(),
  title: z.string().min(0).max(50),
  rangeDate: z.custom<DateRange>(),
  destination: DestinationsEnum,
});

type BookingFormValue = z.infer<typeof schema>;

const BookingActions = observer(
  ({
    handleSubmission,
    id,
  }: {
    handleSubmission: (data: Booking) => void;
    id?: number;
  }) => {
    const defaultValues: BookingFormValue = {
      id: id || Date.now(),
      title: "",
      rangeDate: {
        from: new Date(),
        to: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
      destination: "",
    };
    const getDefaultValue = () => {
      if (!id) return defaultValues;
      const booking = bookingStore.getBooking(id);
      const parsedBooking = {
        ...booking,
        title: booking?.name,
        rangeDate: {
          from: new Date(booking?.initialDate!),
          to: new Date(booking?.finalDate!),
        },
      };
      if (!booking) return defaultValues;
      return parsedBooking;
    };

    const initialState = useMemo(() => getDefaultValue(), [id]);
    console.debug("initialState", initialState);
    const form = useForm<BookingFormValue>({
      defaultValues: initialState,
      resolver: zodResolver(schema),
    });

    const onSubmit = (data: BookingFormValue) => {
      if (!data) return;
      const parsedData: Booking = {
        id: data.id, // Use the id from the form data
        name: data.title,
        destination: data.destination as string,
        initialDate: format(data.rangeDate.from!, "LLL dd, y"),
        finalDate: format(data.rangeDate.to!, "LLL dd, y"),
      };

      handleSubmission(parsedData);
      form.reset();
    };

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center w-full bg-blue-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 p-4 space-y-4 "
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    data-testid="title"
                    placeholder="Give your booking a name..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col items-start space-y-2 w-full md:space-y-0 md:space-x-2 mt-2 md:flex-row ">
            <FormField
              control={form.control}
              name="rangeDate"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full md:w-2/5 ">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal truncate justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                          data-testid="rangeDate"
                        >
                          {field.value?.from ? (
                            field.value.to ? (
                              <>
                                {format(field.value.from, "LLL dd, y")} -{" "}
                                {format(field.value.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(field.value.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}

                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        onSelect={field.onChange}
                        selected={field.value}
                        numberOfMonths={2}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem className="w-full md:w-2/5">
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            data-testid="destination"
                            className={cn(
                              "w-full  justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? destinations.find(
                                  (destiny) => destiny.value === field.value
                                )?.label
                              : "Select your destination"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full md:w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search destination..." />
                          <CommandEmpty>No destiny found.</CommandEmpty>
                          <CommandGroup>
                            {destinations.map((destiny) => (
                              <CommandItem
                                key={destiny.value}
                                value={destiny.value}
                                onSelect={(currentValue) => {
                                  form.setValue("destination", currentValue);
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value === destiny.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {destiny.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              variant="default"
              className="flex-1 justify-center md:m-0 w-full md:w-fit "
              type="submit"
              data-testid="submit"
            >
              Book
            </Button>
          </div>
        </form>
      </Form>
    );
  }
);

export { BookingActions };
