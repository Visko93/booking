import { useState } from "react";
import { Input } from "components/ui/input";

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
        <header></header>
        <div>
          <Hero />
        </div>
      </section>
    </>
  );
}

export default App;
