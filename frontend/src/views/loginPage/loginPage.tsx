import React, { useState } from "react";
import "./loginPage.scss";
import SVG from "react-inlinesvg";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="login-page">
      <SVG
        className="clef-icon"
        src={`${process.env.PUBLIC_URL}/icons/solclef.svg`}
      />
      <div className="title">Sign in to collaborate</div>
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
          <input type="submit" value="Sign In" className="submit-button" />
        </div>
      </form>

      <a className="register-link" href="/register">
        Don't have an account yet?
      </a>
    </div>
  );
};

export default LoginPage;
