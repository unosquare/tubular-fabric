import { handleFilterChange, onKeyDown } from '../src/filterControls/utils';
import { mockColumn, mockKeyboardEvent } from './mock';

describe('handleFilterChange', () => {
    it('Should assign a new value to column.filterText', () => {
        const newValue = 'NewValue';
        handleFilterChange(mockColumn)(null, newValue);
        expect(mockColumn.filterText).toBe(newValue);
    });
});

describe('onKeyDown', () => {
    it('Should call onEnter function once', () => {
        const onEnter = jest.fn();
        onKeyDown(onEnter)(mockKeyboardEvent);
        expect(onEnter.mock.calls.length).toBe(1);
    });

    it('Should not call onEnter function', () => {
        const onEnter = jest.fn();
        onKeyDown(onEnter)({ ...mockKeyboardEvent, keyCode: 0 });
        expect(onEnter.mock.calls.length).toBe(0);
    });
});
