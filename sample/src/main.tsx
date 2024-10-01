import * as React from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { TbDetailsListSample } from './TbDetailsListSample';

export default () => (
    <FluentProvider theme={webLightTheme}>
        <TbDetailsListSample />
    </FluentProvider>
);
