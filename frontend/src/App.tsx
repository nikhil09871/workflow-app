import { useState } from "react";
import Login from "./components/Login";
import WorkflowTable from "./components/WorkflowTable";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <WorkflowTable />
      ) : (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </>
  );
}

export default App;
