import { createClient } from "@supabase/supabase-js";
import { DEFAULT_SCHEMA } from "~/utils/constants";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const supabase = createClient(
    config.public.supabaseUrl as string,
    config.public.supabaseKey as string,
    {
      db: {
        schema: DEFAULT_SCHEMA
      }
    }
  );

  return {
    provide: {
      supabase,
    },
  };
});
