import { ReactLocation, Router } from "@tanstack/react-location";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContextProvider } from "./contexts/UserContext";
import routes from "./routes";

function App() {
  const location = new ReactLocation();

  return (
    <QueryClientProvider client={new QueryClient()}>
      <UserContextProvider>
        <Router routes={routes} location={location} />
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
