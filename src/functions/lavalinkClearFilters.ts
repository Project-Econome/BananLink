import { ArgType, NativeFunction, Return } from "@tryforge/forgescript";
import { LavaForge } from "..";
import { NekoLavalinkPlayerQueue } from "rawrlink";
import { PlayerStateType } from "rawrlink/dist/typings/enums/PlayerStateType";

export default new NativeFunction({
    name: "$lavalinkClearFilters",
    description: "Clears filters of a player",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "guild",
            description: "The guild to clear filters on",
            rest: false,
            required: true,
            type: ArgType.Guild
        }
    ],
    async execute(ctx, [ guild ]) {
        const pl = LavaForge.Instance.manager.players.get(guild.id)
        if (!pl) return this.success(false)
        pl.filters.clear()
        await pl.applyFilters()
        return this.success(true)
    },
})