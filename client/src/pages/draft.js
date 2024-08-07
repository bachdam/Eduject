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
