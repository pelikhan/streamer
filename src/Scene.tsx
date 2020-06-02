import React, { ReactNode } from "react";

export interface SceneProps {
    className: string;
    children?: ReactNode;
}

export default function Scene(props: SceneProps) {
    const { className, children } = props;
    return <div className={`${className}scene`}>
        { children }
    </div>
}