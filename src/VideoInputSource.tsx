import React, { useState, useEffect, Dispatch, useRef } from "react";
import Source from "./Source";
import { useAsync } from "react-async"
import { AppAction, AppActionType, SetCameraDeviceIdAppAction } from "./App";

export async function listCameras() {
    let cams = await navigator.mediaDevices.enumerateDevices()
    cams = cams.filter(d => d.kind === "videoinput")
    return cams;
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

export function VideoInputSelect(props: { current?: string; action: AppActionType.SET_FACECAM_ID | AppActionType.SET_HARDWARECAM_ID, dispatch: Dispatch<AppAction>}) {
    const { current, action, dispatch } = props;
    const { data, isPending } = useAsync({ promiseFn: listCameras })
    const selectRef = useRef<HTMLSelectElement>(null);
    return <select ref={selectRef} className={isPending ? "loading" : ""} onChange={onChange}>
        <option value="">Off</option>
        {(data || []).map(cam => <option selected={!!current && current === cam.deviceId} value={cam.deviceId}>{cam.label || `camera ${cam.deviceId}`}</option>)}
    </select>

    function onChange() {
        const selected = selectRef.current?.options[selectRef.current.selectedIndex];        
        dispatch({ type: action, deviceId: selected?.value} as SetCameraDeviceIdAppAction)
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