import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;