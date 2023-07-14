import * as React from 'react';
import { Callback, TFunction, i18n } from 'i18next';
declare const LanguageContext: React.Context<{
    t?: TFunction<"translation", undefined> | undefined;
    i18n?: i18n | undefined;
    changeLanguage?: ((lng?: string | undefined, callback?: Callback | undefined) => Promise<TFunction<"translation", undefined>>) | undefined;
    currentLanguage?: string | undefined;
}>;
declare const useLanguageProvider: () => {
    t?: TFunction<"translation", undefined> | undefined;
    i18n?: i18n | undefined;
    changeLanguage?: ((lng?: string | undefined, callback?: Callback | undefined) => Promise<TFunction<"translation", undefined>>) | undefined;
    currentLanguage?: string | undefined;
};
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
declare const LanguageProvider: React.FC<{
    namespaces: string[];
    children: React.ReactNode;
}>;
export { LanguageContext, useLanguageProvider, LanguageProvider };
