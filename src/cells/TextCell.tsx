import * as React from 'react';
import { RenderCell } from './RenderCell';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';

export type textAlignment = 'Left' | 'Center' | 'Right';

export interface TextCellProps {
    textAlign?: textAlignment;
    value: string;
}

const getStyles = (value: textAlignment): React.CSSProperties => {
    switch (value) {
        case 'Center':
            return { textAlign: 'center', width: '100%' };
        case 'Right':
            return { textAlign: 'right', width: '100%' };
        default:
            return {};
    }
};

export const InnerTextCell: React.FunctionComponent<TextCellProps> = ({ value, textAlign = 'Left' }: TextCellProps) => (
    <div style={getStyles(textAlign)}>{value}</div>
);

export const TextCell: React.FunctionComponent<TextCellProps> = ({ value, textAlign = 'Left' }: TextCellProps) => (
    <RenderCell>
        {value && value.length > 5 ? (
            <TooltipHost content={value}>
                <InnerTextCell value={value} textAlign={textAlign} />
            </TooltipHost>
        ) : (
            <InnerTextCell value={value} textAlign={textAlign} />
        )}
    </RenderCell>
);
