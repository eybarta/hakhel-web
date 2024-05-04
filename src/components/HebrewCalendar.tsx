import React, { useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import { FloatLabel } from 'primereact/floatlabel';
import axios from 'axios';

const HebrewCalendar = ({ label, onChange }) => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hebrewDates, setHebrewDates] = useState({});

  // Helper to format date as YYYY-MM-DD
  const getFormattedDate = (d: Date) => {
    if (!d) return;
    const date = d.year ? new Date(d.year, d.month, d.day) : d;
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // JavaScript months are 0-indexed
    const day = date.getDate();
    return `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`;
  };

  // Fetch Hebrew dates for the current month
  useEffect(() => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const fetchHebrewDates = async () => {
      const startDate = getFormattedDate(startOfMonth);
      const endDate = getFormattedDate(endOfMonth);
      const url = `https://www.hebcal.com/converter?cfg=json&start=${startDate}&end=${endDate}&g2h=1`;
      const response = await axios.get(url);
      const dates = response.data;
      console.log('dates: ', dates);
      setHebrewDates(dates.hdates);
    };

    fetchHebrewDates();
  }, [date]);
  useEffect(() => {
    const hebrewDateParts = fetchHebrewDateParts(selectedDate);
    console.log('hebrewDateParts: ', hebrewDateParts);
    const hebrewDate = fetchHebrewDateParts(selectedDate, 'hebrew');
    console.log('hebrewDate: ', hebrewDate);

    onChange(hebrewDateParts);

    // HERE I CAN EMIT THE HEBREW DATE BACK TO PARENT?
  }, [selectedDate]);

  function dateChanged(e) {
    console.log('e: ', e);
    setDate(e.value);
  }

  function formatHebDate(d) {
    return fetchHebrewDateParts(d, 'hebrew') || '';
  }

  const fetchHebrewDateParts = (dateMeta, requestedProp = 'heDateParts') => {
    const formattedDate = getFormattedDate(dateMeta);
    const hebrewDate = hebrewDates[formattedDate]; // Access the pre-fetched date
    // console.log('hebrewDate: ', hebrewDate);
    if (hebrewDate) {
      return hebrewDate[requestedProp];
    }
    return null;
  };
  const dateTemplate = dateMeta => {
    // console.log('dateMeta: ', dateMeta);
    const dateParts = fetchHebrewDateParts(dateMeta);
    if (!dateParts) {
      return <span>-</span>;
    }
    return (
      <div className='text-sm cal-day-label' data-hebrew-month={dateParts.m}>
        <span>{dateParts.d}</span>
      </div>
    );
  };
  const iconRenderTemplate = () => {
    return <i className='pi pi-calendar text-white'></i>;
  };
  return (
    <Calendar
      inputId='hebrewDate'
      value={date}
      onViewDateChange={dateChanged}
      onChange={e => setSelectedDate(e.value)}
      dateTemplate={dateTemplate}
      locale='he'
      showIcon
      className='w-full'
      icon={iconRenderTemplate}
      pt={{ day: { className: 'cal-day' } }}
      formatDateTime={formatHebDate}
    />
  );
};

export default HebrewCalendar;
