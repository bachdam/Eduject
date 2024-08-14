import { useState, useEffect, useContext } from "react";
import Footer from "components/footers/SimpleFiveColumn.js";
import axios from "axios";
import "../styles/LessonPage.css";
// import "ckeditor5/ckeditor5.css";
// import "../styles/CoursesPage.css";
import TextEditor from "./TextEditor";
import Header from "components/headers/light.js";
import { useParams } from "react-router-dom";
import updateIcon from "../images/refresh.png";
import deleteIcon from "../images/bin.png";
import DOMPurify from "dompurify";
import { AuthContext } from "context/AuthContext.jsx";

const LessonPage = () => {
  const { courseId } = useParams();
  const course_id = courseId;
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [lessonsList, setLessonsList] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [selectedLesson, setSelectedLesson] = useState("");
  const { user, role } = useContext(AuthContext);

  //create lesson
  const createLesson = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/api/lessons/${course_id}/`,
        {
          title,
          detail,
          course_id,
        }
      );
      console.log("Lesson saved:", response.data);
      setLessonsList([...lessonsList, response.data]);
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
        `http://localhost:8080/api/lessons/${course_id}/`
      );
      const course_name = await axios.get(
        `http://localhost:8080/api/courses/name/${course_id}/`
      );
      setLessonsList(response.data);
      setCourseName(course_name.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  //update a lesson
  const updateLesson = async (lesson_id) => {
    console.log("lessonId: ", lesson_id);
    try {
      const response = await axios.put(
        `http://localhost:8080/api/lessons/${course_id}/${lesson_id}/`,
        {
          title,
          detail,
        }
      );
      console.log("Lesson updated:", response.data);
      // setLessonsList([response.data, ...lessonsList]);
      setLessonsList((prevLessons) =>
        prevLessons.map((item) =>
          item._id === lesson_id ? response.data : item
        )
      );
      setTitle("");
      setDetail("");
    } catch (error) {
      console.error("Error updating course", error);
    }
  };

  //delete a lesson
  const deleteLesson = async (lesson_id) => {
    console.log("lessonId: ", lesson_id);
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/lessons/${course_id}/${lesson_id}/`
      );
      console.log("Lesson deleted:", response.data);
      setLessonsList((prevLessons) =>
        prevLessons.filter((item) => item._id !== lesson_id)
      );
    } catch (error) {
      console.error("Error deleting course", error);
    }
  };

  const chosenLesson = async (courseId) => {
    console.log(courseId);
    // navigate(`/courses/${courseId}/lessons`);
  };

  //use purify to get rid of malicious js to prevent XSS attack
  const verifiedLessonContent = () => ({
    __html: DOMPurify.sanitize(selectedLesson.detail),
  });
  return (
    <div>
      <Header />
      {/* day */}
      {role === "Admin" && (
        <div>
          <h1 className="course_name">{courseName}</h1>
          <div className="container">
            <div className="lessons_display">
              <ul>
                {lessonsList.map((item, index) => {
                  console.log("item title:", item.title);
                  console.log("lessonsList: ", lessonsList);
                  return (
                    <li key={index} className="lessonTitle">
                      {item.title}{" "}
                      <button
                        key={item._id}
                        type="submit"
                        onClick={() => updateLesson(item._id)}
                      >
                        <img src={updateIcon} alt="update icon" />
                      </button>
                      <button
                        key={index}
                        type="submit"
                        className="deletebtn"
                        onClick={() => deleteLesson(item._id)}
                      >
                        <img src={deleteIcon} alt="delete icon" />
                      </button>
                    </li>
                  );
                })}
              </ul>
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
          </div>
        </div>
      )}
      {/* day */}
      {role === "Basic" && (
        <div className="course-container">
          <h1 className="course-name">{courseName}</h1>
          <div className="content-container">
            <div className="lesson-content">
              {selectedLesson ? (
                // <p>{selectedLesson.detail}</p>
                <div
                  className="lesson-detail"
                  // dangerouslySetInnerHTML={{ __html: selectedLesson.detail }}
                  dangerouslySetInnerHTML={verifiedLessonContent()}
                ></div>
              ) : (
                <p>Please select a lesson to view its content.</p>
              )}
            </div>
            <div className="lessons">
              <div className="lesson-header">
                <span className="view-title">Lessons</span>
              </div>
              <ul>
                {lessonsList.map((item, index) => {
                  return (
                    <li key={index}>
                      <button
                        className="lesson-button"
                        onClick={() => {
                          console.log(item);
                          setSelectedLesson(item);
                        }}
                      >
                        {item.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default LessonPage;
