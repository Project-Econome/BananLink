"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
const lavaclient_1 = require("lavaclient");
exports.default = new forgescript_1.NativeFunction({
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
            type: forgescript_1.ArgType.Guild
        },
        {
            name: "channel ID",
            description: "The channel to play this song on",
            rest: false,
            type: forgescript_1.ArgType.Channel,
            check: (i) => i.isVoiceBased(),
            required: true
        },
        {
            name: "index",
            description: "The track index that was loaded via $lavalinkSearch, leave empty to load all.",
            rest: false,
            type: forgescript_1.ArgType.Number
        },
        {
            name: "self deaf",
            description: "Whether to join deafened",
            rest: false,
            type: forgescript_1.ArgType.Boolean
        }
    ],
    async execute(ctx, [guild, voice, index, deaf]) {
        try {
            const node = __1.LavaForge.Instance.manager.getLeastUsedNode();
            if (!node)
                return this.success(false);
            const tracks = Reflect.get(ctx, "tracks");
            const track = tracks?.[index];
            if ((index !== null && !track) || !tracks?.length)
                return this.success(false);
            const player = __1.LavaForge.Instance.manager.player(node, guild.id);
            await player.join(voice.id, deaf || false);
            const queue = (player.queue ??= new lavaclient_1.LavaclientPlayerQueue(player));
            if (track)
                queue.push(track);
            else
                queue.push(...tracks);
            const result = await queue.play();
            return this.success(result);
        }
        catch (error) {
            console.error('Error executing $lavalinkPlay:', error);
            return this.success(false);
        }
    },
});
//# sourceMappingURL=lavalinkPlay.js.map