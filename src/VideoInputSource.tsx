import React from "react";
import Source from "./Source";

export interface VideoInputSource {
    id: string;
    deviceId?: string;
}

export default function VideoInputSource(props: VideoInputSource) {
    const { id } = props;
    if (!id) return null;
    
    return <Source id={id}>
        <video />
    </Source>
}