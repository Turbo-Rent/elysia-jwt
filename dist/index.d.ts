import { Elysia } from 'elysia';
import { type JWTPayload, type JWSHeaderParameters, type CryptoKey, type JWK, type KeyObject } from 'jose';
import type { Static, TSchema } from '@sinclair/typebox';
type UnwrapSchema<Schema extends TSchema | undefined, Fallback = unknown> = Schema extends TSchema ? Static<NonNullable<Schema>> : Fallback;
export interface JWTPayloadSpec {
    iss?: string;
    sub?: string;
    aud?: string | string[];
    jti?: string;
    nbf?: number;
    exp?: number | string;
    iat?: number;
}
export interface JWTOption<Name extends string | undefined = 'jwt', Schema extends TSchema | undefined = undefined> extends JWSHeaderParameters, Omit<JWTPayload, 'nbf' | 'exp'> {
    /**
     * Name to decorate method as
     *
     * ---
     * @example
     * For example, `jwt` will decorate Context with `Context.jwt`
     *
     * ```typescript
     * app
     *     .decorate({
     *         name: 'myJWTNamespace',
     *         secret: process.env.JWT_SECRETS
     *     })
     *     .get('/sign/:name', ({ myJWTNamespace, params }) => {
     *         return myJWTNamespace.sign(params)
     *     })
     * ```
     */
    name?: Name;
    /**
     * JWT Secret
     */
    secret: string | Uint8Array | CryptoKey | JWK | KeyObject;
    /**
     * Type strict validation for JWT payload
     */
    schema?: Schema;
    /**
     * JWT Not Before
     *
     * @see [RFC7519#section-4.1.5](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.5)
     */
    nbf?: string | number;
    /**
     * JWT Expiration Time
     *
     * @see [RFC7519#section-4.1.4](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.4)
     */
    exp?: string | number;
}
export declare const jwt: <const Name extends string = "jwt", const Schema extends TSchema | undefined = undefined>({ name, secret, alg, crit, schema, nbf, exp, ...payload }: JWTOption<Name, Schema>) => Elysia<"", {
    decorator: { [name in Name extends string ? Name : "jwt"]: {
        sign(morePayload: UnwrapSchema<Schema, Record<string, string | number>> & Omit<JWTPayloadSpec, "exp" | "nbf"> & {
            exp?: string | number;
            nbf?: string | number;
        }): Promise<string>;
        verify(jwt?: string): Promise<(UnwrapSchema<Schema, Record<string, string | number>> & JWTPayloadSpec) | false>;
    }; } extends infer T ? { [K in keyof T]: { [name in Name extends string ? Name : "jwt"]: {
        sign(morePayload: UnwrapSchema<Schema, Record<string, string | number>> & Omit<JWTPayloadSpec, "exp" | "nbf"> & {
            exp?: string | number;
            nbf?: string | number;
        }): Promise<string>;
        verify(jwt?: string): Promise<(UnwrapSchema<Schema, Record<string, string | number>> & JWTPayloadSpec) | false>;
    }; }[K]; } : never;
    store: {};
    derive: {};
    resolve: {};
}, {
    typebox: {};
    error: {};
}, {
    schema: {};
    standaloneSchema: {};
    macro: {};
    macroFn: {};
    parser: {};
}, {}, {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
}, {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
}>;
export default jwt;
