import React from "react";
import UserAvatar from "../UserAvatar/userAvatar";
import "./displayUser.scss";

export default function DisplayUser({ displayName }: { displayName: String }) {
  return (
    <div className="display-user-container">
      <UserAvatar displayName={displayName} />
      <div className="display-name">{displayName}</div>
    </div>
  );
}
