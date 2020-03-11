import * as React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/components/CommandBar/CommandBar';
import { ICommandBarItemProps } from 'office-ui-fabric-react/lib/components/CommandBar';
import { ColumnModel } from 'tubular-common';
import { FiltersDialog } from './FiltersDialog';
import { ChipBar } from './ChipBar';
import { registerTbIcons } from './utils';
import { SearchBox } from 'office-ui-fabric-react/lib/components/SearchBox/SearchBox';
import { ToggleColumnsDialog } from './ToggleColumnsDialog';
import { ISearchBoxStyles } from 'office-ui-fabric-react';

registerTbIcons();

export interface TbCommandBarProps {
    isLoading: boolean;
    columns: ColumnModel[];
    onApplyFilters: (columns: ColumnModel[]) => void;
    onSearch: (value?: string) => void;
    onUpdateVisibleColumns: (columns: ColumnModel[]) => void;
    filterable?: boolean;
    searchable?: boolean;
    toggleColumns?: boolean;
    items?: ICommandBarItemProps[];
}

const searchBoxStyles: ISearchBoxStyles = { root: { width: '300px', margin: '0px 10px 0px 10px' } };

export const TbCommandBar: React.FunctionComponent<TbCommandBarProps> = ({
    isLoading,
    columns,
    onUpdateVisibleColumns,
    onApplyFilters,
    onSearch,
    filterable,
    searchable,
    toggleColumns,
    items,
}: TbCommandBarProps) => {
    const [showFilters, setShowFilters] = React.useState(false);
    const [showToggleColumns, setShowToggleColumns] = React.useState(false);

    const _farItems: ICommandBarItemProps[] = [];
    const onClear = () => onSearch();

    if (searchable) {
        _farItems.push({
            key: 'search',
            // eslint-disable-next-line react/display-name
            onRender: () => (
                <SearchBox
                    disabled={isLoading}
                    underlined={true}
                    placeholder="Search"
                    onSearch={onSearch}
                    onClear={onClear}
                    styles={searchBoxStyles}
                />
            ),
        });
    }

    if (filterable) {
        _farItems.push({
            key: 'toggleColumns',
            text: 'Toggle Columns',
            ariaLabel: 'Toggle Columns',
            disabled: isLoading,
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
            disabled: isLoading,
            iconOnly: true,
            iconProps: { iconName: 'Filter' },
            onClick: () => setShowFilters(!showFilters),
        });
    }

    const closeToggleColumns = () => setShowToggleColumns(false);
    const closeFilter = () => setShowFilters(false);
    const applyColumnsChanges = (columns: ColumnModel[]) => onUpdateVisibleColumns(columns);

    return (
        <>
            <CommandBar items={items} overflowItems={[]} farItems={_farItems} />
            <ChipBar columns={columns} onApplyFilters={onApplyFilters} />
            {showToggleColumns && (
                <ToggleColumnsDialog
                    columns={columns}
                    applyColumnsChanges={applyColumnsChanges}
                    close={closeToggleColumns}
                />
            )}
            {showFilters && (
                <FiltersDialog
                    columns={columns.filter(c => c.filterable)}
                    applyFilters={onApplyFilters}
                    close={closeFilter}
                />
            )}
        </>
    );
};
