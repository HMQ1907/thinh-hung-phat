# Hướng dẫn Deploy lên Vercel

## Bước 1: Chuẩn bị

### 1.1. Lấy thông tin từ Supabase

1. Đăng nhập vào [Supabase Dashboard](https://app.supabase.com)
2. Chọn project của bạn
3. Vào **Settings** → **API**
4. Copy các giá trị sau:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** key → `SUPABASE_KEY`
   - **service_role** key → `SUPABASE_SECRET_KEY` (⚠️ BẢO MẬT - không share)

### 1.2. Tạo Storage Bucket (nếu chưa có)

1. Vào **Storage** trong Supabase Dashboard
2. Tạo bucket mới tên `THP_Images`
3. Set **Public bucket** = `true` (để có thể truy cập public URL)
4. Tạo policy cho public read (nếu cần)

## Bước 2: Deploy lên Vercel

### Cách 1: Deploy qua Vercel Dashboard (Khuyến nghị)

1. **Đăng nhập Vercel:**
   - Truy cập [vercel.com](https://vercel.com)
   - Đăng nhập bằng GitHub/GitLab/Bitbucket

2. **Import Project:**
   - Click **Add New** → **Project**
   - Chọn repository từ GitHub/GitLab
   - Hoặc push code lên Git trước

3. **Cấu hình Build:**
   - **Framework Preset:** Nuxt.js (tự động detect)
   - **Root Directory:** `./` (mặc định)
   - **Build Command:** `npm run build` (mặc định)
   - **Output Directory:** `.output` (mặc định)
   - **Install Command:** `npm install` (mặc định)

4. **Thêm Environment Variables:**
   - Trong phần **Environment Variables**, thêm các biến sau:

   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-anon-key-here
   SUPABASE_SECRET_KEY=your-service-role-key-here
   NODE_ENV=production
   ```

5. **Deploy:**
   - Click **Deploy**
   - Đợi build hoàn tất (3-5 phút)

### Cách 2: Deploy qua Vercel CLI

1. **Cài đặt Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   
   - Lần đầu sẽ hỏi các câu hỏi:
     - **Set up and deploy?** → Yes
     - **Which scope?** → Chọn account
     - **Link to existing project?** → No (lần đầu)
     - **Project name?** → Nhập tên hoặc Enter
     - **Directory?** → `./` (Enter)
     - **Override settings?** → No

4. **Thêm Environment Variables:**
   ```bash
   vercel env add SUPABASE_URL
   vercel env add SUPABASE_KEY
   vercel env add SUPABASE_SECRET_KEY
   vercel env add NODE_ENV
   ```
   
   Nhập giá trị cho từng biến khi được hỏi.

5. **Deploy Production:**
   ```bash
   vercel --prod
   ```

## Bước 3: Kiểm tra sau khi deploy

1. **Kiểm tra website:**
   - Truy cập URL được Vercel cung cấp
   - Test các trang: home, products, projects, blog, contact

2. **Kiểm tra Admin Panel:**
   - Truy cập `/admin/login`
   - Đăng nhập với tài khoản admin
   - Test các chức năng CRUD

3. **Kiểm tra Image Upload:**
   - Tạo bài viết/dự án mới với hình ảnh
   - Kiểm tra xem hình có hiển thị không

4. **Kiểm tra Console:**
   - Mở DevTools → Console
   - Kiểm tra có lỗi không

## Bước 4: Cấu hình Domain (Tùy chọn)

1. Vào **Settings** → **Domains** trong Vercel Dashboard
2. Thêm domain của bạn
3. Cấu hình DNS theo hướng dẫn của Vercel

## Troubleshooting

### Lỗi: "Environment variable not found"
- Kiểm tra lại đã thêm đầy đủ env variables trong Vercel Dashboard
- Đảm bảo tên biến đúng: `SUPABASE_URL`, `SUPABASE_KEY`, `SUPABASE_SECRET_KEY`

### Lỗi: "Failed to fetch"
- Kiểm tra Supabase RLS policies
- Đảm bảo service role key có quyền truy cập

### Lỗi: "Image upload failed"
- Kiểm tra Storage bucket `THP_Images` đã tạo chưa
- Kiểm tra bucket có public không
- Kiểm tra Storage policies

### Build failed
- Kiểm tra logs trong Vercel Dashboard
- Đảm bảo Node.js version phù hợp (Vercel tự động detect)
- Kiểm tra dependencies trong `package.json`

## Environment Variables Checklist

- [ ] `SUPABASE_URL` - Project URL từ Supabase
- [ ] `SUPABASE_KEY` - Anon key từ Supabase
- [ ] `SUPABASE_SECRET_KEY` - Service role key từ Supabase
- [ ] `NODE_ENV` - Set là `production`

## Notes

- **SUPABASE_SECRET_KEY** là key bảo mật, chỉ dùng server-side
- Không commit `.env` file vào Git
- Vercel tự động rebuild khi push code mới lên Git
- Có thể setup preview deployments cho mỗi PR

