import { ColumnDataType, ColumnModel, CompareOperators, createColumn } from 'tubular-common';
import { normalizeIncompleteBetween } from '../src/useTbFabric';

const dateColumn = (overrides: Partial<ColumnModel>): ColumnModel =>
    createColumn('Created', {
        dataType: ColumnDataType.DateTime,
        filterable: true,
        ...overrides,
    });

describe('normalizeIncompleteBetween', () => {
    it('should downgrade an incomplete Between (undefined filterArgument) to Gte', () => {
        const column = dateColumn({
            filterOperator: CompareOperators.Between,
            filterText: '01/01/2020',
            filterArgument: undefined,
        });

        normalizeIncompleteBetween(column);

        expect(column.filterOperator).toBe(CompareOperators.Gte);
        expect(column.filterArgument).toBeNull();
    });

    it('should downgrade an incomplete Between (empty filterArgument) to Gte', () => {
        const column = dateColumn({
            filterOperator: CompareOperators.Between,
            filterText: '01/01/2020',
            filterArgument: [],
        });

        normalizeIncompleteBetween(column);

        expect(column.filterOperator).toBe(CompareOperators.Gte);
        expect(column.filterArgument).toBeNull();
    });

    it('should downgrade an incomplete Between (falsy upper bound) to Gte', () => {
        const column = dateColumn({
            filterOperator: CompareOperators.Between,
            filterText: '01/01/2020',
            filterArgument: [null],
        });

        normalizeIncompleteBetween(column);

        expect(column.filterOperator).toBe(CompareOperators.Gte);
        expect(column.filterArgument).toBeNull();
    });

    it('should leave a complete Between filter untouched', () => {
        const column = dateColumn({
            filterOperator: CompareOperators.Between,
            filterText: '01/01/2020',
            filterArgument: ['01/02/2020'],
        });

        normalizeIncompleteBetween(column);

        expect(column.filterOperator).toBe(CompareOperators.Between);
        expect(column.filterArgument).toEqual(['01/02/2020']);
    });

    it('should leave non-Between operators untouched', () => {
        const column = dateColumn({
            filterOperator: CompareOperators.Equals,
            filterText: '01/01/2020',
            filterArgument: undefined,
        });

        normalizeIncompleteBetween(column);

        expect(column.filterOperator).toBe(CompareOperators.Equals);
        expect(column.filterArgument).toBeUndefined();
    });
});
