import * as React from 'react';
import Stack from 'office-ui-fabric-react/lib/components/Stack/Stack';
import { Selection } from 'office-ui-fabric-react/lib/Utilities';
import { Label } from 'office-ui-fabric-react/lib/components/Label/Label';
import { ICommandBarItemProps } from 'office-ui-fabric-react/lib/components/CommandBar/CommandBar.types';
import { CommandBar } from 'office-ui-fabric-react/lib/components/CommandBar/CommandBar';
import { IStackItemStyles } from 'office-ui-fabric-react/lib/components/Stack/StackItem/StackItem.types';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

export interface ISelectionBarProps {
    selection: Selection;
    onRemoveAction: (selection: Selection) => void;
}

const classes = mergeStyleSets({
    selectionBar: {
        position: 'absolute',
        height: '40px',
        width: '100%',
        zIndex: 2,
    },
});

const countLabelStyle: IStackItemStyles = {
    root: { paddingLeft: 14 },
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
