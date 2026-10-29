var e=e=>{switch(e){case`index`:return`direction: down

Hire: {
  label: "استخدام فروشندهٔ درصدی"

  S1: {
    label: "1 · تعریف نقش"
  }
  S5: {
    label: "5 · قرارداد 🔒"
  }
  S2: {
    label: "2 · جذب"
  }
  S6: {
    label: "6 · شروع کار"
  }
  S3: {
    label: "3 · غربال"
  }
  S4: {
    label: "4 · مصاحبه"
  }
}

Hire.S1 -> Hire.S2: "بعد"
Hire.S2 -> Hire.S3: "تأیید شد"
Hire.S3 -> Hire.S2: "هیچ‌کس"
Hire.S3 -> Hire.S4: "بله"
Hire.S4 -> Hire.S3: "رد"
Hire.S5 -> Hire.S3: "نه"
Hire.S4 -> Hire.S5: "قبول"
Hire.S5 -> Hire.S6: "بله"
`;case`s1`:return`direction: down

HireS1: {
  label: "1 · تعریف نقش"

  Goal: {
    label: "هدف"
  }
  Role: {
    label: "شرح شغل و پورسانت"
  }
}
HireS2: {
  label: "2 · جذب"
}

HireS1.Goal -> HireS1.Role: "بعد"
HireS1.Role -> HireS2: "بعد"
`;case`s2`:return`direction: down

HireS1: {
  label: "1 · تعریف نقش"
}
HireS3: {
  label: "3 · غربال"
}
HireS2: {
  label: "2 · جذب"

  Ad: {
    label: "آگهی استخدام"
  }
  Post: {
    label: "انتشار آگهی"
  }
}

HireS1 -> HireS2.Ad: "بعد"
HireS3 -> HireS2.Ad: "هیچ‌کس"
HireS2.Ad -> HireS2.Post: "بعد"
HireS2.Post -> HireS3: "تأیید شد"
`;case`s3`:return`direction: down

HireS2: {
  label: "2 · جذب"
}
HireS4: {
  label: "4 · مصاحبه"
}
HireS5: {
  label: "5 · قرارداد 🔒"
}
HireS3: {
  label: "3 · غربال"

  Reject: {
    label: "پیام رد"
  }
  Screen: {
    label: "غربال رزومه‌ها"
  }
  D1: {
    label: "کسی ۷+ دارد؟"
  }
}

HireS2 -> HireS3.Screen: "تأیید شد"
HireS4 -> HireS3.Reject: "رد"
HireS5 -> HireS3.Screen: "نه"
HireS3.Screen -> HireS3.D1: "بعد"
HireS3.Reject -> HireS3.Screen: "نفر بعدی"
HireS3.D1 -> HireS2: "هیچ‌کس"
HireS3.D1 -> HireS4: "بله"
`;case`s4`:return`direction: down

HireS3: {
  label: "3 · غربال"
}
HireS4: {
  label: "4 · مصاحبه"

  Qs: {
    label: "سؤال‌ها + نقش‌آفرینی"
  }
  Iv: {
    label: "مصاحبه و نمره"
  }
  D2: {
    label: "قبول شد؟"
  }
}
HireS5: {
  label: "5 · قرارداد 🔒"
}

HireS3 -> HireS4.Qs: "بله"
HireS4.Qs -> HireS4.Iv: "بعد"
HireS4.Iv -> HireS4.D2: "بعد"
HireS4.D2 -> HireS3: "رد"
HireS4.D2 -> HireS5: "قبول"
`;case`s5`:return`direction: down

HireS4: {
  label: "4 · مصاحبه"
}
HireS5: {
  label: "5 · قرارداد 🔒"

  Offer: {
    label: "قرارداد درصدی"
  }
  D3: {
    label: "پذیرفت؟"
  }
}
HireS3: {
  label: "3 · غربال"
}
HireS6: {
  label: "6 · شروع کار"
}

HireS4 -> HireS5.Offer: "قبول"
HireS5.Offer -> HireS5.D3: "بعد"
HireS5.D3 -> HireS3: "نه"
HireS5.D3 -> HireS6: "بله"
`;case`s6`:return`direction: down

HireS5: {
  label: "5 · قرارداد 🔒"
}
HireS6: {
  label: "6 · شروع کار"

  Kit: {
    label: "کیت فروش"
  }
  Kpi: {
    label: "هدف ۳۰ روز"
  }
}

HireS5 -> HireS6.Kit: "بله"
HireS6.Kit -> HireS6.Kpi: "بعد"
`;case`workflow`:return`direction: right

HireS1: {
  label: "1 · تعریف نقش"

  Goal: {
    label: "هدف"
  }
  Role: {
    label: "شرح شغل و پورسانت"
  }
}
HireS2: {
  label: "2 · جذب"

  Ad: {
    label: "آگهی استخدام"
  }
  Post: {
    label: "انتشار آگهی"
  }
}
HireS3: {
  label: "3 · غربال"

  Screen: {
    label: "غربال رزومه‌ها"
  }
  D1: {
    label: "کسی ۷+ دارد؟"
  }
}
HireS4: {
  label: "4 · مصاحبه"

  Qs: {
    label: "سؤال‌ها + نقش‌آفرینی"
  }
  Iv: {
    label: "مصاحبه و نمره"
  }
  D2: {
    label: "قبول شد؟"
  }
}
HireS5: {
  label: "5 · قرارداد 🔒"

  Offer: {
    label: "قرارداد درصدی"
  }
  D3: {
    label: "پذیرفت؟"
  }
}
HireS6: {
  label: "6 · شروع کار"

  Kit: {
    label: "کیت فروش"
  }
  Kpi: {
    label: "هدف ۳۰ روز"
  }
}

HireS1.Goal -> HireS1.Role: "بعد"
HireS1.Role -> HireS2.Ad: "بعد"
HireS2.Ad -> HireS2.Post: "بعد"
HireS2.Post -> HireS3.Screen: "تأیید شد"
HireS3.Screen -> HireS3.D1: "امتیازدهی"
HireS3.D1 -> HireS4.Qs: "بله"
HireS4.Qs -> HireS4.Iv: "بعد"
HireS4.Iv -> HireS4.D2: "نمره"
HireS4.D2 -> HireS5.Offer: "قبول"
HireS5.Offer -> HireS5.D3: "بعد"
HireS5.D3 -> HireS6.Kit: "بله"
HireS6.Kit -> HireS6.Kpi: "بعد"
`;case`reject_path`:return`direction: right

HireS4D2: {
  label: "قبول شد؟"
}
HireS3Reject: {
  label: "پیام رد"
}
HireS3Screen: {
  label: "غربال رزومه‌ها"
}
HireS3D1: {
  label: "کسی ۷+ دارد؟"
}
HireS2Ad: {
  label: "آگهی استخدام"
}

HireS4D2 -> HireS3Reject: "رد"
HireS3Reject -> HireS3Screen: "نفر بعدی"
HireS3Screen -> HireS3D1: "امتیازدهی"
HireS3D1 -> HireS2Ad: "هیچ‌کس"
`;default:throw Error(`Unknown viewId: `+e)}};export{e as d2Source};