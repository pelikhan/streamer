import React, { ReactNode } from 'react'


export interface SourceProps {
    id: string;
    hidden?: boolean;
    children?: ReactNode;
}

export default function Source(props: SourceProps) {
    const { children, id, hidden } = props;
    return <div id={id} className={`source ${hidden ? "hidden" : ""}`}>
        {children}
    </div>
}
