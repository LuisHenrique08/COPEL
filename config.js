const SUPABASE_URL = "https://mczanoaavydqxsrpcpaa.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_AkI-73x2DQoHGb_-sZw06Q_9WvWwcxT";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);