/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CODESPACE_NAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
