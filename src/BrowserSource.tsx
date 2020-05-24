import React, { CSSProperties } from 'react'
import { Source } from './Source';

export interface BrowserSourceProps {
    url: string;
    title: string;
}

export class BrowserSource extends React.Component<BrowserSourceProps> {
    render() {
        const { url, title } = this.props;
        return <Source>
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
}