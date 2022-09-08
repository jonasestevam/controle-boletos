import {Platform, NativeModules} from 'react-native';
import I18n from 'i18n-js';
import en from './en-US';
import pt from './pt-BR';

const normalizeTranslate = {
  en_US: 'en_US',
  pt_BR: 'pt_BR',
  en: 'en_US',
  pt_US: 'pt_BR',
};

const normalizeTranslateWithoutUnderscore = {
  en_US: 'en-US',
  pt_BR: 'pt-BR',
  en: 'en-US',
  pt_US: 'pt-BR',
};

const getLanguageByDevice = () => {
  return Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;
};

I18n.translations = {
  en_US: en,
  pt_BR: pt,
};

const setLanguageToI18n = () => {
  const language = getLanguageByDevice();
  const translateNormalize = normalizeTranslate[language];
  const iHaveThisLanguage =
    I18n.translations.hasOwnProperty(translateNormalize);
  iHaveThisLanguage
    ? (I18n.locale = translateNormalize)
    : (I18n.defaultLocale = 'en_US');
};

export const getLanguageToI18nWithoutUnderscore = () => {
  const language = getLanguageByDevice();
  const translateNormalize = normalizeTranslateWithoutUnderscore[language];
  return translateNormalize || 'en-US';
};

setLanguageToI18n();

export const translate = (key: I18n.Scope) => I18n.t(key);
