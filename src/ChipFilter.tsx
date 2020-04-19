import * as React from 'react';
import Stack from 'office-ui-fabric-react/lib/components/Stack/Stack';
import { Text } from 'office-ui-fabric-react/lib/components/Text/Text';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon/Icon';
import { getOperatorIcon } from './utils';
import { ColumnModel, CompareOperators, ColumnDataType } from 'tubular-common';
import { IconButton } from 'office-ui-fabric-react/lib/components/Button/IconButton/IconButton';
import { IIconProps, IIconStyles } from 'office-ui-fabric-react/lib/components/Icon/Icon.types';
import { IStackStyles } from 'office-ui-fabric-react/lib/components/Stack/Stack.types';
import { ITextStyles, FontIcon } from 'office-ui-fabric-react';

const closeIcon: IIconProps = { iconName: 'ChromeClose' };

const chipFilterWrapperStyles: IStackStyles = {
    root: {
        marginTop: '2px',
        marginRight: '2px',
        paddingLeft: '6px',
        backgroundColor: '#DFDFDF',
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

const filterValueStyles: ITextStyles = {
    root: {
        marginRight: 5,
        height: 20,
    },
};

export interface IChipFilterProps {
    column: ColumnModel;
    onRemoveFilter: (columnName: string) => void;
}

const convertToFriendlyDateString = (date: string) =>{
    return new Date(date).toDateString();
};

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
            <span style={{ paddingLeft: 2, fontSize: 18, height: 20 }}>
                <FontIcon iconName={icon} />
            </span>
        );
    }

    return filterText;
};

export const ChipFilter: React.FunctionComponent<IChipFilterProps> = ({ column, onRemoveFilter }: IChipFilterProps) => (
    <Stack horizontal verticalAlign="center" horizontalAlign="space-between" styles={chipFilterWrapperStyles}>
        <Text styles={columnLabelStyles}>{column.label}</Text>
        <Icon styles={operatorIconStyles} iconName={getOperatorIcon(column.filterOperator)} />
        <Text styles={filterValueStyles}>{getFilterText(column)}</Text>
        <IconButton
            onClick={() => onRemoveFilter(column.name)}
            iconProps={closeIcon}
            title="Remove Filter"
            ariaLabel="Remove Filter"
        />
    </Stack>
);
