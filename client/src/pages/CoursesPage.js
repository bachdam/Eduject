import { useState, useEffect, useRef } from "react";
import Footer from "components/footers/SimpleFiveColumn.js";
import axios from "axios";
// import "ckeditor5/ckeditor5.css";
// import "../styles/CoursesPage.css";
import TextEditor from "./TextEditor";
import Header from "components/headers/light.js";
import "../styles/NewCourse.css";

const CoursesPage = () => {
  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [price, setPrice] = useState("");
  const [language, setLanguage] = useState("");
  const [categories, setCategories] = useState("");
  const [intro, setIntro] = useState("");
  const [coursesList, setCoursesList] = useState([]);

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
    } catch (error) {
      console.error("Error saving course", error);
    }
  };

  //get all the courses from db
  const fetchCourses = async () => {
    await axios
      .get(`http://localhost:8080/api/courses/`)
      .then((res) => setCoursesList(res.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  //display all the courses from db to the screen
  let list = coursesList.map((item) => {
    return <li key={item.id}>{item.name}</li>;
  });
  return (
    <div>
      <Header />

      <div>
        <div>
          <ul>{list}</ul>
        </div>

        <div className="wrapper">
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
      <Footer />
    </div>
  );
};

export default CoursesPage;
