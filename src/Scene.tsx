import React from "react";

export interface SceneProps {
    className: string;
    children?: JSX.Element | JSX.Element[]
}

export default function Scene(props: SceneProps) {
    const { className, children } = props;
    return <div className={`scene ${className}`}>
        { children }
    </div>
}