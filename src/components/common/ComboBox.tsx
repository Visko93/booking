"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";

// Possible booking destinations
const destinations = [
  { label: "Paris", value: "paris" },
  { label: "London", value: "london" },
  { label: "New York", value: "new-york" },
  { label: "Berlin", value: "berlin" },
  { label: "Tokyo", value: "tokyo" },
];

export const Combobox = observer(
  ({
    value,
    onSelect,
    error = null,
  }: {
    value: string;
    onSelect: (value: string) => void;
    error: string | null;
  }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
      onSelect(value);
    }, [value]);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <span className="text-sm text-red-500 font-medium">{error}</span>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full md:w-[200px] justify-between "
            onClick={() => setOpen(!open)}
          >
            {value
              ? destinations.find((destiny) => destiny.value === value)?.label
              : "Select destination..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
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
                    onSelect(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === destiny.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {destiny.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);
