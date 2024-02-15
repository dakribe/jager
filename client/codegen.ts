import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: ["src/**/*.tsx"],
  ignoreNoDocuments: true,
  generates: {
    "./src/__generated__/": {
      plugins: ["typescript", "typescript-resolvers"],
      preset: "client-preset",
    },
  },
};

export default config;
