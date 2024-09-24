import React from "react";
import { Link } from "react-router-dom";
import { isAuth } from "../../../helpers/Algo/Auth";

export const JoinUs = () => {
  return (
    !isAuth() && (
      <Link
        to={"/JoinUs"}
        className="h-12 bg-gradient-to-r from-light-primary to-light-secondary px-4 rounded-full flex items-center text-light-on-primary dark:text-dark-on-surface  text-title-medium"
      >
        انضم إلينا
      </Link>
    )
  );
};
