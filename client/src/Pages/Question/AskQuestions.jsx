import React, { useContext, useState } from "react";
import styles from "./AskQuestions.module.css";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Layout from "../../Components/Layout/Layout";
import { AppState } from "../../Router";
import axiosBase from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
function AskQuestions() {
  const { userData, headerToken } = useContext(AppState);

  const [form, setForm] = useState({
    userid: userData?.userid,
    title: "",
    description: "",
  });


  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData || !userData?.userid) {
      console.log("User ID is null");
      return;
    }

    try {
      await axiosBase.post("/questions/", form, { ...headerToken });

      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <Layout>
      <div className={styles.question_container}>
        <div className={styles.question_wrapper}>
          <div className={styles.question_steps}>
            <h3>Steps to write a good question.</h3>
            <ul className={styles.question_li}>
              <li>
                <div>
                  <IoIosCheckmarkCircle color="#35355E" size={25} />
                </div>
                <div>Summarize your problems in a one-line title.</div>
              </li>
              <li>
                <div>
                  <IoIosCheckmarkCircle color="#35355E" size={25} />
                </div>
                <div>Describe your problem in more detail.</div>
              </li>
              <li>
                <div>
                  <IoIosCheckmarkCircle color="#35355E" size={25} />
                </div>
                <div>
                  Describe what you have tried and what you expected to happen.
                </div>
              </li>
              <li>
                <div>
                  <IoIosCheckmarkCircle color="#35355E" size={25} />
                </div>
                <div>Review your question and post it to the site.</div>
              </li>
            </ul>
          </div>
          <div className={styles.question_form}>
            <h4 className={styles.question_post_your}>Ask a public question</h4>
            <h4>
              <Link className={styles.question_post_link} to="/">
                Go to Question Page
              </Link>
            </h4>
            <form onSubmit={handleSubmit} className="">
              <input
                className={styles.question_title}
                type="text"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                required
              />
              <textarea
                rows={4}
                className={styles.question_description}
                placeholder="Question Description..."
                name="description"
                value={form.description}
                onChange={handleChange}
                required
              />
              <span>
                <button className={styles.question_button} type="submit">
                  Post Your Question
                </button>
              </span>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AskQuestions;
