import * as React from 'react';

import { ITbInfiniteListInstance } from './useTbInfiniteList';
import { Table } from '@fluentui/react-components';
import { TbHeader } from './TbHeader';
import { useTbSelection } from './useTbSelection';
import { TbBody } from './TbBody';

export interface TbListProps<TItem> {
    tbInstance: ITbInfiniteListInstance<TItem>;
    onItemClick?(row: any): void;
    rowSelectionEnabled?: boolean;
}

export const TbList = <TItem,>(props: TbListProps<TItem>) => {
    const { tbInstance, onItemClick, rowSelectionEnabled = true } = props;
    const selection = useTbSelection(tbInstance, rowSelectionEnabled);

    return (
        <Table
            sortable
            noNativeElements
            aria-label='Table without semantic HTML elements'
            style={{ minWidth: '500px', height: 600, display: 'flex', flexDirection: 'column' }}
        >
            <TbHeader
                tbTableInstance={tbInstance}
                rowSelectionEnabled={props.rowSelectionEnabled}
                selection={selection}
            />
            <TbBody
                tbTableInstance={tbInstance}
                selection={selection}
                rowSelectionEnabled={props.rowSelectionEnabled}
            />
        </Table>
    );
};
