import React from "react";
import BrowserSource from "./BrowserSource";

export default function Chat(props: { mixer?: string; twitch?: string }) {
  const { mixer, twitch } = props;
  let url = undefined;
  if (mixer) url = `https://mixer.com/embed/chat/${mixer}?composer=false`;
  else if (twitch)
    url = `https://www.twitch.tv/embed/${twitch}/chat?parent=${window.location.host}`;

  if (!url) return null; // nothing to see here

  return <BrowserSource id="chat" sandbox={true} url={url} />;
}
