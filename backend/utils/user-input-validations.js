import zod from "zod";

export const signUpBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

export const signInBody = zod.object({
  username: zod.string().email(),
  password: zod.string()
});

export const dataUpdateBody = zod.object({
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});
