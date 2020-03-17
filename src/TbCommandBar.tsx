import * as React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/components/CommandBar/CommandBar';
import { ICommandBarItemProps } from 'office-ui-fabric-react/lib/components/CommandBar';
import { ColumnModel } from 'tubular-common';
import { FiltersDialog } from './FiltersDialog';
import { ChipBar } from './ChipBar';
import { registerTbIcons, getPagingMessage } from './utils';
import { SearchBox } from 'office-ui-fabric-react/lib/components/SearchBox/SearchBox';
import { ToggleColumnsDialog } from './ToggleColumnsDialog';
import { ISearchBoxStyles } from 'office-ui-fabric-react';
import { ITbFabricInstance } from './interfaces';

registerTbIcons();

export interface TbCommandBarProps {
    tbFabricInstance: ITbFabricInstance;
    filterable?: boolean;
    searchable?: boolean;
    toggleColumns?: boolean;
    recordCounter?: boolean;
    items?: ICommandBarItemProps[];
}

const searchBoxStyles: ISearchBoxStyles = { root: { width: '300px', margin: '0px 10px 0px 10px' } };

export const TbCommandBar: React.FunctionComponent<TbCommandBarProps> = ({
    tbFabricInstance,
    filterable,
    searchable,
    toggleColumns,
    recordCounter,
    items,
}: TbCommandBarProps) => {
    const [showFilters, setShowFilters] = React.useState(false);
    const [showToggleColumns, setShowToggleColumns] = React.useState(false);
    const label = React.useMemo(
        () => getPagingMessage(tbFabricInstance.state.totalRecordCount, tbFabricInstance.state.filteredRecordCount),
        [tbFabricInstance.state.totalRecordCount, tbFabricInstance.state.filteredRecordCount],
    );

    const _farItems: ICommandBarItemProps[] = [];
    const onClear = () => tbFabricInstance.api.search();

    if (searchable) {
        items = [
            {
                key: 'search',
                // eslint-disable-next-line react/display-name
                onRender: () => (
                    <SearchBox
                        disabled={tbFabricInstance.state.isLoading}
                        underlined={true}
                        placeholder="Search"
                        onSearch={tbFabricInstance.api.search}
                        onClear={onClear}
                        styles={searchBoxStyles}
                    />
                ),
            },
            ...items,
        ];
    }

    if (filterable) {
        _farItems.push({
            key: 'toggleColumns',
            text: 'Toggle Columns',
            ariaLabel: 'Toggle Columns',
            disabled: tbFabricInstance.state.isLoading,
            iconOnly: true,
            iconProps: { iconName: 'TripleColumn' },
            onClick: () => setShowToggleColumns(!showToggleColumns),
        });
    }

    if (toggleColumns) {
        _farItems.push({
            key: 'filter',
            text: 'Filters',
            ariaLabel: 'Filters',
            disabled: tbFabricInstance.state.isLoading,
            iconOnly: true,
            iconProps: { iconName: 'Filter' },
            onClick: () => setShowFilters(!showFilters),
        });
    }

    if (recordCounter) {
        _farItems.push({
            key: 'recordCounter',
            disabled: tbFabricInstance.state.isLoading,
            text: label,
        });
    }

    const closeToggleColumns = () => setShowToggleColumns(false);
    const closeFilter = () => setShowFilters(false);
    const applyColumnsChanges = (columns: ColumnModel[]) => tbFabricInstance.api.applyFilters(columns);

    return (
        <>
            <CommandBar items={items} overflowItems={[]} farItems={_farItems} />
            <ChipBar columns={tbFabricInstance.state.columns} onClearFilter={tbFabricInstance.api.clearFilter} />
            {showToggleColumns && (
                <ToggleColumnsDialog
                    columns={tbFabricInstance.state.columns}
                    applyColumnsChanges={applyColumnsChanges}
                    close={closeToggleColumns}
                />
            )}
            {showFilters && (
                <FiltersDialog
                    columns={tbFabricInstance.state.columns.filter(c => c.filterable)}
                    applyFilters={tbFabricInstance.api.applyFilters}
                    close={closeFilter}
                />
            )}
        </>
    );
};
