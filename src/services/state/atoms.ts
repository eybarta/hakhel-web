import { atom } from 'recoil';

export const cemeteriesState = atom({
    key: 'cemeteriesState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial state)
});

export const deceasedPeopleState = atom({
    key: 'deceasedPeopleState',
    default: [],
});
