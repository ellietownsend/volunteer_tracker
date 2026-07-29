import { FaCircleInfo,FaUpload } from "react-icons/fa6";
import "../../styles/StudentFeedBackForm.css";


function StudentFeedBackForm(){

    function viewPreviousFeedback(){}

  return (
    <div className="student-feedback-page">
  <div className="student-feedback-card">
    <h2>Submit Student Feedback</h2>
      <p className="feedback-description">
            Upload a completed student feedback CSV to import responses.
        </p>
    <div className="upload-area">
        <div className="upload-circle">
            <FaUpload />
        </div>

        <label className="choose-file-btn">
            Choose File
            <input
                type="file"
                accept=".csv"
                hidden
            />
        </label>
    </div>

    <div className="warning-message">
        <FaCircleInfo className="warning-icon" />
        <span>
            Duplicate CSV forms will not be accepted.
        </span>
    </div>
    


    <button className="submit-btn">
        Upload File
    </button>
    </div>
    </div>
  )}
export default StudentFeedBackForm;