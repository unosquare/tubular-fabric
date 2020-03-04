import * as React from 'react';
import Stack from 'office-ui-fabric-react/lib/components/Stack/Stack';
import { Text } from 'office-ui-fabric-react/lib/components/Text/Text';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon/Icon';
import { getOperatorIcon } from './utils';
import { CompareOperators, ColumnModel } from 'tubular-common';
import { IconButton } from 'office-ui-fabric-react/lib/components/Button/IconButton/IconButton';
import { IIconProps, IIconStyles } from 'office-ui-fabric-react/lib/components/Icon/Icon.types';
import { IStackStyles } from 'office-ui-fabric-react/lib/components/Stack/Stack.types';
import { ITextStyles } from 'office-ui-fabric-react';

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
    },
};

const filterValueStyles: ITextStyles = {
    root: {
        marginRight: 5,
    },
};

export interface IChipFilterProps {
    column: ColumnModel;
    onRemoveFilter: (columnName: string) => void;
}

export const ChipFilter: React.FunctionComponent<IChipFilterProps> = ({ column, onRemoveFilter }: IChipFilterProps) => {
    return (
        <Stack horizontal verticalAlign="center" horizontalAlign="space-between" styles={chipFilterWrapperStyles}>
            <Text styles={columnLabelStyles}>{column.label}</Text>
            <Icon styles={operatorIconStyles} iconName={getOperatorIcon(column.filter.operator as CompareOperators)} />
            <Text styles={filterValueStyles}>{column.filter.text}</Text>
            <IconButton
                onClick={() => onRemoveFilter(column.name)}
                iconProps={closeIcon}
                title="Remove Filter"
                ariaLabel="Remove Filter"
            />
        </Stack>
    );
};
