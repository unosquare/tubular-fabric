import * as React from 'react';

import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';

import { ChipBar } from './ChipBar';
import { registerTbIcons, getPagingMessage } from './utils';
import { SearchBox, ISearchBoxStyles } from '@fluentui/react/lib/SearchBox';
import { IFabricTbState, ITbFabricApi } from './interfaces';
import { FeaturesPanel } from './FeaturesPanel';
import * as PropTypes from 'prop-types'

registerTbIcons();

export interface TbCommandBarProps {
    tbState: IFabricTbState;
    tbApi: ITbFabricApi;
    filterable?: boolean;
    searchable?: boolean;
    toggleColumns?: boolean;
    recordCounter?: boolean;
    items?: ICommandBarItemProps[];
}

const searchBoxStyles: ISearchBoxStyles = { root: { width: '300px', margin: '0px 10px 0px 10px' } };

export const TbCommandBar: React.FunctionComponent<TbCommandBarProps> = ({
    tbState,
    tbApi,
    filterable,
    searchable,
    toggleColumns,
    recordCounter,
    items,
}: TbCommandBarProps) => {
    const [showPanel, setShowPanel] = React.useState(false);
    const closePanel = () => setShowPanel(false);
    const openPanel = () => setShowPanel(true);

    const label = React.useMemo(
        () => getPagingMessage(tbState.totalRecordCount, tbState.filteredRecordCount),
        [tbState.totalRecordCount, tbState.filteredRecordCount],
    );

    const _farItems: ICommandBarItemProps[] = [];
    const onClear = () => tbApi.search();

    if (searchable) {
        items = [
            {
                key: 'search',
                // eslint-disable-next-line react/display-name
                onRender: () => (
                    <SearchBox
                        disabled={tbState.isLoading}
                        underlined={true}
                        placeholder="Search"
                        onSearch={tbApi.search}
                        onClear={onClear}
                        styles={searchBoxStyles}
                    />
                ),
            },
            ...items,
        ];
    }

    if (filterable || toggleColumns) {
        _farItems.push({
            key: 'gridFeatures',
            text: 'Grid Features',
            ariaLabel: 'Grid Features',
            disabled: tbState.isLoading,
            iconOnly: true,
            iconProps: { iconName: 'Equalizer' },
            onClick: () => openPanel(),
        });
    }

    if (recordCounter) {
        _farItems.push({
            key: 'recordCounter',
            disabled: tbState.isLoading,
            text: label,
        });
    }

    return (
        <>
            <CommandBar items={items} overflowItems={[]} farItems={_farItems} />
            <ChipBar columns={tbState.columns} onClearFilter={tbApi.clearFilter} isLoading={tbState.isLoading} />
            {showPanel && (
                <FeaturesPanel
                    closePanel={closePanel}
                    columns={tbState.columns}
                    toggleColumns={toggleColumns}
                    filterable={filterable}
                    onApplyFeatures={tbApi.applyFeatures}
                />
            )}
        </>
    );
};

TbCommandBar.propTypes = {
    tbState: PropTypes.any,
    tbApi: PropTypes.any,

};
