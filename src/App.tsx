import { Input } from "components/ui/input";
import { NavBar } from "components/common";
import { Button } from "components/ui/button";
import { DatePickerWithRange } from "components/booking/DatePicker";
import { Combobox } from "components/common/ComboBox";

function BookingActions() {
  return (
    <div className={`flex flex-row justify-center items-center space-x-2`}>
      <DatePickerWithRange />
      <Combobox />
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
    </>
  );
}

export default App;
