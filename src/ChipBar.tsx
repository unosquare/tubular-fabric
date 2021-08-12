import * as React from 'react';
import { ChipFilter } from './ChipFilter';
import { IStackStyles, Stack } from '@fluentui/react';
import { ColumnModel, columnHasFilter } from 'tubular-common';

const chipFilterContainerStyle: IStackStyles = { root: { paddingLeft: 14 } };

export interface ChipBarProps {
    columns: ColumnModel[];
    onClearFilter: (columnName: string) => void;
    isLoading: boolean;
}

export const ChipBar: React.FunctionComponent<ChipBarProps> = ({ columns, onClearFilter, isLoading }: ChipBarProps) => {
    const filteredColumns = columns.filter((c) => columnHasFilter(c) && c.filterable);
    const onRemove = (columnName: string) => () => onClearFilter(columnName);

    return (
        <Stack horizontal horizontalAlign="start" wrap styles={chipFilterContainerStyle}>
            {filteredColumns.map((column) => (
                <ChipFilter
                    key={column.name}
                    column={column}
                    onRemoveFilter={onRemove(column.name)}
                    isLoading={isLoading}
                />
            ))}
        </Stack>
    );
};
