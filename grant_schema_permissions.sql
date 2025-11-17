-- Cấp quyền cho schema thinh_hung_phat
-- Chạy file này trong Supabase SQL Editor

-- 1. Cấp quyền USAGE trên schema cho các roles
GRANT USAGE ON SCHEMA thinh_hung_phat TO anon;
GRANT USAGE ON SCHEMA thinh_hung_phat TO authenticated;
GRANT USAGE ON SCHEMA thinh_hung_phat TO service_role;

-- 2. Cấp quyền trên tất cả các bảng hiện có trong schema
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA thinh_hung_phat TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA thinh_hung_phat TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA thinh_hung_phat TO service_role;

-- 3. Cấp quyền trên tất cả các sequences (cho auto-increment)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA thinh_hung_phat TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA thinh_hung_phat TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA thinh_hung_phat TO service_role;

-- 4. Cấp quyền mặc định cho các bảng/sequences mới tạo sau này
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA thinh_hung_phat 
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO anon, authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA thinh_hung_phat 
  GRANT ALL ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA thinh_hung_phat 
  GRANT USAGE, SELECT ON SEQUENCES TO anon, authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA thinh_hung_phat 
  GRANT ALL ON SEQUENCES TO service_role;

NOTIFY pgrst, 'reload schema';

