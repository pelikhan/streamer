import React from 'react'
import Source from './Source';

export interface BrowserSourceProps {
    id: string;
    url: string;
    title: string;
}

export default function BrowserSource(props: BrowserSourceProps) {
    const { id, url, title } = props;
    return <Source id={id}>
        <iframe style={{
            border: 0,
            height: "100%",
            left: "0.5rem",
            position: "absolute",
            top: "0.5rem",
            width: "100%"
        }} title={title} src={url} />
    </Source>
}