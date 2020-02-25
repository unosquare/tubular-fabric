import * as React from 'react';

import DetailsListWithSearch from './DetailsListWithSearch';
import { TbDetailsListSample } from './TbDetailsListSample';
import { Stack, IStackTokens } from 'office-ui-fabric-react/lib/components/Stack';
import { CompoundButton } from 'office-ui-fabric-react/lib/components/Button';
import { FontWeights, getTheme, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { Callout } from 'office-ui-fabric-react/lib/components/Callout/Callout';
import { Link } from 'office-ui-fabric-react/lib/components/Link/Link';

const stackTokens: IStackTokens = { childrenGap: 40 };

const Main: React.FunctionComponent = () => {
    const [showDetailsListGrid, setShowDetailsListGrid] = React.useState(true);
    const [showSearchable, setShowSearchable] = React.useState(false);

    const detailsListGridOnClick = () => {
        setShowDetailsListGrid(true);
        setShowSearchable(false);
    };

    const searchableOnClick = () => {
        setShowDetailsListGrid(false);
        setShowSearchable(true);
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
                <CompoundButton
                    primary={showSearchable}
                    secondaryText="Details list grid with searchable field"
                    onClick={searchableOnClick}
                >
                    Searchable DetailsListGrid
                </CompoundButton>
            </Stack>
            <div style={{ display: showDetailsListGrid ? 'block' : 'none' }}>
                <TbDetailsListSample />
            </div>
            <div style={{ display: showSearchable ? 'block' : 'none' }}>
                <DetailsListWithSearch />
            </div>
        </div>
    );
};

export default Main;
