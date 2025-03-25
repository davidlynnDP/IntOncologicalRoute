

export const clearFieldOfRareSymbolsStrict = (text: string, replacements: { [key: string]: string }): string => {

  if (!text) {
    return text;
  }

  for (const [invalidWord, validWord] of Object.entries(replacements)) {
    const regex = new RegExp(invalidWord, 'g');
    text = text.replace(regex, validWord);
  }

  return text;
};


export const replaceInvalidChars = (text: string, replacement: string = 'ñ'): string => {

  if (!text) return text;

  const invalidChars = ['�', '\uFFFD']; // Lista de caracteres inválidos
  let cleanedText = text;

  for (const char of invalidChars) {
    cleanedText = cleanedText.split(char).join(replacement);
  }

  return cleanedText;
};


export const clearFieldOfRareSymbolsFlexible = (text: string, replacements: { [key: string]: string }): string => {

  if (!text) {
    return text;
  }

  for (const [invalidWord, validWord] of Object.entries(replacements)) {
    const regex = new RegExp(invalidWord, 'gi');
    text = text.replace(regex, (match) => {

      if (match === match.toUpperCase()) {
        return validWord.toUpperCase();
      }

      if (match.charAt(0) === match.charAt(0).toUpperCase()) {
        return validWord.charAt(0).toUpperCase() + validWord.slice(1);
      }

      return validWord;
    });
  }

  return text;
};

