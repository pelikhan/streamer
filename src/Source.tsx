import React from 'react'


export interface SourceProps {
    id: string;
    children?: JSX.Element | JSX.Element[];
}

export default function Source(props: SourceProps) {
    const { children, id } = props;
    return <div id={id} className={"source"}>
        {children}
    </div>
}
