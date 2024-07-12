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
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const addLesson = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/courses", {
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
        // onChange={handleDetail}
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
