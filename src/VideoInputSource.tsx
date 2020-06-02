import React, { useState, useEffect } from "react";
import Source from "./Source";

export interface VideoInputSource {
    id: string;
    deviceId?: string;
}

function stopStream(el: HTMLVideoElement) {
    try {
        if (el.srcObject) {
            const tracks = (el.srcObject as MediaStream).getVideoTracks();
            if (tracks && tracks[0] && tracks[0].stop) tracks[0].stop();
        }
        el.srcObject = null;
    } catch (e) { }
}

async function startStream(el: HTMLVideoElement, deviceId?: string) {
    stopStream(el)
    console.log(`trying webcam ${deviceId}`)
    const constraints: any = {
        audio: false,
        video: {
            aspectRatio: 4 / 3
        }
    }
    if (deviceId)
        constraints.video.deviceId = deviceId;
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    el.volume = 0; // don't use sound!
    el.srcObject = stream;
    el.onloadedmetadata = (e) => {
        console.log(`start webcam ${deviceId}`)
        el.play();
    }
}


export default function VideoInputSource(props: { id: string; deviceId?: string; rotate?: boolean; }) {
    const { id, deviceId, rotate } = props;
    const [error, setError] = useState(false);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        startStream(video, deviceId)
            .then(() => setError(false))
            .catch(e => {
                console.log(`error: ${e.message}`)
                setError(true)
                stopStream(video);
            })
    })

    return <Source id={id}>
        <video className={rotate ? "rotate" : ""} ref={videoRef} />
    </Source>
}