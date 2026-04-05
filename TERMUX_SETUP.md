# نشر التطبيق على GitHub و Vercel من Termux

## معلومات حسابك
- **البريد:** gmalgaber556@gmail.com
- **اسم المستخدم GitHub:** gmalgaber556-ops
- **كلمة المرور:** mahmoudgm23$55

---

## الخطوة 1: تثبيت البرامج المطلوبة في Termux

```bash
pkg update && pkg upgrade -y
pkg install -y git curl nodejs
npm install -g pnpm
```

---

## الخطوة 2: استنساخ المشروع من Manus

```bash
cd ~
git clone https://github.com/gmalgaber556-ops/advanced-calculator.git
cd advanced-calculator
```

**ملاحظة:** إذا لم يكن Repository موجود بعد، انتقل إلى الخطوة 3 أولاً.

---

## الخطوة 3: إنشاء Repository على GitHub

**الطريقة الأولى - عبر GitHub Web:**
1. اذهب إلى https://github.com/new
2. اسم Repository: `advanced-calculator`
3. الوصف: `Multi-functional Calculator App`
4. اختر `Public`
5. انقر `Create repository`

**الطريقة الثانية - عبر GitHub CLI:**

```bash
# تثبيت GitHub CLI
pkg install -y gh

# تسجيل الدخول
gh auth login

# إنشاء Repository
gh repo create advanced-calculator --public --source=. --remote=origin --push
```

---

## الخطوة 4: دفع المشروع إلى GitHub

```bash
cd ~/advanced-calculator

# تكوين Git
git config --global user.email "gmalgaber556@gmail.com"
git config --global user.name "gmalgaber556-ops"

# إضافة الملفات
git add .

# حفظ التغييرات
git commit -m "Initial commit: Advanced Calculator App"

# دفع إلى GitHub
git push -u origin main
```

---

## الخطوة 5: نشر على Vercel

### الطريقة الأولى - عبر Vercel Web (الأسهل):

1. اذهب إلى https://vercel.com
2. سجل دخول ببريدك
3. انقر `Import Project`
4. اختر `Import Git Repository`
5. ألصق رابط Repository: `https://github.com/gmalgaber556-ops/advanced-calculator`
6. في الإعدادات، اترك كل شيء كما هو (Vite سيكتشف البناء تلقائياً)
7. انقر `Deploy`

### الطريقة الثانية - عبر Vercel CLI:

```bash
# تثبيت Vercel CLI
npm install -g vercel

# تسجيل الدخول
vercel login

# نشر المشروع
cd ~/advanced-calculator
vercel --prod
```

---

## الخطوة 6: تعيين النطاق المخصص

بعد النشر على Vercel:
1. اذهب إلى https://vercel.com/dashboard
2. اختر المشروع `advanced-calculator`
3. اذهب إلى `Settings → Domains`
4. أضف النطاق: `advanced-calculator.vercel.app`

---

## الرابط النهائي

بعد النشر، التطبيق سيكون متاحاً على:
```
https://advanced-calculator.vercel.app
```

---

## ملاحظات مهمة

- **حفظ كلمات المرور:** احفظ كلمات المرور في مكان آمن
- **Token GitHub:** قد تحتاج إلى إنشاء Personal Access Token بدلاً من كلمة المرور
- **Vercel Token:** احفظ Vercel token لاستخدامه في المستقبل

---

## استكشاف الأخطاء

**إذا واجهت مشكلة في `git push`:**
```bash
git remote set-url origin https://gmalgaber556-ops:mahmoudgm23$55@github.com/gmalgaber556-ops/advanced-calculator.git
git push -u origin main
```

**إذا واجهت مشكلة في البناء:**
```bash
cd ~/advanced-calculator
pnpm install
pnpm run build
```

---

## الدعم

إذا واجهت أي مشكلة، أخبرني بـ:
- رسالة الخطأ بالكامل
- الخطوة التي توقفت عندها
- نتيجة آخر أمر قمت به
