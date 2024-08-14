import { useState, useEffect, useContext } from "react";
import Footer from "components/footers/SimpleFiveColumn.js";
import axios from "axios";
// import "ckeditor5/ckeditor5.css";
// import "../styles/CoursesPage.css";
import TextEditor from "./TextEditor";
import Header from "components/headers/light.js";
import "../styles/NewCourse.css";
import { json, useNavigate } from "react-router-dom";
import { AuthContext } from "context/AuthContext.jsx";

const CoursesPage = () => {
  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [price, setPrice] = useState("");
  const [language, setLanguage] = useState("");
  const [categories, setCategories] = useState("");
  const [intro, setIntro] = useState("");
  const [coursesList, setCoursesList] = useState([]);
  const navigate = useNavigate();
  const { user, role } = useContext(AuthContext);

  console.log("User in COurse Page: ", user);
  console.log("User role in COurse Page: ", role);

  const createCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/courses/create_course",
        {
          title,
          instructor,
          price,
          language,
          categories,
          intro,
        }
      );
      console.log("Course saved:", response.data);
      setCoursesList([response.data, ...coursesList]);
      fetchCourses();
      setTitle("");
      setInstructor("");
      setPrice("");
      setLanguage("");
      setCategories("");
      setIntro("");
      setCoursesList([]);
    } catch (error) {
      console.error("Error saving course", error);
    }
  };

  //get all the courses from db
  const fetchCourses = async () => {
    // await axios
    //   .get(`http://localhost:8080/api/courses/get_courses`)
    //   .then((res) => setCoursesList(res.data))
    //   .catch((e) => console.log(e));
    try {
      const response = await axios.get(
        `http://localhost:8080/api/courses/get_courses`
      );
      setCoursesList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //access to the course
  // const chosenCourse = async (req) => {
  //   try {
  //     const courseId = req.params;
  //     const response = await axios.get(
  //       `http://localhost:8080/api/courses/:${courseId}`
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const chosenCourse = async (courseId) => {
    console.log(courseId);
    navigate(`/courses/${courseId}/lessons`);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleUserChoice = (courseId) => {
    navigate(`/courses/${courseId}/lessons`);
  };

  //display all the courses from db to the screen
  let list = coursesList.map((item) => {
    console.log(item.title);
    return (
      <button key={item._id} onClick={() => chosenCourse(item._id)}>
        {item.title}
      </button>
    );
  });

  const user_course_list = coursesList.map((item) => (
    <div
      className="course"
      key={item.id}
      onClick={() => handleUserChoice(item._id)}
    >
      <h2>{item.title}</h2>
      <p>
        {item.intro
          ? item.intro.substring(0, 20) + (item.intro.length > 20 ? "..." : "")
          : "No description available"}
      </p>
    </div>
  ));
  return (
    <div>
      <Header />
      {role == "Admin" && (
        <div>
          <div className="wrapper">
            <div className="courses_list">{list}</div>
            <form>
              <h1>New Course</h1>
              <hr className="sep" />
              <div className="group">
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Title</label>
              </div>
              <div className="group">
                <input
                  type="text"
                  required
                  value={instructor}
                  onChange={(e) => setInstructor(e.target.value)}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Instructor</label>
              </div>
              <div className="group">
                <input
                  type="text"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Price</label>
              </div>
              <div className="group">
                <input
                  type="text"
                  required
                  value={language}
                  onChange={(e) =>
                    setLanguage(
                      e.target.value.split(",").map((lan) => lan.trim())
                    )
                  }
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Language</label>
              </div>
              <div className="group">
                <input
                  type="text"
                  required
                  value={categories}
                  onChange={(e) =>
                    setCategories(
                      e.target.value.split(",").map((cat) => cat.trim())
                    )
                  }
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Categories</label>
              </div>
              <div className="group">
                <textarea
                  type="textarea"
                  rows="5"
                  required
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Introduction</label>
              </div>
              <div className="btn-box">
                <button
                  className="btn btn-submit"
                  type="button"
                  onClick={createCourse}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* day */}
      {role === "Basic" && (
        <div className="basic_user">
          <h1>Hello, {user}!</h1>
          <div className="user_courses_list">{user_course_list}</div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CoursesPage;
