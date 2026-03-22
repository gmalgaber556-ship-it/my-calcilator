# 📱 دليل بناء APK باستخدام EAS Build

## الخطوة 1: إنشاء حساب Expo (مجاني)

1. اذهب إلى: https://expo.dev/signup
2. أنشئ حساب بريدك الإلكتروني
3. تحقق من بريدك

## الخطوة 2: تسجيل الدخول محلياً

افتح Terminal وشغل:
```bash
eas login
```

ثم:
- أدخل بريدك الإلكتروني
- أدخل كلمة المرور
- اختر "Yes" عند السؤال عن الحفظ

## الخطوة 3: بناء APK

في نفس المجلد (calculator-app)، شغل:
```bash
eas build --platform android
```

ثم:
- اختر "APK" عند السؤال عن نوع البناء
- اختر "Release" للبناء النهائي
- انتظر البناء (10-15 دقيقة)

## الخطوة 4: تحميل APK

عندما ينتهي البناء:
1. ستحصل على رابط تحميل مباشر
2. حمل الملف على هاتفك
3. افتح الملف وثبته

## ✅ النتيجة

تطبيق آلة الحاسبة الكامل على هاتفك!

---

## 🆘 في حالة المشاكل

**المشكلة: "eas command not found"**
```bash
npm install -g eas-cli
```

**المشكلة: "Not authenticated"**
```bash
eas logout
eas login
```

**المشكلة: "Build failed"**
- تأكد من أن لديك اتصال إنترنت
- جرب: `eas build --platform android --clear-cache`

---

## 📞 الدعم

للمساعدة: https://docs.expo.dev/build/setup/

