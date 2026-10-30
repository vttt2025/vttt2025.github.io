# Supabase-only setup

The active static site now uses Supabase for authentication, content, profiles,
orders, and admin authorization. Firebase and the separate Payload prototype are
not loaded by the deployed site.

## Required Supabase dashboard steps

1. Run `supabase-schema.sql` for a new project, then run
   `supabase-only-migration.sql`. For an existing project, run only the additive
   migration after taking a database backup.
2. In Authentication → Providers, enable Email and Google as needed.
3. In Authentication → URL Configuration:
   - Set Site URL to `https://rusitrki.com`.
   - Add `https://rusitrki.com/**` to Redirect URLs.
   - Add the exact active Figma preview origin followed by `/**`, for example
     `https://app-g6oifbo2lcwsmkqdea3peximmp5xi53ngc6vowi5lpfkvknjxbdq.makeproxy-c.figma.site/**`.
   Supabase falls back to Site URL when the requested callback is not in this
   list; leaving Site URL as localhost redirects OAuth sessions to
   `http://localhost:3000`.
4. After the first account signs in, grant the intended administrator:

   ```sql
   update public.profiles
   set role = 'super_admin'
   where email = 'YOUR_ADMIN_EMAIL';
   ```

5. Admins approve PRO purchases by changing an `orders.status` value from
   `pending` to `paid`. The database trigger activates the corresponding
   profile and calculates its expiry from `packages.duration_days`.

## Previous secret request

The earlier Payload/Firebase server secret request is no longer used by the
active application. Do not add those values for this Supabase-only setup.
