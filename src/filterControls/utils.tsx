import { ColumnModel } from 'tubular-common';

export const handleFilterChange =
    (column: ColumnModel) => (_event: React.FormEvent<HTMLInputElement>, newValue: string) => {
        column.filterText = newValue;
    };

export const onKeyDown = (onEnter: () => void) => (ev: React.KeyboardEvent) => {
    if (ev.key === 'Enter') {
        ev.preventDefault();
        ev.stopPropagation();
        onEnter();
    }
};

export interface IFilterEditorProps {
    column: ColumnModel;
    onApply: () => void;
}
