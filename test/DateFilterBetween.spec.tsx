import { ColumnDataType, ColumnModel, CompareOperators, createColumn } from 'tubular-common';
import { getInitialDates } from '../src/filterControls/DateFilter';

const dateColumn = (overrides: Partial<ColumnModel>): ColumnModel =>
    createColumn('Created', {
        dataType: ColumnDataType.DateTime,
        filterable: true,
        ...overrides,
    });

const isInvalidDate = (value: unknown): boolean => value instanceof Date && isNaN(value.getTime());

describe('DateFilter - getInitialDates', () => {
    it('should not produce an Invalid Date for the upper bound when there is none yet', () => {
        // Switching to "Between" right after a single-value operator (e.g. Equals):
        // the lower bound (filterText) is set, but filterArgument is still empty.
        const [from, to] = getInitialDates(
            dateColumn({
                filterOperator: CompareOperators.Between,
                filterText: '2020-01-01',
                filterArgument: [],
            }),
        );

        expect(from).toBeInstanceOf(Date);
        expect(isInvalidDate(from)).toBe(false);
        expect(to).toBeNull();
    });

    it('should not produce an Invalid Date for the upper bound when filterArgument is undefined', () => {
        const [, to] = getInitialDates(
            dateColumn({
                filterOperator: CompareOperators.Between,
                filterText: '2020-01-01',
                filterArgument: undefined,
            }),
        );

        expect(to).toBeNull();
        expect(isInvalidDate(to)).toBe(false);
    });

    it('should populate both bounds when a valid upper bound exists', () => {
        const [from, to] = getInitialDates(
            dateColumn({
                filterOperator: CompareOperators.Between,
                filterText: '2020-01-01',
                filterArgument: ['2020-02-01'],
            }),
        );

        expect(from).toBeInstanceOf(Date);
        expect(to).toBeInstanceOf(Date);
        expect(isInvalidDate(from)).toBe(false);
        expect(isInvalidDate(to)).toBe(false);
    });

    it('should return nulls when there is no filter yet', () => {
        const [from, to] = getInitialDates(
            dateColumn({
                filterOperator: CompareOperators.None,
                filterText: undefined,
                filterArgument: undefined,
            }),
        );

        expect(from).toBeNull();
        expect(to).toBeNull();
    });
});
