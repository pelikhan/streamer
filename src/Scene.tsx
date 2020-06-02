import React, { ReactNode } from "react";
import { AppState } from "./App";

export default function Scene(props: {
  state: AppState;
  children?: ReactNode;
}) {
  const { state, children } = props;
  return (
    <div
      className={`${state.scene}scene ${state.hardware ? "hardware" : ""} ${
        state.chat && !state.hardware ? "chat" : ""
      } ${state.paint ? "paint" : ""} ${state.multi ? "multi" : ""}`}
    >
      {children}
    </div>
  );
}
