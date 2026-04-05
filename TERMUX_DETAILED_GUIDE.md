# شرح مفصل لنشر التطبيق من Termux

## معلومات حسابك
```
البريد: gmalgaber556@gmail.com
اسم المستخدم: gmalgaber556-ops
كلمة المرور: mahmoudgm23$55
```

---

# الخطوة 1: تثبيت البرامج المطلوبة

## ماذا نفعل؟
نثبت البرامج التي نحتاجها لتشغيل المشروع على الموبايل.

## الأوامر:

### 1.1 تحديث Termux
```bash
pkg update
```
**ماذا يفعل؟** يحدث قائمة البرامج المتاحة على Termux.

```bash
pkg upgrade -y
```
**ماذا يفعل؟** يحدث جميع البرامج المثبتة. (`-y` معناه "نعم" تلقائياً)

### 1.2 تثبيت البرامج الأساسية
```bash
pkg install -y git curl nodejs
```
**ماذا يفعل؟** يثبت:
- **git:** لإدارة الكود والنسخ الاحتياطية
- **curl:** لتحميل الملفات من الإنترنت
- **nodejs:** لتشغيل JavaScript والتطبيقات

### 1.3 تثبيت pnpm (مدير الحزم)
```bash
npm install -g pnpm
```
**ماذا يفعل؟** يثبت `pnpm` وهو أسرع من `npm` في تثبيت المكتبات.

---

# الخطوة 2: إنشاء Repository على GitHub

## ماذا نفعل؟
ننشئ مستودع (Repository) على GitHub لحفظ الكود هناك.

## الطريقة (عبر الموقع):

### 2.1 فتح GitHub
1. افتح المتصفح على الموبايل
2. اذهب إلى: https://github.com/new

### 2.2 ملء البيانات
```
Repository name: advanced-calculator
Description: Multi-functional Calculator App
Visibility: Public (اختر Public)
```

### 2.3 الإعدادات الإضافية
- **لا تختر** "Initialize this repository with:"
- اترك كل شيء فارغ

### 2.4 إنشاء Repository
انقر الزر الأخضر **"Create repository"**

### 2.5 ستشوف صفحة مثل هذه:
```
Quick setup — if you've done this kind of thing before

or

https://github.com/gmalgaber556-ops/advanced-calculator.git
```

**احفظ هذا الرابط:** `https://github.com/gmalgaber556-ops/advanced-calculator.git`

---

# الخطوة 3: تحضير المشروع في Termux

## ماذا نفعل؟
نحضر المشروع ونجهزه للدفع إلى GitHub.

## الأوامر:

### 3.1 فتح المجلد الصحيح
```bash
cd /home/ubuntu/calculator-app
```
**ماذا يفعل؟** ينقلك إلى مجلد المشروع.

### 3.2 تكوين Git ببيانات حسابك
```bash
git config --global user.email "gmalgaber556@gmail.com"
```
**ماذا يفعل؟** يخبر Git ببريدك.

```bash
git config --global user.name "gmalgaber556-ops"
```
**ماذا يفعل؟** يخبر Git باسم المستخدم الخاص بك.

### 3.3 إضافة الملفات
```bash
git add .
```
**ماذا يفعل؟** يضيف جميع الملفات للتحضير للحفظ.

### 3.4 حفظ التغييرات (Commit)
```bash
git commit -m "Initial commit: Advanced Calculator App"
```
**ماذا يفعل؟** يحفظ التغييرات مع رسالة توضح ماذا فعلت.

---

# الخطوة 4: ربط GitHub وDفع الملفات

## ماذا نفعل؟
نربط المشروع المحلي بـ GitHub ثم ندفع الملفات هناك.

## الأوامر:

### 4.1 إضافة رابط GitHub
```bash
git remote add origin https://github.com/gmalgaber556-ops/advanced-calculator.git
```
**ماذا يفعل؟** يخبر Git أين يجب أن يدفع الملفات (إلى GitHub).

### 4.2 دفع الملفات (Push)
```bash
git push -u origin main
```
**ماذا يفعل؟** يرفع جميع الملفات إلى GitHub.

**قد يطلب منك:**
- **اسم المستخدم:** `gmalgaber556-ops`
- **كلمة المرور:** `mahmoudgm23$55`

---

# الخطوة 5: نشر على Vercel

## ماذا نفعل؟
ننشر التطبيق على Vercel ليكون متاحاً على الإنترنت.

## الطريقة (الأسهل - عبر الموقع):

### 5.1 فتح Vercel
1. افتح المتصفح
2. اذهب إلى: https://vercel.com

### 5.2 تسجيل الدخول
- اختر **"Sign up"** أو **"Log in"**
- استخدم نفس البريد: `gmalgaber556@gmail.com`

### 5.3 استيراد المشروع
1. انقر **"Add New..."** أو **"Import Project"**
2. اختر **"Import Git Repository"**
3. ألصق رابط GitHub: `https://github.com/gmalgaber556-ops/advanced-calculator`

### 5.4 الإعدادات
- **Framework Preset:** اتركه (Vite سيكتشفه تلقائياً)
- **Build Command:** `pnpm install && pnpm run build`
- **Output Directory:** `dist`
- **Environment Variables:** اتركها فارغة

### 5.5 النشر
انقر الزر الأزرق **"Deploy"**

### 5.6 الانتظار
Vercel سيقوم بـ:
1. استنساخ المشروع من GitHub
2. تثبيت المكتبات
3. بناء التطبيق
4. نشره على الإنترنت

**هذا يستغرق 2-5 دقائق.**

### 5.7 الرابط النهائي
بعد الانتهاء، ستشوف رابط مثل:
```
https://advanced-calculator.vercel.app
```

---

# الخطوة 6: التحقق من النشر

## ماذا نفعل؟
نتأكد من أن التطبيق يعمل بشكل صحيح.

### 6.1 فتح الرابط
افتح في المتصفح:
```
https://advanced-calculator.vercel.app
```

### 6.2 اختبر الميزات
- ✅ حاسبة عادية (جمع، طرح، ضرب، قسمة)
- ✅ حاسبة علمية (جذر، أس، نسبة مئوية)
- ✅ تحويل الوحدات (بالعربية)
- ✅ حاسبة العمر
- ✅ محول العملات (يحدث من الإنترنت)

---

# ملخص الأوامر الكاملة

```bash
# 1. تحديث وتثبيت
pkg update && pkg upgrade -y
pkg install -y git curl nodejs
npm install -g pnpm

# 2. الذهاب للمشروع
cd /home/ubuntu/calculator-app

# 3. تكوين Git
git config --global user.email "gmalgaber556@gmail.com"
git config --global user.name "gmalgaber556-ops"

# 4. إضافة وحفظ
git add .
git commit -m "Initial commit: Advanced Calculator App"

# 5. ربط GitHub
git remote add origin https://github.com/gmalgaber556-ops/advanced-calculator.git

# 6. دفع إلى GitHub
git push -u origin main
```

---

# استكشاف الأخطاء

## مشكلة: "fatal: remote origin already exists"
**الحل:**
```bash
git remote remove origin
git remote add origin https://github.com/gmalgaber556-ops/advanced-calculator.git
```

## مشكلة: "Permission denied"
**الحل:** استخدم Personal Access Token بدلاً من كلمة المرور:
1. اذهب إلى: https://github.com/settings/tokens
2. انقر "Generate new token"
3. اختر "repo" و "workflow"
4. انقر "Generate token"
5. استخدم التوكن بدلاً من كلمة المرور

## مشكلة: "fatal: 'origin' does not appear to be a 'git' repository"
**الحل:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/gmalgaber556-ops/advanced-calculator.git
git push -u origin main
```

---

# نصائح مهمة

1. **احفظ الأوامر:** انسخ الأوامر بالضبط كما هي
2. **لا تغير الأسماء:** استخدم نفس الأسماء بالضبط
3. **الإنترنت:** تأكد من اتصال الإنترنت طوال الوقت
4. **الصبر:** قد تستغرق بعض الخطوات وقتاً

---

# هل تحتاج مساعدة؟

إذا واجهت أي مشكلة:
1. انسخ رسالة الخطأ كاملة
2. أخبرني بالخطوة التي توقفت عندها
3. أخبرني بآخر أمر قمت به

سأساعدك فوراً! 👋
