import { Route, Routes } from "react-router";
import Home from "./components/pages/Home";
import HomeCard from "./components/pages/HomeCard";
import Navbar from "./components/Navbar";
import Signup from "./components/pages/Signup";
import Stages from "./components/pages/doctor/Stages";
import AddTask from "./components/pages/AddTask";
import StudentAnswers from "./components/pages/StudentAnswers";
import LoginPage from "./components/pages/doctor/LoginPage";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route index path="/" element={<LoginPage />} />
        <Route index path="/stages" element={<HomeCard />} />
        <Route index path="/tasks" element={<Stages />} />
        <Route index path="/stages/:id" element={<Home />} />
        <Route index path="/AddTask" element={<AddTask />} />
        <Route index path="/StudentAnswers" element={<StudentAnswers />} />
      </Routes>
    </div>
  );
}

export default App;
