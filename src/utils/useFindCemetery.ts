import { CemeteryInterface } from '@type/cemeteriesInterface';

const useFindCemetery = (cemeteries: CemeteryInterface[]) => {
  const findCemetery = (id: number | null) => {
    return cemeteries.find((c: CemeteryInterface) => c.id === id) || null;
  };

  return findCemetery;
};

export default useFindCemetery;
