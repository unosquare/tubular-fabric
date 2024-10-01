import { TableColumnDefinition } from '@fluentui/react-components';
import { ColumnModel } from 'tubular-common';

export interface ITbColumn<TItem> extends TableColumnDefinition<TItem> {
    tb?: Partial<ColumnModel>;
}
