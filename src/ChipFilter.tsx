import * as React from 'react';
import Stack from 'office-ui-fabric-react/lib/components/Stack/Stack';
import { Label } from 'office-ui-fabric-react/lib/components/Label/Label';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon/Icon';
import { getOperatorIcon } from './utils';
import { CompareOperators } from 'tubular-common';
import { IconButton } from 'office-ui-fabric-react/lib/components/Button/IconButton/IconButton';
import { IIconProps } from 'office-ui-fabric-react/lib/components/Icon/Icon.types';

const closeIcon: IIconProps = { iconName: 'ChromeClose' };

export const ChipFilter: React.FunctionComponent<any> = ({ column, onRemoveFilter }: any) => {
    return (
        <Stack
            horizontal
            verticalAlign="center"
            horizontalAlign="space-between"
            styles={{
                root: {
                    marginTop: '2px',
                    marginRight: '2px',
                    paddingLeft: '6px',
                    backgroundColor: '#DFDFDF',
                    borderRadius: '2px',
                },
                inner: { margin: '0px 10px' },
            }}
        >
            <Label>{column.label}</Label>
            <Icon
                styles={{ root: { margin: '0px 5px' } }}
                iconName={getOperatorIcon(column.filter.operator as CompareOperators)}
            />
            <Label styles={{ root: { marginRight: 5 } }}>{column.filter.text}</Label>
            <IconButton
                onClick={onRemoveFilter(column.name)}
                iconProps={closeIcon}
                title="Remove Filter"
                ariaLabel="Remove Filter"
            />
        </Stack>
    );
};
