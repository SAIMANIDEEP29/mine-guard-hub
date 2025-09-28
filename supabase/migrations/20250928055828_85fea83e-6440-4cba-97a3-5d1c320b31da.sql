-- Insert sample mines
INSERT INTO public.mines (id, name, location, description, status) VALUES
('11111111-1111-1111-1111-111111111111', 'Rockfall Mining Co.', 'Colorado, USA', 'Large open-pit copper mine with multiple active sectors', 'active'),
('22222222-2222-2222-2222-222222222222', 'Mountain Peak Mine', 'Nevada, USA', 'Underground gold mine with complex tunnel systems', 'active'),
('33333333-3333-3333-3333-333333333333', 'Desert Valley Operations', 'Arizona, USA', 'Iron ore extraction facility with automated systems', 'active');

-- Insert sample sectors for the mines
INSERT INTO public.sectors (name, sector_id, mine_id, description, risk_level, slope_angle) VALUES
('North Face A', 'NF-A-001', '11111111-1111-1111-1111-111111111111', 'Primary extraction zone with steep slopes', 'high', 65.5),
('South Pit B', 'SP-B-002', '11111111-1111-1111-1111-111111111111', 'Secondary pit area with moderate risk', 'medium', 45.0),
('East Wall C', 'EW-C-003', '11111111-1111-1111-1111-111111111111', 'Eastern wall section requiring monitoring', 'low', 30.0),
('Main Tunnel', 'MT-001', '22222222-2222-2222-2222-222222222222', 'Primary access tunnel to gold deposits', 'medium', 15.0),
('Upper Shaft', 'US-002', '22222222-2222-2222-2222-222222222222', 'Upper level extraction point', 'high', 80.0),
('Processing Area', 'PA-001', '33333333-3333-3333-3333-333333333333', 'Ore processing and staging area', 'low', 10.0);

-- Insert sample analytics data
INSERT INTO public.analytics_data (mine_id, date, risk_score, rockfall_count, blast_count, inspection_count, temperature, humidity, wind_speed, rainfall) VALUES
('11111111-1111-1111-1111-111111111111', CURRENT_DATE - INTERVAL '30 days', 7.2, 3, 2, 5, 22.5, 45.2, 12.3, 0.0),
('11111111-1111-1111-1111-111111111111', CURRENT_DATE - INTERVAL '29 days', 6.8, 1, 1, 4, 24.1, 42.8, 8.7, 0.0),
('11111111-1111-1111-1111-111111111111', CURRENT_DATE - INTERVAL '28 days', 8.1, 5, 3, 6, 21.9, 48.5, 15.2, 2.3),
('22222222-2222-2222-2222-222222222222', CURRENT_DATE - INTERVAL '30 days', 5.5, 2, 0, 3, 18.2, 55.1, 6.4, 1.2),
('22222222-2222-2222-2222-222222222222', CURRENT_DATE - INTERVAL '29 days', 6.2, 1, 1, 4, 19.8, 52.3, 7.8, 0.0),
('33333333-3333-3333-3333-333333333333', CURRENT_DATE - INTERVAL '30 days', 4.1, 0, 1, 2, 28.5, 35.2, 18.9, 0.0);