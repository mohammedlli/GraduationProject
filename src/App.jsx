import "../src/style.css"
<<<<<<< HEAD
function App() {
  return (
     <div  >

      ddddddd
=======

import { Route, Routes } from "react-router";
import Home from "./components/pages/Home";
import HomeCard from "./components/pages/HomeCard";
import Navbar from "./components/Navbar";
import Signup from "./components/pages/Signup";
import Stages from "./components/pages/doctor/Stages";
import AddTask from "./components/pages/AddTask";
import StudentAnswers from "./components/pages/StudentAnswers";
function App() {
  return (
     <div >
     <Navbar  />
      <Routes>

      <Route index path="/"  element={<Signup />} />
        <Route index path="/HomeCard"  element={<HomeCard />} />
          <Route index path="/Stages"  element={<Stages/>} />
            <Route index path="/Home"  element={<Home/>} />
            <Route index path="/AddTask"  element={<AddTask/>} />
            <Route index path="/StudentAnswers" element={<StudentAnswers />} />
      </Routes>
      
>>>>>>> 05a56f417ed3959dff0871c7fae3738e558f6419
     </div>
  );
}

export default App;
