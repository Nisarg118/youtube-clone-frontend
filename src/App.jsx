import { Header, Sidebar } from "./components";
import { MainLayout } from "./layouts";
import { Homepage, Aboutpage } from "./pages";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    // <div className="flex h-screen overflow-hidden">
    //   <Sidebar />

    //   <div className="flex flex-col flex-1">
    //     <div className="sticky top-0 z-10 ">
    //       <Header />
    //     </div>

    //     {/* Homepage takes rest of space and scrolls */}
    //     <div className="flex-1 overflow-y-auto">
    //       <Homepage />
    //     </div>
    //   </div>
    // </div>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="about" element={<Aboutpage />} />
      </Route>
    </Routes>
  );
}

export default App;
