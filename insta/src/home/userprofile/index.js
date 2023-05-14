import React from "react";
import { useSelector } from "react-redux";
import { selectuser } from "../../app/counterslice";

export const Userprofile = () => {
  const count = useSelector(selectuser);

  return <div>{count}</div>;
};
