import { Elysia } from 'elysia';
import { type JWTPayload, type JWSHeaderParameters, type KeyLike } from 'jose';
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
    name?: Name;
    secret: string | Uint8Array | KeyLike;
    schema?: Schema;
    nbf?: string | number;
    exp?: string | number;
}
export declare const jwt: <Name extends string = "jwt", Schema extends TSchema | undefined = undefined>({ name, secret, alg, crit, schema, nbf, exp, ...payload }: JWTOption<Name, Schema>) => Elysia<"", {
    store: {};
    error: {};
    request: Record<Name extends string ? Name : "jwt", {
        readonly sign: (morePayload: UnwrapSchema<Schema, Record<string, string>> & JWTPayloadSpec) => Promise<string>;
        readonly verify: (jwt?: string) => Promise<false | (UnwrapSchema<Schema, Record<string, string>> & JWTPayloadSpec)>;
    }> extends infer T extends Object ? { [key in keyof T]: Record<Name extends string ? Name : "jwt", {
        readonly sign: (morePayload: UnwrapSchema<Schema, Record<string, string>> & JWTPayloadSpec) => Promise<string>;
        readonly verify: (jwt?: string) => Promise<false | (UnwrapSchema<Schema, Record<string, string>> & JWTPayloadSpec)>;
    }>[key]; } : never;
    schema: {};
    meta: {
        schema: {};
        defs: {};
        exposed: {};
    };
}>;
export default jwt;
