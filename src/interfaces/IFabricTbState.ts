import { ITbState } from "tubular-react-common/dist/types";
import { ITbFabricList } from "./ITbFabricList";
import { ITbColumn } from "./ITbColumn";

export interface IFabricTbState extends ITbState {
    list: ITbFabricList,
    fabricColumns: ITbColumn[];
}