import { NavBar } from "components/common";
import { BookingActions } from "components/booking/BookingActions";
import { BookingsList } from "components/booking/BookingList";

function Hero() {
  return (
    <div className="flex flex-col justify-center items-center bg-hero-pattern bg-cover bg-center bg-no-repeat h-[500px]">
      <h1 className="text-4xl font-bold text-slate-100 text-center mb-2">
        Book your staying!
      </h1>
      <BookingActions />
    </div>
  );
}

const heroStyling = {
  backgroundImage: "url('/assets/images/hero.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  filter: "brightness(0.725)",
  blendMode: "multiply",
};

function App() {
  return (
    <>
      <section className="flex flex-col justify-center items-center relative">
        {/* Apply an overlay to the bg img */}
        <header className="flex flex-1 justify-center ">
          <NavBar />
        </header>
        <Hero />
        <div className="absolute inset-0  -z-10" style={heroStyling}></div>
      </section>
      <section>
        <BookingsList />
      </section>
    </>
  );
}

export default App;
