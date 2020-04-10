import * as React from 'react';
import { RenderCell } from './RenderCell';
import { Link } from 'office-ui-fabric-react/lib/Link';

export interface LinkCellProps {
    value: string;
    onClick: () => void;
}

export const LinkCell: React.FunctionComponent<LinkCellProps> = ({ value, onClick }: LinkCellProps) => (
    <RenderCell>
        <Link onClick={onClick} title={value}>
            {value}
        </Link>
    </RenderCell>
);