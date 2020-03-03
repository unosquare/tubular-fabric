import * as React from 'react';
import Stack from 'office-ui-fabric-react/lib/components/Stack/Stack';
import { Text } from 'office-ui-fabric-react/lib/components/Text/Text';
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
            <Text styles={{ root: { marginRight: '5px' } }}>{column.label}</Text>
            <Icon
                styles={{ root: { margin: '4px 5px 0px' } }}
                iconName={getOperatorIcon(column.filter.operator as CompareOperators)}
            />
            <Text styles={{ root: { marginRight: 5 } }}>{column.filter.text}</Text>
            <IconButton
                onClick={onRemoveFilter(column.name)}
                iconProps={closeIcon}
                title="Remove Filter"
                ariaLabel="Remove Filter"
            />
        </Stack>
    );
};
