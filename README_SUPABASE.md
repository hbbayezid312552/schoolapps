# মোসলেমগঞ্জ উচ্চ বিদ্যালয় — Supabase Version

এই সংস্করণে Firebase সম্পূর্ণ বাদ দেওয়া হয়েছে। ডেটা Supabase Database-এ এবং ছবি Supabase Storage-এ সংরক্ষিত হবে।

## ১. Supabase Project তৈরি

Supabase-এ একটি Free project তৈরি করুন।

তারপর **SQL Editor → New query** এ `supabase/schema.sql` ফাইলের সম্পূর্ণ SQL paste করে **Run** করুন।

এতে:
- `app_data` নামে JSON database table তৈরি হবে
- Row Level Security (RLS) চালু হবে
- `school-images` নামে public image bucket তৈরি হবে
- public visitor-রা data/image দেখতে পারবে
- শুধু authenticated admin-রা data/image upload/update/delete করতে পারবে

## ২. Admin User তৈরি

Supabase Dashboard → **Authentication → Users → Add user**

উদাহরণ:
- Email: আপনার admin email
- Password: শক্তিশালী password
- Confirm email প্রয়োজন হলে আপনার Supabase project-এর email settings অনুযায়ী সম্পন্ন করুন।

অ্যাপের Admin Login-এ এই email/password ব্যবহার করবেন।

## ৩. Environment variables

`.env.example` কপি করে `.env` বানান:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Supabase Dashboard → Project Settings → API থেকে Project URL এবং Publishable/Anon key নিন।

**Service role key কখনো frontend `.env`-এ দেবেন না।**

## ৪. Install & run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## ৫. Admin থেকে ছবি upload

Admin panel-এর নিচের জায়গাগুলোতে সরাসরি JPG/PNG/WEBP file upload করা যাবে:

- ফটো গ্যালারি
- শিক্ষক ছবি
- শিক্ষার্থী ছবি
- প্রধান শিক্ষকের ছবি

সর্বোচ্চ ৫ MB। Upload হওয়ার পর ছবির public URL Supabase Storage থেকে পাওয়া যাবে এবং সেই URL database-এ সংরক্ষিত হবে।

## ৬. গুরুত্বপূর্ণ

এই project-এ Firebase dependency ও Firebase configuration সরিয়ে দেওয়া হয়েছে। Supabase configure না করা থাকলে public data browser localStorage থেকে দেখাবে, কিন্তু cloud sync এবং image upload কাজ করবে না।

GitHub-এ `.env` commit করবেন না। `.gitignore`-এ `.env*` ignore করা আছে।
