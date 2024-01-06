import { Navigate, Route, Routes} from "react-router";
import "./App.css";
import Dashboard from "./modules/Dashboard/Dashboard";
import Form from "./modules/Form";
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children ,auth=false}) => {
  const isLoggedIn = localStorage.getItem("user:token") !== null || false;
  console.log("isLoggedIn", isLoggedIn);
  if (!isLoggedIn && auth) {
    return <Navigate to={"/users/sign_in"} />;
  } else if (
    isLoggedIn &&
    ["/user/sign_in", "/user/sign_up"].includes(window.location.pathname)
  ) {
    return <Navigate to={"/"} />;
  }
  return children;
};
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute auth={true}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/users/sign_in" element={<Form isSignInPage={true} />} />
      <Route path="/users/sign_up" element={<Form isSignInPage={false} />} />
    </Routes>
  );
}

export default App;
