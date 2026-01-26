/// <reference path="../.astro/types.d.ts" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    [key: string]: string | undefined;
  }
}

interface ImportMetaEnv {
  [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
