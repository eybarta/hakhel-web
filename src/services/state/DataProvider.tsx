import { useEffect } from 'react';
import { useSetRecoilState, useRecoilValueLoadable, selector } from 'recoil';
import { deceasedPeopleState, cemeteriesState } from './atoms';
import fetchDeceasedPeople from '../api/deceasedPeople';
import fetchCemeteries from '../api/cemeteries';

export const cemeteriesDataQuery = selector({
  key: 'cemeteriesDataQuery',
  get: async () => {
    const fetchedData = await fetchCemeteries(); // Your fetch function here
    console.log('FETCHED CEMETERIES: ', fetchedData);
    return fetchedData;
  },
});

const DataProvider = ({ children }) => {
  const setDeceasedPeople = useSetRecoilState(deceasedPeopleState);
  const setCemeteries = useSetRecoilState(cemeteriesState);
  const cemeteriesData = useRecoilValueLoadable(cemeteriesDataQuery);
  useEffect(() => {
    if (cemeteriesData.state === 'hasValue') {
      setCemeteries(cemeteriesData.contents);
    }
  }, [cemeteriesData]);

  useEffect(() => {
    async function loadData() {
      try {
        const peopleData = await fetchDeceasedPeople();
        setDeceasedPeople(peopleData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    loadData();
  }, []);

  return <>{children}</>;
};

export default DataProvider;
