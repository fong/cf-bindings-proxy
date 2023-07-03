import { createBindingProxy } from './proxy';

/**
 * Interfaces with a binding from the environment.
 *
 * @example
 * ```ts
 * const value = await binding<KVNamespace>('MY_KV').get('key');
 * ```
 *
 * @param id Binding ID.
 * @returns Binding value.
 */
export const binding = <T>(id: string): T => {
	if (
		process.env.ENABLE_BINDINGS_PROXY ||
		(!process.env.DISABLE_BINDINGS_PROXY && process.env.NODE_ENV === 'development')
	) {
		return createBindingProxy<T>(id);
	}

	return process.env[id] as T;
};