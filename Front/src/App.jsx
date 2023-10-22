import Router from "./routes/Router";
import { AppContextProvider } from "./context/AppContext";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AppContextProvider>
        <Router />
      </AppContextProvider>
    </>
  );
}

export default App;
