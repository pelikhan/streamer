import React from "react";
import Source from "./Source";

export interface VideoInputSource {
    id: string;
    deviceId?: string;
}

export default function VideoInputSource(props: VideoInputSource) {
    const { id } = props;
    return <Source id={id}>
        <video />
    </Source>
}