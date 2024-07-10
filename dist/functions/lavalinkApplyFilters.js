"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
exports.default = new forgescript_1.NativeFunction({
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
            type: forgescript_1.ArgType.Guild
        }
    ],
    async execute(ctx, [guild]) {
        const pl = __1.LavaForge.Instance.manager.players.get(guild.id);
        if (!pl)
            return this.success(false);
        await pl.applyFilters();
        return this.success(true);
    },
});
//# sourceMappingURL=lavalinkApplyFilters.js.map