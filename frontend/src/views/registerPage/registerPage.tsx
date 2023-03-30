import React from "react";
import "./registerPage.scss";
import SVG from "react-inlinesvg";

const RegisterPage = () => {
  return (
    <div className="register-page">
      <SVG
        className="clef-icon"
        src={`${process.env.PUBLIC_URL}/icons/solclef.svg`}
      />
      <div className="title">
        Register to start <label className="blue-label">collaborating</label>
      </div>
      <form>
        <div className="form-section">
          <div className="field-title">Username</div>
          <input type="text" className="field-input" />
        </div>
        <div className="form-section">
          <div className="field-title">Password</div>
          <input type="text" className="field-input" />
        </div>
        <div className="submit-container">
          <input type="submit" value="Register" className="submit-button" />
        </div>
      </form>

      <a className="register-link" href="/login">
        Already have an account?
      </a>
    </div>
  );
};

export default RegisterPage;
