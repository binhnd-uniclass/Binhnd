# Sale Motivation Daily

Web app tạo động lực hằng ngày cho đội Telesales — quote tiếng Việt + tarot 78 lá tích cực, đăng nhập 1-click bằng Google.

## Stack
- React 18 + Vite 5
- React Router v6
- @react-oauth/google (Google Identity Services)
- jwt-decode
- LocalStorage cho user + lịch sử (không backend)

## Cấu trúc thư mục
```
sales-motivation-app/
├── package.json
├── vite.config.js
├── index.html
├── .env.example          ← copy thành .env và điền Client ID
└── src/
    ├── main.jsx          ← entry
    ├── App.jsx           ← routing + auth wrapper
    ├── index.css         ← toàn bộ style
    ├── data/
    │   ├── quotes.js     ← 50 quote tiếng Việt + greeting theo giờ
    │   └── tarot.js      ← 78 lá tarot positive cho sale
    ├── context/
    │   └── AuthContext.jsx
    ├── utils/
    │   ├── dailySeed.js  ← seed cố định email + ngày
    │   └── storage.js    ← localStorage helpers + tính streak
    ├── components/
    │   ├── Login.jsx
    │   ├── Header.jsx
    │   ├── BottomNav.jsx
    │   ├── DailyQuote.jsx
    │   ├── TarotCard.jsx     ← card 3D flip
    │   ├── TarotReading.jsx  ← luồng shuffle → choose → reveal
    │   └── Toast.jsx
    └── pages/
        ├── HomePage.jsx
        ├── TarotPage.jsx
        └── HistoryPage.jsx
```

## Bước 1 — Tạo Google OAuth Client ID

1. Vào <https://console.cloud.google.com/>.
2. Tạo Project mới (vd: "Sale Motivation").
3. Mở **APIs & Services → OAuth consent screen**: chọn External, điền thông tin app, thêm scope `email` và `profile`.
4. Mở **APIs & Services → Credentials → Create credentials → OAuth client ID**:
   - Application type: **Web application**
   - Authorized JavaScript origins: `http://localhost:5173` (dev) + domain production của bạn
5. Copy **Client ID** dạng `xxxxx-yyyy.apps.googleusercontent.com`.

## Bước 2 — Cài đặt & chạy local

```bash
cd sales-motivation-app
npm install
cp .env.example .env
# mở .env và dán Client ID vào VITE_GOOGLE_CLIENT_ID
npm run dev
```

App chạy ở <http://localhost:5173>.

## Bước 3 — Build production

```bash
npm run build
# output ở folder dist/
```

Deploy lên bất cứ static hosting nào: Netlify, Vercel, GitHub Pages, Cloudflare Pages, S3 + CloudFront…

> **Quan trọng**: Sau khi deploy, nhớ thêm domain production vào "Authorized JavaScript origins" trong Google Cloud Console — không thì login sẽ lỗi `redirect_uri_mismatch`.

## Tính năng MVP đã code

- ✅ Đăng nhập Google OAuth (One Tap + nút sign-in)
- ✅ Quote tiếng Việt cố định mỗi ngày theo email + ngày (50 quote)
- ✅ Nút "Quote khác" — random thêm không thay quote chính
- ✅ Sao chép quote vào clipboard
- ✅ Rút bài tarot 78 lá positive — mỗi ngày 1 lá chính cố định
- ✅ Animation shuffle + 3D flip card
- ✅ Rút thêm bài tham khảo (không thay bài chính)
- ✅ Lịch sử lưu localStorage theo email, group theo ngày
- ✅ Streak chuỗi ngày liên tiếp dùng app
- ✅ Mobile-first, responsive, có dark area cho safe-area iPhone
- ✅ Bottom nav 3 tab: Home / Tarot / Lịch sử

## Roadmap Phase 2 (gợi ý)

- Chia sẻ quote ra ảnh PNG (canvas API)
- Notification trình duyệt nhắc 8h sáng
- Phân loại quote theo tag (chốt deal, kiên nhẫn, từ chối…)
- Bộ quote nội bộ công ty (admin upload)
- Backend Supabase/Firebase để đồng bộ đa thiết bị
- Trải bài 3 lá (Past — Present — Future) cho 1 deal cụ thể

## Đóng góp nội dung

- Quote: thêm vào `src/data/quotes.js`. Mỗi quote: `{ text, author, tag }`.
- Tarot: thêm/sửa ở `src/data/tarot.js`. Giữ nguyên rule THÔNG ĐIỆP TÍCH CỰC.

## License

Internal use — built for telesales motivation. Mục đích vui & truyền động lực, không phải dự đoán tương lai.
