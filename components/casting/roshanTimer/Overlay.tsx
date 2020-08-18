import { ReactElement, useState, useEffect } from "react";
import { useMessageListener } from "../../websocket/MessageHandler";
import { isRoshanMessage } from "../../websocket/state";
import { useInterval } from "../../../hooks/interval";
import Timer from "./Timer";

export default function Overlay({testing, auth}: {testing: boolean; auth: string}): ReactElement | null {
    const message = useMessageListener();
    const [remaining, setRemaining] = useState(0);
    const [state, setState] = useState<'alive' | 'respawn_base' | 'respawn_variable'>('alive');

    useEffect(() => {
        if(message && isRoshanMessage(message)) {
            setRemaining(message.value.remaining);
            setState(message.value.state);
        }
    }, [message]);

    useInterval(() => remaining > 0 && setRemaining(remaining - 1));

    if(state !== 'alive' || testing) {
        return <Timer remaining={remaining} state={state} auth={auth} />;
    }
    return null;
}