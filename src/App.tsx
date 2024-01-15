import { NavBar } from "components/common";
import { BookingsList } from "components/booking/BookingList";
import { Hero } from "components/common/Hero";

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
