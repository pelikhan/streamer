import { AppState, AppAction, SetFlagAppAction, AppActionType } from "./App";
import { Dispatch, ReactNode, Fragment } from "react";
import React from "react";
import Source from "./Source";

export default function Settings(props: { state: AppState, dispatch: Dispatch<AppAction> }) {
    const { state, dispatch } = props;
    const { settings } = state;
    return <Source id="settings">
        <button id="settingsclose" onClick={() => dispatch({ type: AppActionType.SET_SETTINGS, on: false } as SetFlagAppAction)}>close</button>
        <h2>MakeCode Streamer settings</h2>
        <Field>
            <Label text={"Choose your editor"} />
            <select id="editorselect"></select>
        </Field>
        <Field>
            <Checkbox label="Multi editors" checked={state.multi} action={AppActionType.SET_MULTI} />
        </Field>
        <h2>Video</h2>
    </Source>

    /*
            <Field>
                <label for="facecamselect">Choose a Face Webcam</label>
                <select id="facecamselect"></select>
                <div class="error hidden" id="facecamerror">Connection error. Make sure the camera is not blocked and that the WebCam is not beging used by another application.</div>
            </Field>
            <Field>
                <input type="checkbox" id="facerotatecameracheckbox"></input>
                <label for="facerotatecameracheckbox">Rotate camera 180</label>
            </Field>
            <Field>
                <label for="hardwarecamselect">Choose a Hardware Webcam</label>
                <select id="hardwarecamselect"></select>
                <div class="error hidden" id="hardwarecamerror">Connection error. Make sure the camera is not blocked and that the WebCam is not beging used by another application.</div>
            </Field>
            <Field>
                <input type="checkbox" id="hardwarerotatecameracheckbox"></input>
                <label for="hardwarerotatecameracheckbox">Rotate camera 180</label>
            </Field>
            <h2>Social accounts</h2>
            <Field>
                <label for="twitterinput">Twitter (optional)</label>
                <input id="twitterinput" placeholder="Twitter handle (@account)" />
            </Field>
            <h2>Paint</h2>
            <Field>
                <label for="emojisinput">Emojis (😄🤔😭👀)</label>
                <input id="emojisinput" placeholder="Emojis" />
            </Field>
            <h2>Streaming chats</h2>
            <Field>
                <label for="mixerinput">Mixer (optional)</label>
                <input id="mixerinput" placeholder="Mixer.com account (/account)" />
            </Field>
            <Field>
                <label for="twitchinput">Twitch (optional)</label>
                <input id="twitchinput" placeholder="Twitch.tv account (/account)" />
            </Field>
    */

    function Field(props: { children: ReactNode }) {
        return <div className="field">
            {props.children}
        </div>
    }

    function Label(props: { text: string }) {
        return <label>{props.text}</label>
    }

    function Checkbox(props: { label: string, checked?: boolean, action: AppActionType.SET_MULTI }) {
        const { label, checked, action } = props;
        return <Fragment>
            <input type="checkbox" checked={checked} onChange={() => dispatch({ type: action, on: !checked } as SetFlagAppAction)}></input>
            <Label text={label} />
        </Fragment>
    }

}