import Navbar from "./components/NavBar";
import Scramble from "./components/Scarmble";
import Timer from "./components/Timer";

function App() {
  return (
    <div>
      <Navbar />
      <main className="p-4 text-center">
        <Scramble />
        <Timer/>
      </main>
    </div>
  );
}

export default App;
