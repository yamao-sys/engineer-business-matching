import { baseConfig } from "../../packages/orval-config/orval.config.base.mjs";

const config = {
  businessSchemas: {
    input: {
      target: "./api-spec/tsp-output/schema/openapi.yaml",
    },
    output: {
      ...baseConfig.schemas.output,
      override: {
        ...baseConfig.schemas.output.override,
        mutator: {
          path: "../../packages/orval-config/custom-fetch.ts",
          name: "customFetch",
        },
        formData: {
          path: "../../packages/orval-config/custom-form-data.ts",
          name: "customFormData",
        },
      },
    },
    hooks: {
      ...baseConfig.schemas.hooks,
    },
  },
};

export default config;
