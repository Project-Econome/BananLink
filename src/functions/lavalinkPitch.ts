import { ArgType, NativeFunction, Return } from "@tryforge/forgescript";
import { LavaForge } from "..";
import { NekoLavalinkPlayerQueue } from "rawrlink";
import { PlayerStateType } from "rawrlink/dist/typings/enums/PlayerStateType";

export default new NativeFunction({
    name: "$lavalinkPitch",
    description: "Sets pitchness of player, returns bool",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "guild",
            description: "The guild to add pitch on",
            rest: false,
            required: true,
            type: ArgType.Guild
        },
        {
            name: "pitch",
            description: "The pitch to set",
            rest: false,
            required: true,
            type: ArgType.Number
        }
    ],
    async execute(ctx, [ guild, pitch ]) {
        const pl = LavaForge.Instance.manager.players.get(guild.id)
        if (!pl) return this.success(false)
        pl.filters.timescale.setPitch(pitch)
        return this.success(true)
    },
})