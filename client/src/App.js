import { LoginProvider } from "./context/LoginContext";
import { UserProvider } from "./context/UserContext";
import { AppRoutes } from "./routes/AppRoutes";


function App() {
  return (
    <LoginProvider>
      <UserProvider>
      <AppRoutes />
  </UserProvider>
    </LoginProvider>
  );
}

export default App;
