import * as React from 'react';

const itemStyles: any = {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
};

const centeredItemStyles = {
    ...itemStyles,
    justifyContent: 'center',
};

export interface RenderCellProps {
    centered?: boolean;
    children: React.ReactNode;
}

export const RenderCell: React.FunctionComponent<RenderCellProps> = ({
    children,
    centered = false,
}: RenderCellProps) => <div style={centered ? centeredItemStyles : itemStyles}>{children}</div>;
