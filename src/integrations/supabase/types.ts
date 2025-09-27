export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          acknowledged_at: string | null
          acknowledged_by: string | null
          alert_type: Database["public"]["Enums"]["alert_type"]
          created_at: string
          created_by: string
          description: string | null
          id: string
          metadata: Json | null
          mine_id: string
          risk_level: Database["public"]["Enums"]["risk_level"]
          sector_id: string | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_type: Database["public"]["Enums"]["alert_type"]
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          metadata?: Json | null
          mine_id: string
          risk_level: Database["public"]["Enums"]["risk_level"]
          sector_id?: string | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_type?: Database["public"]["Enums"]["alert_type"]
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          mine_id?: string
          risk_level?: Database["public"]["Enums"]["risk_level"]
          sector_id?: string | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_mine_id_fkey"
            columns: ["mine_id"]
            isOneToOne: false
            referencedRelation: "mines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alerts_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "sectors"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_data: {
        Row: {
          blast_count: number | null
          created_at: string
          date: string
          humidity: number | null
          id: string
          inspection_count: number | null
          metadata: Json | null
          mine_id: string
          rainfall: number | null
          risk_score: number | null
          rockfall_count: number | null
          sector_id: string | null
          temperature: number | null
          wind_speed: number | null
        }
        Insert: {
          blast_count?: number | null
          created_at?: string
          date: string
          humidity?: number | null
          id?: string
          inspection_count?: number | null
          metadata?: Json | null
          mine_id: string
          rainfall?: number | null
          risk_score?: number | null
          rockfall_count?: number | null
          sector_id?: string | null
          temperature?: number | null
          wind_speed?: number | null
        }
        Update: {
          blast_count?: number | null
          created_at?: string
          date?: string
          humidity?: number | null
          id?: string
          inspection_count?: number | null
          metadata?: Json | null
          mine_id?: string
          rainfall?: number | null
          risk_score?: number | null
          rockfall_count?: number | null
          sector_id?: string | null
          temperature?: number | null
          wind_speed?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_data_mine_id_fkey"
            columns: ["mine_id"]
            isOneToOne: false
            referencedRelation: "mines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_data_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "sectors"
            referencedColumns: ["id"]
          },
        ]
      }
      blast_images: {
        Row: {
          blast_date: string
          blast_time: string | null
          created_at: string
          id: string
          image_url: string
          metadata: Json | null
          mine_id: string
          sector_id: string
          stage: Database["public"]["Enums"]["blast_stage"]
          uploaded_by: string
        }
        Insert: {
          blast_date: string
          blast_time?: string | null
          created_at?: string
          id?: string
          image_url: string
          metadata?: Json | null
          mine_id: string
          sector_id: string
          stage: Database["public"]["Enums"]["blast_stage"]
          uploaded_by: string
        }
        Update: {
          blast_date?: string
          blast_time?: string | null
          created_at?: string
          id?: string
          image_url?: string
          metadata?: Json | null
          mine_id?: string
          sector_id?: string
          stage?: Database["public"]["Enums"]["blast_stage"]
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "blast_images_mine_id_fkey"
            columns: ["mine_id"]
            isOneToOne: false
            referencedRelation: "mines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blast_images_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "sectors"
            referencedColumns: ["id"]
          },
        ]
      }
      mines: {
        Row: {
          coordinates: unknown | null
          created_at: string
          description: string | null
          id: string
          location: string
          name: string
          status: string | null
          updated_at: string
        }
        Insert: {
          coordinates?: unknown | null
          created_at?: string
          description?: string | null
          id?: string
          location: string
          name: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          coordinates?: unknown | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string
          name?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          alert_types: Json | null
          created_at: string
          email_enabled: boolean | null
          id: string
          push_enabled: boolean | null
          risk_levels: Json | null
          sms_enabled: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          alert_types?: Json | null
          created_at?: string
          email_enabled?: boolean | null
          id?: string
          push_enabled?: boolean | null
          risk_levels?: Json | null
          sms_enabled?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          alert_types?: Json | null
          created_at?: string
          email_enabled?: boolean | null
          id?: string
          push_enabled?: boolean | null
          risk_levels?: Json | null
          sms_enabled?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          department: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          mine_id: string
          phone: string | null
          position: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          mine_id: string
          phone?: string | null
          position?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          mine_id?: string
          phone?: string | null
          position?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_mine_id_fkey"
            columns: ["mine_id"]
            isOneToOne: false
            referencedRelation: "mines"
            referencedColumns: ["id"]
          },
        ]
      }
      sectors: {
        Row: {
          coordinates: unknown | null
          created_at: string
          description: string | null
          id: string
          last_inspection: string | null
          mine_id: string
          name: string
          risk_level: Database["public"]["Enums"]["risk_level"] | null
          sector_id: string
          slope_angle: number | null
          updated_at: string
        }
        Insert: {
          coordinates?: unknown | null
          created_at?: string
          description?: string | null
          id?: string
          last_inspection?: string | null
          mine_id: string
          name: string
          risk_level?: Database["public"]["Enums"]["risk_level"] | null
          sector_id: string
          slope_angle?: number | null
          updated_at?: string
        }
        Update: {
          coordinates?: unknown | null
          created_at?: string
          description?: string | null
          id?: string
          last_inspection?: string | null
          mine_id?: string
          name?: string
          risk_level?: Database["public"]["Enums"]["risk_level"] | null
          sector_id?: string
          slope_angle?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sectors_mine_id_fkey"
            columns: ["mine_id"]
            isOneToOne: false
            referencedRelation: "mines"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          mine_id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          mine_id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          mine_id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_mine_id_fkey"
            columns: ["mine_id"]
            isOneToOne: false
            referencedRelation: "mines"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_mine_id: {
        Args: { _user_id: string }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      alert_type: "rockfall" | "weather" | "equipment" | "blast" | "maintenance"
      app_role: "super_admin" | "mine_admin" | "planner" | "worker"
      blast_stage: "before" | "after"
      risk_level: "low" | "medium" | "high" | "critical"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      alert_type: ["rockfall", "weather", "equipment", "blast", "maintenance"],
      app_role: ["super_admin", "mine_admin", "planner", "worker"],
      blast_stage: ["before", "after"],
      risk_level: ["low", "medium", "high", "critical"],
    },
  },
} as const
