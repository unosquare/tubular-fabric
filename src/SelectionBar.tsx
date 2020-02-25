import * as React from 'react';
import Stack from 'office-ui-fabric-react/lib/components/Stack/Stack';
import { Selection } from 'office-ui-fabric-react/lib/Utilities';
import { Label } from 'office-ui-fabric-react/lib/components/Label/Label';
import { ICommandBarItemProps } from 'office-ui-fabric-react/lib/components/CommandBar/CommandBar.types';
import { CommandBar } from 'office-ui-fabric-react/lib/components/CommandBar/CommandBar';

export interface ISelectionBarProps {
    selection: Selection;
    onRemoveAction: (selection: Selection) => void;
}

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
    return (
        <div style={{ position: 'absolute', height: '40px', width: '100%', zIndex: 2 }}>
            <Stack horizontal horizontalAlign="space-between">
                <Stack.Item styles={{ root: { paddingLeft: 14 } }}>
                    <Label>{selection.getSelectedCount()} items selected</Label>
                </Stack.Item>
                <Stack.Item grow>
                    <CommandBar
                        items={[]}
                        overflowItems={[]}
                        farItems={_farItems}
                        ariaLabel="Use left and right arrow keys to navigate between commands"
                    />
                </Stack.Item>
            </Stack>
        </div>
    );
};
