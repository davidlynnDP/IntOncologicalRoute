export const capitalize = (text: string): string => {
  if (!text) return '';

  return text
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase() 
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
  