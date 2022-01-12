import React, { useState } from "react";
import axios from "axios";
import "../styles/modal.scss";

const Modal = ({ setShowModal, seminarName, seminarDate }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmitMail = () => {
    axios({
      method: "POST",
      url: "/api/users/send-email",
      data: {
        name: "Mayur",
        email: email,
        seminarName,
        seminarDate,
        message: "Registered for seminar successfully",
      },
    }).then((response) => {
      console.log({ response });
      setMessage("Email sent successfully!!");
      setEmail("");
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <span>Confirm</span>
          <span className="close" onClick={() => setShowModal(false)}>
            &times;
          </span>
        </div>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <span>Note: A confirmation mail will be send to this email id</span>
        <span className="message">{message}</span>
        <button
          type="submit"
          className="primary-btn submit-btn"
          onClick={handleSubmitMail}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Modal;
