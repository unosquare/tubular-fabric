import * as React from 'react';
import {
    GroupedList,
    IGroupHeaderProps,
    FontIcon,
    getTheme,
    IRawStyle,
    mergeStyleSets,
    Stack,
    IGroup,
} from 'office-ui-fabric-react';
import { ColumnModel, columnHasFilter, ColumnDataType } from 'tubular-common';
import { StandardFilterEditor } from './filterControls/StandardFilterEditor';
import { BooleanFilterEditor } from './filterControls/BooleanFilterEditor';

export interface IFilterContainerProps {
    columns: ColumnModel[];
    onApply: () => void;
}

const theme = getTheme();
const headerAndFooterStyles: IRawStyle = {
    minWidth: 300,
    minHeight: 28,
    lineHeight: 20,
    paddingLeft: 10,
    paddingTop: 10,
    cursor: 'pointer',
};

const classNames = mergeStyleSets({
    header: [headerAndFooterStyles, theme.fonts.medium],
    chevron: {
        marginRight: 12,
    },
    hasFilter: {
        marginLeft: 12,
    },
});

const isStandardControl = (dataType: ColumnDataType) => dataType !== ColumnDataType.Boolean;

const createGroups = (columns: ColumnModel[]) =>
    columns.map((column, index) => ({
        count: 1,
        key: column.name,
        name: column.label,
        startIndex: index,
        level: 0,
        isCollapsed: true,
        data: {
            hasFilter: columnHasFilter(column),
        },
    }));

const createItems = (columns: ColumnModel[], onApply: () => void) =>
    columns.map((column) => {
        if (isStandardControl(column.dataType)) {
            return <StandardFilterEditor key={column.name} column={column} onApply={onApply} />;
        }

        return <BooleanFilterEditor key={column.name} column={column} onApply={onApply} />;
    });

const onRenderHeader = (props: IGroupHeaderProps): JSX.Element => {
    const toggleCollapse = (): void => {
        props.onToggleCollapse(props.group);
    };

    const collapseIcon = props.group.isCollapsed ? 'ChevronRight' : 'ChevronDown';

    return (
        <div onClick={toggleCollapse} className={classNames.header}>
            <Stack horizontal horizontalAlign="start" verticalAlign="center">
                <Stack.Item>
                    <FontIcon iconName={collapseIcon} className={classNames.chevron} />
                </Stack.Item>
                <Stack.Item>{props.group.name}</Stack.Item>
                {props.group.data.hasFilter && (
                    <Stack.Item>
                        <FontIcon iconName="FilterSolid" className={classNames.hasFilter} />
                    </Stack.Item>
                )}
            </Stack>
        </div>
    );
};

const onRenderCell = (_nestingDepth: number, item: any): JSX.Element => <>{item}</>;

export const FiltersContainer = ({ columns, onApply }) => {
    const groups: IGroup[] = createGroups(columns);
    const items = createItems(columns, onApply);

    return (
        <GroupedList
            items={items}
            onRenderCell={onRenderCell}
            groupProps={{
                onRenderHeader,
            }}
            groups={groups}
        />
    );
};
