import * as React from 'react';
import { Selection } from 'office-ui-fabric-react/lib/Utilities';
import { ITbOptions } from 'tubular-react-common/dist/types/ITbOptions';
import { IColumn } from 'office-ui-fabric-react/lib/components/DetailsList';
import { ICommandBarItemProps } from 'office-ui-fabric-react/lib/components/CommandBar/CommandBar.types';
import { TbDetailsList } from './TbDetailsList';
import { ITbFabricInstance } from './interfaces/ITbFabricInstance';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { TbCommandBar } from './TbCommandBar';

export interface ITbExtendedOptions extends ITbOptions {
    onRemoveAction?: (selection: Selection) => void;
    filterable: boolean;
    searchable: boolean;
    toggleColumns: boolean;
    commandBarItems?: ICommandBarItemProps[];
    hiddeCommandBar?: boolean;
    selectionMode?: number;
}

export interface ITbGridProps {
    instance: ITbFabricInstance;
    options: Partial<ITbExtendedOptions>;
    onRenderItemColumn?: (item: any, index: number, column: IColumn) => React.ReactNode;
}

const classes = mergeStyleSets({
    tbContainer: { margin: 'auto', display: 'flex', flexDirection: 'column', width: '100%', height: '100%' },
});

export const TbGrid: React.FunctionComponent<ITbGridProps> = ({ instance, options, onRenderItemColumn }) => {
    return (
        <div className={classes.tbContainer}>
            {!options.hiddeCommandBar && (
                <TbCommandBar
                    filterable={options.filterable}
                    searchable={options.searchable}
                    toggleColumns={options.toggleColumns}
                    items={options.commandBarItems}
                    columns={instance.state.columns}
                    onSearch={instance.api.search}
                    onApplyFilters={instance.api.applyFilters}
                    onUpdateVisibleColumns={instance.api.updateVisibleColumns}
                />
            )}
            <TbDetailsList tbFabricInstance={instance} options={options} onRenderItemColumn={onRenderItemColumn} />
        </div>
    );
};
