import * as React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/components/CommandBar/CommandBar';
import { ICommandBarItemProps } from 'office-ui-fabric-react/lib/components/CommandBar';
import { ColumnModel, CompareOperators } from 'tubular-common';
import { FiltersDialog } from './FiltersDialog';
import { registerTbIcons } from './utils';
import { ChipFilter } from './ChipFilter';
import Stack from 'office-ui-fabric-react/lib/components/Stack/Stack';
import { SearchBox } from 'office-ui-fabric-react/lib/components/SearchBox/SearchBox';
import { ToggleColumnsDialog } from './ToggleColumnsDialog';
import { IStackStyles, ISearchBoxStyles } from 'office-ui-fabric-react';
import { ITbExtendedOptions } from './TbGrid';

registerTbIcons();

export interface TbCommandBarProps {
    columns: ColumnModel[];
    onApplyFilters: (columns: ColumnModel[]) => void;
    onSearch: (value: string) => void;
    onUpdateVisibleColumns: (columns: ColumnModel[]) => void;
    options: Partial<ITbExtendedOptions>;
}

const chipFilterContainerStyle: IStackStyles = { root: { paddingLeft: 14 } };
const searchBoxStyles: ISearchBoxStyles = { root: { width: '300px', margin: '0px 10px 0px 10px' } };

export const TbCommandBar: React.FunctionComponent<TbCommandBarProps> = ({
    columns,
    onUpdateVisibleColumns,
    onApplyFilters,
    onSearch,
    options,
}: TbCommandBarProps) => {
    const [showFilters, setShowFilters] = React.useState(false);
    const [showToggleColumns, setShowToggleColumns] = React.useState(false);
    const filteredColumns = columns.filter(c => c.hasFilter && c.filterable);

    const _farItems: ICommandBarItemProps[] = [];

    if (options.searchable) {
        _farItems.push({
            key: 'search',
            // eslint-disable-next-line react/display-name
            onRender: () => (
                <SearchBox underlined={true} placeholder="Search" onSearch={onSearch} styles={searchBoxStyles} />
            ),
        });
    }

    if (options.filterable) {
        _farItems.push({
            key: 'toggleColumns',
            text: 'Toggle Columns',
            ariaLabel: 'Toggle Columns',
            iconOnly: true,
            iconProps: { iconName: 'TripleColumn' },
            onClick: () => setShowToggleColumns(!showToggleColumns),
        });
    }

    if (options.toggleColumns) {
        _farItems.push({
            key: 'filter',
            text: 'Filter',
            ariaLabel: 'Filter',
            iconOnly: true,
            iconProps: { iconName: 'Filter' },
            onClick: () => setShowFilters(!showFilters),
        });
    }

    const onRemoveFilter = (columnName: string) => {
        return () => {
            const newColumns = columns.map(column => {
                return column.name === columnName
                    ? {
                          ...column,
                          hasFilter: false,
                          filter: {
                              operator: CompareOperators.None,
                              text: '',
                              argument: [],
                              hasFilter: false,
                          },
                      }
                    : { ...column };
            });

            onApplyFilters(newColumns);
        };
    };

    return (
        <>
            <CommandBar items={options.commandBarItems} overflowItems={[]} farItems={_farItems} />
            <Stack horizontal horizontalAlign="start" wrap styles={chipFilterContainerStyle}>
                {filteredColumns.map(column => (
                    <ChipFilter key={column.name} column={column} onRemoveFilter={onRemoveFilter(column.name)} />
                ))}
            </Stack>
            {showToggleColumns && (
                <ToggleColumnsDialog
                    columns={columns}
                    applyColumnsChanges={columns => {
                        onUpdateVisibleColumns(columns);
                    }}
                    close={() => setShowToggleColumns(false)}
                />
            )}
            {showFilters && (
                <FiltersDialog
                    columns={columns.filter(c => c.filterable)}
                    applyFilters={onApplyFilters}
                    close={() => setShowFilters(false)}
                />
            )}
        </>
    );
};
