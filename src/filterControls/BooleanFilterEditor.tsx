import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/components/Checkbox';
import { IFilterEditorProps } from './utils';

export const BooleanFilterEditor = ({ column, onApply }: IFilterEditorProps) => {
    return (
        <>
            <Checkbox label="Both" />
            <Checkbox label="Yes" />
            <Checkbox label="No" />
        </>
    );
};
