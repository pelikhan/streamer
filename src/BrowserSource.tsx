import React from 'react'
import Source from './Source';

export interface BrowserSourceProps {
    id: string;
    hidden?: boolean;
    url?: string;
    title?: string;
    sandbox?: boolean;
    dataKind?: string;
}

export default function BrowserSource(props: BrowserSourceProps) {
    const { id, url, title, sandbox, hidden, dataKind } = props;
    let frame: JSX.Element;
    if (sandbox)
        frame = <iframe data-kind={dataKind} title={title} src={url} sandbox={"allow-scripts allow-same-origin"} />;
    else
        frame = <iframe data-kind={dataKind} title={title} src={url} allow={"usb;camera"} />
    return <Source id={id} hidden={hidden}>
        {frame}
    </Source>
}