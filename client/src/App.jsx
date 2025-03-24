import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import InitialPage from "./components/pages/InitialPage.jsx";
import TodoApp from "./components/pages/TodoApp.jsx";

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem("nombreUsuario") !== null;
  };

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Navigate to="/todo-app" replace />
            ) : (
              <InitialPage />
            )
          }
        />
        <Route
          path="/todo-app"
          element={
            <ProtectedRoute>
              <TodoApp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

