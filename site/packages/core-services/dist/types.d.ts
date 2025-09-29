import { PageLanguage, UrlDefinition } from '@veikkaus/site-config';
export type ConfigUrls = Record<string, UrlDefinition>;
export type UrlGeneratorInstanceDependencies<TConfigUrls extends ConfigUrls> = {
    configUrls: TConfigUrls;
    getPageLanguage: () => PageLanguage;
    getClientOrigin: (baseUrl: string) => string;
    siteBaseUrl: string;
};
export type ConfigUrlKey<TConfigUrls extends ConfigUrls> = keyof TConfigUrls;
export type UrlOptions<TConfigUrls extends ConfigUrls> = {
    urlKey: ConfigUrlKey<TConfigUrls>;
    useLang?: boolean;
    params?: Record<string, string | undefined> | string;
    fragment?: string;
    path?: string;
    forcePlain?: boolean;
    language?: PageLanguage;
    stripParams?: boolean;
};
export type UrlGeneratorInstance<TConfigUrls extends ConfigUrls> = {
    hasUrlKey: (urlKey: string) => boolean;
    getRelativeUrl: (options: UrlOptions<TConfigUrls>) => string;
    getPageBasePath: (options: UrlOptions<TConfigUrls>) => string;
    getAbsoluteUrl: (options: UrlOptions<TConfigUrls>) => string;
};
