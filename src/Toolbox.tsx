import React, { Dispatch } from "react"
import { AppAction, AppActionType, SetSceneAppAction, AppState, SetFlagAppAction, SetPaintToolAppAction, SetPaintCommandAppAction } from "./App"

export default function Toolbox(props: { state: AppState, dispatch: Dispatch<AppAction> }) {
    const { state, dispatch } = props;

    function IconButton(props: { icon?: string; text?: string; title: string; active?: boolean; handler: () => void }) {
        const { icon, title, active, handler, text } = props;
        return <button className={`${icon ? `ms-Icon ms-Icon--${icon}` : ''} ${active ? "active" : ""}`} title={title} onClick={handler}>{text}</button>
    }

    function PaintButton(props: { icon?: string; title: string; tool: string; emoji?: string; }) {
        return <IconButton icon={props.icon} 
            title={props.title}
            text={props.emoji}
            active={state.paintTool === "emoji" && props.emoji ? props.emoji == state.emoji : props.tool === state.paintTool}
            handler={() => dispatch({ type: AppActionType.SET_PAINT_TOOL, tool: props.tool, emoji: props.emoji } as SetPaintToolAppAction)} />
    }

    function SceneButton(props: { icon: string; title: string; scene: string }) {
        const { icon, title, scene } = props;
        return <IconButton
            icon={icon}
            title={title}
            active={state.scene === scene}
            handler={() => dispatch({ type: AppActionType.SET_SCENE, scene } as SetSceneAppAction)}
        />
    }

    if (state.paint) {
        const emojis = [];
        if (state.emojis)
            for (let i = 0; i < state.emojis.length; i += 2)
                emojis[i >> 1] = state.emojis.substr(i, 2);
        return <div id="toolbox">
            <PaintButton icon="ArrowTallUpLeft" title="Draw arrow" tool={"arrow"} />
            <PaintButton icon="RectangleShape" title="Draw rectangle" tool={"rect"} />
            <PaintButton icon="PenWorkspace" title="Draw freeform" tool={"pen"} />
            {emojis.map(emoji => <PaintButton emoji={emoji} tool={"emoji"} title={"Stamp " + emoji} />)}
            <IconButton icon="WhiteBoardApp16" title="Paint screen in white" handler={() => dispatch({ type: AppActionType.SET_PAINT_COMMAND, command: "whiteboard"} as SetPaintCommandAppAction)} />
            <IconButton icon="EraseTool" title="Clear all drawings" handler={() => dispatch({ type: AppActionType.SET_PAINT_COMMAND, command: "clear"} as SetPaintCommandAppAction)} />
            <IconButton icon="ChromeClose" title="Edit Paint mode" handler={() => dispatch({ type: AppActionType.SET_PAINT, on: false } as SetFlagAppAction)} />
        </div>
    }

    return <div id="toolbox">
        <SceneButton icon="OpenPane" title="move webcam left" scene={"left"} />
        <SceneButton icon="OpenPaneMirrored" title="move webcam right" scene={"right"} />
        <SceneButton icon="Contact" title="webcam large" scene={"chat"} />
        {state.hardwareCamId && <IconButton icon="Robot" title="hardware webcam" handler={() => dispatch({ type: AppActionType.SET_HARDWARECAM, on: !state.hardware } as SetFlagAppAction)} active={state.hardware} />}
        {(state.mixer || state.twitch) && <IconButton icon="OfficeChat" title="show/hide chat" handler={() => dispatch({ type: AppActionType.SET_CHAT, on: !state.chat } as SetFlagAppAction)} active={state.chat} />}
        <IconButton icon="PenWorkspace" title="Paint mode" handler={() => dispatch({ type: AppActionType.SET_PAINT, on: true } as SetFlagAppAction)} />
        <IconButton icon="Settings" title="show settings" handler={() => dispatch({ type: AppActionType.SET_SETTINGS, on: true } as SetFlagAppAction)} />
    </div>;
}

/*
        const emojis = [];
        if (config.emojis)
            for(let i =0; i < config.emojis.length;i += 2)
                emojis[i >> 1] = config.emojis.substr(i, 2);
        if (state.paint) {
            addPaintButton("ArrowTallUpLeft", "Draw arrow", "arrow")
            addPaintButton("RectangleShape", "Draw rectangle", "rect")
            addPaintButton("PenWorkspace", "Draw freeform", "pen")
            addButton("WhiteBoardApp16", "Paint screen in white", whiteboard)
            emojis.forEach(emoji => {
                const btn = document.createElement("button")
                btn.innerText = emoji;
                btn.addEventListener("pointerdown", function(e) {
                    tickEvent("streamer.emoji", { emoji }, { interactiveConsent: true })
                    state.emoji = emoji;
                    setPaintTool("emoji")
                }, false)
                toolbox.append(btn)
            })
            addButton("EraseTool", "Clear all drawings", clearPaint)
            addButton("ChromeClose", "Exit paint mode", togglePaint)
        } else {
            addButton("OpenPane", "move webcam left", () => setScene("left"))
            addButton("OpenPaneMirrored", "move webcam right", () => setScene("right"))
            addButton("Contact", "webcam large", () => setScene("chat"))
            if (config.hardwareCamId)
            addButton("Robot", "hardware webcam", toggleHardware)
            if (config.mixer || config.twitch)
                addButton("OfficeChat", "show/hide chat", toggleChat)
            addButton("PenWorkspace", "Paint mode", togglePaint)
            addButton("Settings", "Show settings", showSettings);
        }

        function addButton(icon, title, handler) {
            const btn = document.createElement("button")
            btn.title = title
            btn.addEventListener("pointerdown", function(e) {
                tickEvent("streamer.button", { button: icon }, { interactiveConsent: true })
                handler(e)
            }, false)
            const i = document.createElement("i")
            btn.append(i)
            i.className = `ms-Icon ms-Icon--${icon}`
            toolbox.append(btn)
            return btn;
        }

        function addPaintButton(icon, title, tool) {
            const btn = addButton(icon, title, () => setPaintTool(tool));
            if (state.painttool == tool)
                btn.classList.add("active")
        }

        function setScene(scene) {
            tickEvent("streamer.scene", { scene: scene }, { interactiveConsent: true });
            state.sceneIndex = scenes.indexOf(`${scene}scene`);
            render();
        }
    }
}
*/