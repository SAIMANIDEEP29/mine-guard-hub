-- Add new enum values for app_role
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'master_admin';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'mine_manager';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'employee';