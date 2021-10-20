import React from "react";
import s from "./RandomBtn.module.scss";
import PropTypes from "prop-types";

import RandomIconSvg from "./shuffle-random-svgrepo-com.svg";

export const RandomBtn = ({ onClick }) => {
  return (
    <div className={s.button} onClick={onClick}>
      <img className={s.button_icon} src={RandomIconSvg} />
    </div>
  );
};

RandomBtn.propTypes = {
  onClick: PropTypes.func,
};
