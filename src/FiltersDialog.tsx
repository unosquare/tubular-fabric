import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { Dialog } from 'office-ui-fabric-react/lib/components/Dialog/Dialog';
import { DialogFooter } from 'office-ui-fabric-react/lib/components/Dialog/DialogFooter';
import { PrimaryButton } from 'office-ui-fabric-react/lib/components/Button/PrimaryButton/PrimaryButton';
import { DefaultButton } from 'office-ui-fabric-react/lib/components/Button/DefaultButton/DefaultButton';
import { FilterField } from './FilterField';
import { DialogType, IDialogContentProps } from 'office-ui-fabric-react/lib/components/Dialog';
import { IModalProps } from 'office-ui-fabric-react/lib/components/Modal';

const dialogContentProps: IDialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Filters',
    closeButtonAriaLabel: 'Close',
};

const modalProps: IModalProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 500 } },
    dragOptions: undefined,
};

// const resolveOperator = (column: ColumnModel) =>
//     column.filter.operator == CompareOperators.None
//         ? column.dataType == ColumnDataType.String
//             ? CompareOperators.Contains
//             : CompareOperators.Equals
//         : column.filter.operator;

export interface IFiltersProps {
    columns: ColumnModel[];
    applyFilters: (columns: ColumnModel[]) => void;
    close: () => void;
}

export const FiltersDialog: React.FunctionComponent<IFiltersProps> = ({
    columns,
    applyFilters,
    close,
}: IFiltersProps) => {
    const copyOfCoumns = columns.map((column) => ({
        ...column,
    }));

    const [tempColumns] = React.useState(copyOfCoumns);

    const onClick = () => {
        applyFilters(tempColumns);
        close();
    };

    const onDismiss = () => close();

    return (
        <Dialog hidden={false} onDismiss={onDismiss} dialogContentProps={dialogContentProps} modalProps={modalProps}>
            {tempColumns.map((column) => (
                <FilterField key={column.name} column={column} onEnter={onClick} />
            ))}
            <DialogFooter>
                <PrimaryButton onClick={onClick} text="Apply" />
                <DefaultButton onClick={close} text="Cancel" />
            </DialogFooter>
        </Dialog>
    );
};
