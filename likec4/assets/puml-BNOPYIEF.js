var e=e=>{switch(e){case`index`:return`@startuml
title "Map: استخدام فروشندهٔ درصدی"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<HireS1>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS5>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS2>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS6>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS3>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS4>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
rectangle "استخدام فروشندهٔ درصدی" <<Hire>> as Hire {
  skinparam RectangleBorderColor<<Hire>> #3b82f6
  skinparam RectangleFontColor<<Hire>> #3b82f6
  skinparam RectangleBorderStyle<<Hire>> dashed

  rectangle "==1 · تعریف نقش" <<HireS1>> as HireS1
  rectangle "==5 · قرارداد 🔒" <<HireS5>> as HireS5
  rectangle "==2 · جذب" <<HireS2>> as HireS2
  rectangle "==6 · شروع کار" <<HireS6>> as HireS6
  rectangle "==3 · غربال" <<HireS3>> as HireS3
  rectangle "==4 · مصاحبه" <<HireS4>> as HireS4
}

HireS1 .[#8D8D8D,thickness=2].> HireS2 : <color:#8D8D8D>بعد
HireS2 .[#8D8D8D,thickness=2].> HireS3 : <color:#8D8D8D>تأیید شد
HireS3 .[#8D8D8D,thickness=2].> HireS2 : <color:#8D8D8D>هیچ‌کس
HireS3 .[#8D8D8D,thickness=2].> HireS4 : <color:#8D8D8D>بله
HireS4 .[#8D8D8D,thickness=2].> HireS3 : <color:#8D8D8D>رد
HireS5 .[#8D8D8D,thickness=2].> HireS3 : <color:#8D8D8D>نه
HireS4 .[#8D8D8D,thickness=2].> HireS5 : <color:#8D8D8D>قبول
HireS5 .[#8D8D8D,thickness=2].> HireS6 : <color:#8D8D8D>بله
@enduml
`;case`s1`:return`@startuml
title "1 · تعریف نقش"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<HireS1Goal>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS1Role>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS2>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
rectangle "1 · تعریف نقش" <<HireS1>> as HireS1 {
  skinparam RectangleBorderColor<<HireS1>> #3b82f6
  skinparam RectangleFontColor<<HireS1>> #3b82f6
  skinparam RectangleBorderStyle<<HireS1>> dashed

  rectangle "==هدف\\n\\nskill: — · out: محصول + بازار + تعداد نفر · after: ask" <<HireS1Goal>> as HireS1Goal
  rectangle "==شرح شغل و پورسانت\\n\\nskill: first-principles · out: وظایف + درصد + سقف · after: ask" <<HireS1Role>> as HireS1Role
}
rectangle "==2 · جذب" <<HireS2>> as HireS2

HireS1Goal .[#8D8D8D,thickness=2].> HireS1Role : <color:#8D8D8D>بعد
HireS1Role .[#8D8D8D,thickness=2].> HireS2 : <color:#8D8D8D>بعد
@enduml
`;case`s2`:return`@startuml
title "2 · جذب"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<HireS1>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS3>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS2Ad>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS2Post>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
rectangle "==1 · تعریف نقش" <<HireS1>> as HireS1
rectangle "==3 · غربال" <<HireS3>> as HireS3
rectangle "2 · جذب" <<HireS2>> as HireS2 {
  skinparam RectangleBorderColor<<HireS2>> #3b82f6
  skinparam RectangleFontColor<<HireS2>> #3b82f6
  skinparam RectangleBorderStyle<<HireS2>> dashed

  rectangle "==آگهی استخدام\\n\\nskill: marketing-skills:copywriting · out: متن + ۳ تیتر · after: auto" <<HireS2Ad>> as HireS2Ad
  rectangle "==انتشار آگهی\\n\\nskill: marketing-skills:social · out: پیش‌نویس، بدون انتشار · after: gate" <<HireS2Post>> as HireS2Post
}

HireS1 .[#8D8D8D,thickness=2].> HireS2Ad : <color:#8D8D8D>بعد
HireS3 .[#8D8D8D,thickness=2].> HireS2Ad : <color:#8D8D8D>هیچ‌کس
HireS2Ad .[#8D8D8D,thickness=2].> HireS2Post : <color:#8D8D8D>بعد
HireS2Post .[#8D8D8D,thickness=2].> HireS3 : <color:#8D8D8D>تأیید شد
@enduml
`;case`s3`:return`@startuml
title "3 · غربال"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<HireS2>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS4>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS5>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS3Reject>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS3Screen>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS3D1>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
rectangle "==2 · جذب" <<HireS2>> as HireS2
rectangle "==4 · مصاحبه" <<HireS4>> as HireS4
rectangle "==5 · قرارداد 🔒" <<HireS5>> as HireS5
rectangle "3 · غربال" <<HireS3>> as HireS3 {
  skinparam RectangleBorderColor<<HireS3>> #3b82f6
  skinparam RectangleFontColor<<HireS3>> #3b82f6
  skinparam RectangleBorderStyle<<HireS3>> dashed

  rectangle "==پیام رد\\n\\nskill: marketing-skills:copywriting · after: gate" <<HireS3Reject>> as HireS3Reject
  rectangle "==غربال رزومه‌ها\\n\\nskill: — · out: امتیاز ۰ تا ۱۰ · after: auto" <<HireS3Screen>> as HireS3Screen
  rectangle "==کسی ۷+ دارد؟\\n\\nafter: route" <<HireS3D1>> as HireS3D1
}

HireS2 .[#8D8D8D,thickness=2].> HireS3Screen : <color:#8D8D8D>تأیید شد
HireS4 .[#8D8D8D,thickness=2].> HireS3Reject : <color:#8D8D8D>رد
HireS5 .[#8D8D8D,thickness=2].> HireS3Screen : <color:#8D8D8D>نه
HireS3Screen .[#8D8D8D,thickness=2].> HireS3D1 : <color:#8D8D8D>بعد
HireS3Reject .[#8D8D8D,thickness=2].> HireS3Screen : <color:#8D8D8D>نفر بعدی
HireS3D1 .[#8D8D8D,thickness=2].> HireS2 : <color:#8D8D8D>هیچ‌کس
HireS3D1 .[#8D8D8D,thickness=2].> HireS4 : <color:#8D8D8D>بله
@enduml
`;case`s4`:return`@startuml
title "4 · مصاحبه"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<HireS3>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS4Qs>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS4Iv>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS4D2>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<HireS5>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
rectangle "==3 · غربال" <<HireS3>> as HireS3
rectangle "4 · مصاحبه" <<HireS4>> as HireS4 {
  skinparam RectangleBorderColor<<HireS4>> #3b82f6
  skinparam RectangleFontColor<<HireS4>> #3b82f6
  skinparam RectangleBorderStyle<<HireS4>> dashed

  rectangle "==سؤال‌ها + نقش‌آفرینی\\n\\nskill: grilling · out: ۱۰ سؤال + سناریو · after: auto" <<HireS4Qs>> as HireS4Qs
  rectangle "==مصاحبه و نمره\\n\\nskill: — · out: نمرهٔ هر سؤال · after: ask" <<HireS4Iv>> as HireS4Iv
  rectangle "==قبول شد؟\\n\\nafter: route" <<HireS4D2>> as HireS4D2
}
rectangle "==5 · قرارداد 🔒" <<HireS5>> as HireS5

HireS3 .[#8D8D8D,thickness=2].> HireS4Qs : <color:#8D8D8D>بله
HireS4Qs .[#8D8D8D,thickness=2].> HireS4Iv : <color:#8D8D8D>بعد
HireS4Iv .[#8D8D8D,thickness=2].> HireS4D2 : <color:#8D8D8D>بعد
HireS4D2 .[#8D8D8D,thickness=2].> HireS3 : <color:#8D8D8D>رد
HireS4D2 .[#8D8D8D,thickness=2].> HireS5 : <color:#8D8D8D>قبول
@enduml
`;case`s5`:return`@startuml
title "5 · قرارداد 🔒"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<HireS4>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS5Offer>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS5D3>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<HireS3>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS6>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
rectangle "==4 · مصاحبه" <<HireS4>> as HireS4
rectangle "5 · قرارداد 🔒" <<HireS5>> as HireS5 {
  skinparam RectangleBorderColor<<HireS5>> #3b82f6
  skinparam RectangleFontColor<<HireS5>> #3b82f6
  skinparam RectangleBorderStyle<<HireS5>> dashed

  rectangle "==قرارداد درصدی\\n\\nskill: anthropic-skills:docx · out: قرارداد.docx · after: gate" <<HireS5Offer>> as HireS5Offer
  rectangle "==پذیرفت؟\\n\\nafter: gate" <<HireS5D3>> as HireS5D3
}
rectangle "==3 · غربال" <<HireS3>> as HireS3
rectangle "==6 · شروع کار" <<HireS6>> as HireS6

HireS4 .[#8D8D8D,thickness=2].> HireS5Offer : <color:#8D8D8D>قبول
HireS5Offer .[#8D8D8D,thickness=2].> HireS5D3 : <color:#8D8D8D>بعد
HireS5D3 .[#8D8D8D,thickness=2].> HireS3 : <color:#8D8D8D>نه
HireS5D3 .[#8D8D8D,thickness=2].> HireS6 : <color:#8D8D8D>بله
@enduml
`;case`s6`:return`@startuml
title "6 · شروع کار"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<HireS5>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS6Kit>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS6Kpi>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
rectangle "==5 · قرارداد 🔒" <<HireS5>> as HireS5
rectangle "6 · شروع کار" <<HireS6>> as HireS6 {
  skinparam RectangleBorderColor<<HireS6>> #3b82f6
  skinparam RectangleFontColor<<HireS6>> #3b82f6
  skinparam RectangleBorderStyle<<HireS6>> dashed

  rectangle "==کیت فروش\\n\\nskill: marketing-skills:sales-enablement · after: auto" <<HireS6Kit>> as HireS6Kit
  rectangle "==هدف ۳۰ روز\\n\\nskill: — · out: فروش + نرخ تبدیل · after: ask" <<HireS6Kpi>> as HireS6Kpi
}

HireS5 .[#8D8D8D,thickness=2].> HireS6Kit : <color:#8D8D8D>بله
HireS6Kit .[#8D8D8D,thickness=2].> HireS6Kpi : <color:#8D8D8D>بعد
@enduml
`;case`workflow`:return`@startuml
title "ورک‌فلوی مرحله‌ای — مسیر موفق"
left to right direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<HireS1Goal>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS1Role>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS2Ad>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS2Post>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS3Screen>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS3D1>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<HireS4Qs>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS4Iv>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS4D2>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<HireS5Offer>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS5D3>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<HireS6Kit>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS6Kpi>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
rectangle "1 · تعریف نقش" <<HireS1>> as HireS1 {
  skinparam RectangleBorderColor<<HireS1>> #3b82f6
  skinparam RectangleFontColor<<HireS1>> #3b82f6
  skinparam RectangleBorderStyle<<HireS1>> dashed

  rectangle "==هدف\\n\\nskill: — · out: محصول + بازار + تعداد نفر · after: ask" <<HireS1Goal>> as HireS1Goal
  rectangle "==شرح شغل و پورسانت\\n\\nskill: first-principles · out: وظایف + درصد + سقف · after: ask" <<HireS1Role>> as HireS1Role
}
rectangle "2 · جذب" <<HireS2>> as HireS2 {
  skinparam RectangleBorderColor<<HireS2>> #3b82f6
  skinparam RectangleFontColor<<HireS2>> #3b82f6
  skinparam RectangleBorderStyle<<HireS2>> dashed

  rectangle "==آگهی استخدام\\n\\nskill: marketing-skills:copywriting · out: متن + ۳ تیتر · after: auto" <<HireS2Ad>> as HireS2Ad
  rectangle "==انتشار آگهی\\n\\nskill: marketing-skills:social · out: پیش‌نویس، بدون انتشار · after: gate" <<HireS2Post>> as HireS2Post
}
rectangle "3 · غربال" <<HireS3>> as HireS3 {
  skinparam RectangleBorderColor<<HireS3>> #3b82f6
  skinparam RectangleFontColor<<HireS3>> #3b82f6
  skinparam RectangleBorderStyle<<HireS3>> dashed

  rectangle "==غربال رزومه‌ها\\n\\nskill: — · out: امتیاز ۰ تا ۱۰ · after: auto" <<HireS3Screen>> as HireS3Screen
  rectangle "==کسی ۷+ دارد؟\\n\\nafter: route" <<HireS3D1>> as HireS3D1
}
rectangle "4 · مصاحبه" <<HireS4>> as HireS4 {
  skinparam RectangleBorderColor<<HireS4>> #3b82f6
  skinparam RectangleFontColor<<HireS4>> #3b82f6
  skinparam RectangleBorderStyle<<HireS4>> dashed

  rectangle "==سؤال‌ها + نقش‌آفرینی\\n\\nskill: grilling · out: ۱۰ سؤال + سناریو · after: auto" <<HireS4Qs>> as HireS4Qs
  rectangle "==مصاحبه و نمره\\n\\nskill: — · out: نمرهٔ هر سؤال · after: ask" <<HireS4Iv>> as HireS4Iv
  rectangle "==قبول شد؟\\n\\nafter: route" <<HireS4D2>> as HireS4D2
}
rectangle "5 · قرارداد 🔒" <<HireS5>> as HireS5 {
  skinparam RectangleBorderColor<<HireS5>> #3b82f6
  skinparam RectangleFontColor<<HireS5>> #3b82f6
  skinparam RectangleBorderStyle<<HireS5>> dashed

  rectangle "==قرارداد درصدی\\n\\nskill: anthropic-skills:docx · out: قرارداد.docx · after: gate" <<HireS5Offer>> as HireS5Offer
  rectangle "==پذیرفت؟\\n\\nafter: gate" <<HireS5D3>> as HireS5D3
}
rectangle "6 · شروع کار" <<HireS6>> as HireS6 {
  skinparam RectangleBorderColor<<HireS6>> #3b82f6
  skinparam RectangleFontColor<<HireS6>> #3b82f6
  skinparam RectangleBorderStyle<<HireS6>> dashed

  rectangle "==کیت فروش\\n\\nskill: marketing-skills:sales-enablement · after: auto" <<HireS6Kit>> as HireS6Kit
  rectangle "==هدف ۳۰ روز\\n\\nskill: — · out: فروش + نرخ تبدیل · after: ask" <<HireS6Kpi>> as HireS6Kpi
}

HireS1Goal .[#8D8D8D,thickness=2].> HireS1Role : <color:#8D8D8D>بعد
HireS1Role .[#8D8D8D,thickness=2].> HireS2Ad : <color:#8D8D8D>بعد
HireS2Ad .[#8D8D8D,thickness=2].> HireS2Post : <color:#8D8D8D>بعد
HireS2Post .[#8D8D8D,thickness=2].> HireS3Screen : <color:#8D8D8D>تأیید شد
HireS3Screen .[#8D8D8D,thickness=2].> HireS3D1 : <color:#8D8D8D>امتیازدهی
HireS3D1 .[#8D8D8D,thickness=2].> HireS4Qs : <color:#8D8D8D>بله
HireS4Qs .[#8D8D8D,thickness=2].> HireS4Iv : <color:#8D8D8D>بعد
HireS4Iv .[#8D8D8D,thickness=2].> HireS4D2 : <color:#8D8D8D>نمره
HireS4D2 .[#8D8D8D,thickness=2].> HireS5Offer : <color:#8D8D8D>قبول
HireS5Offer .[#8D8D8D,thickness=2].> HireS5D3 : <color:#8D8D8D>بعد
HireS5D3 .[#8D8D8D,thickness=2].> HireS6Kit : <color:#8D8D8D>بله
HireS6Kit .[#8D8D8D,thickness=2].> HireS6Kpi : <color:#8D8D8D>بعد
@enduml
`;case`reject_path`:return`@startuml
title "شاخهٔ رد و نفر بعدی"
left to right direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<HireS4D2>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<HireS3Reject>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS3Screen>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HireS3D1>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<HireS2Ad>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
rectangle "==قبول شد؟\\n\\nafter: route" <<HireS4D2>> as HireS4D2
rectangle "==پیام رد\\n\\nskill: marketing-skills:copywriting · after: gate" <<HireS3Reject>> as HireS3Reject
rectangle "==غربال رزومه‌ها\\n\\nskill: — · out: امتیاز ۰ تا ۱۰ · after: auto" <<HireS3Screen>> as HireS3Screen
rectangle "==کسی ۷+ دارد؟\\n\\nafter: route" <<HireS3D1>> as HireS3D1
rectangle "==آگهی استخدام\\n\\nskill: marketing-skills:copywriting · out: متن + ۳ تیتر · after: auto" <<HireS2Ad>> as HireS2Ad

HireS4D2 .[#8D8D8D,thickness=2].> HireS3Reject : <color:#8D8D8D>رد
HireS3Reject .[#8D8D8D,thickness=2].> HireS3Screen : <color:#8D8D8D>نفر بعدی
HireS3Screen .[#8D8D8D,thickness=2].> HireS3D1 : <color:#8D8D8D>امتیازدهی
HireS3D1 .[#8D8D8D,thickness=2].> HireS2Ad : <color:#8D8D8D>هیچ‌کس
@enduml
`;default:throw Error(`Unknown viewId: `+e)}};export{e as pumlSource};