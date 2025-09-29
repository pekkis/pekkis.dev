import { ConfigUrls, UrlGeneratorInstance, UrlGeneratorInstanceDependencies } from './types';
export type { ConfigUrls, UrlGeneratorInstance, UrlGeneratorInstanceDependencies, UrlOptions, ConfigUrlKey } from './types';
export declare const createUrlGeneratorInstance: <TConfigUrls extends ConfigUrls>(dependencies: UrlGeneratorInstanceDependencies<TConfigUrls>) => UrlGeneratorInstance<TConfigUrls>;
export default createUrlGeneratorInstance;
