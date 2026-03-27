import { Route, Routes } from "react-router";
import ProtectedRoute from "./auth/ProtectedRoute";

import HomeCard from "./pages/doctor/HomeCard";
import Home from "./pages/doctor/Home";
import Answer from "./pages/doctor/Answers";
import CodeEditor from "./components/coderEditor/CodeEditor";
import TasksStudent from "./pages/doctor/TasksStudent";
import Signup from "./pages/Signup";
import LoginPage from "./pages/LoginPage";
import Stages from "./pages/student/Stages";
import { Toaster } from "react-hot-toast";
import MainLayout from "./components/layout/MainLayout";
import ProfilePage from "./pages/Profile";

function App() {
  return (
    <div>
      <Toaster position="top-center" />

      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED + NAVBAR */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["DOCTOR", "STUDENT"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* DOCTOR */}
          <Route path="/" element={<HomeCard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/stages/:id" element={<Home />} />
          <Route path="/stages/:id/answer/:id" element={<Answer />} />
          {/* <Route path="/student-answers" element={<StudentAnswers />} /> */}

          {/* SHARED */}
          <Route path="/student-code/:id" element={<CodeEditor />} />

          {/* STUDENT */}
          <Route path="/tasks-student" element={<TasksStudent />} />
          <Route path="/tasks" element={<Stages />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
