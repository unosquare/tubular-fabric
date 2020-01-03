import { ColumnModel, ColumnSortDirection } from 'tubular-common';
import { IColumn } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList.types';

export const IColumnTRansformer = (trColumns: ColumnModel[]): IColumn[] => {

    const creatingIColumn = (trColumn: ColumnModel): IColumn => {
        let transformedIColumn = {
            key: trColumn.Name,
            name: trColumn.Name,
            fieldName: trColumn.Name,            
            data: trColumn.DataType,
            minWidth: 200,
            isFiltered: trColumn.hasFilter,
        }

        if (trColumn.SortDirection !== ColumnSortDirection.NONE) {
            return { ...transformedIColumn, isSortedDescending: trColumn.SortDirection === ColumnSortDirection.DESCENDING ? true: false,}
        }

        return transformedIColumn;
    }

    return trColumns.map(trColumn => creatingIColumn(trColumn));
};
