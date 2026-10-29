---
title: فلو: استخدام نیروی فروش درصدی — نمونهٔ ساختار واحد (2026-10-29)
markmap:
  initialExpandLevel: 2
  colorFreezeLevel: 2
  maxWidth: 360
---

# فلو: استخدام نیروی فروش درصدی — نمونهٔ ساختار واحد (2026-10-29)
## 1 · تعریف نقش <!-- markmap: fold -->
### هدف: استخدام فروشندهٔ درصدی برای {{product}} <!-- markmap: fold -->
- skill: —
- out: محصول + بازار + تعداد نفر
- after: ask
- ➡️ بعد: شرح شغل و مدل پورسانت
### شرح شغل و مدل پورسانت <!-- markmap: fold -->
- skill: first-principles
- out: وظایف + درصد پورسانت + سقف + دورهٔ پرداخت
- after: ask
- ➡️ بعد: آگهی استخدام
## 2 · جذب <!-- markmap: fold -->
### آگهی استخدام <!-- markmap: fold -->
- skill: marketing-skills:copywriting
- out: متن آگهی + ۳ تیتر
- after: auto
- ➡️ بعد: انتشار آگهی
### انتشار آگهی <!-- markmap: fold -->
- skill: marketing-skills:social
- out: پیش‌نویس پست در ۲ کانال، بدون انتشار خودکار
- after: gate
- ➡️ بعد: غربال رزومه‌ها
## 3 · غربال <!-- markmap: fold -->
### غربال رزومه‌ها <!-- markmap: fold -->
- skill: —
- out: امتیاز ۰ تا ۱۰ برای هر نفر + دلیل
- after: auto
- ➡️ بعد: کسی امتیاز ۷+ دارد؟
### 🔀 کسی امتیاز ۷+ دارد؟ <!-- markmap: fold -->
- after: route
- ➡️ هیچ‌کس: آگهی استخدام
- ➡️ بله: سؤال‌ها + نقش‌آفرینی فروش
### پیام رد مؤدبانه <!-- markmap: fold -->
- skill: marketing-skills:copywriting
- out: پیش‌نویس پیام، بدون ارسال خودکار
- after: gate
- ➡️ نفر بعدی: غربال رزومه‌ها
## 4 · مصاحبه <!-- markmap: fold -->
### سؤال‌ها + نقش‌آفرینی فروش <!-- markmap: fold -->
- skill: grilling
- out: ۱۰ سؤال + یک سناریوی فروش تلفنی
- after: auto
- ➡️ بعد: مصاحبه و ثبت نمره
### مصاحبه و ثبت نمره <!-- markmap: fold -->
- skill: —
- out: نمرهٔ هر سؤال از کاربر
- after: ask
- ➡️ بعد: قبول شد؟
### 🔀 قبول شد؟ <!-- markmap: fold -->
- after: route
- ➡️ قبول: قرارداد درصدی
- ➡️ رد: پیام رد مؤدبانه
## 5 · قرارداد 🔒 <!-- markmap: fold -->
### قرارداد درصدی <!-- markmap: fold -->
- skill: anthropic-skills:docx
- out: قرارداد.docx با درصد و شرایط مرحلهٔ ۱
- after: gate
- ➡️ بعد: پیشنهاد را پذیرفت؟
### 🔀 پیشنهاد را پذیرفت؟ <!-- markmap: fold -->
- after: gate
- ➡️ بله: کیت فروش و آموزش
- ➡️ نه: غربال رزومه‌ها
## 6 · شروع کار <!-- markmap: fold -->
### کیت فروش و آموزش <!-- markmap: fold -->
- skill: marketing-skills:sales-enablement
- out: اسکریپت فروش + پاسخ به اعتراض‌ها
- after: auto
- ➡️ بعد: هدف ۳۰ روز اول
### هدف ۳۰ روز اول <!-- markmap: fold -->
- skill: —
- out: تعداد فروش + نرخ تبدیل + زمان بازبینی
- after: ask
