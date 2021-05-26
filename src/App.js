import React, { useContext } from "react";
import './Styles/App.css';
import UserProvider from "./providers/UserProvider";
import Test from './components/Test';
const App =()=> {
  {/* set the user context for all components */}
  return (
    <div>
      <UserProvider>
        <Test /> 
      </UserProvider>
    </div>
  );
}

export default App;
