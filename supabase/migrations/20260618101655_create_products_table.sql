CREATE TABLE products (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text        NOT NULL,
  name_bn       text        NOT NULL,
  price         numeric(10,2) NOT NULL,
  original_price numeric(10,2),
  image_url     text        NOT NULL DEFAULT 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600',
  category      text        NOT NULL CHECK (category IN ('womens-clothing','mens-clothing','jewelry','accessories')),
  description   text        NOT NULL DEFAULT '',
  description_bn text       NOT NULL DEFAULT '',
  sizes         text[]      NOT NULL DEFAULT '{}',
  colors        text[]      NOT NULL DEFAULT '{}',
  badge         text,
  badge_bn      text,
  active        boolean     NOT NULL DEFAULT true,
  sort_order    integer     NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Storefront: anyone can read active products
CREATE POLICY "select_active_products" ON products
  FOR SELECT TO anon
  USING (active = true);

-- Admin (authenticated): full CRUD
CREATE POLICY "admin_select_products" ON products
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "admin_insert_products" ON products
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "admin_update_products" ON products
  FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "admin_delete_products" ON products
  FOR DELETE TO authenticated
  USING (true);

-- Seed with placeholder products
INSERT INTO products (name, name_bn, price, original_price, image_url, category, description, description_bn, sizes, colors, badge, badge_bn, sort_order) VALUES
('Floral Embroidered Kameez','ফ্লোরাল এমব্রয়ডারি কামিজ',1200,1500,'https://images.pexels.com/photos/2220329/pexels-photo-2220329.jpeg?auto=compress&cs=tinysrgb&w=600','womens-clothing','Elegant floral embroidered kameez, perfect for casual and semi-formal occasions.','সুন্দর ফ্লোরাল এমব্রয়ডারি কামিজ, ক্যাজুয়াল ও সেমি-ফর্মাল অনুষ্ঠানের জন্য উপযুক্ত।',ARRAY['S','M','L','XL','XXL'],ARRAY['Beige','White','Pink'],'Sale','সেল',1),
('Silk Georgette Saree','সিল্ক জর্জেট শাড়ি',2500,NULL,'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600','womens-clothing','Luxurious silk georgette saree with intricate border work.','সুন্দর বর্ডার ওয়ার্ক সহ লাক্সারি সিল্ক জর্জেট শাড়ি।',ARRAY[]::text[],ARRAY['Maroon','Navy','Beige'],'New','নতুন',2),
('Printed Cotton Kurti','প্রিন্টেড কটন কুর্তি',650,850,'https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg?auto=compress&cs=tinysrgb&w=600','womens-clothing','Breathable printed cotton kurti, ideal for everyday comfort and style.','আরামদায়ক প্রিন্টেড কটন কুর্তি, প্রতিদিনের ব্যবহারের জন্য আদর্শ।',ARRAY['S','M','L','XL'],ARRAY['Blue','Green','Brown'],'Sale','সেল',3),
('Linen Palazzo Set','লিনেন পালাজো সেট',1800,NULL,'https://images.pexels.com/photos/6311600/pexels-photo-6311600.jpeg?auto=compress&cs=tinysrgb&w=600','womens-clothing','Comfortable and stylish linen palazzo set. Perfect for summer wear.','আরামদায়ক ও স্টাইলিশ লিনেন পালাজো সেট। গ্রীষ্মের জন্য পারফেক্ট।',ARRAY['S','M','L','XL','XXL'],ARRAY['Cream','Dusty Rose','Olive'],'Trending','ট্রেন্ডিং',4),
('Embellished Party Gown','এমবেলিশড পার্টি গাউন',3500,4200,'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600','womens-clothing','Stunning embellished party gown for special occasions.','বিশেষ অনুষ্ঠানের জন্য অসাধারণ পার্টি গাউন।',ARRAY['S','M','L','XL'],ARRAY['Gold','Silver','Black'],'Premium','প্রিমিয়াম',5),
('Casual Maxi Dress','ক্যাজুয়াল ম্যাক্সি ড্রেস',950,NULL,'https://images.pexels.com/photos/2220327/pexels-photo-2220327.jpeg?auto=compress&cs=tinysrgb&w=600','womens-clothing','Flowy and comfortable maxi dress perfect for casual outings.','ক্যাজুয়াল আউটিংয়ের জন্য আরামদায়ক ম্যাক্সি ড্রেস।',ARRAY['S','M','L','XL'],ARRAY['White','Beige','Floral'],'New','নতুন',6),
('Classic Panjabi','ক্লাসিক পাঞ্জাবি',1100,1400,'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600','mens-clothing','Elegant classic panjabi for Eid and festive occasions.','ঈদ ও উৎসবের জন্য কমনীয় ক্লাসিক পাঞ্জাবি।',ARRAY['S','M','L','XL','XXL'],ARRAY['White','Cream','Light Blue'],'Eid Special','ঈদ স্পেশাল',7),
('Casual Cotton Shirt','ক্যাজুয়াল কটন শার্ট',750,NULL,'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=600','mens-clothing','Comfortable casual cotton shirt for everyday wear.','প্রতিদিনের ব্যবহারের জন্য আরামদায়ক কটন শার্ট।',ARRAY['S','M','L','XL','XXL'],ARRAY['Blue','White','Grey'],NULL,NULL,8),
('Formal Slim Fit Suit','ফর্মাল স্লিম ফিট স্যুট',4500,5500,'https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?auto=compress&cs=tinysrgb&w=600','mens-clothing','Sharp formal slim fit suit for professional occasions.','পেশাদার অনুষ্ঠানের জন্য ফর্মাল স্লিম ফিট স্যুট।',ARRAY['S','M','L','XL'],ARRAY['Navy','Charcoal','Black'],'Premium','প্রিমিয়াম',9),
('Gold Plated Necklace Set','গোল্ড প্লেটেড নেকলেস সেট',850,1100,'https://images.pexels.com/photos/1616096/pexels-photo-1616096.jpeg?auto=compress&cs=tinysrgb&w=600','jewelry','Elegant gold plated necklace set with matching earrings.','ম্যাচিং কানের দুল সহ কমনীয় গোল্ড প্লেটেড নেকলেস সেট।',ARRAY[]::text[],ARRAY[]::text[],'Sale','সেল',10),
('Floral Pearl Earrings','ফ্লোরাল পার্ল কানের দুল',320,NULL,'https://images.pexels.com/photos/1395306/pexels-photo-1395306.jpeg?auto=compress&cs=tinysrgb&w=600','jewelry','Delicate floral pearl drop earrings for a feminine touch.','নারীসুলভ স্পর্শের জন্য সূক্ষ্ম ফ্লোরাল পার্ল ড্রপ কানের দুল।',ARRAY[]::text[],ARRAY[]::text[],'New','নতুন',11),
('Bridal Choker Set','ব্রাইডাল চোকার সেট',2200,NULL,'https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg?auto=compress&cs=tinysrgb&w=600','jewelry','Stunning bridal choker set with maangtika and earrings.','মাঙটিকা ও কানের দুল সহ অসাধারণ ব্রাইডাল চোকার সেট।',ARRAY[]::text[],ARRAY[]::text[],'Bridal','ব্রাইডাল',12),
('Floral Hair Clip Set','ফ্লোরাল হেয়ার ক্লিপ সেট',180,250,'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600','accessories','Set of 4 floral hair clips in assorted colors.','বিভিন্ন রঙে ৪টি ফ্লোরাল হেয়ার ক্লিপের সেট।',ARRAY[]::text[],ARRAY[]::text[],'Sale','সেল',13),
('Structured Shoulder Bag','স্ট্রাকচারড শোল্ডার ব্যাগ',1400,NULL,'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600','accessories','Elegant structured shoulder bag in premium faux leather.','প্রিমিয়াম ফক্স লেদারে কমনীয় স্ট্রাকচারড শোল্ডার ব্যাগ।',ARRAY[]::text[],ARRAY['Brown','Black','Beige'],'Trending','ট্রেন্ডিং',14),
('Boho Side Sling Bag','বোহো সাইড স্লিং ব্যাগ',950,1200,'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600','accessories','Trendy boho style side sling bag with tassel details.','ট্যাসেল ডিটেইলস সহ ট্রেন্ডি বোহো স্টাইল সাইড স্লিং ব্যাগ।',ARRAY[]::text[],ARRAY['Tan','Brown','Olive'],'Sale','সেল',15);
