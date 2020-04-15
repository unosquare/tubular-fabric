import * as React from 'react';
import {
    GroupedList,
    IGroupHeaderProps,
    FontIcon,
    getTheme,
    IRawStyle,
    mergeStyleSets,
    Stack,
} from '@fluentui/react';

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

export const FilterContainer = ({ groups, items }) => {
    const _onRenderHeader = (props: IGroupHeaderProps): JSX.Element => {
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

    const _onRenderCell = (nestingDepth: number, item: any, itemIndex: number): JSX.Element => <>{item}</>;

    return (
        <GroupedList
            items={items}
            onRenderCell={_onRenderCell}
            groupProps={{
                onRenderHeader: _onRenderHeader,
            }}
            groups={groups}
        />
    );
};
