# Thành Hưng Phát - Website Quản lý Than Đá

Website hiện đại cho công ty Thành Hưng Phát, chuyên cung cấp than đá chất lượng cao.

## 🚀 Tech Stack

- **Framework:** Nuxt 4
- **Database & Storage:** Supabase (PostgreSQL + Storage)
- **Styling:** Tailwind CSS v4
- **Animations:** VueUse Motion
- **UI Components:** Headless UI Vue
- **Notifications:** Vue Sonner

## 📦 Cài đặt

```bash
# Clone repository
git clone <repository-url>
cd tan_hong_minh_nuxt

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

## 🔧 Cấu hình Environment Variables

Tạo file `.env` trong root directory:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SECRET_KEY=your-service-role-key
```

## 🚀 Deploy lên Vercel

Xem hướng dẫn chi tiết: [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) hoặc [DEPLOY.md](./DEPLOY.md)

### Tóm tắt nhanh:

1. Push code lên GitHub
2. Import project vào Vercel
3. Thêm 3 environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `SUPABASE_SECRET_KEY`
4. Deploy!

## 📁 Cấu trúc Project

```
app/
├── components/     # Vue components
├── layouts/        # Layout templates
├── pages/          # Pages (file-based routing)
├── assets/         # Static assets
├── types/          # TypeScript types
└── utils/          # Utility functions

server/
├── api/            # API routes
└── middleware/     # Server middleware
```

## 🔐 Admin Panel

- URL: `/admin/login`
- Default admin: `admin@thp.com` (bypass password)

## 📝 Features

- ✅ Quản lý bài viết (Posts)
- ✅ Quản lý dự án (Projects)
- ✅ Quản lý sản phẩm (Products)
- ✅ Quản lý danh mục (Categories)
- ✅ Quản lý liên hệ (Contacts)
- ✅ Quản lý người dùng (Users)
- ✅ Upload hình ảnh lên Supabase Storage
- ✅ Responsive design
- ✅ Modern UI/UX

## 📚 Documentation

- [Deploy Guide](./DEPLOY.md) - Hướng dẫn deploy chi tiết
- [Quick Deploy](./QUICK_DEPLOY.md) - Hướng dẫn deploy nhanh
- [Environment Variables](./ENV_VARIABLES.md) - Danh sách env variables

## 📄 License

Private - Thành Hưng Phát
