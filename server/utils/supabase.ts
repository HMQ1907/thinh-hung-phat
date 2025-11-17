import { createClient } from "@supabase/supabase-js";
import { DEFAULT_SCHEMA } from "~/utils/constants";

export const serverSupabaseClient = () => {
  const config = useRuntimeConfig();

  return createClient(
    config.public.supabaseUrl as string,
    config.public.supabaseKey as string,
    {
      db: {
        schema: DEFAULT_SCHEMA,
      },
    }
  );
};

export const serverSupabaseServiceClient = () => {
  const config = useRuntimeConfig();
  const client = createClient(
    config.public.supabaseUrl as string,
    config.supabaseSecretKey as string
  );
  return client;
};
