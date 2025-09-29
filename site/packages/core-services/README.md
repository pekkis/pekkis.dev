# @veikkaus/url-generator

A type-safe URL generation library for Veikkaus applications. This readme was halluzinated by claude-4.

## Purpose

Provides a factory-based URL generator that creates properly formatted URLs based on configuration. Supports language prefixes, query parameters, fragments, and both relative and absolute URL generation.

## Quick Start

```typescript
import {createUrlGeneratorInstance, type ConfigUrls} from '@veikkaus/url-generator'
import {getClientOrigin} from '@veikkaus/utils/url'
import {site} from '@veikkaus/site-config/sites/veikkaus'
import {getPageLanguage} from 'common/lang/setup'

// Define your URL configuration
const configUrls = {
  lotto: {prod: 'lotto'},
  eurojackpot: {prod: 'eurojackpot', fragment: '#!/draw-results'}
  // ... other URL configs
} satisfies ConfigUrls

// Create the instance
const urlGenerator = createUrlGeneratorInstance({
  configUrls,
  getPageLanguage,
  getClientOrigin,
  siteBaseUrl: site.baseUrl
})

// Use the generator
const relativeUrl = urlGenerator.getRelativeUrl({urlKey: 'lotto'})
// Result: '/fi/lotto'

const absoluteUrl = urlGenerator.getAbsoluteUrl({
  urlKey: 'lotto',
  useLang: true,
  params: {drawId: '123'}
})
// Result: 'https://veikkaus.fi/fi/lotto?drawId=123'
```

## API

### createUrlGeneratorInstance<TConfigUrls>(dependencies)

Creates a new URL generator instance with type-safe URL key validation.

**Dependencies:**

- `configUrls: TConfigUrls` - URL configuration object
- `getPageLanguage: () => PageLanguage` - Function to get current page language
- `getClientOrigin: (baseUrl: string) => string` - Function to get client origin
- `siteBaseUrl: string` - Base URL for the site

**Returns:** `UrlGeneratorInstance<TConfigUrls>`

### Instance Methods

- `hasUrlKey(urlKey: string): boolean` - Check if URL key exists in config
- `getRelativeUrl(options): string` - Generate relative URL
- `getPageBasePath(options): string` - Generate page base path (without leading slash)
- `getAbsoluteUrl(options): string` - Generate absolute URL

### URL Options

```typescript
type UrlOptions<TConfigUrls> = {
  urlKey: keyof TConfigUrls // URL key from config (type-safe)
  useLang?: boolean // Add language prefix to URL
  params?: Record<string, string | undefined> | string // Query parameters
  fragment?: string // Hash fragment
  path?: string // Additional path segment
  forcePlain?: boolean // Force plain mode parameter
  language?: PageLanguage // Override language
  stripParams?: boolean // Remove all parameters
}
```

## Features

- **Type Safety**: Generic configuration ensures URL keys are validated at compile time
- **Dependency Injection**: All external dependencies are injected, making the package testable
- **No Side Effects**: Pure functions with no global state or side effects on import
- **Language Support**: Built-in support for Finnish/Swedish language prefixes
- **Flexible Parameters**: Support for query parameters, fragments, and path segments
