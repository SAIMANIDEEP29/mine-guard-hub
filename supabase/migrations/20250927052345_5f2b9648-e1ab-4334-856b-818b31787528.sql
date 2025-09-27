-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('super_admin', 'mine_admin', 'planner', 'worker');

-- Create enum for risk levels
CREATE TYPE public.risk_level AS ENUM ('low', 'medium', 'high', 'critical');

-- Create enum for alert types  
CREATE TYPE public.alert_type AS ENUM ('rockfall', 'weather', 'equipment', 'blast', 'maintenance');

-- Create enum for blast stages
CREATE TYPE public.blast_stage AS ENUM ('before', 'after');

-- Create mines table
CREATE TABLE public.mines (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  coordinates POINT,
  description TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  mine_id UUID NOT NULL REFERENCES public.mines(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  department TEXT,
  position TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user roles table
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  mine_id UUID NOT NULL REFERENCES public.mines(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role, mine_id)
);

-- Create sectors table
CREATE TABLE public.sectors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mine_id UUID NOT NULL REFERENCES public.mines(id) ON DELETE CASCADE,
  sector_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  coordinates POINT,
  slope_angle DECIMAL,
  risk_level risk_level DEFAULT 'low',
  last_inspection TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(mine_id, sector_id)
);

-- Create blast images table
CREATE TABLE public.blast_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sector_id UUID NOT NULL REFERENCES public.sectors(id) ON DELETE CASCADE,
  mine_id UUID NOT NULL REFERENCES public.mines(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  stage blast_stage NOT NULL,
  blast_date DATE NOT NULL,
  blast_time TIME,
  metadata JSONB,
  uploaded_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create alerts table
CREATE TABLE public.alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mine_id UUID NOT NULL REFERENCES public.mines(id) ON DELETE CASCADE,
  sector_id UUID REFERENCES public.sectors(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  alert_type alert_type NOT NULL,
  risk_level risk_level NOT NULL,
  status TEXT DEFAULT 'active',
  metadata JSONB,
  acknowledged_by UUID REFERENCES auth.users(id),
  acknowledged_at TIMESTAMP WITH TIME ZONE,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notification preferences table
CREATE TABLE public.notification_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  email_enabled BOOLEAN DEFAULT true,
  sms_enabled BOOLEAN DEFAULT false,
  push_enabled BOOLEAN DEFAULT true,
  alert_types JSONB DEFAULT '{"rockfall": true, "weather": true, "equipment": true, "blast": true, "maintenance": false}'::jsonb,
  risk_levels JSONB DEFAULT '{"low": false, "medium": true, "high": true, "critical": true}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create analytics data table
CREATE TABLE public.analytics_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mine_id UUID NOT NULL REFERENCES public.mines(id) ON DELETE CASCADE,
  sector_id UUID REFERENCES public.sectors(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  rainfall DECIMAL,
  temperature DECIMAL,
  wind_speed DECIMAL,
  humidity DECIMAL,
  blast_count INTEGER DEFAULT 0,
  rockfall_count INTEGER DEFAULT 0,
  inspection_count INTEGER DEFAULT 0,
  risk_score DECIMAL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.mines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blast_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_data ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create function to get user's mine
CREATE OR REPLACE FUNCTION public.get_user_mine_id(_user_id UUID)
RETURNS UUID
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT mine_id
  FROM public.profiles
  WHERE user_id = _user_id
$$;

-- RLS Policies for mines table
CREATE POLICY "Users can view their mine" ON public.mines
FOR SELECT USING (
  id = public.get_user_mine_id(auth.uid())
);

CREATE POLICY "Mine admins can update their mine" ON public.mines
FOR UPDATE USING (
  id = public.get_user_mine_id(auth.uid()) AND
  public.has_role(auth.uid(), 'mine_admin')
);

-- RLS Policies for profiles table
CREATE POLICY "Users can view profiles from their mine" ON public.profiles
FOR SELECT USING (
  mine_id = public.get_user_mine_id(auth.uid())
);

CREATE POLICY "Users can update their own profile" ON public.profiles
FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own profile" ON public.profiles
FOR INSERT WITH CHECK (user_id = auth.uid());

-- RLS Policies for user_roles table
CREATE POLICY "Users can view roles from their mine" ON public.user_roles
FOR SELECT USING (
  mine_id = public.get_user_mine_id(auth.uid())
);

CREATE POLICY "Mine admins can manage roles" ON public.user_roles
FOR ALL USING (
  mine_id = public.get_user_mine_id(auth.uid()) AND
  public.has_role(auth.uid(), 'mine_admin')
);

-- RLS Policies for sectors table
CREATE POLICY "Users can view sectors from their mine" ON public.sectors
FOR SELECT USING (
  mine_id = public.get_user_mine_id(auth.uid())
);

CREATE POLICY "Planners and admins can manage sectors" ON public.sectors
FOR ALL USING (
  mine_id = public.get_user_mine_id(auth.uid()) AND
  (public.has_role(auth.uid(), 'planner') OR public.has_role(auth.uid(), 'mine_admin'))
);

-- RLS Policies for blast_images table
CREATE POLICY "Users can view blast images from their mine" ON public.blast_images
FOR SELECT USING (
  mine_id = public.get_user_mine_id(auth.uid())
);

CREATE POLICY "Users can upload blast images to their mine" ON public.blast_images
FOR INSERT WITH CHECK (
  mine_id = public.get_user_mine_id(auth.uid()) AND
  uploaded_by = auth.uid()
);

-- RLS Policies for alerts table
CREATE POLICY "Users can view alerts from their mine" ON public.alerts
FOR SELECT USING (
  mine_id = public.get_user_mine_id(auth.uid())
);

CREATE POLICY "Users can create alerts for their mine" ON public.alerts
FOR INSERT WITH CHECK (
  mine_id = public.get_user_mine_id(auth.uid()) AND
  created_by = auth.uid()
);

CREATE POLICY "Users can acknowledge alerts from their mine" ON public.alerts
FOR UPDATE USING (
  mine_id = public.get_user_mine_id(auth.uid())
);

-- RLS Policies for notification_preferences table
CREATE POLICY "Users can manage their own preferences" ON public.notification_preferences
FOR ALL USING (user_id = auth.uid());

-- RLS Policies for analytics_data table
CREATE POLICY "Users can view analytics from their mine" ON public.analytics_data
FOR SELECT USING (
  mine_id = public.get_user_mine_id(auth.uid())
);

CREATE POLICY "Planners and admins can manage analytics" ON public.analytics_data
FOR ALL USING (
  mine_id = public.get_user_mine_id(auth.uid()) AND
  (public.has_role(auth.uid(), 'planner') OR public.has_role(auth.uid(), 'mine_admin'))
);

-- Create storage buckets for image uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('blast-images', 'blast-images', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- Storage policies for blast images
CREATE POLICY "Users can view blast images from their mine" ON storage.objects
FOR SELECT USING (
  bucket_id = 'blast-images' AND
  EXISTS (
    SELECT 1 FROM public.blast_images bi
    WHERE bi.image_url = 'blast-images/' || name AND
    bi.mine_id = public.get_user_mine_id(auth.uid())
  )
);

CREATE POLICY "Users can upload blast images to their mine" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'blast-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Storage policies for avatars
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Create notification preferences for new user
  INSERT INTO public.notification_preferences (user_id)
  VALUES (new.id);
  RETURN new;
END;
$$;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_mines_updated_at BEFORE UPDATE ON public.mines FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_sectors_updated_at BEFORE UPDATE ON public.sectors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_alerts_updated_at BEFORE UPDATE ON public.alerts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_notification_preferences_updated_at BEFORE UPDATE ON public.notification_preferences FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for alerts and notifications
ALTER TABLE public.alerts REPLICA IDENTITY FULL;
ALTER TABLE public.notification_preferences REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.alerts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notification_preferences;