import React from "react";

export interface SceneProps {
    className: string;
    sources: JSX.Element | JSX.Element[]
}

export function Scene(props: SceneProps) {
    const { className, sources } = props;
    return <div className={`scene ${className}`}>
        { sources }
    </div>
}