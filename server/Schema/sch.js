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

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.a`
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }
`;

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

export default ({
  logoLinkUrl = "/",
  illustrationImageSrc = illustration,
  headingText = "Sign In To Eduject",
  submitButtonText = "Sign In",
  SubmitButtonIcon = LoginIcon,
  forgotPasswordUrl = "#",
  signupUrl = "/signup",
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/api/login`, {
        email: email,
        password: password,
      });
      const { user } = response.data;
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      setError("Invalid email or password!");
    }
  };
  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <LogoLink href={logoLinkUrl}>
              <LogoImage src={logo} />
            </LogoLink>
            <MainContent>
              <Heading>{headingText}</Heading>
              {errorMessage && <p tw="text-red-500">{errorMessage}</p>}
              <FormContainer>
                <Form onSubmit={handleLogin}>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <SubmitButton type="submit">
                    <SubmitButtonIcon className="icon" />
                    <span className="text">{submitButtonText}</span>
                  </SubmitButton>
                </Form>
                <p tw="mt-6 text-xs text-gray-600 text-center">
                  <a
                    href={forgotPasswordUrl}
                    tw="border-b border-gray-500 border-dotted"
                  >
                    Forgot Password ?
                  </a>
                </p>
                <p tw="mt-8 text-sm text-gray-600 text-center">
                  Dont have an account?{" "}
                  <a
                    href={signupUrl}
                    tw="border-b border-gray-500 border-dotted"
                  >
                    Sign Up
                  </a>
                </p>
              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={illustrationImageSrc} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
};
