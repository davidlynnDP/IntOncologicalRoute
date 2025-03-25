
export const camelToSnakeCase = (text: string): string => {
  return text.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
};
  
export const snakeToCamelCase = (text: string): string => {
  return text.replace(/(_\w)/g, match => match[1].toUpperCase());
};
  