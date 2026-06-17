-- ══════════════════════════════════════════════
-- Coffee Crave — Seed Data
-- Run AFTER 001_schema.sql
-- ══════════════════════════════════════════════

INSERT INTO public.products (name, slug, description, base_price, image_url, origin, temp, flavor_notes, ingredients, tags, sort_order) VALUES
('Iced Latte', 'iced-latte', 'Ethiopian Arabica slow-pulled through velvet milk over a 12-hour cold steep. Structured sweetness, zero bitterness.', 6.50, '/drinks/iced-latte.webp', 'Ethiopia · Yirgacheffe', '3°C Serve', ARRAY['Caramel','Silk Milk','Citrus'], ARRAY['Ethiopian Arabica','Whole Milk','Filtered Ice','Raw Cane Sugar'], ARRAY['Iced Coffee','Signature'], 1),
('Vanilla Cold Brew', 'vanilla-cold-brew', 'Colombian single-origin steeped for 18 hours then infused with Madagascar vanilla.', 7.00, '/drinks/vanilla-cold-brew.webp', 'Colombia · Huila', '4°C Serve', ARRAY['Vanilla','Dark Chocolate','Walnut'], ARRAY['Colombian Beans','Madagascar Vanilla','Filtered Water','Organic Sugar'], ARRAY['Cold Brew','Iced Coffee'], 2),
('Caramel Latte', 'caramel-latte', 'Brazilian Cerrado pulled at 9-bar with house-made salted caramel. Creamy, bold, architecturally balanced.', 7.50, '/drinks/caramel-latte.webp', 'Brazil · Cerrado', '3°C Serve', ARRAY['Salted Caramel','Toffee','Cream'], ARRAY['Brazilian Beans','Salted Caramel','Steamed Milk','Vanilla Extract'], ARRAY['Iced Coffee','Signature'], 3),
('Classic Espresso', 'classic-espresso', 'Single-origin precision pulled. 25-second extraction at 93°C yields concentrated depth with a hazelnut finish.', 4.50, '/drinks/classic-espresso.webp', 'Guatemala · Antigua', '93°C Extract', ARRAY['Hazelnut','Dark Cocoa','Smoke'], ARRAY['Guatemalan Single-Origin','Filtered Water'], ARRAY['Espresso'], 4),
('Double Shot', 'double-shot', 'Two precisely timed pulls layered for maximum intensity. Bold without harshness.', 5.00, '/drinks/double-shot.webp', 'Kenya · Nyeri', '92°C Extract', ARRAY['Black Cherry','Molasses','Spice'], ARRAY['Kenyan AA Beans','Filtered Water'], ARRAY['Espresso'], 5),
('Flat White', 'flat-white', 'Velvet microfoam over a double ristretto. The ratio is engineered — not approximated.', 5.50, '/drinks/flat-white.webp', 'Costa Rica · Tarrazú', '65°C Serve', ARRAY['Honey','Almond','Silk'], ARRAY['Costa Rican Beans','Microfoam Milk','Filtered Water'], ARRAY['Espresso','Signature'], 6),
('Coffee Crave Special', 'cc-special', 'Our house creation — a layered experience of espresso, exotic spices, and vanilla cream.', 8.50, '/drinks/cc-special.webp', 'Multi-Origin Blend', '4°C Serve', ARRAY['Cardamom','Vanilla','Gold Shimmer'], ARRAY['House Blend','Cardamom','Vanilla Cream','Edible Gold'], ARRAY['Signature','Specials'], 7),
('Hazelnut Fusion', 'hazelnut-fusion', 'Toasted hazelnuts folded into a medium-roast cold brew. Nutty sweetness, zero artificial flavoring.', 7.50, '/drinks/hazelnut-fusion.webp', 'Peru · Cajamarca', '4°C Serve', ARRAY['Toasted Hazelnut','Butterscotch','Oak'], ARRAY['Peruvian Beans','Crushed Hazelnuts','Oat Milk','Raw Honey'], ARRAY['Signature','Cold Brew'], 8),
('Mocha Velvet', 'mocha-velvet', 'Belgian dark chocolate meets double espresso in a velvety marriage. Rich, indulgent, architecturally layered.', 8.00, '/drinks/mocha-velvet.webp', 'Ethiopia · Sidamo', '3°C Serve', ARRAY['Dark Chocolate','Raspberry','Velvet'], ARRAY['Ethiopian Beans','Belgian Chocolate','Steamed Milk','Cocoa Powder'], ARRAY['Signature','Specials'], 9);

-- Sizes for all products
INSERT INTO public.product_sizes (product_id, size, price_multiplier)
SELECT id, 'Small', 1.00 FROM public.products
UNION ALL
SELECT id, 'Medium', 1.30 FROM public.products
UNION ALL
SELECT id, 'Large', 1.60 FROM public.products;

-- Locations
INSERT INTO public.locations (city, address, hours, image_url, map_link, sort_order) VALUES
('Lucknow', 'Hazratganj Square, 14 Mahatma Gandhi Marg', 'Mon–Sat 8AM–10PM · Sun 9AM–8PM', '/locations/lucknow.webp', 'https://www.google.com/maps?q=Hazratganj+Lucknow', 1),
('New Delhi', 'Connaught Place, Block A, Regal Building', 'Mon–Fri 7AM–11PM · Sat–Sun 8AM–10PM', '/locations/delhi.webp', 'https://www.google.com/maps?q=Connaught+Place+New+Delhi', 2),
('Mumbai', 'Colaba Causeway, Kala Ghoda Arts District', 'Mon–Sun 7AM–11PM', '/locations/mumbai.webp', 'https://www.google.com/maps?q=Kala+Ghoda+Mumbai', 3),
('Dubai', 'DIFC Gate Avenue, Level 2, Tower 3', 'Sun–Thu 7AM–12AM · Fri–Sat 8AM–1AM', '/locations/dubai.webp', 'https://www.google.com/maps?q=DIFC+Gate+Avenue+Dubai', 4),
('London', 'Shoreditch High St, 42 Redchurch Street', 'Mon–Fri 7AM–7PM · Sat 8AM–6PM · Sun 9AM–5PM', '/locations/london.webp', 'https://www.google.com/maps?q=Redchurch+Street+Shoreditch+London', 5),
('Singapore', 'Tiong Bahru, 78 Guan Chuan Street', 'Mon–Sun 7:30AM–9PM', '/locations/singapore.webp', 'https://www.google.com/maps?q=Tiong+Bahru+Singapore', 6);
