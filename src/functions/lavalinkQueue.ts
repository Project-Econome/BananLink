import { ArgType, NativeFunction, Return } from "@tryforge/forgescript";
import { LavaForge } from "..";
import { NekoLavalinkPlayerQueue } from "rawrlink";

export default new NativeFunction({
    name: "$lavalinkQueue",
    description: "Returns valid JSON format of all tracks in queue",
    brackets: true,
    args: [
        {
            name: "guild",
            description: "The guild to pull queue from",
            rest: false,
            type: ArgType.Guild,
            required: true
        }
    ],
    unwrap: true,
    async execute(ctx, [ guild ]) {
        const pl = LavaForge.Instance.manager.players.get(guild.id)
        if (!pl) return this.success()
        return this.successJSON((pl.queue as NekoLavalinkPlayerQueue).map(x => x.data.info) as any)
    },
})