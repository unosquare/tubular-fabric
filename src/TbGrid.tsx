import * as React from 'react';
import { Selection } from 'office-ui-fabric-react/lib/Utilities';
import { ITbOptions } from 'tubular-react-common/dist/types/ITbOptions';
import { IColumn } from 'office-ui-fabric-react/lib/components/DetailsList';
import { ICommandBarItemProps } from 'office-ui-fabric-react/lib/components/CommandBar/CommandBar.types';
import { TbDetailsList } from './TbDetailsList';
import { ITbFabricInstance } from './interfaces/ITbFabricInstance';

export interface ITbExtendedOptions extends ITbOptions {
    onRemoveAction?: (selection: Selection) => void;
    filterable: boolean;
    searchable: boolean;
    toggleColumns: boolean;
    hiddeCommandBar: boolean;
    commandBarItems?: ICommandBarItemProps[];
    selectionMode?: number;
}

export interface ITbGridProps {
    instance: ITbFabricInstance;
    options: Partial<ITbExtendedOptions>;
    onRenderItemColumn?: (item: any, index: number, column: IColumn) => React.ReactNode;
}

export const TbGrid: React.FunctionComponent<ITbGridProps> = ({
    instance,
    options,
    onRenderItemColumn,
}) => {

    return <TbDetailsList tbFabricInstance={instance} options={options} onRenderItemColumn={onRenderItemColumn} />;
};
