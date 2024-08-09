// combinedAuthComponent.js
import React, { useState, useCallback, useContext } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import illustration from "images/login-illustration.svg";
import logo from "images/U.png";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import { postRequest, baseURL } from "../utils/services";
// Styled components
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
  const navigate = useNavigate(); // Use navigate from React Router

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
        navigate("/"); // Navigate to home page on success
      } catch (error) {
        console.error("Login failed:", error.message);
        setLoginError(error.message);
      } finally {
        setIsLoginLoading(false);
      }
    },
    [loginInfor, navigate]
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
