# Environment Variables cần thiết

## Danh sách Environment Variables

Thêm các biến sau vào Vercel Dashboard → Settings → Environment Variables:

### 1. SUPABASE_URL
```
Type: Production, Preview, Development
Value: https://your-project-id.supabase.co
```
**Lấy từ:** Supabase Dashboard → Settings → API → Project URL

### 2. SUPABASE_KEY
```
Type: Production, Preview, Development
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (anon public key)
```
**Lấy từ:** Supabase Dashboard → Settings → API → anon public key

### 3. SUPABASE_SECRET_KEY
```
Type: Production, Preview, Development
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (service_role key)
```
**Lấy từ:** Supabase Dashboard → Settings → API → service_role key
**⚠️ CẢNH BÁO:** Key này có quyền cao, không được public!

### 4. NODE_ENV (Optional)
```
Type: Production, Preview, Development
Value: production
```

## Cách thêm vào Vercel

1. Vào Vercel Dashboard → Project → Settings → Environment Variables
2. Click **Add New**
3. Nhập **Name** và **Value**
4. Chọn **Environment** (Production, Preview, Development)
5. Click **Save**
6. Redeploy project để áp dụng thay đổi

## Kiểm tra sau khi thêm

Sau khi thêm env variables, cần:
1. Vào **Deployments** tab
2. Click **Redeploy** trên deployment mới nhất
3. Hoặc push commit mới để trigger rebuild

