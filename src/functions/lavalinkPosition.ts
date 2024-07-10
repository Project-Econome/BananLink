import { ArgType, NativeFunction, Return } from "@tryforge/forgescript";
import { LavaForge } from "..";
import { NekoLavalinkPlayerQueue } from "rawrlink";
import { PlayerStateType } from "rawrlink/dist/typings/enums/PlayerStateType";

export default new NativeFunction({
    name: "$lavalinkPosition",
    description: "Returns position of a player",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "guild",
            description: "The guild to return player position",
            rest: false,
            required: true,
            type: ArgType.Guild
        }
    ],
    async execute(ctx, [ guild ]) {
        const pl = LavaForge.Instance.manager.players.get(guild.id)
        if (!pl) return this.success()
        return this.success(pl.position)
    },
})