import * as React from 'react';
import Stack from 'office-ui-fabric-react/lib/components/Stack/Stack';
import { IFilterEditorProps } from './utils';
import { IStackStyles } from 'office-ui-fabric-react/lib/components/Stack';
import { CompareOperators } from 'tubular-common';
import { IChoiceGroupOption, ChoiceGroup } from 'office-ui-fabric-react/lib/components/ChoiceGroup';
import { FontIcon } from 'office-ui-fabric-react/lib/components/Icon';

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
                    <FontIcon iconName="CheckboxCompositeReversed" />
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
                    <FontIcon iconName="Checkbox" />
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
        <Stack key={column.name} verticalAlign="center" styles={filterFieldWrapperStyles}>
            <ChoiceGroup onChange={onChoiceChange} defaultSelectedKey={defaultSelectedKey} options={options} />
        </Stack>
    );
};
