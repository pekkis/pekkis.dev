"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const history = require("@veikkaus/history");
const router = require("@veikkaus/router");
const typeCheck = require("@veikkaus/utils/type-check");
const remeda = require("remeda");
const createUrlGeneratorInstance = (dependencies) => {
  const { configUrls, getPageLanguage, getClientOrigin, siteBaseUrl } = dependencies;
  const getParamsPart = (params, forcePlain) => {
    const filterFalsyAndUndefined = (value) => value === void 0 || value !== void 0 && !value;
    const paramsStr = remeda.isObjectType(params) ? history.queryParamsString(params, filterFalsyAndUndefined) : params;
    const isPlain = typeCheck.isUndefined(forcePlain) ? router.isPlainPage() : forcePlain;
    if (!paramsStr) {
      return isPlain ? "?plain=1" : "";
    }
    return isPlain ? `?${paramsStr}&plain=1` : `?${paramsStr}`;
  };
  const getPathPart = (path) => typeCheck.isUndefined(path) ? "" : path.startsWith("/") ? path : `/${path}`;
  const getHashPart = (urlEndings, fragment) => typeCheck.isUndefined(fragment) ? (urlEndings || {}).fragment || "" : `#!/${fragment}`;
  const getLangPart = (useLang, language) => typeCheck.isUndefined(language) ? useLang ? `${getPageLanguage()}/` : "" : `${language}/`;
  const urls = ({
    urlKey,
    useLang,
    params,
    fragment,
    path,
    forcePlain,
    language,
    stripParams
  }) => {
    const urlEndings = configUrls[urlKey];
    const paramsPart = stripParams ? "" : getParamsPart(params, forcePlain);
    const pathPart = getPathPart(path);
    const hashPart = getHashPart(urlEndings, fragment);
    const langInPath = getLangPart(useLang, language);
    const pathname = `/${langInPath}${urlEndings.prod}${pathPart}${paramsPart}${hashPart}`;
    return {
      pathname,
      href: `${getClientOrigin(siteBaseUrl)}${pathname}`
    };
  };
  const hasUrlKey = (urlKey) => urlKey in configUrls;
  const getRelativeUrl = (options) => urls(options).pathname;
  const getPageBasePath = (options) => {
    const relativeUrl = getRelativeUrl(options);
    return relativeUrl.startsWith("/") ? relativeUrl.replace(/\//, "") : relativeUrl;
  };
  const getAbsoluteUrl = (options) => urls(options).href;
  return {
    hasUrlKey,
    getRelativeUrl,
    getPageBasePath,
    getAbsoluteUrl
  };
};
exports.createUrlGeneratorInstance = createUrlGeneratorInstance;
exports.default = createUrlGeneratorInstance;
