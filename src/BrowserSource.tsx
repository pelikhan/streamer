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
    let frame: JSX.Element;
    if (sandbox)
        frame = <iframe title={title} src={url} sandbox={"allow-scripts allow-same-origin"} />;
    else
        frame = <iframe title={title} src={url} allow={"usb;camera"} />
    return <Source id={id}>
        {frame}
    </Source>
}