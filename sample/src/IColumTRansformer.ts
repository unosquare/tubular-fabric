import { ColumnModel, ColumnSortDirection } from 'tubular-common';
import { IColumn } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList.types';

export const IColumnTRansformer = (trColumns: ColumnModel[]): IColumn[] => {

    const creatingIColumn = (trColumn: ColumnModel): IColumn => {
        let transformedIColumn = {
            key: trColumn.name,
            name: trColumn.name,
            fieldName: trColumn.name,            
            data: trColumn.dataType,
            minWidth: 200,
            isFiltered: trColumn.hasFilter,
        }

        if (trColumn.sortDirection !== ColumnSortDirection.None) {
            return { ...transformedIColumn, isSortedDescending: trColumn.sortDirection === ColumnSortDirection.Descending }
        }

        return transformedIColumn;
    }

    return trColumns.map(trColumn => creatingIColumn(trColumn));
};
