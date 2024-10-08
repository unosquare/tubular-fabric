import * as React from 'react';
import { Selection, ICommandBarItemProps, mergeStyleSets } from '@fluentui/react';
import { ITbOptions } from 'tubular-react-common/dist/types/ITbOptions';
import { TbDetailsList } from './TbDetailsList';
import { TbCommandBar } from './TbCommandBar';
import { ITbColumnProxy } from './interfaces/ITbColumn';
import { ColumnModel, TubularHttpClientAbstract } from 'tubular-common';
import useTbFabric from './useTbFabric';

export interface ITbExtendedOptions extends ITbOptions {
    onRemoveAction?: (selection: Selection) => void;
    filterable: boolean;
    searchable: boolean;
    toggleColumns: boolean;
    recordCounter: boolean;
    commandBarItems?: ICommandBarItemProps[];
    hideCommandBar?: boolean;
    selectionMode?: number;
}

export interface ITbGridProps {
    options: Partial<ITbExtendedOptions>;
    onRenderItemColumn?: (item: any, index: number, column: ColumnModel) => React.ReactNode;
    columns: ITbColumnProxy[];
    source: string | Request | TubularHttpClientAbstract | any[];
}

const classes = mergeStyleSets({
    tbContainer: { margin: 'auto', display: 'flex', flexDirection: 'column', width: '100%', height: '100%' },
});

export const TbGrid: React.FunctionComponent<ITbGridProps> = ({
    columns,
    source,
    options,
    onRenderItemColumn,
}: ITbGridProps) => {
    const { state, api } = useTbFabric(columns, source, options);

    return (
        <div className={classes.tbContainer}>
            {!options.hideCommandBar && (
                <TbCommandBar
                    tbState={state}
                    tbApi={api}
                    filterable={options.filterable}
                    recordCounter={options.recordCounter}
                    searchable={options.searchable}
                    toggleColumns={options.toggleColumns}
                    items={options.commandBarItems}
                />
            )}
            <TbDetailsList
                tbState={state}
                tbApi={api}
                selectionMode={options.selectionMode}
                onRemoveAction={options.onRemoveAction}
                onRenderItemColumn={onRenderItemColumn}
            />
        </div>
    );
};
