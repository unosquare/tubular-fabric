import { ITbApi } from 'tubular-react-common/dist/types';
import { ColumnModel } from 'tubular-common';
import { IColumn } from '@fluentui/react';

export interface ITbFabricApi extends ITbApi {
    loadMoreItems: (index?: number) => void;
    search: (value?: string) => void;
    applyFeatures: (columns: ColumnModel[]) => void;
    applyFilters: (filterableColumns: ColumnModel[]) => void;
    applyFilter: (columnName: string, value: string) => void;
    clearFilter: (columnName: string) => void;
    sortByColumn: (ev?: React.MouseEvent<HTMLElement>, column?: ColumnModel, isMultiSort?: boolean) => void;
}
