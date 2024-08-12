import Header from "components/headers/light.js";
import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

// Assuming you're using some CSS framework or have your own styles
//import "./CoursesPage.css";

const CoursesPage = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [lessons, setLessons] = useState([{ id: Date.now(), content: "" }]);

  const handleCourseTitleChange = (e) => {
    setCourseTitle(e.target.value);
  };

  const handleContentChange = (index, data) => {
    const updatedLessons = lessons.map((lesson, i) =>
      i === index ? { ...lesson, content: data } : lesson
    );
    setLessons(updatedLessons);
  };

  const addLesson = () => {
    setLessons([...lessons, { id: Date.now(), content: "" }]);
  };

  const submitCourse = async () => {
    try {
      const response = await axios.post("/api/courses", {
        title: courseTitle,
        lessons,
      });
      console.log("Course saved successfully!", response.data);
    } catch (error) {
      console.error("Error saving course", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Create a New Course</h1>
        <input
          type="text"
          value={courseTitle}
          onChange={handleCourseTitleChange}
          placeholder="Course Title"
        />
        {lessons.map((lesson, index) => (
          <div key={lesson.id} className="lesson">
            <CKEditor
              editor={ClassicEditor}
              data={lesson.content}
              onChange={(event, editor) => {
                const data = editor.getData();
                handleContentChange(index, data);
              }}
            />
          </div>
        ))}
        <button onClick={addLesson}>Add Lesson</button>
        <button onClick={submitCourse}>Submit Course</button>
      </div>
    </div>
  );
};

export default CoursesPage;








import axios from 'axios';  
import React, { useState } from 'react';  
  
const CoursesPage = () => {  
  const [title, setTitle] = useState('');  
  const [detail, setDetail] = useState('');  
  
  const handleSubmit = async (e) => {  
    e.preventDefault();  
    try {  
      const response = await axios.post('http://localhost:8080/api/courses', { title, detail });  
      console.log('Course saved:', response.data);  
    } catch (error) {  
      console.error('Error saving course', error);  
    }  
  };  
  
  return (  
    <div>  
      <h1>Submit a New Course</h1>  
      <form onSubmit={handleSubmit}>  
        <label>  
          Title:  
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />  
        </label>  
        <br />  
        <label>  
          Detail:  
          <textarea value={detail} onChange={(e) => setDetail(e.target.value)}></textarea>  
        </label>  
        <br />  
        <button type="submit">Submit</button>  
      </form>  
    </div>  
  );  
};  
  
export default CoursesPage;  








//CousesPage original
// import React, { useState } from "react";
// import AnimationRevealPage from "helpers/AnimationRevealPage.js";
// import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
// import tw from "twin.macro";
// import styled from "styled-components";
// import { css } from "styled-components/macro";
// import Header from "components/headers/light.js";
// import Footer from "components/footers/FiveColumnWithInputForm.js";
// import { SectionHeading } from "components/misc/Headings";
// import { PrimaryButton } from "components/misc/Buttons";

// const CoursesPage = () => {
//   return null;
// };
// export default CoursesPage;

import Header from "components/headers/light.js";
import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

const CoursesPage = () => {
  const [detail, setDetail] = useState("");

  const addLesson = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/courses/", {
        detail,
      });
      console.log("Course saved:", response.data);
    } catch (error) {
      console.error("Error saving course", error);
    }
  };
  return (
    <div>
      <Header />
      <div></div>
      <CKEditor
        editor={ClassicEditor}
        data="<p>Design your lesson here!</p>"
        onReady={(editor) => {
          console.log("Editor is ready to use!", editor);
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
      <button onClick={addLesson}>Add Lesson</button>
    </div>
  );
};

export default CoursesPage;



//login.js

import React from "react";
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
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

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
  SubmitButtonIcon = LoginIcon,
  forgotPasswordUrl = "#",
  signupUrl = "/signup",
}) => {
  const {
    loginError,
    loginInfor,
    loginUser,
    isLoginLoading,
    updateLoginInfor,
    logoutUser,
  } = useContext(AuthContext);
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
              <FormContainer>
                <Form onSubmit={loginUser}>
                  <Input
                    type="email"
                    placeholder="Email"
                    onChange={(e) =>
                      updateLoginInfor({ ...loginInfor, email: e.target.value })
                    }
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                      updateLoginInfor({
                        ...loginInfor,
                        password: e.target.value,
                      })
                    }
                  />
                  <SubmitButton type="submit">
                    <SubmitButtonIcon className="icon" />
                    <span className="text">
                      {isLoginLoading ? "Loading..." : "Sign In"}
                    </span>
                  </SubmitButton>
                  {loginError?.error && (
                    <p tw="text-red-500">{loginError?.message}</p>
                  )}
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
