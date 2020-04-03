import * as React from 'react';
import Stack from 'office-ui-fabric-react/lib/components/Stack/Stack';
import { IconButton } from 'office-ui-fabric-react/lib/components/Button/IconButton/IconButton';
import { TextField } from 'office-ui-fabric-react/lib/components/TextField/TextField';
import { ColumnModel, getOperators } from 'tubular-common';
import { IContextualMenuProps, IContextualMenuItem } from 'office-ui-fabric-react/lib/components/ContextualMenu';
import { getOperatorIcon, getOperatorText } from './utils';
import { IStackStyles, IStackItemStyles } from 'office-ui-fabric-react';

export interface IFilterFieldProps {
    column: ColumnModel;
    onEnter: () => void;
}

const filterFieldWrapperStyles: IStackStyles = {
    root: {
        paddingLeft: 16,
    },
};

const filterButtonStyles: IStackItemStyles = {
    root: { width: '60px' },
};

export const FilterField: React.FunctionComponent<IFilterFieldProps> = ({ column, onEnter }: IFilterFieldProps) => {
    const [currentIcon, setCurrentIcon] = React.useState({
        iconName: getOperatorIcon(column.filterOperator),
    });

    const options = getOperators(column).map((row: any) => ({
        key: row.value,
        iconProps: {
            iconName: getOperatorIcon(row.value),
        },
        data: row.value,
        text: getOperatorText(row.value, row.title),
    }));

    const menuProps: IContextualMenuProps = {
        shouldFocusOnMount: true,
        isBeakVisible: true,
        items: options,
        onItemClick: (
            _ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
            item?: IContextualMenuItem,
        ) => {
            setCurrentIcon({ iconName: item.iconProps.iconName });
            column.filterOperator = item.data;
        },
    };

    const handleFilterChange = (_event: React.FormEvent<HTMLInputElement>, newValue: string) => {
        column.filterText = newValue;
    };

    const onKeyDown = (ev: React.KeyboardEvent) => {
        if (ev.keyCode === 13) {
            onEnter();
        }
    };

    return (
        <Stack
            horizontal
            horizontalAlign="space-between"
            key={column.name}
            verticalAlign="end"
            styles={filterFieldWrapperStyles}
        >
            <Stack.Item styles={filterButtonStyles}>
                <IconButton
                    menuProps={menuProps}
                    iconProps={{ iconName: currentIcon.iconName }}
                    title={column.label}
                    ariaLabel={column.label}
                />
            </Stack.Item>
            <Stack.Item grow>
                <TextField
                    label={''}
                    onChange={handleFilterChange}
                    defaultValue={column.filterText}
                    onKeyDown={onKeyDown}
                />
            </Stack.Item>
        </Stack>
    );
};
