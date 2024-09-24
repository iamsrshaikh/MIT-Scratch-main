import React from "react";

import Move from "./motion/Move.jsx";
import TurnAntiClockwise from "./motion/TurnAntiClockwise.jsx";
import TurnClockwise from "./motion/TurnClockwise.jsx";
import GotoXY from "./motion/Goto.jsx";
import SayMessage from "./looks/SayMessage.jsx";
import SayMessageWithTimer from "./looks/SayMessageWithTimer.jsx";
import Size from "./looks/Size.jsx";
import Show from "./looks/Show.jsx";
import Hide from "./looks/Hide.jsx";
import Wait from "./control/Wait.jsx";
import Repeat from "./control/Repeat.jsx";
import HideMessage from "./looks/HideMessage.jsx";
import MoveY from "./motion/MoveY.jsx";
import BroadcastMessage from "./events/broadcast.jsx";
import Think from "./looks/Think.jsx";
import ThinkWithTimer from "./looks/ThinkWithTimer.jsx";

export const getComponent = (key, id) => {
  switch (key) {
    case "MOVE_Y":
      return <MoveY comp_id={id} />;
    case "MOVE":
      return <Move comp_id={id} />;

    case "TURN_CLOCKWISE":
      return <TurnClockwise comp_id={id} />;

    case "TURN_ANTI_CLOCKWISE":
      return <TurnAntiClockwise comp_id={id} />;

    case "GOTO_XY":
      return <GotoXY comp_id={id} />;

    case "SAY_MESSAGE":
      return <SayMessage comp_id={id} />;

    case "SAY_MESSAGE_WITH_TIMER":
      return <SayMessageWithTimer comp_id={id} />;

    case "SIZE":
      return <Size comp_id={id} />;

    case "SHOW":
      return <Show comp_id={id} />;

    case "HIDE":
      return <Hide comp_id={id} />;

    case "BROADCAST":
      return <BroadcastMessage comp_id={id} />;

    case "WAIT":
      return <Wait comp_id={id} />;

    case "REPEAT":
      return <Repeat comp_id={id} />;

    case "HIDE_MESSAGE":
      return <HideMessage comp_id={id} />;

    case "THINK":
      return <Think comp_id={id} />;

    case "THINK_TIMER":
      return <ThinkWithTimer comp_id={id} />;

    default:
      return React.null;
  }
};
