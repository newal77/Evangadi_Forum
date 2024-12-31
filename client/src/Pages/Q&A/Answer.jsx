import React, { useContext, useEffect, useState } from "react";
import "./Answer.css";
import { BsPersonCircle } from "react-icons/bs";
import styles from "../Question/AskQuestions.module.css";
import Layout from "../../Components/Layout/Layout";
import { Link, useParams } from "react-router-dom";
import { AppState } from "../../Router";
import axiosBase from "../../axiosConfig";
import {
  MdOutlineDelete,
  MdEdit,
  MdSave,
  MdCancelPresentation,
} from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

function Answer() {
  const { questionid } = useParams();
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [editingAnswer, setEditingAnswer] = useState(null);
  const [updatedAnswer, setUpdatedAnswer] = useState("");
  const { userData } = useContext(AppState);
  const currentUserUsername = userData.username;
  const token = localStorage.getItem("token");
  const headerToken = { Authorization: ` Bearer ${token} ` };

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await axiosBase.get(`questions/${questionid}`, {
          headers: headerToken,
        });
        setData(response.data.question);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching question: ", err);
        setIsLoading(false);
      }
    };

    fetchQuestionData();
  }, [questionid, headerToken]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axiosBase.get(`/answers/${questionid}`, {
          headers: headerToken,
        });

        setAnswers(response.data.answers);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching answers: ", err);
      }
    };

    fetchAnswers();
  }, [questionid, headerToken]);

  const submitAnswer = async (e) => {
    e.preventDefault();
    if (newAnswer) {
      try {
        const response = await axiosBase.post(
          `/answers/`,
          {
            Dataid: userData?.userid,
            questionid: questionid,
            answer: newAnswer,
          },
          {
            headers: headerToken,
          }
        );

        const postedAnswer = response.data;
        setAnswers((prevAnswers) => [...prevAnswers, postedAnswer]);
        setNewAnswer("");
        toast.success("Answer posted successfully!");
      } catch (error) {
        console.error("Error posting answer: ", error);
        toast.error("Failed to post the answer.");
      }
    }
  };

  const startEditing = (answer) => {
    setEditingAnswer(answer);
    setUpdatedAnswer(answer.answer);
  };

  const cancelEditing = () => {
    setEditingAnswer(null);
    setUpdatedAnswer("");
  };

  const updateAnswer = async (e) => {
    e.preventDefault();
    if (editingAnswer && updatedAnswer) {
      try {
        const response = await axiosBase.patch(
          `/answers/${questionid}`,
          {
            answer: updatedAnswer,
          },
          {
            headers: headerToken,
          }
        );

        const updatedAnswerData = response.data;
        setAnswers((prevAnswers) =>
          prevAnswers.map((ans) =>
            ans.questionid === updatedAnswerData.questionid
              ? updatedAnswerData
              : ans
          )
        );
        setEditingAnswer(null);
        setUpdatedAnswer("");
        toast.success("Answer updated successfully!");
      } catch (error) {
        console.error("Error updating answer: ", error);
        toast.error("Failed to update the answer.");
      }
    }
  };

  const deleteAnswer = async (answer) => {
    try {
      await axiosBase.delete(`/answers/${questionid}`, {
        headers: headerToken,
        data: { answerid: answer.answerid },
      });
      setAnswers((prevAnswers) => {
        const updatedAnswers = prevAnswers.filter((ans) => {
          const currentAnswerId = ans.answerid;
          return currentAnswerId !== answer.answerid;
        });
        console.log("After filtering:", updatedAnswers);
        return updatedAnswers;
      });

      toast.success("Answer deleted successfully!");
    } catch (error) {
      console.error("Error deleting answer:", error);
      toast.error("Failed to delete the answer.");
    }
  };

  return (
    <Layout>
      <div className="answer_container">
        <div className="answer_wrapper">
          <div className="answer_header">
            <span>Question</span>
          </div>
          <div className="answer_question">
            <h3>{data?.title}</h3>
          </div>
          <p>{data?.description} </p>

          <h2 className="answer_community">Answer From The Community</h2>
          {isLoading ? (
            <p>Loading answers...</p>
          ) : answers.length > 0 ? (
            answers.map((answer, i) => (
              <div key={i} className="Answer">
                <div className="answer_prof_pic">
                  <div>
                    <BsPersonCircle size={70} color="gray" />
                  </div>
                  {answer?.username}
                </div>

                <div>{answer?.answer}</div>
                {currentUserUsername &&
                  answer.username === currentUserUsername && (
                    <>
                      <div>
                        <MdEdit
                          style={{
                            cursor: "pointer",
                            color: "blue",
                            marginLeft: "10px",
                          }}
                          onClick={() => startEditing(answer)}
                          size={30}
                        />
                      </div>
                      <div>
                        <MdOutlineDelete
                          style={{
                            cursor: "pointer",
                            color: "gray",
                            marginLeft: "10px",
                          }}
                          onClick={() => deleteAnswer(answer)}
                          size={30}
                        />
                      </div>
                    </>
                  )}
              </div>
            ))
          ) : (
            <p>No answers available.</p>
          )}

          {editingAnswer && (
            <div>
              <form onSubmit={updateAnswer}>
                <textarea
                  rows={4}
                  className={styles.question_description}
                  value={updatedAnswer}
                  onChange={(e) => setUpdatedAnswer(e.target.value)}
                  required
                />
                <button type="submit">
                  <MdSave
                    style={{
                      cursor: "pointer",
                      color: "green",
                      marginLeft: "10px",
                    }}
                    size={30}
                  />
                </button>

                <MdCancelPresentation
                  style={{
                    cursor: "pointer",
                    color: "gray",
                  }}
                  size={30}
                  onClick={cancelEditing}
                />
              </form>
            </div>
          )}

          <div className={styles.question_form}>
            <h4 className={styles.question_post_your}>
              Answer The Top Question
            </h4>
            <h4>
              <Link className={styles.question_post_link} to="/">
                Go to Question Page
              </Link>
            </h4>
            <form onSubmit={submitAnswer}>
              <textarea
                rows={4}
                className={styles.question_description}
                placeholder="Your answer..."
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                required
              />
              <span>
                <button className={styles.question_button} type="submit">
                  Post Your Answer
                </button>
              </span>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}

export default Answer;
