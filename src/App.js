import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Authentication/userauth";
import Login from "./component/login";
import Quiz from "./component/quiz";
import Result from "./component/result";
import Signup from "./component/signup";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route exact path="/quiz" element={<Quiz />} />
          <Route path="/result" exact element={<Result />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
