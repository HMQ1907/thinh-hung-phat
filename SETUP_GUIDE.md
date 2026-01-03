# Hướng Dẫn Setup Website Thành Hưng Phát

## 📋 Yêu Cầu

- Node.js 18+
- npm hoặc yarn
- Tài khoản Supabase (free)

## 🚀 Cài Đặt

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Setup Supabase

1. Tạo project mới trên [Supabase](https://supabase.com)
2. Vào SQL Editor và chạy file `database_schema.sql`
3. Tạo Storage bucket tên `THP_Images` (hoặc đổi tên trong code)
4. Lấy các thông tin:
   - Project URL
   - Anon/Public Key
   - Service Role Key (Secret)

### 3. Cấu hình Environment Variables

Tạo file `.env` trong root:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_anon_key
SUPABASE_SECRET_KEY=your_service_role_key
```

### 4. Chạy Development Server

```bash
npm run dev
```

Truy cập: http://localhost:3000

## 📁 Cấu Trúc Project

```
app/
  components/     # Components Vue
  layouts/        # Layouts (default, admin)
  pages/          # Pages (routing tự động)
  types/          # TypeScript types
  utils/          # Utilities
server/
  api/            # API routes
    admin/        # Admin APIs
    posts/        # Posts APIs
    products/     # Products APIs
```

## 🎨 Tính Năng

### Website Chính
- ✅ Trang chủ với hero section, features, products preview
- ✅ Trang giới thiệu
- ✅ Trang sản phẩm (list + detail)
- ✅ Trang blog/tin tức (list + detail)
- ✅ Trang liên hệ với form
- ✅ Responsive design (mobile-friendly)
- ✅ SEO optimized

### Admin Panel
- ✅ Dashboard với thống kê
- ✅ Quản lý bài viết (CRUD)
- ✅ Quản lý người dùng
- ✅ Layout riêng cho admin

## 🗄️ Database Schema

Xem file `database_schema.sql` để biết chi tiết các bảng:
- `users` - Người dùng/admin
- `categories` - Danh mục bài viết
- `posts` - Bài viết/tin tức
- `products` - Sản phẩm than đá
- `contacts` - Form liên hệ

## 🎯 Các Route Chính

### Public Routes
- `/` - Trang chủ
- `/about` - Giới thiệu
- `/products` - Danh sách sản phẩm
- `/products/[slug]` - Chi tiết sản phẩm
- `/blog` - Danh sách bài viết
- `/blog/[slug]` - Chi tiết bài viết
- `/contact` - Liên hệ

### Admin Routes
- `/admin` - Dashboard
- `/admin/posts` - Quản lý bài viết
- `/admin/posts/new` - Tạo bài viết mới
- `/admin/posts/[id]/edit` - Chỉnh sửa bài viết
- `/admin/users` - Quản lý người dùng

## 📝 Lưu Ý

1. **Storage**: Đảm bảo đã tạo bucket `THP_Images` trong Supabase Storage
2. **RLS Policies**: Database schema đã có RLS policies, service role key sẽ bypass
3. **Authentication**: Hiện tại chưa có authentication, cần thêm nếu muốn bảo mật admin
4. **Slug**: Cần tự tạo slug khi tạo bài viết/sản phẩm (có thể thêm auto-generate)

## 🚀 Deploy

### Vercel (Recommended)

1. Push code lên GitHub
2. Import project vào Vercel
3. Thêm environment variables
4. Deploy!

### Netlify

Tương tự Vercel

## 🔧 Customization

- **Colors**: Sửa trong `tailwind.config.js` hoặc CSS variables
- **Logo**: Thay đổi trong `AppHeader.vue`
- **Content**: Sửa trong các page components

## 📞 Support

Nếu có vấn đề, kiểm tra:
1. Environment variables đã đúng chưa
2. Database schema đã chạy chưa
3. Storage bucket đã tạo chưa
4. Console logs để debug

