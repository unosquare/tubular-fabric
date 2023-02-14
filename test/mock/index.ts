import { ColumnModel, AggregateFunctions, ColumnDataType, CompareOperators, ColumnSortDirection } from "tubular-common";

export const mockColumn: ColumnModel = {
    aggregate: AggregateFunctions.Average,
    dataType: ColumnDataType.String,
    filterArgument: [],
    filterOperator: CompareOperators.Equals,
    filterText: 'x',
    filterable: true,
    isKey: false,
    label: 'Test Column',
    name: 'TestColumn',
    searchable: true,
    sortDirection: ColumnSortDirection.Ascending,
    sortOrder: 0,
    sortable: true,
    visible: true,
    isComputed: false,
    exportable: true,
};

export const mockKeyboardEvent: React.KeyboardEvent = {
    altKey: false,
    charCode: 0,
    ctrlKey: false,
    getModifierState: (key: string) => false,
    key: 'Enter',
    keyCode: 13,
    locale: '',
    location: 0,
    metaKey: false,
    repeat: false,
    shiftKey: false,
    which: 0,
    nativeEvent: {} as KeyboardEvent,
    currentTarget: {} as (EventTarget & Element),
    target: {} as EventTarget,
    bubbles: false,
    cancelable: false,
    defaultPrevented: false,
    eventPhase: 0,
    isTrusted: false,
    preventDefault: () => { },
    isDefaultPrevented: () => false,
    stopPropagation: () => { },
    isPropagationStopped: () => false,
    persist: () => { },
    timeStamp: 0,
    type: '',
    code: "Enter"
};
