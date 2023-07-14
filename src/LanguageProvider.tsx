import React, { createContext, useMemo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {Callback, TFunction, i18n} from 'i18next'

const LanguageContext = createContext< {
  t?: TFunction<"translation", undefined>;
  i18n?: i18n;
  changeLanguage?: (lng?: string | undefined, callback?: Callback | undefined) => Promise<TFunction<"translation", undefined>>;
  currentLanguage?: string;
}>({});

const useLanguageProvider = () => useContext(LanguageContext);

/**
 * @example
 * i18next.use(initReactI18next).init({
 *   fallbackLng: Object.keys(resources),
 *   debug: true,
 *   ns: Object.keys(resources[Object.keys(resources)[0]]),
 *   defaultNS: "common",
 *   resources: resources
 * });
 * @example
 * <LanguageProvider namespaces={Object.keys(Object.keys(resources)[0])}>
 *    <App />
 * </LanguageProvider>

 */
const LanguageProvider: React.FC<{ namespaces: string[]; children: React.ReactNode }> = ({ namespaces, children }) => {

  const { t, i18n } = useTranslation(namespaces);

  const contextValue = useMemo(
    () => ({
      t,
      i18n,
      changeLanguage: i18n.changeLanguage,
      currentLanguage: i18n.language
    }),
    [t, i18n]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, useLanguageProvider, LanguageProvider };
