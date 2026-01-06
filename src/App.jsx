import "../src/style.css"
import UploadHomework from "./components/pages/doctor/UploadHomwork";
import { Route, Routes } from "react-router";
function App() {
  return (
     <div className=" bg-white">
      <Routes>
        sddsds
          <Route index element={<UploadHomework />} />
      </Routes>
     </div>
  );
}

export default App;
