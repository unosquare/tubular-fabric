import { ITbFabricApi } from './ITbFabricApi';
import { IFabricTbState } from './IFabricTbState';

export interface ITbFabricInstance<TItem> {
    api: ITbFabricApi;
    state: IFabricTbState<TItem>;
}
