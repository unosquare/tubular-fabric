import * as React from 'react';
import { RenderCell } from './RenderCell';

export interface TextCellProps {
    value: string;
}

export const TextCell: React.FunctionComponent<TextCellProps> = ({ value }: TextCellProps) => (
    <RenderCell>
        <span title={value}>{value}</span>
    </RenderCell>
);