import React, { useState, useEffect } from 'react';
import {
  Calendar,
  CalendarDateTemplateEvent,
  CalendarViewChangeEvent,
} from 'primereact/calendar';
import axios from 'axios';

import type {
  HebrewCalendarProps,
  HebrewDates,
  HebrewDateParts,
  DateLike,
} from '@type/hebrewCalendarTypes';
import { ErrorMessage, Field, FieldProps, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';

const HebrewCalendar: React.FC<HebrewCalendarProps> = ({
  value,
  label,
  name,
  validationProp,
}) => {
  const [monthViewDate, setMonthViewDate] = useState<Date>(value || new Date());
  const [selectedRawDate, setSelectedRawDate] = useState<Date | null>(value);
  const [hebrewDates, setHebrewDates] = useState<HebrewDates>({});

  // Helper to format date as YYYY-MM-DD
  const getFormattedDate = (d: DateLike): string | undefined => {
    if (!d) return undefined;
    const date = d instanceof Date ? d : new Date(d.year, d.month, d.day);

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // JavaScript months are 0-indexed
    const day = date.getDate();
    return `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`;
  };

  // Fetch Hebrew dates for the current month
  useEffect(() => {
    if (typeof monthViewDate === 'string') return;
    const startOfMonth = new Date(
      monthViewDate.getFullYear(),
      monthViewDate.getMonth(),
      1
    );

    const endOfMonth = new Date(
      monthViewDate.getFullYear(),
      monthViewDate.getMonth() + 1,
      0
    );

    const fetchHebrewDates = async () => {
      const startDate = getFormattedDate(startOfMonth);
      const endDate = getFormattedDate(endOfMonth);

      const url = `https://www.hebcal.com/converter?cfg=json&start=${startDate}&end=${endDate}&g2h=1`;
      const response = await axios.get(url);
      const newDates = response.data;

      setHebrewDates(newDates.hdates);
    };

    fetchHebrewDates();
  }, [monthViewDate]);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const parseAndsetHebrewDates = (
    hebrewDateParts: HebrewDateParts,
    setFieldValue: FormikHelpers<any>['setFieldValue']
  ) => {
    if (hebrewDateParts && setFieldValue) {
      const { d, m, y } = hebrewDateParts;
      setFieldValue('hebrew_year_of_death', y);
      setFieldValue('hebrew_month_of_death', m);
      setFieldValue('hebrew_day_of_death', d);
    }
  };

  const onChangeHandler = (
    date: Date,
    setFieldValue: FormikHelpers<any>['setFieldValue'],
    setFieldTouched: FormikHelpers<any>['setFieldTouched']
  ) => {
    console.log('date: ', date);
    const formattedDate = formatDate(date);
    setSelectedRawDate(date);
    setFieldTouched(name, true, false);
    setFieldValue(name, formattedDate);
    if (selectedRawDate) {
      const hebrewDateParts = fetchHebrewDateParts(selectedRawDate);
      if (hebrewDateParts) {
        parseAndsetHebrewDates(hebrewDateParts, setFieldValue);
      }
    }
  };

  // useEffect(() => {
  //   if (selectedRawDate) {
  //     const hebrewDateParts = fetchHebrewDateParts(selectedRawDate);
  //     if (hebrewDateParts) {
  //       parseAndsetHebrewDates(hebrewDateParts, setFieldValue);
  //     }
  //     // onChange(hebrewDateParts);
  //   }
  // }, [selectedRawDate, hebrewDates]);

  const monthViewChanged = (e: CalendarViewChangeEvent) => {
    setMonthViewDate(e.value as Date);
  };

  const formatHebDate = (d: Date): string => {
    return fetchHebrewFullDate(d) || '';
  };

  const fetchHebrewFullDate = (date: Date): string => {
    const formattedDate = getFormattedDate(date);
    let hebrewDate;
    if (formattedDate) {
      hebrewDate = hebrewDates[formattedDate];
      return hebrewDate?.hebrew || '';
    }
    return '';
  };
  const fetchHebrewDateParts = (date: Date): HebrewDateParts | null => {
    const formattedDate = getFormattedDate(date);
    const hebrewDate = formattedDate ? hebrewDates[formattedDate] : undefined; // Access the pre-fetched date
    if (hebrewDate) {
      return hebrewDate['heDateParts'] || null;
    }
    return null;
  };

  const dateTemplate = (
    calendarDate: CalendarDateTemplateEvent
  ): JSX.Element => {
    const { day, month, year } = calendarDate;
    const date = new Date(year, month, day);
    const dateParts = fetchHebrewDateParts(date);
    if (!dateParts) {
      return <span>-</span>;
    }
    return (
      <div className='text-sm cal-day-label' data-hebrew-month={dateParts.m}>
        <span>{dateParts.d}</span>
      </div>
    );
  };
  const { t } = useTranslation();

  return (
    <Field className='flex-1' name={name}>
      {({ form }: FieldProps<string>) => (
        <div className='w-full'>
          <label className='block mb-1 font-semibold' htmlFor='hebrewDate'>
            {t(label)}
          </label>
          <Calendar
            inputId='hebrewDate'
            value={selectedRawDate ? new Date(selectedRawDate) : null}
            onChange={e =>
              onChangeHandler(
                e.value as Date,
                form.setFieldValue,
                form.setFieldTouched
              )
            }
            viewDate={monthViewDate}
            onViewDateChange={monthViewChanged}
            dateTemplate={dateTemplate}
            locale='he'
            showIcon
            className='w-full'
            icon={() => <i className='pi pi-calendar text-white'></i>}
            pt={{ day: { className: 'cal-day' } }}
            formatDateTime={formatHebDate}
          />
          {validationProp ? (
            <ErrorMessage
              name={validationProp}
              component='div'
              className='p-error loading-none'
            />
          ) : null}
        </div>
      )}
    </Field>
  );
};

export default HebrewCalendar;
