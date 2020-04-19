import { IColumn } from '@fluentui/react/lib/DetailsList';
import { ColumnModel } from 'tubular-common';

export interface ITbColumn extends IColumn {
    tb?: Partial<ColumnModel>;
}
