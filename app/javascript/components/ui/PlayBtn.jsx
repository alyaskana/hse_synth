import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";

import s from "./PlayBtn.module.scss";

export const PlayBtn = ({ active = false }) => {
  return (
    <div className={cn(s.button, active ? s.pause : s.play)}>
      <div className={s.button_icon}></div>
    </div>
  );
};

PlayBtn.propTypes = {
  active: PropTypes.bool,
};
