import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Header from "./components/Header";
import HourDate from "./components/HourDate";
import Footer from "./components/Footer";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="App">
        <Header />
        <HourDate />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buscar" element={<Search />} />
            <Route path="/detalle" element={<Detail />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <ToastContainer transition={Slide} />
    </>
  );
}

export default App;
