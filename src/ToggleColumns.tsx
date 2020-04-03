import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { Toggle } from 'office-ui-fabric-react/lib/components/Toggle/Toggle';

export interface IToggleColumnsProps {
    columns: ColumnModel[];
    setColumns: (colums: ColumnModel[]) => void;
}

export const ToggleColumns: React.FunctionComponent<IToggleColumnsProps> = (props: IToggleColumnsProps) => {
    const { columns, setColumns } = props;

    const handleChange = (column: ColumnModel) => (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
        if (!checked && columns.filter((c) => !c.visible).length === columns.length - 1) {
            return;
        }

        const newColumns = columns.map((tempColumn) => {
            if (tempColumn.name === column.name) {
                return {
                    ...tempColumn,
                    visible: checked,
                };
            }

            return { ...tempColumn };
        });

        // Update temp columns
        setColumns(newColumns);
    };

    return (
        <div>
            {columns.map((column) => (
                <Toggle
                    key={column.name}
                    label={column.label}
                    checked={column.visible}
                    onText="On"
                    offText="Off"
                    onChange={handleChange(column)}
                />
            ))}
        </div>
    );
};
