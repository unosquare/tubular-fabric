import { Checkbox } from '@fluentui/react/lib/Checkbox';
import * as React from 'react';
import { RenderCell } from './RenderCell';

export interface CheckboxCellProps {
    checked: boolean;
}

export const CheckboxCell: React.FunctionComponent<CheckboxCellProps> = ({ checked }: CheckboxCellProps) => (
    <RenderCell centered={true}>
        <Checkbox checked={checked} disabled={true} />
    </RenderCell>
);
