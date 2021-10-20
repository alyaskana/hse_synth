import React, { useState } from "react";
import s from "./SynthContainer.module.scss";
import { Synth } from "../../components/Synth";

export const SynthContainer = () => {
  const [columnsCount, setColumnsCount] = useState(16);

  return (
    <div className={s.page_wrapper}>
      <div className={s.plus_minus_group}>
        <button
          className={s.plus}
          onClick={() => setColumnsCount(columnsCount + 1)}
        >
          +
        </button>
        <button
          className={s.minus}
          onClick={() => setColumnsCount(columnsCount - 1)}
        >
          -
        </button>
      </div>
      <Synth columnsCount={columnsCount} />
    </div>
  );
};
