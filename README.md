# Sleeper Website (Next.js)

Website mới cho thương hiệu **Sleeper** với tinh thần hiện đại, cao cấp, tối giản — xây dựng hoàn toàn mới bằng Next.js, Tailwind CSS và Framer Motion.

## Công nghệ

- Next.js (App Router)
- Tailwind CSS
- Framer Motion
- TypeScript

## Cấu trúc chính

- `app/` — các route trang: Home, Projects, Project Detail, Studio, Process, Contact
- `components/` — component layout, UI và section theo từng trang
- `data/` — dữ liệu dự án mẫu, dịch vụ, quy trình, nội dung `vi/en`
- `lib/` — helper và kiểu dữ liệu

## Chạy local

### 1) Cài dependencies

```bash
npm install
```

### 2) Chạy môi trường development

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

### 3) Build production

```bash
npm run typecheck
npm run lint
npm run build
npm run start
```

## Dữ liệu dự án mẫu

- File: `data/projects.json`
- Có thể thêm/sửa dự án bằng cách cập nhật JSON và đảm bảo mỗi dự án có `slug` duy nhất.

## Chuẩn bị song ngữ Việt/Anh

- Nội dung tiếng Việt: `data/content/vi.json`
- Placeholder tiếng Anh: `data/content/en.json`

Giai đoạn tiếp theo có thể mở rộng route theo locale (`/vi/*`, `/en/*`) hoặc tích hợp `next-intl`.

## Deploy lên Vercel

1. Push repo lên GitHub.
2. Vào Vercel > **Add New Project** > import repo.
3. Framework preset: **Next.js**.
4. Build command: `npm run build` (mặc định).
5. Output: `.next` (mặc định).
6. Deploy.

## Deploy lên Cloudflare Pages

### Cách khuyến nghị (dùng OpenNext adapter)

1. Cài package hỗ trợ:

```bash
npm install -D @opennextjs/cloudflare
```

2. Cấu hình build theo tài liệu OpenNext Cloudflare.
3. Trên Cloudflare Pages:
   - Build command: theo cấu hình OpenNext
   - Output directory: theo cấu hình OpenNext
4. Kết nối repo và deploy.

> Lưu ý: Next.js trên Cloudflare cần adapter tương thích. Nếu muốn nhanh và ít cấu hình, Vercel là lựa chọn đơn giản nhất.

## SEO cơ bản đã có

- Metadata mặc định toàn site trong `app/layout.tsx`
- Metadata riêng từng trang trong các file `app/**/page.tsx`
- Cấu trúc heading semantic, nội dung rõ ràng, URL sạch

## Tuỳ biến giao diện

- Màu sắc và typography: `tailwind.config.ts`
- Header/Footer: `components/layout/`
- Nhịp motion: `components/ui/Reveal.tsx`
