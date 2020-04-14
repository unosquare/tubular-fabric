import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/components/TextField/TextField';
import { onKeyDown, IFilterEditorProps } from './utils';
import { CompareOperators } from 'tubular-common';
import { ITextStyles } from 'office-ui-fabric-react';

const secondInputStyle: ITextStyles = {
    root: {
        marginTop: 5,
    },
};

export const NumericFilter = ({ column, onApply }: IFilterEditorProps) => {
    const handleFilterChange = (isSecondInput?: boolean) => (
        _event: React.FormEvent<HTMLInputElement>,
        newValue: string,
    ) => {
        if (isSecondInput) {
            column.filterArgument = [];
            column.filterArgument[0] = newValue;
        } else {
            column.filterText = newValue;
        }
    };

    return (
        <>
            <TextField
                label={''}
                type="number"
                placeholder="From"
                onChange={handleFilterChange()}
                defaultValue={column.filterText}
                onKeyDown={onKeyDown(onApply)}
            />
            {column.filterOperator === CompareOperators.Between && (
                <TextField
                    styles={secondInputStyle}
                    label={''}
                    type="number"
                    placeholder="To"
                    onChange={handleFilterChange(true)}
                    defaultValue={column.filterArgument ? column.filterArgument[0] : ''}
                    onKeyDown={onKeyDown(onApply)}
                />
            )}
        </>
    );
};
