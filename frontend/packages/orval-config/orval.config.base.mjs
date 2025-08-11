export const baseConfig = {
  schemas: {
    output: {
      mode: "tags-split",
      client: "react-query",
      httpClient: "fetch",
      schemas: "./apis/model",
      clean: true,
      target: "./apis",
      override: {
        mutator: {
          path: "./custom-fetch.ts",
          name: "customFetch",
        },
        useDates: true,
      },
    },
    hooks: {
      afterAllFilesWrite: "prettier --write './apis/**/*.{ts,tsx}'",
    },
  },
};
