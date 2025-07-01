import Navbar from "./components/NavBar";
import Scramble from "./components/Scarmble";
import Timer from "./components/Timer";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      <main className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="space-y-6">
          <Scramble />
          <Timer />
        </div>
      </main>
    </div>
  );
}

export default App;
