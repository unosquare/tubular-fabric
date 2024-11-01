import * as React from 'react';
import { IFilterEditorProps } from './utils';
import { IStackStyles, Stack, FontIcon, IChoiceGroupOption, ChoiceGroup } from '@fluentui/react';
import { CompareOperators } from 'tubular-common';

const filterFieldWrapperStyles: IStackStyles = {
    root: {
        padding: 9,
    },
};

const options: IChoiceGroupOption[] = [
    {
        key: 'true',
        // eslint-disable-next-line react/display-name
        onRenderLabel: () => {
            return (
                <span style={{ paddingLeft: 28, fontSize: 18 }}>
                    <FontIcon iconName='CheckboxCompositeReversed' />
                </span>
            );
        },
        text: '',
    },
    {
        key: 'false',
        // eslint-disable-next-line react/display-name
        onRenderLabel: () => {
            return (
                <span style={{ paddingLeft: 28, fontSize: 18 }}>
                    <FontIcon iconName='Checkbox' />
                </span>
            );
        },
        text: '',
    },
    {
        key: 'all',
        text: 'All',
    },
];

export const BooleanFilterEditor = ({ column }: IFilterEditorProps) => {
    const onChoiceChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) => {
        if (option.key === 'all') {
            column.filterOperator = CompareOperators.None;
            column.filterText = null;
            return;
        }

        column.filterOperator = CompareOperators.Equals;
        column.filterText = option.key;
    };

    const defaultSelectedKey = column.filterText || 'all';

    return (
        <Stack key={column.name} verticalAlign='center' styles={filterFieldWrapperStyles}>
            <ChoiceGroup onChange={onChoiceChange} defaultSelectedKey={defaultSelectedKey} options={options} />
        </Stack>
    );
};
