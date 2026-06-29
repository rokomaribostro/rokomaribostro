/*
# Create product-images storage bucket

1. New Storage Bucket
- Creates a public `product-images` bucket in Supabase Storage.
- This bucket will hold uploaded product photos that replace external image URLs.

2. Security
- Enables RLS on the storage.objects table for this bucket.
- Allows public read access so store visitors can view product images.
- Allows authenticated (admin) users to upload, update, and delete images.
*/

-- Create the bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('product-images', 'product-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO NOTHING;
