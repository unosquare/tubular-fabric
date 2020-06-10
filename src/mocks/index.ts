import { ColumnModel, AggregateFunctions, ColumnDataType, CompareOperators, ColumnSortDirection } from "tubular-common";

export const mockColumn: ColumnModel = {
    aggregate: AggregateFunctions.Average,
    dataType: ColumnDataType.String,
    filterArgument: [],
    filterOperator: CompareOperators.None,
    filterText: '',
    filterable: false,
    isKey: false,
    label: 'Test Column',
    name: 'TestColumn',
    searchable: true,
    sortDirection: ColumnSortDirection.Ascending,
    sortOrder: 0,
    sortable: true,
    visible: true
}
