import { BaseCommandManager } from "@tryforge/forgescript";
import { LavalinkOpCodes } from "lavaclient";

export class LavalinkCommandManager extends BaseCommandManager<LavalinkOpCodes> {
    handlerName: string = "ForgeLinkCommands";
}
