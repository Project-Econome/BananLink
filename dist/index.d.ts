import { ForgeClient, ForgeExtension } from "@tryforge/forgescript";
import { Lavaclient, LavalinkNode } from "lavaclient";
import { LavalinkOpCodes } from "lavaclient";
import { LavalinkCommandManager } from "./structures/LavalinkCommandManager";
export interface ILavalinkCommand {
    type: LavalinkOpCodes;
    code: string;
}
export declare const LavalinkEventStorage = "lavalink";
export interface ILavaForgeOptions {
    clientId: string;
    nodes: LavalinkNode[];
    events?: LavalinkOpCodes[];
}
export declare class LavaForge extends ForgeExtension {
    readonly options: ILavaForgeOptions;
    static Instance: LavaForge;
    name: string;
    description: string;
    version: string;
    commands: LavalinkCommandManager;
    client: ForgeClient;
    manager: Lavaclient;
    constructor(options: ILavaForgeOptions);
    init(client: ForgeClient): void;
    private voiceUpdateHandler;
}
//# sourceMappingURL=index.d.ts.map