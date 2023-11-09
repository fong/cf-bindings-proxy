import type { FunctionInfo, Functions, ParseType, TransformRule } from './transform';
export type BindingResponse = {
    success: false;
    data: string;
    transform?: never;
    functions?: never;
} | {
    success: true;
    data: unknown;
    transform?: TransformRule;
    functions: {
        [key in Functions]?: FunctionInfo;
    };
};
export type PropertyCall<Transform extends TransformRule | undefined = TransformRule | undefined> = {
    prop: string;
    args: {
        data: (Transform extends TransformRule ? ParseType<Transform['from']> : unknown) | BindingRequest[];
        transform?: Transform;
    }[];
};
export type ProxyType = 'binding' | 'caches';
export type BindingRequest = {
    __original_call?: BindingRequest;
    __proxyType: ProxyType;
    __bindingId: string;
    __calls: PropertyCall[];
    __chainUntil: string[];
};
type CreateBindingOpts = {
    notChainable?: boolean;
    proxyType?: ProxyType;
};
/**
 * Creates a proxy object for the binding.
 *
 * @param bindingId Binding ID.
 * @param notChainable Whether or not the proxy should be chainable.
 * @returns A proxy object.
 */
export declare const createBindingProxy: <T>(bindingId: string, { notChainable, proxyType }?: CreateBindingOpts) => T;
export {};
//# sourceMappingURL=proxy.d.ts.map