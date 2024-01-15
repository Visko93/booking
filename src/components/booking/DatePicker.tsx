"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const NUMBER_OF_MONTHS = 1;
interface DatePickerProps {
  onSelect: ({
    from,
    to,
  }: {
    from: Date | undefined;
    to: Date | undefined;
  }) => void;
  error: string | null;
  initialDate?: Date;
  finalDate?: Date;
  className?: string;
}
export function DatePickerWithRange({
  className,
  onSelect,
  initialDate,
  finalDate,
  error = null,
}: DatePickerProps) {
  const date = {
    from: initialDate,
    to: finalDate,
  };

  const setDate: SelectRangeEventHandler = (date) => {
    if (!date) return;
    onSelect({
      from: date.from ? date.from : undefined,
      to: date.to ? date.to : undefined,
    });
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={error ? "destructive" : "outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={NUMBER_OF_MONTHS}
          />
        </PopoverContent>
      </Popover>
      {error && (
        <span className="text-sm text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
}
