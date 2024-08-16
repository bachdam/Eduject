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
  const [userCoursesList, setUserCoursesList] = useState([]);
  const navigate = useNavigate();
  const { user, role, userId } = useContext(AuthContext);
  const [browseCourses, setBrowseCourses] = useState(false);

  console.log("User in COurse Page: ", user);
  console.log("User_id in COurse Page: ", userId);
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
      setUserCoursesList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //get all the courses of current user
  const fetchUserCourses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/${userId}/get_courses`
      );
      setUserCoursesList(response.data);
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
  useEffect(() => {
    fetchUserCourses();
  }, []);

  const handleUserChoice = (courseId) => {
    navigate(`/courses/${courseId}/lessons`);
  };

  //display all the courses from db to the screen
  const list = coursesList.map((item) => {
    return (
      <div
        className="course"
        key={item._id}
        // onClick={() => chosenCourse(item._id)}
      >
        <h2>{item.title}</h2>
        <p>
          {item.intro
            ? item.intro.substring(0, 20) +
              (item.intro.length > 20 ? "..." : "")
            : "No description available"}
        </p>
        <button onClick={() => handleEnrollInCourse(item._id)}>
          Enroll Now
        </button>
      </div>
    );
    // return (
    //   <button key={item._id} onClick={() => chosenCourse(item._id)}>
    //     {item.title}
    //   </button>
    // );
  });

  //list all the course of current user
  const user_course_list = userCoursesList.map((item) => (
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

  // Example of a function that is called when a user selects to enroll in a course
  const handleEnrollInCourse = async (courseId) => {
    // Assuming you have access to the user's ID from context or props

    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${userId}/enroll/${courseId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, courseId }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to enroll in course");
      }

      console.log(`Successfully enrolled in course: ${result.message}`);
      // Optionally update the user's UI or state to reflect the enrollment
    } catch (error) {
      console.error("Error enrolling in course:", error.message);
    }
  };

  // Example button in your course component
  // <button onClick={() => handleEnrollInCourse(selectedCourseId)}>
  //   Enroll in Course
  // </button>;

  const user_choose_new_courses = () => {
    setBrowseCourses(true);
    console.log("after: ", browseCourses);
  };

  const user_choose_their_courses = () => {
    setBrowseCourses(false);
    console.log("after: ", browseCourses);
  };

  console.log("user courses: ", userCoursesList);
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
      <div>
        <button onClick={user_choose_new_courses}>Browse More Courses</button>
        <button onClick={user_choose_their_courses}>View Your Courses</button>
      </div>
      {role === "Basic" && browseCourses ? (
        <div className="basic_user">
          <h1>Hello, {user}!</h1>
          <div className="user_courses_list">{list}</div>
        </div>
      ) : (
        <div className="basic_user">
          <h1>Hello, {user}!</h1>
          <div className="user_courses_list">{user_course_list}</div>
        </div>
      )}
      {/* {role === "Basic" && browseCourses && (
        <div className="basic_user">
          <h1>Hello, {user}!</h1>
          <div className="user_courses_list">{user_course_list}</div>
        </div>
      )}
      {role === "Basic" && !browseCourses && (
        <div className="basic_user">
          <h1>Hello, {user}!</h1>
        </div>
      )} */}
      <Footer />
    </div>
  );
};

export default CoursesPage;
