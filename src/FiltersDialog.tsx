import * as React from 'react';
import { ColumnModel, columnHasFilter } from 'tubular-common';
import { FilterField } from './FilterField';
import { IGroup } from 'office-ui-fabric-react';
import { FilterContainer } from './FilterContainer';

export interface IFiltersProps {
    columns: ColumnModel[];
    setColumns: (colums: ColumnModel[]) => void;
}

export const FiltersDialog: React.FunctionComponent<IFiltersProps> = ({ columns, setColumns }: IFiltersProps) => {
    const onClick = () => {
        setColumns(columns);
        close();
    };

    const groups: IGroup[] = columns.map((column, index) => {
        return {
            count: 1,
            key: column.name,
            name: column.label,
            startIndex: index,
            level: 0,
            isCollapsed: true,
            data: {
                hasFilter: columnHasFilter(column),
            },
        };
    });

    const items = columns.map((column) => <FilterField key={column.name} column={column} onEnter={onClick} />);

    return <FilterContainer items={items} groups={groups} />;
};
