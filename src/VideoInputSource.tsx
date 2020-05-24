import Webcam from "react-webcam";
import { Source } from "./Source";
import React from "react";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

export class VideoInputSource extends Source {
    render() {
        return <Source>
            <Webcam
                audio={false}
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%"
                }}
                videoConstraints={videoConstraints} />
        </Source>
    }
}