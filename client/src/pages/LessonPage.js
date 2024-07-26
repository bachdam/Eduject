import { useState, useEffect, useRef } from "react";
import Footer from "components/footers/SimpleFiveColumn.js";
import axios from "axios";
// import "ckeditor5/ckeditor5.css";
// import "../styles/CoursesPage.css";
import TextEditor from "./TextEditor";
import Header from "components/headers/light.js";
import { useParams } from "react-router-dom";

const LessonPage = () => {
  const { courseId } = useParams();
  const course_id = courseId;
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [lessonsList, setLessonsList] = useState([]);

  //create lesson
  const createLesson = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/api/courses/${course_id}/lessons/create_lesson`,
        {
          title,
          detail,
          course_id,
        }
      );
      console.log("Lesson saved:", response.data);
      setLessonsList([response.data, ...lessonsList]);
      setTitle("");
      setDetail("");
    } catch (error) {
      console.error("Error saving course", error);
    }
  };

  //get all lessons of the chosen course
  const fetchLessons = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/courses/${course_id}/lessons/get_all_lesson`
      );
      console.log(response.data);
      setLessonsList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const chosenlessons = async (courseId) => {
    console.log(courseId);
    // navigate(`/courses/${courseId}/lessons`);
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  //display all the courses from db to the screen
  let list = lessonsList.map((item) => {
    console.log(item.title);
    return <li key={item._id}>{item.title}</li>;
  });

  return (
    <div className="container">
      <Header />
      <div className="lessons_display">
        <ul>{list}</ul>
      </div>
      <div>
        <input
          type="text"
          value={title}
          placeholder="Title here!"
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextEditor value={detail} onChange={setDetail} />
      </div>

      <button type="submit" onClick={createLesson}>
        Add Lesson
      </button>
      <Footer />
    </div>
  );
};

export default LessonPage;
