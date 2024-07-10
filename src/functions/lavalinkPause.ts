import { ArgType, NativeFunction, Return } from "@tryforge/forgescript";
import { LavaForge } from "..";
import { NekoLavalinkPlayerQueue } from "rawrlink";
import { PlayerStateType } from "rawrlink/dist/typings/enums/PlayerStateType";

export default new NativeFunction({
    name: "$lavalinkPause",
    description: "Pauses current playing song, returns bool",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "guild",
            description: "The guild to pause track on",
            rest: false,
            required: true,
            type: ArgType.Guild
        }
    ],
    async execute(ctx, [ guild ]) {
        const pl = LavaForge.Instance.manager.players.get(guild.id)
        if (!pl || pl.state !== PlayerStateType.Playing) return this.success(false)

        await pl.pause()

        return this.success(true)
    },
})