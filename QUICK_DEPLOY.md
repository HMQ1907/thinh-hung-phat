# 🚀 Hướng dẫn Deploy nhanh lên Vercel

## ⚡ Quick Start (5 phút)

### 1. Chuẩn bị Supabase Keys

Vào [Supabase Dashboard](https://app.supabase.com) → Project → Settings → API:

- ✅ **Project URL** → Copy
- ✅ **anon public** key → Copy  
- ✅ **service_role** key → Copy (⚠️ Bảo mật!)

### 2. Deploy lên Vercel

#### Option A: Qua Dashboard (Dễ nhất)

1. Đăng nhập [vercel.com](https://vercel.com) với GitHub
2. Click **Add New** → **Project**
3. Import repository từ GitHub
4. **Thêm Environment Variables:**
   - Vào **Settings** → **Environment Variables**
   - Thêm 3 biến:
     ```
     SUPABASE_URL = https://xxx.supabase.co
     SUPABASE_KEY = eyJhbGc...
     SUPABASE_SECRET_KEY = eyJhbGc...
     ```
5. Click **Deploy** → Done! 🎉

#### Option B: Qua CLI

```bash
# 1. Cài Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Thêm env variables
vercel env add SUPABASE_URL
vercel env add SUPABASE_KEY  
vercel env add SUPABASE_SECRET_KEY

# 5. Deploy production
vercel --prod
```

### 3. Kiểm tra

- ✅ Website: `https://your-project.vercel.app`
- ✅ Admin: `https://your-project.vercel.app/admin/login`
- ✅ Upload ảnh test

## 📋 Checklist

- [ ] Đã tạo Storage bucket `THP_Images` trong Supabase
- [ ] Đã thêm 3 env variables vào Vercel
- [ ] Build thành công
- [ ] Website hoạt động
- [ ] Admin login được
- [ ] Upload ảnh được

## 🔧 Troubleshooting

**Build failed?**
→ Xem logs trong Vercel Dashboard → Deployments → Click vào deployment

**Env variable not found?**
→ Kiểm tra tên biến: `SUPABASE_URL`, `SUPABASE_KEY`, `SUPABASE_SECRET_KEY`

**Image upload failed?**
→ Kiểm tra bucket `THP_Images` đã tạo và public chưa

**RLS Policy error?**
→ Kiểm tra Supabase RLS policies cho các tables

## 📚 Xem thêm

Chi tiết đầy đủ: [DEPLOY.md](./DEPLOY.md)

