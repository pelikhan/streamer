import { AppState, AppAction, SetFlagAppAction, AppActionType, SetTextAppAction } from "./App";
import { Dispatch, ReactNode, Fragment } from "react";
import React from "react";
import Source from "./Source";
import { VideoInputSelect } from "./VideoInputSource";

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
        <Field>
            <Label text={"Face cameras"} />
            <VideoInputSelect current={state.faceCamId} action={AppActionType.SET_FACECAM_ID} dispatch={dispatch} />
        </Field>
        <Field>
            <Label text={"Hardware camera"} />
            <VideoInputSelect current={state.hardwareCamId} action={AppActionType.SET_HARDWARECAM_ID} dispatch={dispatch} />
        </Field>
        <h2>Paint</h2>
        <Field>
            <Label text={"Emojis (😄🤔😭👀)"} />
            <Text placeholder="Emojis" action={AppActionType.SET_EMOJIS} current={state.emojis} />
        </Field>
        <h2>Streaming chats</h2>
        <Field>
            <Label text={"Mixer"} />
            <Text placeholder="Mixer.com account (/account)" action={AppActionType.SET_MIXER} current={state.mixer} />
        </Field>
        <Field>
            <Label text={"Twitch"} />
            <Text placeholder="Twitch.tv account (/account)" action={AppActionType.SET_TWITCH} current={state.twitch} />
        </Field>
    </Source>

    /*
            <Field>
                <input type="checkbox" id="facerotatecameracheckbox"></input>
                <label for="facerotatecameracheckbox">Rotate camera 180</label>
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
    */

    function Field(props: { children: ReactNode }) {
        return <div className="field">
            {props.children}
        </div>
    }

    function Text(props: { placeholder: string; action: AppActionType.SET_EMOJIS | AppActionType.SET_MIXER | AppActionType.SET_TWITCH; current?: string; }) {
        const { placeholder, action, current } = props;
        const inputRef = React.useRef<HTMLInputElement>(null);
        return <input ref={inputRef} placeholder={placeholder} onChange={() => dispatch({ type: action, text: inputRef.current?.value } as SetTextAppAction)} value={current || ""} />
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