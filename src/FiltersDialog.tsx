import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { PrimaryButton } from 'office-ui-fabric-react/lib/components/Button/PrimaryButton/PrimaryButton';
import { DefaultButton } from 'office-ui-fabric-react/lib/components/Button/DefaultButton/DefaultButton';
import { FilterField } from './FilterField';

export interface IFiltersProps {
    columns: ColumnModel[];
    setColumns: (colums: ColumnModel[]) => void;
}

export const FiltersDialog: React.FunctionComponent<IFiltersProps> = ({ columns, setColumns }: IFiltersProps) => {
    const onClick = () => {
        setColumns(columns);
        close();
    };

    return (
        <div>
            {columns.map((column) => (
                <FilterField key={column.name} column={column} onEnter={onClick} />
            ))}
        </div>
    );
};
