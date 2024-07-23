import { BaseEventHandler, ForgeClient } from "@tryforge/forgescript";
import { LavalinkOpCodes } from "lavaclient";
import { LavalinkManagerEvents } from "lavaclient";
import { LavaForge } from "..";

export type LavalinkEvents = {
    [P in keyof LavalinkManagerEvents]: Parameters<LavalinkManagerEvents[P]>;
}

export class LavalinkEventHandler<T extends keyof LavalinkEvents> extends BaseEventHandler<LavalinkEvents, T> {
    register(client: ForgeClient): void {
        LavaForge.Instance.manager.on(this.name, this.listener as any);
    }
}
