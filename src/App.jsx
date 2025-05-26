import { Header, Sidebar } from "./components";
import { Homepage } from "./pages";

function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <div className="sticky top-0 z-10 ">
          <Header />
        </div>

        {/* Homepage takes rest of space and scrolls */}
        <div className="flex-1 overflow-y-auto">
          <Homepage />
        </div>
      </div>
    </div>
  );
}

export default App;
