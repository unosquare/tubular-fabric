import * as React from 'react';

import { TbDetailsListSample } from './TbDetailsListSample';
import { Stack, IStackTokens } from 'office-ui-fabric-react/lib/components/Stack';
import { CompoundButton } from 'office-ui-fabric-react/lib/components/Button';

const stackTokens: IStackTokens = { childrenGap: 40 };

const Main: React.FunctionComponent = () => {
    const [showDetailsListGrid, setShowDetailsListGrid] = React.useState(true);

    const detailsListGridOnClick = () => {
        setShowDetailsListGrid(true);
    };

    return (
        <div>
            <Stack horizontal tokens={stackTokens}>
                <CompoundButton
                    primary={showDetailsListGrid}
                    secondaryText="Example with infinite loader."
                    onClick={detailsListGridOnClick}
                >
                    Details List Grid
                </CompoundButton>
            </Stack>
            <div style={{ display: showDetailsListGrid ? 'block' : 'none' }}>
                <TbDetailsListSample />
            </div>
        </div>
    );
};

export default Main;
