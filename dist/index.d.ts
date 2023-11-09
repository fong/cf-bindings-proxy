import type { Cache } from '@cloudflare/workers-types';
/**
 * Whether the bindings proxy is enabled and currently active.
 *
 * The proxy is enabled by default in development mode, but can be disabled by setting
 * `DISABLE_BINDINGS_PROXY` to `true`.
 *
 * Alternatively, it can be enabled in other environments by setting `ENABLE_BINDINGS_PROXY` to
 * `true`.
 * */
export declare const isProxyEnabled: () => string | boolean;
/**
 * Interfaces with a binding from the environment.
 *
 * @example
 * ```ts
 * const value = await binding<KVNamespace>('MY_KV').get('key');
 * ```
 *
 * @example
 * By default, `process.env` is used in production, however, a custom fallback can be provided.
 * ```ts
 * const MY_KV = binding<KVNamespace>('MY_KV', { fallback: platform.env });
 * ```
 *
 * @param id Binding ID.
 * @param opts Binding options, such as a custom fallback.
 * @returns Binding value.
 */
export declare const binding: <T>(id: string, opts?: BindingOpts) => T;
type DeriveCacheReturnType<T> = T extends 'default' | undefined ? Cache : Promise<Cache>;
/**
 * Interfaces with the Cloudflare Cache API.
 *
 * By default, the `default` cache is used, however, a custom cache can be provided by passing a
 * cache name as the first argument.
 *
 * @example
 * ```ts
 * const value = await cacheApi().put(..., ...);
 * ```
 *
 * @example
 * ```ts
 * const value = await cacheApi('custom').put(..., ...);
 * ```
 *
 * @param cacheName Name of the cache to open, or `undefined` to open the default cache.
 * @returns Cache instance.
 */
export declare const cacheApi: <T extends string | undefined = undefined>(cacheName?: T | undefined) => DeriveCacheReturnType<T>;
type BindingOpts = {
    fallback: Record<string, unknown>;
};
export {};
//# sourceMappingURL=index.d.ts.map