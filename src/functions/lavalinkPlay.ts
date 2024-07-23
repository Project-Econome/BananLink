import { ArgType, NativeFunction, Return } from "@tryforge/forgescript";
import { LavaForge } from "..";
import { BaseChannel } from "discord.js";
import { LavaclientPlayerQueue, LavaclientTrack } from "lavaclient";

export default new NativeFunction({
    name: "$lavalinkPlay",
    brackets: true,
    description: "Plays given song URL. Returns true if playing now, or false if something is already playing. If empty response, there was an error.",
    unwrap: true,
    args: [
        {
            name: "guild ID",
            description: "The guild to play this song on",
            rest: false,
            required: true,
            type: ArgType.Guild
        },
        {
            name: "channel ID",
            description: "The channel to play this song on",
            rest: false,
            type: ArgType.Channel,
            check: (i: BaseChannel) => i.isVoiceBased(),
            required: true
        },
        {
            name: "index",
            description: "The track index that was loaded via $lavalinkSearch, leave empty to load all.",
            rest: false,
            type: ArgType.Number
        },
        {
            name: "self deaf",
            description: "Whether to join deafened",
            rest: false,
            type: ArgType.Boolean
        }
    ],
    async execute(ctx, [guild, voice, index, deaf]) {
        try {
            const node = LavaForge.Instance.manager.getLeastUsedNode();
            if (!node) return this.success(false);

            const tracks = (Reflect.get(ctx, "tracks") as LavaclientTrack[]);
            const track = tracks?.[index!];

            if ((index !== null && !track) || !tracks?.length) return this.success(false);

            const player = LavaForge.Instance.manager.player(node, guild.id);

            await player.join(voice.id, deaf || false);

            const queue = (player.queue ??= new LavaclientPlayerQueue(player)) as LavaclientPlayerQueue;
            if (track)
                queue.push(track);
            else
                queue.push(...tracks);

            const result = await queue.play();
            return this.success(result);
        } catch (error) {
            console.error('Error executing $lavalinkPlay:', error);
            return this.success(false);
        }
    },
});
