import * as React from 'react';
import { DatePicker, DayOfWeek, IDatePickerStrings, ITextStyles } from 'office-ui-fabric-react';
import { IFilterEditorProps } from './utils';
import { CompareOperators } from 'tubular-common';

const DayPickerStrings: IDatePickerStrings = {
    months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ],

    shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

    shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

    goToToday: 'Go to today',
    prevMonthAriaLabel: 'Go to previous month',
    nextMonthAriaLabel: 'Go to next month',
    prevYearAriaLabel: 'Go to previous year',
    nextYearAriaLabel: 'Go to next year',
    closeButtonAriaLabel: 'Close date picker',
};

const secondInputStyle: ITextStyles = {
    root: {
        marginTop: 5,
    },
};

export const DateFilter = ({ column }: IFilterEditorProps) => {
    const handleDateChange = (isSecondInput?: boolean) => (date: Date | null | undefined) => {
        if (isSecondInput) {
            column.filterArgument = [];
            column.filterArgument[0] = date.toISOString();
        } else {
            column.filterText = date.toISOString();
        }
    };

    const isBetween = column.filterOperator === CompareOperators.Between;

    return (
        <>
            <DatePicker
                firstDayOfWeek={DayOfWeek.Monday}
                strings={DayPickerStrings}
                placeholder={isBetween ? 'From' : 'Selec a date'}
                ariaLabel="Select a date"
                onSelectDate={handleDateChange()}
            />
            {column.filterOperator === CompareOperators.Between && (
                <DatePicker
                    styles={secondInputStyle}
                    firstDayOfWeek={DayOfWeek.Monday}
                    strings={DayPickerStrings}
                    placeholder="To"
                    ariaLabel="Select end date"
                    onSelectDate={handleDateChange(true)}
                />
            )}
        </>
    );
};
