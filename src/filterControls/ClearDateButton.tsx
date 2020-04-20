import * as React from 'react';
import { IconButton, IButtonStyles } from '@fluentui/react';

const iconStyles: IButtonStyles = {
    root: { height: 30 },
};

export interface IClearDateButtonProps {
    onClick: () => void;
}

export const ClearDateButton = ({ onClick }: IClearDateButtonProps) => {
    return <IconButton styles={iconStyles} iconProps={{ iconName: 'Cancel' }} onClick={onClick} />;
};
