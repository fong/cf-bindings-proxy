import type { PropertyCall } from './proxy';
export type TransformDataType = 'buffer' | 'blob' | 'stream' | 'base64' | 'text' | 'json' | 'url' | 'request' | 'response';
export type TransformRawType = ArrayBuffer | Blob | string | NonNullable<object> | URL | Request | Response;
type ParseTransformFrom<T extends TransformDataType> = T extends 'buffer' ? Extract<TransformDataType, 'base64' | 'text' | 'json'> : T extends 'blob' | 'stream' ? Extract<TransformDataType, 'base64'> : T extends 'base64' ? Extract<TransformDataType, 'buffer' | 'blob' | 'stream'> : T extends 'text' ? Extract<TransformDataType, 'url' | 'request' | 'response'> : T extends 'url' | 'request' | 'response' ? Extract<TransformDataType, 'text'> : never;
export type TransformRule<From extends TransformDataType = TransformDataType, To extends ParseTransformFrom<From> = ParseTransformFrom<From>> = {
    from: From;
    to: To;
};
export type ParseType<T extends TransformDataType> = T extends 'buffer' ? ArrayBuffer : T extends 'blob' ? Blob : T extends 'stream' ? ReadableStream : T extends 'base64' | 'text' ? string : T extends 'json' ? NonNullable<object> : T extends 'url' ? URL : T extends 'request' ? Request : T extends 'response' ? Response : never;
export type Functions = 'arrayBuffer' | 'blob' | 'json' | 'text' | 'body';
export type FunctionInfo<DataTransformRule extends TransformRule | undefined = TransformRule | undefined, Data = DataTransformRule extends TransformRule ? ParseType<DataTransformRule['to']> : undefined> = ({
    data: Data;
    takeDataFrom?: never;
} | {
    data?: never;
    takeDataFrom: Functions;
}) & {
    transform?: DataTransformRule;
    asAccessor?: boolean;
};
/**
 * Transforms data from one format to another.
 *
 * @param data Data to transform.
 * @param transform Transform to apply.
 * @returns Transformed data.
 */
export declare const transformData: <From extends TransformDataType, To extends ParseTransformFrom<From>>(data: ParseType<From>, transform: TransformRule<From, To>) => Promise<ParseType<To>>;
/**
 * Prepares the argument's data to be sent over HTTP via the binding proxy.
 * This will transform any `ArrayBuffer` or `Blob` to `base64` and add the `transform` property.
 *
 * @param data The data to prepare.
 */
export declare const prepareDataForProxy: (rawData: PropertyCallArg['data'], fallback: PropertyCallArg) => Promise<PropertyCallArg>;
type PropertyCallArg = PropertyCall['args'][0];
export declare const transformFunctionInfo: <Fn extends FunctionInfo<TransformRule<TransformDataType, "buffer" | "blob" | "stream" | "base64" | "text" | "json" | "url" | "request" | "response"> | undefined, string | object | ArrayBuffer | Blob | ReadableStream<any> | URL | Request | Response | undefined>>({ data, takeDataFrom, transform }: Fn, fns: {
    blob?: FunctionInfo<TransformRule<TransformDataType, "buffer" | "blob" | "stream" | "base64" | "text" | "json" | "url" | "request" | "response"> | undefined, string | object | ArrayBuffer | Blob | ReadableStream<any> | URL | Request | Response | undefined> | undefined;
    text?: FunctionInfo<TransformRule<TransformDataType, "buffer" | "blob" | "stream" | "base64" | "text" | "json" | "url" | "request" | "response"> | undefined, string | object | ArrayBuffer | Blob | ReadableStream<any> | URL | Request | Response | undefined> | undefined;
    json?: FunctionInfo<TransformRule<TransformDataType, "buffer" | "blob" | "stream" | "base64" | "text" | "json" | "url" | "request" | "response"> | undefined, string | object | ArrayBuffer | Blob | ReadableStream<any> | URL | Request | Response | undefined> | undefined;
    arrayBuffer?: FunctionInfo<TransformRule<TransformDataType, "buffer" | "blob" | "stream" | "base64" | "text" | "json" | "url" | "request" | "response"> | undefined, string | object | ArrayBuffer | Blob | ReadableStream<any> | URL | Request | Response | undefined> | undefined;
    body?: FunctionInfo<TransformRule<TransformDataType, "buffer" | "blob" | "stream" | "base64" | "text" | "json" | "url" | "request" | "response"> | undefined, string | object | ArrayBuffer | Blob | ReadableStream<any> | URL | Request | Response | undefined> | undefined;
}) => Promise<TransformRawType | (() => TransformRawType | Promise<TransformRawType>)>;
export {};
//# sourceMappingURL=transform.d.ts.map