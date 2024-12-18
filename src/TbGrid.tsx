import * as React from 'react';
import {
    FolderRegular,
    EditRegular,
    OpenRegular,
    DocumentRegular,
    PeopleRegular,
    DocumentPdfRegular,
    VideoRegular,
    MoreHorizontalRegular,
} from '@fluentui/react-icons';
import {
    TableColumnDefinition,
    createTableColumn,
    TableCellLayout,
    PresenceBadgeStatus,
    Avatar,
    useScrollbarWidth,
    useFluent,
    TableCellActions,
    Menu,
    MenuTrigger,
    MenuItem,
    MenuList,
    MenuPopover,
    Button,
    Skeleton,
    SkeletonItem,
} from '@fluentui/react-components';
import {
    DataGridBody,
    DataGrid,
    DataGridRow,
    DataGridHeader,
    DataGridCell,
    DataGridHeaderCell,
    RowRenderer,
} from '@fluentui-contrib/react-data-grid-react-window';
import { IFabricTbState, ITbColumn, ITbColumnProxy, ITbFabricApi } from './interfaces';
import { ColumnDataType, ColumnModel, ColumnSortDirection, CompareOperators } from 'tubular-common';


const baseItems = [
    {
        orderId: 1,
        customerName: 'Alejandro Ocampo',
    },
    {
        orderId: 2,
        customerName: 'Alejandro Ocampo2',
    },
];

const items = new Array(50).fill(0).map((_, i) => ({ ...baseItems[i % baseItems.length], index: i }));
items.push(null);
items.push(null);
items.push(null);
items.push(null);

/**
 * Props for the react-window list component to enable scrolling indicators.
 */
const listProps = { useIsScrolling: true };

const CellShimmer = React.memo(function CellShimmer() {
    return (
        <Skeleton style={{ width: '100%' }}>
            <SkeletonItem shape='rectangle' animation='pulse' appearance='translucent' />
        </Skeleton>
    );
});

const renderRow2 = <TItem,>({
    item,
    rowId,
    style,
    isScrolling,
}: {
    item: TItem;
    rowId: string;
    style: React.CSSProperties;
    isScrolling: boolean;
}): React.ReactElement => {
    return (
        <DataGridRow<TItem> key={rowId} style={style}>
            {({ renderCell }) => (
                <DataGridCell focusMode='group'>{isScrolling ? <CellShimmer /> : renderCell(item)}</DataGridCell>
            )}
        </DataGridRow>
    );
};

export interface ITbDetailsListProps<TItem> {
    tbState: IFabricTbState<TItem>;
    tbApi: ITbFabricApi;
    shimmerRowCount?: number;
}

export const TbGrid = <TItem,>(props: ITbDetailsListProps<TItem>): React.ReactElement => {
    const { targetDocument } = useFluent();
    const scrollbarWidth = useScrollbarWidth({ targetDocument });

    return (
        <DataGrid
            items={props.tbState.data}
            columns={props.tbState.fabricColumns}
            focusMode='cell'
            sortable
            selectionMode='multiselect'
        >
            <DataGridHeader style={{ paddingRight: scrollbarWidth }}>
                <DataGridRow>
                    {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
                </DataGridRow>
            </DataGridHeader>
            <DataGridBody<TItem> itemSize={50} height={400} listProps={listProps}>
                {renderRow2}
            </DataGridBody>
        </DataGrid>
    );
};
