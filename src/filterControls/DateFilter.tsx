import * as React from 'react';
import { IFilterEditorProps } from './utils';
import { CompareOperators, ColumnModel } from 'tubular-common';
import { mergeStyles, DatePicker, DayOfWeek, IDatePickerStrings, IDatePickerStyles } from '@fluentui/react';

import { ClearDateButton } from './ClearDateButton';

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

const secondInputStyle: Partial<IDatePickerStyles> = {
    root: {
        marginTop: 5,
    },
    icon: { left: 9, right: 'unset' },
};

const firstInputStyle: Partial<IDatePickerStyles> = {
    icon: { left: 9, right: 'unset' },
};

const dateInputClassName = mergeStyles({
    paddingLeft: '34px',
    paddingRight: '8px',
});

const getInitialDates = (column: ColumnModel) => {
    const dates = [null, null];

    const startDate = Date.parse(column.filterText);

    if (!isNaN(startDate)) {
        dates[0] = new Date(startDate);
    }

    const toDate = Date.parse(
        column.filterArgument && column.filterArgument[0] ? column.filterArgument[0].toString() : null,
    );

    if (!isNaN(startDate)) {
        dates[1] = new Date(toDate);
    }

    return dates;
};

export const DateFilter = ({ column }: IFilterEditorProps) => {
    const [dates, setDates] = React.useState(getInitialDates(column));

    const handleDateChange = (isSecondInput?: boolean) => (date: Date | null | undefined) => {
        if (isSecondInput) {
            column.filterArgument = [];
            setDates([dates[0], date]);
            column.filterArgument[0] = date ? date.toISOString() : null;
        } else {
            setDates([date, dates[1]]);
            column.filterText = date ? date.toISOString() : null;
        }
    };

    const clearDate =
        (isSecondInput = false) =>
        () =>
            handleDateChange(isSecondInput)(null);

    const isBetween = column.filterOperator === CompareOperators.Between;

    return (
        <>
            <DatePicker
                firstDayOfWeek={DayOfWeek.Monday}
                strings={DayPickerStrings}
                placeholder={isBetween ? 'From' : 'Selec a date'}
                ariaLabel='Select a date'
                value={dates[0]}
                textField={{
                    inputClassName: dateInputClassName,
                    // eslint-disable-next-line react/display-name
                    onRenderSuffix: () => <ClearDateButton onClick={clearDate()} />,
                }}
                styles={firstInputStyle}
                onSelectDate={handleDateChange()}
            />
            {column.filterOperator === CompareOperators.Between && (
                <DatePicker
                    styles={secondInputStyle}
                    firstDayOfWeek={DayOfWeek.Monday}
                    strings={DayPickerStrings}
                    placeholder='To'
                    value={dates[1]}
                    textField={{
                        inputClassName: dateInputClassName,
                        // eslint-disable-next-line react/display-name
                        onRenderSuffix: () => <ClearDateButton onClick={clearDate(true)} />,
                    }}
                    ariaLabel='Select end date'
                    onSelectDate={handleDateChange(true)}
                />
            )}
        </>
    );
};
