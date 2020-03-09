import { ITbFabricApi } from "./ITbFabricApi";
import { IFabricTbState } from "./IFabricTbState";

export interface ITbFabricInstance {
    api: ITbFabricApi;
    state: IFabricTbState;
}