import React, { ReactNode } from "react";
import { AppState } from "./App";

export default function Scene(props: {
    state: AppState;
    children?: ReactNode;
}) {
    const { state, children } = props;
    return <div className={`${state.scene}scene ${state.hardware ? "hardware" : ""} ${state.chat ? "chat" : ""}`}>
        { children }
    </div>
}