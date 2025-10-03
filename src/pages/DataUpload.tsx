import { useState } from "react";
import { Upload, MapPin, Camera, CloudRain } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function DataUpload() {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    sectorId: "",
    notes: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const extractEXIF = async (file: File): Promise<any> => {
    // Placeholder for EXIF extraction logic
    // In production, use exif-js or similar library
    return {
      latitude: null,
      longitude: null,
      camera_altitude: null,
      capture_time: new Date().toISOString(),
      camera_make: "Unknown",
      camera_model: "Unknown",
    };
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select an image to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Extract EXIF data
      const exifData = await extractEXIF(file);

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('blast-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('blast-images')
        .getPublicUrl(fileName);

      // Insert upload record
      const { data: { user } } = await supabase.auth.getUser();
      const { data: profileData } = await supabase
        .from('profiles')
        .select('mine_id')
        .eq('user_id', user?.id)
        .single();

      const { error: insertError } = await supabase
        .from('uploads')
        .insert({
          mine_id: profileData?.mine_id,
          sector_id: formData.sectorId || null,
          uploaded_by: user?.id,
          image_url: publicUrl,
          original_filename: file.name,
          file_size_bytes: file.size,
          mime_type: file.type,
          notes: formData.notes,
          ...exifData,
        });

      if (insertError) throw insertError;

      toast({
        title: "Upload successful",
        description: "Image uploaded and metadata captured",
      });

      // Reset form
      setFile(null);
      setFormData({ sectorId: "", notes: "" });
      
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Data Upload</h1>
        <p className="text-muted-foreground">Upload images for rockfall risk analysis</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Image
            </CardTitle>
            <CardDescription>
              Select an image file. EXIF data will be automatically extracted.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image">Image File</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {file && (
                <p className="text-sm text-muted-foreground">
                  Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="sector">Sector</Label>
              <Select value={formData.sectorId} onValueChange={(value) => setFormData({ ...formData, sectorId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sector-1">Sector A</SelectItem>
                  <SelectItem value="sector-2">Sector B</SelectItem>
                  <SelectItem value="sector-3">Sector C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any relevant notes about this image..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <Button onClick={handleUpload} disabled={uploading || !file} className="w-full">
              {uploading ? "Uploading..." : "Upload Image"}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Auto-Detected Metadata
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">GPS Location</span>
                <span className="text-sm font-medium">Auto-detected from EXIF</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Capture Time</span>
                <span className="text-sm font-medium">Auto-detected from EXIF</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Camera Altitude</span>
                <span className="text-sm font-medium">Auto-detected from EXIF</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                AI Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Image Tags</span>
                <span className="text-sm font-medium">Auto-generated</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Crack Detection</span>
                <span className="text-sm font-medium">AI analysis</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudRain className="h-5 w-5" />
                Weather Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Weather conditions will be fetched automatically based on location and capture time
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
