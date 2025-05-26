import { Header, Sidebar } from "./components";
import { Homepage } from "./pages";
function App() {
  return (
    <div className="flex h-screen bg-white text-black">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <Homepage />
      </div>
    </div>
  );
}

export default App;
