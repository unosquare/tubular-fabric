import { TableHeader, TableRow, TableSelectionCell } from '@fluentui/react-components';
import * as React from 'react';
import { ITbInfiniteListInstance } from './useTbInfiniteList';
import { TbSelection } from './Selection';
import { TbHeaderCell } from './TbHeaderCell';

export interface TbHeader<TItem> {
    tbTableInstance: ITbInfiniteListInstance<TItem>;
    rowSelectionEnabled?: boolean;
    selection?: TbSelection;
}

export const TbHeader = <TItem,>(props: TbHeader<TItem>) => {
    const { tbTableInstance, rowSelectionEnabled, selection } = props;
    const { state, api } = tbTableInstance;

    const data = tbTableInstance.state.data?.length;
    return (
        <TableHeader>
            <TableRow>
                {rowSelectionEnabled && selection && (
                    <TableSelectionCell
                        checked={
                            selection.isIndeterminateSelection()
                                ? 'mixed'
                                : selection.getUnSelectedCount() === 0
                                  ? true
                                  : false
                        }
                        onChange={selection.toggleAllRowsSelection}
                        checkboxIndicator={{ 'aria-label': 'Select all rows ' }}
                    />
                )}
                {state.columns
                    .filter((col) => col.visible)
                    .map((column) => (
                        <TbHeaderCell key={column.name} column={column} sortColumn={api.sortColumn} />
                    ))}
            </TableRow>
        </TableHeader>
    );
};
