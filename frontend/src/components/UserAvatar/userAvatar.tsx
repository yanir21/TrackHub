import React, { useEffect } from "react";
import "./userAvatar.scss";
import variables from "../../consts.scss";

const UserAvatar = ({
  displayName,
  className = "",
}: {
  displayName: String;
  className?: String;
}) => {
  const [firstName, secondName] = displayName.split(" ");

  const nameParam = !secondName ? firstName : `${firstName}+${secondName}`;

  return (
    <>
      <img
        className={`user-avatar ${className}`}
        src={`https://ui-avatars.com/api/?name=${nameParam}&background=${
          variables.primaryColor.split("#")[1]
        }&color=fff`}
      />
    </>
  );
};

export default UserAvatar;
