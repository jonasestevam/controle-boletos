import {getLanguageToI18nWithoutUnderscore} from '../i18n/locales';

export default (value: number): string => {
  return value.toLocaleString(getLanguageToI18nWithoutUnderscore(), {
    style: 'currency',
    currency: getLanguageToI18nWithoutUnderscore() === 'pt-BR' ? 'BRL' : 'USD',
  });
};
