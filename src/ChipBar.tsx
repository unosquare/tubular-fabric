import * as React from 'react';
import { ChipFilter } from './ChipFilter';
import Stack from 'office-ui-fabric-react/lib/components/Stack/Stack';
import { IStackStyles } from 'office-ui-fabric-react';
import { CompareOperators, ColumnModel } from 'tubular-common';

const chipFilterContainerStyle: IStackStyles = { root: { paddingLeft: 14 } };

export interface ChipBarProps {
    columns: ColumnModel[];
    onApplyFilters: (columns: ColumnModel[]) => void;
}

export const ChipBar: React.FunctionComponent<ChipBarProps> = ({ columns, onApplyFilters }: ChipBarProps) => {
    const filteredColumns = columns.filter(c => c.hasFilter && c.filterable);

    const onRemoveFilter = (columnName: string) => () => {
        const newColumns = columns.map(column =>
            column.name === columnName
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
                : { ...column },
        );

        onApplyFilters(newColumns);
    };

    return (
        <Stack horizontal horizontalAlign="start" wrap styles={chipFilterContainerStyle}>
            {filteredColumns.map(column => (
                <ChipFilter key={column.name} column={column} onRemoveFilter={onRemoveFilter(column.name)} />
            ))}
        </Stack>
    );
};
