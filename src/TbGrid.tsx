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
import { IFabricTbState, ITbColumn, ITbFabricApi } from './interfaces';
import { ColumnDataType, ColumnModel, ColumnSortDirection, CompareOperators } from 'tubular-common';

type FileCell = {
    label: string;
    icon: JSX.Element;
};

type LastUpdatedCell = {
    label: string;
    timestamp: number;
};

type LastUpdateCell = {
    label: string;
    icon: JSX.Element;
};

type AuthorCell = {
    label: string;
    status: PresenceBadgeStatus;
};

type Item = {
    index: number;
    file: FileCell;
    author: AuthorCell;
    lastUpdated: LastUpdatedCell;
    lastUpdate: LastUpdateCell;
};

const baseItems = [
    {
        file: { label: 'Meeting notes', icon: <DocumentRegular /> },
        author: { label: 'Max Mustermann', status: 'available' },
        lastUpdated: { label: '7h ago', timestamp: 1 },
        lastUpdate: {
            label: 'You edited this',
            icon: <EditRegular />,
        },
    },
    {
        file: { label: 'Thursday presentation', icon: <FolderRegular /> },
        author: { label: 'Erika Mustermann', status: 'busy' },
        lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
        lastUpdate: {
            label: 'You recently opened this',
            icon: <OpenRegular />,
        },
    },
    {
        file: { label: 'Training recording', icon: <VideoRegular /> },
        author: { label: 'John Doe', status: 'away' },
        lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
        lastUpdate: {
            label: 'You recently opened this',
            icon: <OpenRegular />,
        },
    },
    {
        file: { label: 'Purchase order', icon: <DocumentPdfRegular /> },
        author: { label: 'Jane Doe', status: 'offline' },
        lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 3 },
        lastUpdate: {
            label: 'You shared this in a Teams chat',
            icon: <PeopleRegular />,
        },
    },
];

const items = new Array(50).fill(0).map((_, i) => ({ ...baseItems[i % baseItems.length], index: i }));
items.push(null);
items.push(null);
items.push(null);
items.push(null);

const columns: ITbColumn<Item>[] = [
    {
        ...createTableColumn<Item>({
            columnId: 'file',
            compare: (a, b) => {
                return a.file.label.localeCompare(b.file.label);
            },
            renderHeaderCell: () => {
                return 'File';
            },
            renderCell: (item) => {
                return (
                    <TableCellLayout media={item.file.icon}>
                        <strong>[{item.index}] </strong>
                        {item.file.label}
                        <TableCellActions>
                            <Menu>
                                <MenuTrigger>
                                    <Button appearance="subtle" aria-label="more" icon={<MoreHorizontalRegular />} />
                                </MenuTrigger>

                                <MenuPopover>
                                    <MenuList>
                                        <MenuItem>Item</MenuItem>
                                        <MenuItem>Item</MenuItem>
                                        <MenuItem>Item</MenuItem>
                                    </MenuList>
                                </MenuPopover>
                            </Menu>
                        </TableCellActions>
                    </TableCellLayout>
                );
            },
        }),
        tb: {
            isKey: true,
            dataType: ColumnDataType.Numeric,
            sortable: true,
            sortDirection: ColumnSortDirection.Descending,
            sortOrder: 1,
            filterText: '10',
            filterOperator: CompareOperators.Gte,
        },
    },
];

/**
 * Props for the react-window list component to enable scrolling indicators.
 */
const listProps = { useIsScrolling: true };

const CellShimmer = React.memo(function CellShimmer() {
    return (
        <Skeleton style={{ width: '100%' }}>
            <SkeletonItem shape="rectangle" animation="pulse" appearance="translucent" />
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
                <DataGridCell focusMode="group">{isScrolling ? <CellShimmer /> : renderCell(item)}</DataGridCell>
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
            focusMode="cell"
            sortable
            selectionMode="multiselect"
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
