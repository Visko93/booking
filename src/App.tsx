import { useState } from "react";
import { Input } from "components/ui/input";
import { NavBar } from "components/common";

const Hero = () => {
  return (
    <div>
      <Input />
    </div>
  );
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section>
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
