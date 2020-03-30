import * as React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/components/CommandBar/CommandBar';
import { ICommandBarItemProps } from 'office-ui-fabric-react/lib/components/CommandBar';
import { ColumnModel } from 'tubular-common';
import { FiltersDialog } from './FiltersDialog';
import { ChipBar } from './ChipBar';
import { registerTbIcons, getPagingMessage } from './utils';
import { SearchBox } from 'office-ui-fabric-react/lib/components/SearchBox/SearchBox';
import { ToggleColumns } from './ToggleColumns';
import { ISearchBoxStyles } from 'office-ui-fabric-react/lib/SearchBox';
import { ITbFabricInstance } from './interfaces';
import { FeaturesPanel } from './FeaturesPanel';

registerTbIcons();

export interface TbCommandBarProps {
    tbFabricInstance: ITbFabricInstance;
    filterable?: boolean;
    searchable?: boolean;
    toggleColumns?: boolean;
    recordCounter?: boolean;
    items?: ICommandBarItemProps[];
}

const searchBoxStyles: ISearchBoxStyles = { root: { width: '300px', margin: '0px 10px 0px 10px' } };

export const TbCommandBar: React.FunctionComponent<TbCommandBarProps> = ({
    tbFabricInstance,
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
        () => getPagingMessage(tbFabricInstance.state.totalRecordCount, tbFabricInstance.state.filteredRecordCount),
        [tbFabricInstance.state.totalRecordCount, tbFabricInstance.state.filteredRecordCount],
    );

    const _farItems: ICommandBarItemProps[] = [];
    const onClear = () => tbFabricInstance.api.search();

    if (searchable) {
        items = [
            {
                key: 'search',
                // eslint-disable-next-line react/display-name
                onRender: () => (
                    <SearchBox
                        disabled={tbFabricInstance.state.isLoading}
                        underlined={true}
                        placeholder="Search"
                        onSearch={tbFabricInstance.api.search}
                        onClear={onClear}
                        styles={searchBoxStyles}
                    />
                ),
            },
            ...items,
        ];
    }

    if (filterable) {
        _farItems.push({
            key: 'gridFeatures',
            text: 'Grid Features',
            ariaLabel: 'Grid Features',
            disabled: tbFabricInstance.state.isLoading,
            iconOnly: true,
            iconProps: { iconName: 'Equalizer' },
            onClick: () => openPanel(),
        });
    }

    if (recordCounter) {
        _farItems.push({
            key: 'recordCounter',
            disabled: tbFabricInstance.state.isLoading,
            text: label,
        });
    }

    return (
        <>
            <CommandBar items={items} overflowItems={[]} farItems={_farItems} />
            <ChipBar columns={tbFabricInstance.state.columns} onClearFilter={tbFabricInstance.api.clearFilter} />
            {showPanel && <FeaturesPanel closePanel={closePanel} tbFabricInstance={tbFabricInstance} />}
        </>
    );
};
