import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["production", "development", "test"] as const),
  SESSION_SECRET: z.string(),
  ENCRYPTION_SECRET: z.string(),
  RESEND_API_KEY: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof schema> {}
  }
}

export function InitEnvs() {
  const parsed = schema.safeParse(process.env);

  if (parsed.success === false) {
    console.error(
      "Invalid environment variables: ",
      parsed.error.flatten().fieldErrors,
    );
    throw new Error("Invalid environment variables.");
  }
}

export function getSharedEnvs() {
  return {};
}

type ENV = ReturnType<typeof getSharedEnvs>;

declare global {
  var ENV: ENV;
  interface window {
    ENV: ENV;
  }
}
