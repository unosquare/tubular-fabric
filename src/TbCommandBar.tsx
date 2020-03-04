import * as React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/components/CommandBar/CommandBar';
import { ICommandBarItemProps } from 'office-ui-fabric-react/lib/components/CommandBar';
import { ColumnModel, CompareOperators } from 'tubular-common';
import { FiltersDialog } from './FiltersDialog';
import { registerTbIcons } from './utils';
import { ChipFilter } from './ChipFilter';
import Stack from 'office-ui-fabric-react/lib/components/Stack/Stack';
import { ToggleColumnsDialog } from './ToggleColumnsDialog';
import { IStackStyles } from 'office-ui-fabric-react';

registerTbIcons();

export interface TbCommandBarProps {
    columns: ColumnModel[];
    applyFilters: (columns: ColumnModel[]) => void;
    updateVisibleColumns: (columns: ColumnModel[]) => void;
    filterable?: boolean;
    toggleColumns?: boolean;
}

const chipFilterContainerStyle: IStackStyles = { root: { paddingLeft: 14 } };

export const TbCommandBar: React.FunctionComponent<TbCommandBarProps> = ({
    columns,
    updateVisibleColumns,
    applyFilters,
    filterable,
    toggleColumns,
}: TbCommandBarProps) => {
    const [showFilters, setShowFilters] = React.useState(false);
    const [showToggleColumns, setShowToggleColumns] = React.useState(false);
    const filteredColumns = columns.filter(c => c.hasFilter && c.filterable);

    const _farItems: ICommandBarItemProps[] = [];

    if (filterable) {
        _farItems.push({
            key: 'toggleColumns',
            text: 'Toggle Columns',
            ariaLabel: 'Toggle Columns',
            iconOnly: true,
            iconProps: { iconName: 'TripleColumn' },
            onClick: () => setShowToggleColumns(!showToggleColumns),
        });
    }

    if (toggleColumns) {
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

            applyFilters(newColumns);
        };
    };

    return (
        <div>
            <CommandBar items={[]} overflowItems={[]} farItems={_farItems} />
            <Stack horizontal horizontalAlign="start" wrap styles={chipFilterContainerStyle}>
                {filteredColumns.map(column => (
                    <ChipFilter key={column.name} column={column} onRemoveFilter={onRemoveFilter(column.name)} />
                ))}
            </Stack>
            {showToggleColumns && (
                <ToggleColumnsDialog
                    columns={columns}
                    applyColumnsChanges={columns => {
                        updateVisibleColumns(columns);
                    }}
                    close={() => setShowToggleColumns(false)}
                />
            )}
            {showFilters && (
                <FiltersDialog
                    columns={columns.filter(c => c.filterable && c.visible)}
                    applyFilters={applyFilters}
                    close={() => setShowFilters(false)}
                />
            )}
        </div>
    );
};
