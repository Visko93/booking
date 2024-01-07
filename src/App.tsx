import { useState } from "react";
import { Input } from "components/ui/input";
import { NavBar } from "components/common";
import { Button } from "components/ui/button";
import { DatePickerWithRange } from "components/booking/DatePicker";
import { Combobox } from "components/common/ComboBox";

function BookingActions() {
  return (
    <div className="flex  justify-center">
      <DatePickerWithRange />
      <Combobox />
      <Button variant="secondary">Book</Button>
    </div>
  );
}

function Hero() {
  return (
    <div className="flex flex-col justify-center items-center bg-hero-pattern bg-cover bg-center bg-no-repeat h-[500px]">
      <h1 className="text-4xl font-bold">Book your staying!</h1>
      <div className="flex flex-col justify-center items-center">
        <Input />
        <BookingActions />
      </div>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section
        className="flex flex-col justify-center items-center"
        style={{
          backgroundImage: "url('/assets/images/hero.jpg')",
          backgroundSize: "cover",
        }}
      >
        <header className="flex flex-1 justify-center ">
          <NavBar />
        </header>
        <div>
          <Hero />
        </div>
      </section>
    </>
  );
}

export default App;
