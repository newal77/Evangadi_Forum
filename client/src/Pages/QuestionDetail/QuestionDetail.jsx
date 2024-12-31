import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineDelete, MdEdit } from "react-icons/md";
import "./QuestionDetail.css";
import { useNavigate } from "react-router-dom";
import axiosBase from "../../axiosConfig";
import { toast } from "react-toastify";
import { AppState } from "../../Router";

function QuestionDetail({ question, onDelete }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const headerToken = { Authorization: `Bearer ${token}` };
  const { userData } = useContext(AppState);
  const currentUserUsername = userData.username;

  const handleClick = () => {
    if (question?.questionid) {
      navigate(`/question/${question.questionid}`);
    } else {
      console.error("No question ID available for navigation.");
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();

    try {
      await axiosBase.delete(`/questions/${question.questionid}`, {
        headers: headerToken,
      });
      toast.success("Question deleted successfully.");
      onDelete(question.questionid);
    } catch (error) {
      console.error("Error deleting question:", error);
      toast.error(
        "Failed to delete the question. You might not have permission."
      );
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/edit-question/${question.questionid}`);
  };

  return (
    <div className="header_question" onClick={handleClick}>
      <div className="question_user">
        <CgProfile className="profile" color="gray" />
        <div className="username">{question?.username}</div>
      </div>

      <div className="question_title">
        <div className="question_content">{question?.title}</div>
        {currentUserUsername && question?.username === currentUserUsername && (
          <div className="question_arrow">
            <div onClick={handleDelete}>
              <MdOutlineDelete
                style={{
                  cursor: "pointer",
                }}
                size={30}
              />
            </div>
            <div onClick={handleEdit}>
              <MdEdit style={{ cursor: "pointer", color: "blue" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionDetail;
