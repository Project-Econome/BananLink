"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lavaclient_1 = require("lavaclient");
const LavalinkEventHandler_1 = require("../structures/LavalinkEventHandler");
const __1 = require("..");
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new LavalinkEventHandler_1.LavalinkEventHandler({
    name: lavaclient_1.LavalinkOpCodes.READY,
    description: "Emitted when a lavalink node becomes operational",
    listener(node, data) {
        const commands = __1.LavaForge.Instance.commands.get(lavaclient_1.LavalinkOpCodes.READY);
        if (commands?.length) {
            for (const cmd of commands) {
                forgescript_1.Interpreter.run({
                    command: cmd,
                    client: __1.LavaForge.Instance.client,
                    data: cmd.compiled.code,
                    obj: node
                });
            }
        }
    },
});
//# sourceMappingURL=ready.js.map