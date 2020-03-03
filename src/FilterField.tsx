import * as React from 'react';
import Stack from 'office-ui-fabric-react/lib/components/Stack/Stack';
import { IconButton } from 'office-ui-fabric-react/lib/components/Button/IconButton/IconButton';
import { TextField } from 'office-ui-fabric-react/lib/components/TextField/TextField';
import { ColumnModel, CompareOperators } from 'tubular-common';
import { IContextualMenuProps, IContextualMenuItem } from 'office-ui-fabric-react/lib/components/ContextualMenu';
import { getOperatorIcon } from './utils';

export interface IFilterFieldProps {
    column: ColumnModel;
}

export const FilterField: React.FunctionComponent<IFilterFieldProps> = (props: IFilterFieldProps) => {
    const { column } = props;
    const [currentIcon, setCurrentIcon] = React.useState({
        iconName: getOperatorIcon(column.filter.operator as CompareOperators),
    });

    const options = ColumnModel.getOperators(column).map((row: any) => ({
        key: row.value,
        iconProps: {
            iconName: getOperatorIcon(row.value),
        },
        data: row.value,
        text: row.title,
    }));

    const menuProps: IContextualMenuProps = {
        shouldFocusOnMount: true,
        isBeakVisible: true,
        items: options,
        onItemClick: (
            ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
            item?: IContextualMenuItem,
        ) => {
            setCurrentIcon({ iconName: item.iconProps.iconName });
            column.filter.operator = item.data;
            column.hasFilter = true;
        },
    };

    return (
        <Stack
            horizontal
            horizontalAlign="space-between"
            key={column.name}
            verticalAlign="end"
            styles={{ root: { marginTop: '10px' } }}
        >
            <Stack.Item styles={{ root: { width: '60px' } }}>
                <IconButton
                    menuProps={menuProps}
                    iconProps={{ iconName: currentIcon.iconName }}
                    title={column.label}
                    ariaLabel={column.label}
                />
            </Stack.Item>
            <Stack.Item grow>
                <TextField
                    label={column.label}
                    onChange={(event: React.FormEvent<HTMLInputElement>, newValue: string) => {
                        column.filter.text = newValue;
                        column.hasFilter = true;
                    }}
                    defaultValue={column.filter.text}
                />
            </Stack.Item>
        </Stack>
    );
};
