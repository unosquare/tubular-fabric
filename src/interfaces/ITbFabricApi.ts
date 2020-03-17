import { ITbApi } from 'tubular-react-common/dist/types';
import { ColumnModel } from 'tubular-common';
import { IColumn } from 'office-ui-fabric-react/lib/components/DetailsList';

export interface ITbFabricApi extends ITbApi {
    loadMoreItems: (index?: number) => void;
    search: (value?: string) => void;
    applyFilters: (filterableColumns: ColumnModel[]) => void;
    applyFilter: (columnName: string, value: string) => void;
    updateVisibleColumns: (columns: ColumnModel[]) => void;
    sortByColumn: (ev?: React.MouseEvent<HTMLElement>, column?: IColumn) => void;
}
