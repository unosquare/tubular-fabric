import * as React from 'react';
import { TextField, ITextStyles } from '@fluentui/react';
import { onKeyDown, IFilterEditorProps } from './utils';
import { CompareOperators } from 'tubular-common';

const secondInputStyle: ITextStyles = {
    root: {
        marginTop: 5,
    },
};

export const NumericFilter = ({ column, onApply }: IFilterEditorProps) => {
    const handleFilterChange =
        (isSecondInput?: boolean) => (_event: React.FormEvent<HTMLInputElement>, newValue: string) => {
            if (isSecondInput) {
                column.filterArgument = [];
                column.filterArgument[0] = newValue;
            } else {
                column.filterText = newValue;
            }
        };

    const isBetween = column.filterOperator === CompareOperators.Between;

    return (
        <>
            <TextField
                label={''}
                type="number"
                placeholder={isBetween ? 'From' : 'Type a number'}
                onChange={handleFilterChange()}
                defaultValue={column.filterText}
                onKeyDown={onKeyDown(onApply)}
            />
            {isBetween && (
                <TextField
                    styles={secondInputStyle}
                    label={''}
                    type="number"
                    placeholder="To"
                    onChange={handleFilterChange(true)}
                    defaultValue={
                        column.filterArgument && column.filterArgument[0] ? column.filterArgument[0].toString() : ''
                    }
                    onKeyDown={onKeyDown(onApply)}
                />
            )}
        </>
    );
};
