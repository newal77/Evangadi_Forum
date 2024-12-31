// src/components/HowToUse/HowToUse.jsx

import React from "react";
import "./HowItWroks.css";
import Layout from "../../Components/Layout/Layout";

const HowItWorks = () => {
  return (
    <Layout>
      <div className="howto-container">
        <h1 className="howto-title">How to Use Evangadi Networks Q&A</h1>

        <section className="howto-section">
          <h2>User Registration</h2>
          <p>
            To join Evangadi Networks Q&A, you need to create an account. Follow
            these steps:
          </p>
          <ol>
            <li>Click on the "Sign In" button in the top-right corner.</li>
            <li>Switch to the "Create a new account" form.</li>
            <li>
              Fill in the required fields: Username, First Name, Last Name,
              Email, and Password.
            </li>
            <li>Click on the "Agree and Join" button to register.</li>
            <li>
              You will receive a confirmation message upon successful
              registration.
            </li>
          </ol>
        </section>

        <section className="howto-section">
          <h2>User Login</h2>
          <p>Once you have registered, you can log in to your account:</p>
          <ol>
            <li>Click on the "Sign In" button in the top-right corner.</li>
            <li>Enter your registered Email and Password.</li>
            <li>Click on the "Login" button to access your account.</li>
          </ol>
        </section>

        <section className="howto-section">
          <h2>Asking a Question</h2>
          <p>To ask a new question:</p>
          <ol>
            <li>
              After logging in, click on the "Ask Question" button on the Home
              page.
            </li>
            <li>
              Fill in the "Title" and "Description" fields with your question
              details.
            </li>
            <li>Click on the "Post Your Question" button to submit.</li>
            <li>
              Your question will appear on the Home page for the community to
              view and answer.
            </li>
          </ol>
        </section>

        <section className="howto-section">
          <h2>Viewing Questions and Answers</h2>
          <p>To browse and view questions and their answers:</p>
          <ol>
            <li>
              Navigate to the Home page to see a list of recent questions.
            </li>
            <li>
              Click on a question title to view its details and existing
              answers.
            </li>
            <li>
              If there are no answers, you'll see a prompt encouraging you to
              answer.
            </li>
          </ol>
        </section>

        <section className="howto-section">
          <h2>Submitting an Answer</h2>
          <p>To answer a question:</p>
          <ol>
            <li>Navigate to the question you want to answer.</li>
            <li>Scroll down to the "Answer The Top Question" section.</li>
            <li>Type your answer in the provided textarea.</li>
            <li>Click on the "Post Your Answer" button to submit.</li>
            <li>
              Your answer will appear under the community answers section.
            </li>
          </ol>
        </section>

        <section className="howto-section">
          <h2>Logging Out</h2>
          <p>To securely log out of your account:</p>
          <ol>
            <li>
              Click on the "Logout" button located in the header/navigation bar.
            </li>
            <li>
              This will clear your session and redirect you to the login page.
            </li>
          </ol>
        </section>

        <section className="howto-section">
          <h2>Support and Feedback</h2>
          <p>If you encounter any issues or have suggestions:</p>
          <ul>
            <li>Contact our support team through the "About" page.</li>
            <li>
              Provide feedback using the feedback form available in your
              profile.
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export default HowItWorks;
