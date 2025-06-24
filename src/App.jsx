import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import StudentLogin from './Components/StudentLogin/StudentLogin'
import './App.css'

import StudentDashboard from './Components/Dashboard/StudentDashboard'

function App() {
  const [loggedInId, setLoggedInId] = useState(null);

  return (
    <>
      {loggedInId ? (
        <StudentDashboard studentId={loggedInId} />
      ) : (
        <StudentLogin onLogin={setLoggedInId} />
      )}
    </>
  );
};


export default App
