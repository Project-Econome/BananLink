import { ArgType, NativeFunction, Return } from "@tryforge/forgescript";
import { LavaForge } from "..";
import { NekoLavalinkPlayerQueue } from "rawrlink";
import { PlayerStateType } from "rawrlink/dist/typings/enums/PlayerStateType";

export default new NativeFunction({
    name: "$lavalinkApplyFilters",
    description: "Applies filters for a player",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "guild",
            description: "The guild to add filters to",
            rest: false,
            required: true,
            type: ArgType.Guild
        }
    ],
    async execute(ctx, [ guild ]) {
        const pl = LavaForge.Instance.manager.players.get(guild.id)
        if (!pl) return this.success(false)
        await pl.applyFilters()
        return this.success(true)
    },
})