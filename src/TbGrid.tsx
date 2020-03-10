import * as React from 'react';
import { Selection } from 'office-ui-fabric-react/lib/Utilities';
import { ITbOptions } from 'tubular-react-common/dist/types/ITbOptions';
import { IColumn } from 'office-ui-fabric-react/lib/components/DetailsList';
import { ICommandBarItemProps } from 'office-ui-fabric-react/lib/components/CommandBar/CommandBar.types';
import { TbDetailsList } from './TbDetailsList';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { TbCommandBar } from './TbCommandBar';
import { ITbColumn } from './interfaces/ITbColumn';
import { TubularHttpClientAbstract } from 'tubular-common';
import { useTbFabric } from './useTbFabric';

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
    options: Partial<ITbExtendedOptions>;
    onRenderItemColumn?: (item: any, index: number, column: IColumn) => React.ReactNode;
    columns: ITbColumn[];
    source: string | Request | TubularHttpClientAbstract | {}[];
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
    const tbFabricInstance = useTbFabric(columns, source, options); 

    return (
        <div className={classes.tbContainer}>
            {!options.hiddeCommandBar && (
                <TbCommandBar
                    isLoading={tbFabricInstance.state.isLoading}
                    filterable={options.filterable}
                    searchable={options.searchable}
                    toggleColumns={options.toggleColumns}
                    items={options.commandBarItems}
                    columns={tbFabricInstance.state.columns}
                    onSearch={tbFabricInstance.api.search}
                    onApplyFilters={tbFabricInstance.api.applyFilters}
                    onUpdateVisibleColumns={tbFabricInstance.api.updateVisibleColumns}
                />
            )}
            <TbDetailsList
                tbFabricInstance={tbFabricInstance}
                selectionMode={options.selectionMode}
                onRemoveAction={options.onRemoveAction}
                onRenderItemColumn={onRenderItemColumn}
            />
        </div>
    );
};
