import * as React from 'react';
import { Stack, IStackStyles } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Icon, IIconProps, IIconStyles } from '@fluentui/react/lib/Icon';
import { getOperatorIcon } from './utils';
import { ColumnModel } from 'tubular-common';
import { IconButton } from '@fluentui/react/lib/Button';
import { ITextStyles } from '@fluentui/react';

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
    },
};

export interface IChipFilterProps {
    column: ColumnModel;
    onRemoveFilter: (columnName: string) => void;
}

export const ChipFilter: React.FunctionComponent<IChipFilterProps> = ({ column, onRemoveFilter }: IChipFilterProps) => (
    <Stack horizontal verticalAlign="center" horizontalAlign="space-between" styles={chipFilterWrapperStyles}>
        <Text styles={columnLabelStyles}>{column.label}</Text>
        <Icon styles={operatorIconStyles} iconName={getOperatorIcon(column.filterOperator)} />
        <Text styles={filterValueStyles}>{column.filterText}</Text>
        <IconButton
            onClick={() => onRemoveFilter(column.name)}
            iconProps={closeIcon}
            title="Remove Filter"
            ariaLabel="Remove Filter"
        />
    </Stack>
);
