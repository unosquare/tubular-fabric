import { IColumn } from 'office-ui-fabric-react/lib/components/DetailsList';
import { ColumnModel } from 'tubular-common';

export interface ITbColumn extends IColumn {
    tb?: Partial<ColumnModel>;
}
