import * as React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/components/CommandBar/CommandBar';
import { ICommandBarItemProps } from 'office-ui-fabric-react/lib/components/CommandBar';
import { ColumnModel, CompareOperators } from 'tubular-common';
import { FiltersDialog } from './FiltersDialog';
import { registerTbIcons } from './utils';
import { ChipFilter } from './ChipFilter';
import Stack from 'office-ui-fabric-react/lib/components/Stack/Stack';
import { ToggleColumnsDialog } from './ToggleColumnsDialog';

registerTbIcons();

export interface TbCommandBarProps {
    columns: ColumnModel[];
    applyFilters: (columns: ColumnModel[]) => void;
    updateVisibleColumns: (columns: ColumnModel[]) => void;
}

export const CommandBarBasicExample: React.FunctionComponent<TbCommandBarProps> = ({
    columns,
    updateVisibleColumns,
    applyFilters,
}: TbCommandBarProps) => {
    const [showFilters, setShowFilters] = React.useState(false);
    const [showToggleColumns, setShowToggleColumns] = React.useState(false);
    const filteredColumns = columns.filter(c => c.hasFilter && c.filterable);

    const _farItems: ICommandBarItemProps[] = [
        {
            key: 'toggleColumns',
            text: 'Toggle Columns',
            ariaLabel: 'Toggle Columns',
            iconOnly: true,
            iconProps: { iconName: 'TripleColumn' },
            onClick: () => setShowToggleColumns(!showToggleColumns),
        },
        {
            key: 'filter',
            text: 'Filter',
            ariaLabel: 'Filter',
            iconOnly: true,
            iconProps: { iconName: 'Filter' },
            onClick: () => setShowFilters(!showFilters),
        },
    ];

    const onRemoveFilter = (columnName: string) => {
        return () => {
            const newColumns = columns.map(c => {
                return c.name === columnName
                    ? {
                          ...c,
                          hasFilter: false,
                          filter: {
                              operator: CompareOperators.None,
                              text: '',
                              argument: [],
                              hasFilter: false,
                          },
                      }
                    : { ...c };
            });

            applyFilters(newColumns);
        };
    };

    return (
        <div>
            <CommandBar
                items={[]}
                overflowItems={[]}
                farItems={_farItems}
                ariaLabel="Use left and right arrow keys to navigate between commands"
            />
            <Stack horizontal horizontalAlign="start" wrap styles={{ root: { paddingLeft: 14 } }}>
                {filteredColumns.map(column => (
                    <ChipFilter key={column.name} column={column} onRemoveFilter={onRemoveFilter} />
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
