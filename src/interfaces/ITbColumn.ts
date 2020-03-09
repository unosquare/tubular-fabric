import { IColumn } from 'office-ui-fabric-react/lib/components/DetailsList';
import ColumnModelOptions from 'tubular-common/dist/Models/ColumnModelOptions';

export interface ITbColumn extends IColumn {
    tb?: ColumnModelOptions;
}
