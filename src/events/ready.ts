import { LavalinkOpCodes } from "lavaclient";
import { LavalinkEventHandler } from "../structures/LavalinkEventHandler";
import { LavaForge } from "..";
import { Interpreter } from "@tryforge/forgescript";

export default new LavalinkEventHandler(
    {
        name: LavalinkOpCodes.READY,
        description: "Emitted when a lavalink node becomes operational",
        listener(node, data) {
            const commands = LavaForge.Instance.commands.get(LavalinkOpCodes.READY);
            
            if (commands?.length) {
                for (const cmd of commands) {
                    Interpreter.run({
                        command: cmd,
                        client: LavaForge.Instance.client,
                        data: cmd.compiled.code,
                        obj: node as any
                    });
                }
            }
        },
    }
);
