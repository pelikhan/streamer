import React from 'react';
import { BrowserSource } from './BrowserSource';

export interface SceneProps {
    editorUrl: string;
    editorTitle: string;
}

export class Scene extends React.Component<SceneProps> {
    constructor(props: SceneProps) {
        super(props);
    }

    render() {
        const { editorUrl, editorTitle } = this.props;
        return <div>
            <BrowserSource url={editorUrl} title={editorTitle} />
        </div>
    }
}