const mongoose = require("mongoose");
const { countDocuments } = require("./userSchema");

// Define Review Sub-schema
// const ReviewSchema = new mongoose.Schema({
//   user: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   rating: { type: Number, required: true, min: 1, max: 5 },
//   comment: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// Define Lecture Sub-schema
// const LectureSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   videoUrl: { type: String, required: true },
//   duration: { type: Number, required: true }, // in minutes
//   description: { type: String },
//   resources: [String],
// });

// Define Section Sub-schema
// const SectionSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   lectures: [LectureSchema],
// });

// Define Course Schema
const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructor: { type: String, require: true },
  // description: { type: String, required: true },
  // instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  language: { type: String, required: true },
  categories: [String],
  tags: [String],
  price: { type: Number, required: true },
  // discountedPrice: { type: Number },
  // thumbnailUrl: { type: String, required: true },
  // promoVideoUrl: { type: String },
  // level: {
  //   type: String,
  //   enum: ["Beginner", "Intermediate", "Advanced"],
  //   required: true,
  // },
  // sections: [SectionSchema],
  // reviews: [ReviewSchema],
  // averageRating: { type: Number, default: 0 },
  // totalRatings: { type: Number, default: 0 },
  // totalEnrollments: { type: Number, default: 0 },
  // createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now },
  detail: { type: String, require: true },
});

// Pre-save middleware to update `updatedAt`
// CourseSchema.pre("save", function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;

import React from "react";
import { useState, useEffect, useContext } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "images/login-illustration.svg";
import logo from "images/U.png";
import googleIconImageSrc from "images/google-icon.png";
import twitterIconImageSrc from "images/twitter-icon.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import axios from "axios";

// combinedAuthComponent.js
import React, { useState, useCallback } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import illustration from "images/login-illustration.svg";
import logo from "images/U.png";
import { baseURL } from "../utils/services";

const Container = tw(
  ContainerBase
)`min-h-screen bg-teal-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;
const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-teal-500 text-gray-100 w-full py-4 rounded-lg hover:bg-teal-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${(props) => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

const CombinedAuthComponent = () => {
  const [loginInfor, setLoginInfor] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoginLoading(true);
      setLoginError(null);

      if (!loginInfor.email || !loginInfor.password) {
        return setLoginError("Email and Password are required.");
      }

      try {
        const response = await fetch(`${baseURL}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginInfor),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Login failed.");
        }

        const userData = await response.json();
        localStorage.setItem("User", JSON.stringify(userData.user));
        window.location.href = "/home"; // Navigate using window.location
      } catch (error) {
        console.error("Login failed:", error.message);
        setLoginError(error.message);
      } finally {
        setIsLoginLoading(false);
      }
    },
    [loginInfor]
  );

  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <LogoLink href="/">
              <LogoImage src={logo} />
            </LogoLink>
            <MainContent>
              <Heading>Sign In To Eduject</Heading>
              <FormContainer>
                <Form onSubmit={loginUser}>
                  <Input
                    type="email"
                    placeholder="Email"
                    onChange={(e) =>
                      setLoginInfor({ ...loginInfor, email: e.target.value })
                    }
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                      setLoginInfor({ ...loginInfor, password: e.target.value })
                    }
                  />
                  <SubmitButton type="submit" disabled={isLoginLoading}>
                    <LoginIcon className="icon" />
                    <span className="text">
                      {isLoginLoading ? "Loading..." : "Sign In"}
                    </span>
                  </SubmitButton>
                  {loginError && <p tw="text-red-500">{loginError}</p>}
                </Form>
                <p tw="mt-6 text-xs text-gray-600 text-center">
                  <a href="#" tw="border-b border-gray-500 border-dotted">
                    Forgot Password?
                  </a>
                </p>
                <p tw="mt-8 text-sm text-gray-600 text-center">
                  Dont have an account?{" "}
                  <a href="/signup" tw="border-b border-gray-500 border-dotted">
                    Sign Up
                  </a>
                </p>
              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={illustration} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
};

export default CombinedAuthComponent;
//authcontext
import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest, baseURL } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfor, setRegisterInfor] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfor, setLoginInfor] = useState({
    email: "",
    password: "",
  });

  console.log("User", user);
  console.log("loginInfor", loginInfor);

  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error(error);
        // localStorage.removeItem("User");
      }
    }
  }, []);

  //   this is a hook to update the register data without refreshing everytime we render
  // the infor here is the input data of the Register form
  const updateRegisterInfor = useCallback((infor) => {
    setRegisterInfor(infor);
  }, []);

  const updateLoginInfor = useCallback((infor) => {
    setLoginInfor(infor);
  }, []);

  //a function to let us register a user; we need to add event "e" to prevent the auto refreshing whenever we click submit in Regiser.jsx.
  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsRegisterLoading(true);
      setRegisterError(null);
      const response = await postRequest(
        `${baseURL}/users/signup`,
        JSON.stringify(registerInfor)
      );

      setIsRegisterLoading(false);

      if (response.error) {
        return setRegisterError(response);
      }

      //this will keep the user login whenever we refresh the page
      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [registerInfor]
  );

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoginLoading(true);
      setLoginError(null);

      if (!loginInfor.email || !loginInfor.password) {
        return setLoginError("Email and Password are required.");
      }

      try {
        const response = await fetch(`${baseURL}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginInfor),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Login failed.");
        }

        const userData = await response.json();
        localStorage.setItem("User", JSON.stringify(userData.user));
        setUser(response);
        window.location.href = "/"; // Navigate using window.location
      } catch (error) {
        console.error("Login failed:", error.message);
        setLoginError(error.message);
      } finally {
        setIsLoginLoading(false);
      }
    },
    [loginInfor]
  );

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfor,
        updateRegisterInfor,
        registerError,
        registerUser,
        isRegisterLoading,
        logoutUser,
        loginError,
        loginInfor,
        loginUser,
        isLoginLoading,
        updateLoginInfor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import React, { useState, useEffect } from 'react';  
import axios from 'axios';  
  
const AuthComponent = () => {  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  
  // Check on initial render if the user is already logged in  
  useEffect(() => {  
    const token = localStorage.getItem('token');  
    if (token) {  
      setIsLoggedIn(true); // User is logged in  
    }  
  }, []);  
  
  const handleSignup = async (e) => {  
    e.preventDefault();  
    try {  
      const response = await axios.post('http://localhost:3000/signup', { email, password });  
      console.log(response.data.message);  
    } catch (err) {  
      console.error(err.response?.data?.message || 'Error during signup');  
    }  
  };  
  
  const handleLogin = async (e) => {  
    e.preventDefault();  
    try {  
      const response = await axios.post('http://localhost:3000/login', { email, password });  
      localStorage.setItem('token', response.data.token);  
      setIsLoggedIn(true); // Set loggedIn state to true  
      console.log('Login successful! Token stored:', response.data.token);  
    } catch (err) {  
      console.error(err.response?.data?.message || 'Error during login');  
    }  
  };  
  
  const fetchProtectedData = async () => {  
    const token = localStorage.getItem('token');  
    try {  
      const response = await axios.get('http://localhost:3000/protected', {  
        headers: {  
          'Authorization': `Bearer ${token}`  
        }  
      });  
      console.log(response.data);  
    } catch (error) {  
      console.error('Access denied:', error.response?.data?.message);  
      setIsLoggedIn(false); // Log user out if token is invalid  
      localStorage.removeItem('token'); // Clear token if it's invalid   
    }  
  };  
  
  return (  
    <div>  
      {!isLoggedIn ? (  
        <>  
          <form onSubmit={handleSignup}>  
            <h2>Sign Up</h2>  
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />  
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />  
            <button type="submit">Sign Up</button>  
          </form>  
  
          <form onSubmit={handleLogin}>  
            <h2>Login</h2>  
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />  
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />  
            <button type="submit">Log In</button>  
          </form>  
        </>  
      ) : (  
        <div>  
          <h2>Welcome back!</h2>  
          <button onClick={fetchProtectedData}>Fetch Protected Data</button>  
          <button onClick={() => {  
            // Handle logout  
            setIsLoggedIn(false);  
            localStorage.removeItem('token');  
          }}>Logout</button>  
        </div>  
      )}  
    </div>  
  );  
};  
  
export default AuthComponent;  


//succeed authcontext.js
const loginUser = useCallback(
  async (e) => {
    e.preventDefault();
    setIsLoginLoading(true);
    setLoginError(null);

    if (!loginInfor.email || !loginInfor.password) {
      return setLoginError("Email and Password are required.");
    }

    try {
      const response = await fetch(`${baseURL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfor),
      });

      // Log the raw response for debugging
      console.log("Raw response:", response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed.");
      }

      // Now, parse the JSON data once you are sure the response is okay
      const userData = await response.json();
      console.log("User Data from API:", userData); // Log user data retrieved from API

      // Check if userData.user is defined
      if (userData) {
        localStorage.setItem("User", JSON.stringify(userData.name));
        const storedUser = localStorage.getItem("User");
        console.log("User stored in localStorage:", storedUser);

        // Set the user state with the actual user data
        setUser(userData.user); // Make sure to extract the user correctly
        window.location.href = "/"; // Navigate after successful login
      } else {
        console.error("User data is not defined in the response.");
        setLoginError("Login failed, no user data returned.");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      setLoginError(error.message);
    } finally {
      setIsLoginLoading(false); // Make sure loading state is reset
    }
  },
  [loginInfor]
);
