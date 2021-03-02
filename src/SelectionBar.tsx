import * as React from 'react';
import { Stack, IStackItemStyles } from '@fluentui/react/lib/Stack';
import { Selection } from '@uifabric/utilities';
import { Label } from '@fluentui/react/lib/Label';
import { ICommandBarItemProps, CommandBar } from '@fluentui/react/lib/CommandBar';
import { mergeStyleSets, getTheme } from '@fluentui/react/lib/Styling';

export interface ISelectionBarProps {
    selection: Selection;
    onRemoveAction: (selection: Selection) => void;
}

const theme = getTheme();

const classes = mergeStyleSets({
    selectionBar: {
        position: 'absolute',
        height: '40px',
        width: '100%',
        zIndex: 2,
    },
});

const countLabelStyle: IStackItemStyles = {
    root: { paddingLeft: 14, backgroundColor: theme.palette.white },
};

export const SelectionBar: React.FunctionComponent<ISelectionBarProps> = ({
    selection,
    onRemoveAction,
}: ISelectionBarProps) => {
    const _farItems: ICommandBarItemProps[] = [
        {
            key: 'delete',
            text: 'Delete',
            ariaLabel: 'Delete',
            iconOnly: true,
            iconProps: { iconName: 'Delete' },
            onClick: () => {
                if (onRemoveAction) {
                    onRemoveAction(selection);
                }
            },
        },
    ];

    const itemsText = selection.getSelectedCount() > 1 ? 'items' : 'item';

    return (
        <div className={classes.selectionBar}>
            <Stack horizontal horizontalAlign="space-between">
                <Stack.Item styles={countLabelStyle}>
                    <Label>
                        {selection.getSelectedCount()} {itemsText} selected
                    </Label>
                </Stack.Item>
                <Stack.Item grow>
                    <CommandBar items={[]} overflowItems={[]} farItems={_farItems} />
                </Stack.Item>
            </Stack>
        </div>
    );
};
