import React from 'react'
import Source from './Source';

export interface BrowserSourceProps {
    id: string;
    url?: string;
    title?: string;
    sandbox?: boolean;
}

export default function BrowserSource(props: BrowserSourceProps) {
    const { id, url, title, sandbox } = props;

    const frame = <iframe title={title} src={url} />
    if (sandbox)
        frame.props.sandbox = "allow-scripts allow-same-origin";
    else
        frame.props.allow = "usb;camera"
    return <Source id={id}>
        {frame}
    </Source>
}