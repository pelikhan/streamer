import React, { CSSProperties } from 'react'
import { Source } from './Source';

export interface BrowserSourceProps {
    url: string;
    title: string;
}

const style: CSSProperties = {
    border: 0,
    height: "100%",
    left: 0,
    position: "absolute",
    top: 0,
    width: "100%"
}

export class BrowserSource extends React.Component<BrowserSourceProps> {
    render() {
        const { url, title } = this.props;
        return <Source>
            <iframe style={style} title={title} src={url} sandbox="allow-scripts allow-popups" />
        </Source>
    }
}