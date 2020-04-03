import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { Stack, IStackTokens } from 'office-ui-fabric-react/lib/components/Stack';
import { Checkbox } from 'office-ui-fabric-react/lib/components/Checkbox';

export interface IToggleColumnsProps {
    columns: ColumnModel[];
    setColumns: (colums: ColumnModel[]) => void;
}

const stackTokens: IStackTokens = { childrenGap: 10, padding: 10 };

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
        <Stack tokens={stackTokens}>
            {columns.map((column) => (
                <Checkbox
                    key={column.name}
                    label={column.label}
                    checked={column.visible}
                    onChange={handleChange(column)}
                />
            ))}
        </Stack>
    );
};
