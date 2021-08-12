import * as React from 'react';
import { ColumnModel, getOperators, ColumnDataType } from 'tubular-common';
import {
    IStackStyles,
    IStackItemStyles,
    IContextualMenuProps,
    IContextualMenuItem,
    IconButton,
    Stack,
} from '@fluentui/react';
import { getOperatorIcon, getOperatorText } from '../utils';
import { NumericFilter } from './NumericFilter';
import { StringFilter } from './StringFilter';
import { DateFilter } from './DateFilter';
import { IFilterEditorProps } from './utils';

const filterFieldWrapperStyles: IStackStyles = {
    root: {
        padding: 9,
    },
};

const filterButtonStyles: IStackItemStyles = {
    root: { width: '60px' },
};

const getFilterControl = (column: ColumnModel, onEnter: () => void) => {
    switch (column.dataType) {
        case ColumnDataType.Numeric:
            return <NumericFilter column={column} onApply={onEnter} />;

        case ColumnDataType.String:
            return <StringFilter column={column} onEnter={onEnter} />;
        case ColumnDataType.Date:
        case ColumnDataType.DateTime:
        case ColumnDataType.DateTimeUtc:
            return <DateFilter column={column} onApply={onEnter} />;

        default:
            throw 'Error';
    }
};

export const StandardFilterEditor: React.FunctionComponent<IFilterEditorProps> = ({
    column,
    onApply,
}: IFilterEditorProps) => {
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

    return (
        <Stack
            horizontal
            horizontalAlign="space-between"
            key={column.name}
            verticalAlign="center"
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
            <Stack.Item grow>{getFilterControl(column, onApply)}</Stack.Item>
        </Stack>
    );
};
