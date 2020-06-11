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
};

export const mockKeyboardEvent: KeyboardEvent = {
    altKey: false,
    charCode: 0,
    ctrlKey: false,
    getModifierState: (key: string) => false,
    key: 'Enter',
    keyCode: 13,
    location: 0,
    metaKey: false,
    repeat: false,
    shiftKey: false,
    which: 0,
    detail: 0,
    view: null,
    currentTarget: null,
    target: null,
    bubbles: false,
    cancelable: false,
    defaultPrevented: false,
    eventPhase: 0,
    isTrusted: false,
    preventDefault: () => {},
    stopPropagation: () => {},
    timeStamp: 0,
    type: '',
};