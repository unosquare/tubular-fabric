import { Button, TableHeaderCell } from '@fluentui/react-components';
import * as React from 'react';
import { ColumnModel, ColumnSortDirection } from 'tubular-common';

export interface TbHeaderCellProps {
    column: ColumnModel;
    key: string;
    sortColumn: (property: string) => void;
}

export const TbHeaderCell: React.FunctionComponent<TbHeaderCellProps> = ({ column, sortColumn }: TbHeaderCellProps) => {
    const sort = () => {
        if (column.sortable) {
            sortColumn(column.name);
        }
    };
    const direction =
        column.sortDirection === ColumnSortDirection.None
            ? undefined
            : column.sortDirection === ColumnSortDirection.Ascending
              ? 'ascending'
              : 'descending';

    return (
        <TableHeaderCell onClick={() => sort()} sortDirection={direction}>
            {column.label}
        </TableHeaderCell>
    );
};
