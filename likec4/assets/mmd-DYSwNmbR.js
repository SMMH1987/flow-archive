var e=e=>{switch(e){case`index`:return`---
title: "Map: استخدام فروشندهٔ درصدی"
---
graph TB
  subgraph Hire["\`استخدام فروشندهٔ درصدی\`"]
    Hire.S1@{ shape: rectangle, label: "1 · تعریف نقش" }
    Hire.S5@{ shape: rectangle, label: "5 · قرارداد 🔒" }
    Hire.S2@{ shape: rectangle, label: "2 · جذب" }
    Hire.S6@{ shape: rectangle, label: "6 · شروع کار" }
    Hire.S3@{ shape: rectangle, label: "3 · غربال" }
    Hire.S4@{ shape: rectangle, label: "4 · مصاحبه" }
  end
  Hire.S1 -. "\`بعد\`" .-> Hire.S2
  Hire.S2 -. "\`تأیید شد\`" .-> Hire.S3
  Hire.S3 -. "\`هیچ‌کس\`" .-> Hire.S2
  Hire.S3 -. "\`بله\`" .-> Hire.S4
  Hire.S4 -. "\`رد\`" .-> Hire.S3
  Hire.S5 -. "\`نه\`" .-> Hire.S3
  Hire.S4 -. "\`قبول\`" .-> Hire.S5
  Hire.S5 -. "\`بله\`" .-> Hire.S6
`;case`s1`:return`---
title: "1 · تعریف نقش"
---
graph TB
  subgraph HireS1["\`1 · تعریف نقش\`"]
    HireS1.Goal@{ shape: rectangle, label: "هدف" }
    HireS1.Role@{ shape: rectangle, label: "شرح شغل و پورسانت" }
  end
  HireS2@{ shape: rectangle, label: "2 · جذب" }
  HireS1.Goal -. "\`بعد\`" .-> HireS1.Role
  HireS1.Role -. "\`بعد\`" .-> HireS2
`;case`s2`:return`---
title: "2 · جذب"
---
graph TB
  HireS1@{ shape: rectangle, label: "1 · تعریف نقش" }
  HireS3@{ shape: rectangle, label: "3 · غربال" }
  subgraph HireS2["\`2 · جذب\`"]
    HireS2.Ad@{ shape: rectangle, label: "آگهی استخدام" }
    HireS2.Post@{ shape: rectangle, label: "انتشار آگهی" }
  end
  HireS1 -. "\`بعد\`" .-> HireS2.Ad
  HireS3 -. "\`هیچ‌کس\`" .-> HireS2.Ad
  HireS2.Ad -. "\`بعد\`" .-> HireS2.Post
  HireS2.Post -. "\`تأیید شد\`" .-> HireS3
`;case`s3`:return`---
title: "3 · غربال"
---
graph TB
  HireS2@{ shape: rectangle, label: "2 · جذب" }
  HireS4@{ shape: rectangle, label: "4 · مصاحبه" }
  HireS5@{ shape: rectangle, label: "5 · قرارداد 🔒" }
  subgraph HireS3["\`3 · غربال\`"]
    HireS3.Reject@{ shape: rectangle, label: "پیام رد" }
    HireS3.Screen@{ shape: rectangle, label: "غربال رزومه‌ها" }
    HireS3.D1@{ shape: rectangle, label: "کسی ۷+ دارد؟" }
  end
  HireS2 -. "\`تأیید شد\`" .-> HireS3.Screen
  HireS4 -. "\`رد\`" .-> HireS3.Reject
  HireS5 -. "\`نه\`" .-> HireS3.Screen
  HireS3.Screen -. "\`بعد\`" .-> HireS3.D1
  HireS3.Reject -. "\`نفر بعدی\`" .-> HireS3.Screen
  HireS3.D1 -. "\`هیچ‌کس\`" .-> HireS2
  HireS3.D1 -. "\`بله\`" .-> HireS4
`;case`s4`:return`---
title: "4 · مصاحبه"
---
graph TB
  HireS3@{ shape: rectangle, label: "3 · غربال" }
  subgraph HireS4["\`4 · مصاحبه\`"]
    HireS4.Qs@{ shape: rectangle, label: "سؤال‌ها + نقش‌آفرینی" }
    HireS4.Iv@{ shape: rectangle, label: "مصاحبه و نمره" }
    HireS4.D2@{ shape: rectangle, label: "قبول شد؟" }
  end
  HireS5@{ shape: rectangle, label: "5 · قرارداد 🔒" }
  HireS3 -. "\`بله\`" .-> HireS4.Qs
  HireS4.Qs -. "\`بعد\`" .-> HireS4.Iv
  HireS4.Iv -. "\`بعد\`" .-> HireS4.D2
  HireS4.D2 -. "\`رد\`" .-> HireS3
  HireS4.D2 -. "\`قبول\`" .-> HireS5
`;case`s5`:return`---
title: "5 · قرارداد 🔒"
---
graph TB
  HireS4@{ shape: rectangle, label: "4 · مصاحبه" }
  subgraph HireS5["\`5 · قرارداد 🔒\`"]
    HireS5.Offer@{ shape: rectangle, label: "قرارداد درصدی" }
    HireS5.D3@{ shape: rectangle, label: "پذیرفت؟" }
  end
  HireS3@{ shape: rectangle, label: "3 · غربال" }
  HireS6@{ shape: rectangle, label: "6 · شروع کار" }
  HireS4 -. "\`قبول\`" .-> HireS5.Offer
  HireS5.Offer -. "\`بعد\`" .-> HireS5.D3
  HireS5.D3 -. "\`نه\`" .-> HireS3
  HireS5.D3 -. "\`بله\`" .-> HireS6
`;case`s6`:return`---
title: "6 · شروع کار"
---
graph TB
  HireS5@{ shape: rectangle, label: "5 · قرارداد 🔒" }
  subgraph HireS6["\`6 · شروع کار\`"]
    HireS6.Kit@{ shape: rectangle, label: "کیت فروش" }
    HireS6.Kpi@{ shape: rectangle, label: "هدف ۳۰ روز" }
  end
  HireS5 -. "\`بله\`" .-> HireS6.Kit
  HireS6.Kit -. "\`بعد\`" .-> HireS6.Kpi
`;case`workflow`:return`---
title: "ورک‌فلوی مرحله‌ای — مسیر موفق"
---
graph LR
  subgraph HireS1["\`1 · تعریف نقش\`"]
    HireS1.Goal@{ shape: rectangle, label: "هدف" }
    HireS1.Role@{ shape: rectangle, label: "شرح شغل و پورسانت" }
  end
  subgraph HireS2["\`2 · جذب\`"]
    HireS2.Ad@{ shape: rectangle, label: "آگهی استخدام" }
    HireS2.Post@{ shape: rectangle, label: "انتشار آگهی" }
  end
  subgraph HireS3["\`3 · غربال\`"]
    HireS3.Screen@{ shape: rectangle, label: "غربال رزومه‌ها" }
    HireS3.D1@{ shape: rectangle, label: "کسی ۷+ دارد؟" }
  end
  subgraph HireS4["\`4 · مصاحبه\`"]
    HireS4.Qs@{ shape: rectangle, label: "سؤال‌ها + نقش‌آفرینی" }
    HireS4.Iv@{ shape: rectangle, label: "مصاحبه و نمره" }
    HireS4.D2@{ shape: rectangle, label: "قبول شد؟" }
  end
  subgraph HireS5["\`5 · قرارداد 🔒\`"]
    HireS5.Offer@{ shape: rectangle, label: "قرارداد درصدی" }
    HireS5.D3@{ shape: rectangle, label: "پذیرفت؟" }
  end
  subgraph HireS6["\`6 · شروع کار\`"]
    HireS6.Kit@{ shape: rectangle, label: "کیت فروش" }
    HireS6.Kpi@{ shape: rectangle, label: "هدف ۳۰ روز" }
  end
  HireS1.Goal -. "\`بعد\`" .-> HireS1.Role
  HireS1.Role -. "\`بعد\`" .-> HireS2.Ad
  HireS2.Ad -. "\`بعد\`" .-> HireS2.Post
  HireS2.Post -. "\`تأیید شد\`" .-> HireS3.Screen
  HireS3.Screen -. "\`امتیازدهی\`" .-> HireS3.D1
  HireS3.D1 -. "\`بله\`" .-> HireS4.Qs
  HireS4.Qs -. "\`بعد\`" .-> HireS4.Iv
  HireS4.Iv -. "\`نمره\`" .-> HireS4.D2
  HireS4.D2 -. "\`قبول\`" .-> HireS5.Offer
  HireS5.Offer -. "\`بعد\`" .-> HireS5.D3
  HireS5.D3 -. "\`بله\`" .-> HireS6.Kit
  HireS6.Kit -. "\`بعد\`" .-> HireS6.Kpi
`;case`reject_path`:return`---
title: "شاخهٔ رد و نفر بعدی"
---
graph LR
  HireS4D2@{ shape: rectangle, label: "قبول شد؟" }
  HireS3Reject@{ shape: rectangle, label: "پیام رد" }
  HireS3Screen@{ shape: rectangle, label: "غربال رزومه‌ها" }
  HireS3D1@{ shape: rectangle, label: "کسی ۷+ دارد؟" }
  HireS2Ad@{ shape: rectangle, label: "آگهی استخدام" }
  HireS4D2 -. "\`رد\`" .-> HireS3Reject
  HireS3Reject -. "\`نفر بعدی\`" .-> HireS3Screen
  HireS3Screen -. "\`امتیازدهی\`" .-> HireS3D1
  HireS3D1 -. "\`هیچ‌کس\`" .-> HireS2Ad
`;default:throw Error(`Unknown viewId: `+e)}};export{e as mmdSource};