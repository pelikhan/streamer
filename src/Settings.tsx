import {
  AppState,
  AppAction,
  SetFlagAppAction,
  AppActionType,
  SetTextAppAction,
} from "./App";
import { Dispatch, ReactNode, Fragment } from "react";
import React from "react";
import Source from "./Source";
import { VideoInputSelect } from "./VideoInputSource";
import { Checkbox, Button, TextField } from "@fluentui/react";
import { SelectMakeCodeEditor } from "./MakeCodeEditor";

export default function Settings(props: {
  state: AppState;
  dispatch: Dispatch<AppAction>;
}) {
  const { state, dispatch } = props;
  return (
    <Source id="settings">
      <Button
        id="settingsclose"
        onClick={() =>
          dispatch({
            type: AppActionType.SET_SETTINGS,
            on: false,
          } as SetFlagAppAction)
        }
      >
        close
      </Button>
      <h2>MakeCode Streamer settings</h2>
      <Field>
        <SelectMakeCodeEditor editor={state.editor} dispatch={dispatch} />
      </Field>
      <Field>
        <DispatchCheckbox
          label="Multi editors"
          checked={state.multi}
          action={AppActionType.SET_MULTI}
        />
      </Field>
      <h2>Video</h2>
      <Field>
        <Label text={"Face cameras"} />
        <VideoInputSelect
          current={state.faceCamId}
          action={AppActionType.SET_FACECAM_ID}
          dispatch={dispatch}
        />
      </Field>
      <Field>
        <Label text={"Hardware camera"} />
        <VideoInputSelect
          current={state.hardwareCamId}
          action={AppActionType.SET_HARDWARECAM_ID}
          dispatch={dispatch}
        />
      </Field>
      <h2>Paint</h2>
      <Field>
        <DispatchText
          label={"Emojis (😄🤔😭👀)"}
          placeholder="Emojis"
          action={AppActionType.SET_EMOJIS}
          current={state.emojis}
        />
      </Field>
      <h2>Streaming chats</h2>
      <Field>
        <DispatchText
          label={"Mixer"}
          placeholder="Mixer.com account (/account)"
          action={AppActionType.SET_MIXER}
          current={state.mixer}
        />
      </Field>
      <Field>
        <DispatchText
          label={"Twitch"}
          placeholder="Twitch.tv account (/account)"
          action={AppActionType.SET_TWITCH}
          current={state.twitch}
        />
      </Field>
    </Source>
  );

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
    return <div className="field">{props.children}</div>;
  }

  function DispatchText(props: {
    label: string;
    placeholder: string;
    action:
      | AppActionType.SET_EMOJIS
      | AppActionType.SET_MIXER
      | AppActionType.SET_TWITCH;
    current?: string;
  }) {
    const { label, placeholder, action, current } = props;
    return (
      <TextField
        label={label}
        placeholder={placeholder}
        onChange={(e, newValue) =>
          dispatch({ type: action, text: newValue } as SetTextAppAction)
        }
        value={current || ""}
      />
    );
  }

  function Label(props: { text: string }) {
    return <label>{props.text}</label>;
  }

  function DispatchCheckbox(props: {
    label: string;
    checked?: boolean;
    action: AppActionType.SET_MULTI;
  }) {
    const { label, checked, action } = props;
    return (
      <Checkbox
        label={label}
        checked={checked}
        onChange={() =>
          dispatch({ type: action, on: !checked } as SetFlagAppAction)
        }
      />
    );
  }
}
