import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSeminarDetails } from "../actions/userActions";
import Modal from "./Modal";
import "../styles/seminars.scss";

const SeminarPage = ({ history }) => {
  const [showModal, setShowModal] = useState(false);
  const [seminarName, setSeminarName] = useState(false);
  const [seminarDate, setSeminarDate] = useState(false);
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const seminarDetails = useSelector((state) => state.seminarDetails);
  const { seminars } = seminarDetails;
  console.log({ seminars });
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getSeminarDetails());
    }
    dispatch(getSeminarDetails());
  }, []);

  return (
    <div className="seminar-container">
      <h1>Seminars</h1>
      <table className="seminars">
        <tr>
          <th>Seminar Name</th>
          <th>Seminar Date</th>
          <th>Seminar Price</th>
        </tr>
        <tr>
          {seminars &&
            seminars.length > 0 &&
            seminarDetails.seminars.map((seminar, index) => (
              <>
                <td>{seminar.seminar_name}</td>
                <td>{seminar.seminar_date}</td>
                <td>{seminar.price}</td>
                <button
                  className="seminar-btn"
                  onClick={() => {
                    setShowModal(!showModal);
                    setSeminarName(seminar.seminar_name);
                    setSeminarDate(seminar.seminar_date);
                  }}
                >
                  Register
                </button>
              </>
            ))}
        </tr>
      </table>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          seminarName={seminarName}
          seminarDate={seminarDate}
        />
      )}
    </div>
  );
};

export default SeminarPage;
