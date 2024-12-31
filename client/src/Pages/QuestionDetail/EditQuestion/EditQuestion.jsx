import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosBase from "../../../axiosConfig";
import { AppState } from "../../../Router";
import Layout from "../../../Components/Layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditQuestion.css";

function EditQuestion() {
  const { questionid } = useParams();
  const { userData, headerToken } = useContext(AppState);
  const [form, setForm] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  const fetchQuestion = async () => {
    try {
      const response = await axiosBase.get(
        `/questions/${questionid}`,
        headerToken
      );
      setForm({
        title: response.data.question.title,
        description: response.data.question.description,
      });
    } catch (error) {
      console.error(
        "Error fetching question:",
        error.response?.data || error.message
      );
      toast.error("Failed to fetch question. Please try again.");
    }
  };

  useEffect(() => {
    fetchQuestion(); // Call the fetch function when component mounts
  }, [questionid]); // Depend on questionid

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value })); // Update form state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData || !userData.userid) {
      console.log("User ID is null");
      toast.error("You must be logged in to edit a question.");
      return;
    }

    try {
      await axiosBase.patch(`/questions/${questionid}`, form, headerToken);
      toast.success("Question updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating question:", error);
      toast.error("Error updating question. You may not have permission.");
    }
  };

  return (
    <Layout>
      <ToastContainer />
      <div className="edit-question-container">
        <h4>Edit Your Question</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
            className="question-input"
          />
          <textarea
            rows={4}
            name="description"
            placeholder="Question Description..."
            value={form.description}
            onChange={handleChange}
            required
            className="question-textarea"
          />
          <button type="submit" className="submit-button">
            Update Question
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default EditQuestion;
