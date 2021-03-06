import React, { useContext, useState } from "react";
import {Link} from "react-router-dom";
import { auth, generateUserDocument } from "../firebase";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
{/* created state hooks to capture the email password displayname and error */}
{/* created the login and generated a user document */}
  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      console.log("generating user");
      console.log(user);
      generateUserDocument(user, {displayName});
    }
    catch(error){
      console.log(error);
      setError('Error Signing up with email and password');
    }
      
    setEmail("");
    setPassword("");
    setDisplayName("");
  };
{/* set the email password and siplayname for the user */}
  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };
{/* render the form that captures all the info */}
  return (
    <div className="main">
      <h1>Sign Up</h1>
      <div>
        {error !== null && (
          <div>
            {error}
          </div>
        )}
        <form className="">
          <label htmlFor="displayName">
            Display Name:
          </label>
          <input
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Student"
            id="displayName"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userEmail">
            Email:
          </label>
          <input
            type="email"
            name="userEmail"
            value={email}
            placeholder="test@gmail.com"
            id="userEmail"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userPassword">
            Password:
          </label>
          <input
            type="password"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={event => onChangeHandler(event)}
          />
          <button onClick={event => {createUserWithEmailAndPasswordHandler(event, email, password);}}>
            Sign up
          </button>
        </form>
    
        <Link to="/">Already have an account? Sign in here</Link>
      </div>
    </div>
  );
};

export default SignUpPage;