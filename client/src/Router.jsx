import { Routes, Route, useNavigate } from "react-router-dom";
import AskQuestions from "./Pages/Question/AskQuestions";
import Answer from "./Pages/Q&A/Answer";
import Login from "./Pages/login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import Homepage from "./Pages/Home/Home";
import { useEffect, useContext } from "react";
import { createContext } from "react";

import axios from "./axiosConfig";
import { UserContext } from "./Components/Dataprovide/DataProvider";
import HowItWorks from "./Pages/HowItWorks/HowItWorks";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import EditQuestion from "./Pages/QuestionDetail/EditQuestion/EditQuestion";

export const AppState = createContext();
function Routing() {
  const [userData, setUserData] = useContext(UserContext);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("username");
    localStorage.removeItem("userid");

    setUserData(null);

    navigate("/login");
  };

  const headerToken = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const checkUser = async () => {
    console.log("Token being sent:", token);
    try {
      const response = await axios.get("/users/check", {
        ...headerToken,
      });
      console.log("User data received:", response.data);
      setUserData(response.data);
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response ? error.response.data : error.message
      );
      navigate("/login");
    }
  };
  useEffect(() => {
    if (token) {
      checkUser();
    } else {
      navigate("/login");
    }
  }, [token]);

  return (
    <AppState.Provider
      value={{ userData, setUserData, headerToken, handleLogout }}
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute redirect="/">
              <Homepage />
            </ProtectedRoute>
          }
        />

        <Route path="/question/:questionid" element={<Answer />} />
        <Route path="/edit-question/:questionid" element={<EditQuestion />} />

        <Route path="/question" element={<AskQuestions />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppState.Provider>
  );
}

export default Routing;
