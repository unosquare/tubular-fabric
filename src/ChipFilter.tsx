import * as React from 'react';
import {
    Stack,
    IStackStyles,
    Text,
    Icon,
    IIconProps,
    IIconStyles,
    FontIcon,
    IconButton,
    ITextStyles,
    mergeStyles,
} from '@fluentui/react';
import { getOperatorIcon } from './utils';
import { ColumnModel, ColumnDataType, CompareOperators } from 'tubular-common';

const closeIcon: IIconProps = { iconName: 'ChromeClose' };

const chipFilterWrapperStyles: IStackStyles = {
    root: {
        marginTop: '2px',
        marginRight: '2px',
        paddingLeft: '6px',
        borderRadius: '2px',
    },
    inner: { margin: '0px 10px' },
};

const operatorIconStyles: IIconStyles = {
    root: {
        margin: '4px 5px 0px',
    },
};

const columnLabelStyles: ITextStyles = {
    root: {
        marginRight: 5,
        fontWeight: 500,
    },
};

const booleanIcon = mergeStyles({
    paddingLeft: 2,
    fontSize: 18,
    height: 20,
});

const filterValueStyles: ITextStyles = {
    root: {
        marginRight: 5,
        height: 20,
    },
};

export interface IChipFilterProps {
    column: ColumnModel;
    onRemoveFilter: (columnName: string) => void;
    isLoading?: boolean;
}

const convertToFriendlyDateString = (date: string | number) => new Date(date).toDateString();

const getFilterText = (column: ColumnModel) => {
    const isDate =
        column.dataType === ColumnDataType.Date ||
        column.dataType === ColumnDataType.DateTime ||
        column.dataType === ColumnDataType.DateTimeUtc;

    const filterText = isDate ? convertToFriendlyDateString(column.filterText) : column.filterText;

    if (column.filterOperator === CompareOperators.Between) {
        let argument = column.filterArgument[0];
        if (isDate) {
            argument = convertToFriendlyDateString(argument);
        }
        return `${filterText} - ${argument}`;
    }

    if (column.dataType === ColumnDataType.Boolean) {
        const icon = filterText === 'true' ? 'CheckboxCompositeReversed' : 'Checkbox';
        return (
            <span className={booleanIcon}>
                <FontIcon iconName={icon} />
            </span>
        );
    }

    return filterText;
};

export const ChipFilter: React.FunctionComponent<IChipFilterProps> = ({
    column,
    onRemoveFilter,
    isLoading = false,
}: IChipFilterProps) => (
    <Stack horizontal verticalAlign="center" horizontalAlign="space-between" styles={chipFilterWrapperStyles}>
        <Text styles={columnLabelStyles}>{column.label}</Text>
        <Icon styles={operatorIconStyles} iconName={getOperatorIcon(column.filterOperator)} />
        <Text styles={filterValueStyles}>{getFilterText(column)}</Text>
        <IconButton
            onClick={() => onRemoveFilter(column.name)}
            iconProps={closeIcon}
            title="Remove Filter"
            ariaLabel="Remove Filter"
            disabled={isLoading}
        />
    </Stack>
);
