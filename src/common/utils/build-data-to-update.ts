
export const buildDataToUpdate = <T extends Record<string, any>>(dto: T): Partial<T> => {
  const dataToUpdate: Partial<T> = {};

  Object.keys(dto).forEach((key) => {
    const value = dto[key];
    if (value !== undefined && value !== null && value !== '') {
      (dataToUpdate as any)[key] = value; 
    }
  });

  return dataToUpdate;
};
