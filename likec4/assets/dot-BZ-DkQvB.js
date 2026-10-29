var e=e=>{switch(e){case`index`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=index,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        label="\\N",
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    subgraph cluster_hire {
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>استخدام فروشندهٔ درصدی</B></FONT>>,
            likec4_depth=1,
            likec4_id=hire,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        s1 [height=2.5,
            label=<<FONT POINT-SIZE="20">1 · تعریف نقش</FONT>>,
            likec4_id="hire.s1",
            likec4_level=1,
            margin="0.223,0.223",
            width=4.445];
        s5 [height=2.5,
            label=<<FONT POINT-SIZE="20">5 · قرارداد 🔒</FONT>>,
            likec4_id="hire.s5",
            likec4_level=1,
            margin="0.223,0.223",
            width=4.445];
        s2 [height=2.5,
            label=<<FONT POINT-SIZE="20">2 · جذب</FONT>>,
            likec4_id="hire.s2",
            likec4_level=1,
            margin="0.223,0.223",
            width=4.445];
        s6 [height=2.5,
            label=<<FONT POINT-SIZE="20">6 · شروع کار</FONT>>,
            likec4_id="hire.s6",
            likec4_level=1,
            margin="0.223,0.223",
            width=4.445];
        s3 [height=2.5,
            label=<<FONT POINT-SIZE="20">3 · غربال</FONT>>,
            likec4_id="hire.s3",
            likec4_level=1,
            margin="0.223,0.223",
            width=4.445];
        s4 [height=2.5,
            label=<<FONT POINT-SIZE="20">4 · مصاحبه</FONT>>,
            likec4_id="hire.s4",
            likec4_level=1,
            margin="0.223,0.223",
            width=4.445];
    }
    s1 -> s2 [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">بعد</FONT></TD></TR></TABLE>>,
        likec4_id="68vzux",
        minlen=1,
        style=dashed];
    s5 -> s6 [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">بله</FONT></TD></TR></TABLE>>,
        likec4_id="1shsrbd",
        minlen=1,
        style=dashed];
    s5 -> s3 [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">نه</FONT></TD></TR></TABLE>>,
        likec4_id="1shsrbg",
        style=dashed];
    s2 -> s3 [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">تأیید شد</FONT></TD></TR></TABLE>>,
        likec4_id="1y7ls7f",
        style=dashed];
    s3 -> s2 [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">هیچ‌کس</FONT></TD></TR></TABLE>>,
        likec4_id="1dxswcr",
        style=dashed];
    s3 -> s4 [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">بله</FONT></TD></TR></TABLE>>,
        likec4_id="1dxswct",
        style=dashed];
    s4 -> s5 [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">قبول</FONT></TD></TR></TABLE>>,
        likec4_id="1paggaz",
        style=dashed];
    s4 -> s3 [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">رد</FONT></TD></TR></TABLE>>,
        likec4_id="1paggb1",
        style=dashed];
}
`;case`s1`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=s1,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        label="\\N",
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    subgraph cluster_s1 {
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>1 · تعریف نقش</B></FONT>>,
            likec4_depth=1,
            likec4_id="hire.s1",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        goal [height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">هدف</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">skill: — · out: محصول + بازار + تعداد نفر ·<BR/>after: ask</FONT></TD></TR></TABLE>>,
            likec4_id="hire.s1.goal",
            likec4_level=1,
            margin="0.223,0.223",
            width=4.445];
        role [height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">شرح شغل و پورسانت</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">skill: first-principles · out: وظایف + درصد +<BR/>سقف · after: ask</FONT></TD></TR></TABLE>>,
            likec4_id="hire.s1.role",
            likec4_level=1,
            margin="0.223,0.223",
            width=4.445];
    }
    goal -> role [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">بعد</FONT></TD></TR></TABLE>>,
        likec4_id="16x888r",
        minlen=0,
        style=dashed,
        weight=2];
    s2 [height=2.5,
        label=<<FONT POINT-SIZE="20">2 · جذب</FONT>>,
        likec4_id="hire.s2",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    role -> s2 [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">بعد</FONT></TD></TR></TABLE>>,
        likec4_id="1qdn4c3",
        minlen=1,
        style=dashed];
}
`;case`s2`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=s2,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        label="\\N",
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    subgraph cluster_s2 {
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>2 · جذب</B></FONT>>,
            likec4_depth=1,
            likec4_id="hire.s2",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        ad [height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">آگهی استخدام</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">skill: marketing-skills:copywriting · out:<BR/>متن + ۳ تیتر · after: auto</FONT></TD></TR></TABLE>>,
            likec4_id="hire.s2.ad",
            likec4_level=1,
            margin="0.223,0.223",
            width=4.445];
        post [height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">انتشار آگهی</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">skill: marketing-skills:social · out:<BR/>پیش‌نویس، بدون انتشار · after: gate</FONT></TD></TR></TABLE>>,
            likec4_id="hire.s2.post",
            likec4_level=1,
            margin="0.223,0.223",
            width=4.445];
    }
    s1 [height=2.5,
        label=<<FONT POINT-SIZE="20">1 · تعریف نقش</FONT>>,
        likec4_id="hire.s1",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    s1 -> ad [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">بعد</FONT></TD></TR></TABLE>>,
        likec4_id="11k4vvm",
        minlen=1,
        style=dashed];
    s3 [height=2.5,
        label=<<FONT POINT-SIZE="20">3 · غربال</FONT>>,
        likec4_id="hire.s3",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    s3 -> ad [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">هیچ‌کس</FONT></TD></TR></TABLE>>,
        likec4_id="1oqeecg",
        style=dashed];
    ad -> post [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">بعد</FONT></TD></TR></TABLE>>,
        likec4_id=lvtcev,
        minlen=0,
        style=dashed,
        weight=2];
    post -> s3 [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">تأیید شد</FONT></TD></TR></TABLE>>,
        likec4_id=f31wu5,
        style=dashed];
}
`;case`s3`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=s3,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        label="\\N",
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    subgraph cluster_s3 {
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>3 · غربال</B></FONT>>,
            likec4_depth=1,
            likec4_id="hire.s3",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        reject [group="hire.s3",
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">پیام رد</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">skill: marketing-skills:copywriting · after:<BR/>gate</FONT></TD></TR></TABLE>>,
            likec4_id="hire.s3.reject",
            likec4_level=1,
            margin="0.223,0.223",
            width=4.445];
        screen [group="hire.s3",
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">غربال رزومه‌ها</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">skill: — · out: امتیاز ۰ تا ۱۰ · after: auto</FONT></TD></TR></TABLE>>,
            likec4_id="hire.s3.screen",
            likec4_level=1,
            margin="0.223,0.223",
            width=4.445];
        d1 [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            group="hire.s3",
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">کسی ۷+ دارد؟</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">after: route</FONT></TD></TR></TABLE>>,
            likec4_id="hire.s3.d1",
            likec4_level=1,
            margin="0.223,0.223",
            width=4.445];
    }
    s2 [height=2.5,
        label=<<FONT POINT-SIZE="20">2 · جذب</FONT>>,
        likec4_id="hire.s2",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    s2 -> screen [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">تأیید شد</FONT></TD></TR></TABLE>>,
        likec4_id="9qzgw9",
        style=dashed];
    s4 [height=2.5,
        label=<<FONT POINT-SIZE="20">4 · مصاحبه</FONT>>,
        likec4_id="hire.s4",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    s4 -> reject [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">رد</FONT></TD></TR></TABLE>>,
        likec4_id="1cwhncc",
        style=dashed];
    s5 [height=2.5,
        label=<<FONT POINT-SIZE="20">5 · قرارداد 🔒</FONT>>,
        likec4_id="hire.s5",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    s5 -> screen [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">نه</FONT></TD></TR></TABLE>>,
        likec4_id="1munmr2",
        minlen=1,
        style=dashed];
    reject -> screen [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">نفر بعدی</FONT></TD></TR></TABLE>>,
        likec4_id=bm8imh,
        style=dashed,
        weight=2];
    screen -> d1 [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">بعد</FONT></TD></TR></TABLE>>,
        likec4_id=bj3iab,
        style=dashed,
        weight=2];
    d1 -> s2 [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">هیچ‌کس</FONT></TD></TR></TABLE>>,
        likec4_id=wj72cw,
        style=dashed];
    d1 -> s4 [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">بله</FONT></TD></TR></TABLE>>,
        likec4_id=wj72d2,
        style=dashed];
}
`;case`s4`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=s4,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    subgraph cluster_s4 {
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>4 · مصاحبه</B></FONT>>,
            likec4_depth=1,
            likec4_id="hire.s4",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        qs [group="hire.s4",
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">سؤال‌ها + نقش‌آفرینی</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">skill: grilling · out: ۱۰ سؤال + سناریو ·<BR/>after: auto</FONT></TD></TR></TABLE>>,
            likec4_id="hire.s4.qs",
            likec4_level=1,
            margin="0.223,0.223",
            width=4.445];
        iv [group="hire.s4",
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">مصاحبه و نمره</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">skill: — · out: نمرهٔ هر سؤال · after: ask</FONT></TD></TR></TABLE>>,
            likec4_id="hire.s4.iv",
            likec4_level=1,
            margin="0.223,0.223",
            width=4.445];
        d2 [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            group="hire.s4",
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">قبول شد؟</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">after: route</FONT></TD></TR></TABLE>>,
            likec4_id="hire.s4.d2",
            likec4_level=1,
            margin="0.223,0.223",
            width=4.445];
    }
    s3 [height=2.5,
        label=<<FONT POINT-SIZE="20">3 · غربال</FONT>>,
        likec4_id="hire.s3",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    s3 -> qs [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">بله</FONT></TD></TR></TABLE>>,
        likec4_id="1oqfuxt",
        style=dashed];
    qs -> iv [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">بعد</FONT></TD></TR></TABLE>>,
        likec4_id="1fqjgzb",
        style=dashed,
        weight=2];
    iv -> d2 [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">بعد</FONT></TD></TR></TABLE>>,
        likec4_id=ak8hsz,
        style=dashed,
        weight=2];
    d2 -> s3 [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">رد</FONT></TD></TR></TABLE>>,
        likec4_id="164kudx",
        style=dashed];
    s5 [height=2.5,
        label=<<FONT POINT-SIZE="20">5 · قرارداد 🔒</FONT>>,
        likec4_id="hire.s5",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    d2 -> s5 [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">قبول</FONT></TD></TR></TABLE>>,
        likec4_id="164kudv",
        minlen=1,
        style=dashed];
}
`;case`s5`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=s5,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    subgraph cluster_s5 {
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>5 · قرارداد 🔒</B></FONT>>,
            likec4_depth=1,
            likec4_id="hire.s5",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        offer [height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">قرارداد درصدی</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">skill: anthropic-skills:docx · out:<BR/>قرارداد.docx · after: gate</FONT></TD></TR></TABLE>>,
            likec4_id="hire.s5.offer",
            likec4_level=1,
            margin="0.223,0.223",
            width=4.445];
        d3 [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">پذیرفت؟</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">after: gate</FONT></TD></TR></TABLE>>,
            likec4_id="hire.s5.d3",
            likec4_level=1,
            margin="0.223,0.223",
            width=4.445];
    }
    s4 [height=2.5,
        label=<<FONT POINT-SIZE="20">4 · مصاحبه</FONT>>,
        likec4_id="hire.s4",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    s4 -> offer [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">قبول</FONT></TD></TR></TABLE>>,
        likec4_id=csqv5p,
        minlen=1,
        style=dashed];
    offer -> d3 [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">بعد</FONT></TD></TR></TABLE>>,
        likec4_id=y7aix1,
        minlen=0,
        style=dashed,
        weight=2];
    s3 [height=2.5,
        label=<<FONT POINT-SIZE="20">3 · غربال</FONT>>,
        likec4_id="hire.s3",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    d3 -> s3 [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">نه</FONT></TD></TR></TABLE>>,
        likec4_id="2892et",
        minlen=1,
        style=dashed];
    s6 [height=2.5,
        label=<<FONT POINT-SIZE="20">6 · شروع کار</FONT>>,
        likec4_id="hire.s6",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    d3 -> s6 [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">بله</FONT></TD></TR></TABLE>>,
        likec4_id="2892eo",
        minlen=1,
        style=dashed];
}
`;case`s6`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=s6,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    subgraph cluster_s6 {
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>6 · شروع کار</B></FONT>>,
            likec4_depth=1,
            likec4_id="hire.s6",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        kit [height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">کیت فروش</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">skill: marketing-skills:sales-enablement ·<BR/>after: auto</FONT></TD></TR></TABLE>>,
            likec4_id="hire.s6.kit",
            likec4_level=1,
            margin="0.223,0.223",
            width=4.445];
        kpi [height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">هدف ۳۰ روز</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">skill: — · out: فروش + نرخ تبدیل · after: ask</FONT></TD></TR></TABLE>>,
            likec4_id="hire.s6.kpi",
            likec4_level=1,
            margin="0.223,0.223",
            width=4.445];
    }
    s5 [height=2.5,
        label=<<FONT POINT-SIZE="20">5 · قرارداد 🔒</FONT>>,
        likec4_id="hire.s5",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    s5 -> kit [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">بله</FONT></TD></TR></TABLE>>,
        likec4_id="1eigi7l",
        minlen=1,
        style=dashed];
    kit -> kpi [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">بعد</FONT></TD></TR></TABLE>>,
        likec4_id="17loj5a",
        minlen=0,
        style=dashed,
        weight=2];
}
`;case`workflow`:return`digraph {
  likec4_viewId = "workflow";
  bgcolor = "transparent";
  layout = "dot";
  compound = true;
  rankdir = "LR";
  splines = "spline";
  outputorder = "nodesfirst";
  nodesep = 1.528;
  ranksep = 1.667;
  pad = 0.209;
  fontname = "Arial";
  ordering = "in";
  graph [
    fontsize = 20;
    labeljust = "l";
    labelloc = "t";
  ];
  edge [
    arrowsize = 0.75;
    fontname = "Arial";
    fontsize = 14;
    penwidth = 2;
    color = "#8D8D8D";
    fontcolor = "#C9C9C9";
    style = "dashed";
  ];
  node [
    fontname = "Arial";
    shape = "rect";
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
    style = "filled";
    penwidth = 0;
  ];
  "goal" [
    likec4_id = "hire.s1.goal";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">هدف</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">skill: — · out: محصول + بازار + تعداد نفر ·<BR/>after: ask</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
  ];
  "role" [
    likec4_id = "hire.s1.role";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">شرح شغل و پورسانت</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">skill: first-principles · out: وظایف + درصد +<BR/>سقف · after: ask</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
  ];
  "ad" [
    likec4_id = "hire.s2.ad";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">آگهی استخدام</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">skill: marketing-skills:copywriting · out:<BR/>متن + ۳ تیتر · after: auto</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
  ];
  "post" [
    likec4_id = "hire.s2.post";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">انتشار آگهی</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">skill: marketing-skills:social · out:<BR/>پیش‌نویس، بدون انتشار · after: gate</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
  ];
  "screen" [
    likec4_id = "hire.s3.screen";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">غربال رزومه‌ها</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">skill: — · out: امتیاز ۰ تا ۱۰ · after: auto</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
  ];
  "d1" [
    likec4_id = "hire.s3.d1";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">کسی ۷+ دارد؟</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">after: route</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#A35829";
    fontcolor = "#FFE0C2";
    color = "#7E451D";
  ];
  "qs" [
    likec4_id = "hire.s4.qs";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">سؤال‌ها + نقش‌آفرینی</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">skill: grilling · out: ۱۰ سؤال + سناریو ·<BR/>after: auto</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
  ];
  "iv" [
    likec4_id = "hire.s4.iv";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">مصاحبه و نمره</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">skill: — · out: نمرهٔ هر سؤال · after: ask</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
  ];
  "d2" [
    likec4_id = "hire.s4.d2";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">قبول شد؟</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">after: route</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#A35829";
    fontcolor = "#FFE0C2";
    color = "#7E451D";
  ];
  "offer" [
    likec4_id = "hire.s5.offer";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">قرارداد درصدی</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">skill: anthropic-skills:docx · out:<BR/>قرارداد.docx · after: gate</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
  ];
  "d3" [
    likec4_id = "hire.s5.d3";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">پذیرفت؟</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">after: gate</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#A35829";
    fontcolor = "#FFE0C2";
    color = "#7E451D";
  ];
  "kit" [
    likec4_id = "hire.s6.kit";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">کیت فروش</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">skill: marketing-skills:sales-enablement ·<BR/>after: auto</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
  ];
  "kpi" [
    likec4_id = "hire.s6.kpi";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">هدف ۳۰ روز</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">skill: — · out: فروش + نرخ تبدیل · after: ask</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
  ];
  subgraph "cluster_s1" {
    likec4_id = "hire.s1";
    likec4_level = 0;
    likec4_depth = 1;
    fillcolor = "#194b9e";
    color = "#1b3d88";
    style = "filled";
    margin = 40;
    label = <<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>1 · تعریف نقش</B></FONT>>;
    "goal";
    "role";
  }
  subgraph "cluster_s2" {
    likec4_id = "hire.s2";
    likec4_level = 0;
    likec4_depth = 1;
    fillcolor = "#194b9e";
    color = "#1b3d88";
    style = "filled";
    margin = 40;
    label = <<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>2 · جذب</B></FONT>>;
    "ad";
    "post";
  }
  subgraph "cluster_s3" {
    likec4_id = "hire.s3";
    likec4_level = 0;
    likec4_depth = 1;
    fillcolor = "#194b9e";
    color = "#1b3d88";
    style = "filled";
    margin = 40;
    label = <<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>3 · غربال</B></FONT>>;
    "screen";
    "d1";
  }
  subgraph "cluster_s4" {
    likec4_id = "hire.s4";
    likec4_level = 0;
    likec4_depth = 1;
    fillcolor = "#194b9e";
    color = "#1b3d88";
    style = "filled";
    margin = 40;
    label = <<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>4 · مصاحبه</B></FONT>>;
    "qs";
    "iv";
    "d2";
  }
  subgraph "cluster_s5" {
    likec4_id = "hire.s5";
    likec4_level = 0;
    likec4_depth = 1;
    fillcolor = "#194b9e";
    color = "#1b3d88";
    style = "filled";
    margin = 40;
    label = <<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>5 · قرارداد 🔒</B></FONT>>;
    "offer";
    "d3";
  }
  subgraph "cluster_s6" {
    likec4_id = "hire.s6";
    likec4_level = 0;
    likec4_depth = 1;
    fillcolor = "#194b9e";
    color = "#1b3d88";
    style = "filled";
    margin = 40;
    label = <<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>6 · شروع کار</B></FONT>>;
    "kit";
    "kpi";
  }
  "goal" -> "role" [
    likec4_id = "step-01";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>0</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">بعد</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "role" -> "ad" [
    likec4_id = "step-02";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>1</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">بعد</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "ad" -> "post" [
    likec4_id = "step-03";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>2</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">بعد</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "post" -> "screen" [
    likec4_id = "step-04";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>3</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">تأیید شد</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "screen" -> "d1" [
    likec4_id = "step-05";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>4</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">امتیازدهی</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "d1" -> "qs" [
    likec4_id = "step-06";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>5</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">بله</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "qs" -> "iv" [
    likec4_id = "step-07";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>6</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">بعد</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "iv" -> "d2" [
    likec4_id = "step-08";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>7</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">نمره</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "d2" -> "offer" [
    likec4_id = "step-09";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>8</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">قبول</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "offer" -> "d3" [
    likec4_id = "step-10";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>9</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">بعد</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "d3" -> "kit" [
    likec4_id = "step-11";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>10</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">بله</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "kit" -> "kpi" [
    likec4_id = "step-12";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>11</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">بعد</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
}`;case`reject_path`:return`digraph {
  likec4_viewId = "reject_path";
  bgcolor = "transparent";
  layout = "dot";
  compound = true;
  rankdir = "LR";
  splines = "spline";
  outputorder = "nodesfirst";
  nodesep = 1.528;
  ranksep = 1.667;
  pad = 0.209;
  fontname = "Arial";
  ordering = "in";
  graph [
    fontsize = 20;
    labeljust = "l";
    labelloc = "t";
  ];
  edge [
    arrowsize = 0.75;
    fontname = "Arial";
    fontsize = 14;
    penwidth = 2;
    color = "#8D8D8D";
    fontcolor = "#C9C9C9";
    style = "dashed";
  ];
  node [
    fontname = "Arial";
    shape = "rect";
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
    style = "filled";
    penwidth = 0;
  ];
  "d2" [
    likec4_id = "hire.s4.d2";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">قبول شد؟</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">after: route</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#A35829";
    fontcolor = "#FFE0C2";
    color = "#7E451D";
  ];
  "reject" [
    likec4_id = "hire.s3.reject";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">پیام رد</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">skill: marketing-skills:copywriting · after:<BR/>gate</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
  ];
  "screen" [
    likec4_id = "hire.s3.screen";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">غربال رزومه‌ها</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">skill: — · out: امتیاز ۰ تا ۱۰ · after: auto</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
  ];
  "d1" [
    likec4_id = "hire.s3.d1";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">کسی ۷+ دارد؟</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">after: route</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#A35829";
    fontcolor = "#FFE0C2";
    color = "#7E451D";
  ];
  "ad" [
    likec4_id = "hire.s2.ad";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">آگهی استخدام</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">skill: marketing-skills:copywriting · out:<BR/>متن + ۳ تیتر · after: auto</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
  ];
  "d2" -> "reject" [
    likec4_id = "step-01";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>0</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">رد</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "reject" -> "screen" [
    likec4_id = "step-02";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>1</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">نفر بعدی</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "screen" -> "d1" [
    likec4_id = "step-03";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>2</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">امتیازدهی</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "d1" -> "ad" [
    likec4_id = "step-04";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>3</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">هیچ‌کس</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
}`;default:throw Error(`Unknown viewId: `+e)}},t=e=>{switch(e){case`index`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 16.1.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="688pt" height="1941pt"
 viewBox="0.00 0.00 688.00 1941.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1926.25)">
<g id="clust1" class="cluster">
<title>cluster_hire</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="8,-8 8,-1903.2 650,-1903.2 650,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-1890.3" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">استخدام فروشندهٔ درصدی</text>
</g>
<!-- s1 -->
<g id="node1" class="node">
<title>s1</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="432.02,-1842 111.98,-1842 111.98,-1662 432.02,-1662 432.02,-1842"/>
<text xml:space="preserve" text-anchor="start" x="208.09" y="-1744" font-family="Arial" font-size="20.00" fill="#eff6ff">1 · تعریف نقش</text>
</g>
<!-- s5 -->
<g id="node2" class="node">
<title>s5</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="445.02,-550.8 124.98,-550.8 124.98,-370.8 445.02,-370.8 445.02,-550.8"/>
<text xml:space="preserve" text-anchor="start" x="215.54" y="-452.8" font-family="Arial" font-size="20.00" fill="#eff6ff">5 · قرارداد 🔒</text>
</g>
<!-- s2 -->
<g id="node3" class="node">
<title>s2</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="432.02,-1519.2 111.98,-1519.2 111.98,-1339.2 432.02,-1339.2 432.02,-1519.2"/>
<text xml:space="preserve" text-anchor="start" x="238.66" y="-1421.2" font-family="Arial" font-size="20.00" fill="#eff6ff">2 · جذب</text>
</g>
<!-- s6 -->
<g id="node4" class="node">
<title>s6</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="445.02,-228 124.98,-228 124.98,-48 445.02,-48 445.02,-228"/>
<text xml:space="preserve" text-anchor="start" x="226.65" y="-130" font-family="Arial" font-size="20.00" fill="#eff6ff">6 · شروع کار</text>
</g>
<!-- s3 -->
<g id="node5" class="node">
<title>s3</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="466.02,-1196.4 145.98,-1196.4 145.98,-1016.4 466.02,-1016.4 466.02,-1196.4"/>
<text xml:space="preserve" text-anchor="start" x="261.54" y="-1098.4" font-family="Arial" font-size="20.00" fill="#eff6ff">3 · غربال</text>
</g>
<!-- s4 -->
<g id="node6" class="node">
<title>s4</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="610.02,-873.6 289.98,-873.6 289.98,-693.6 610.02,-693.6 610.02,-873.6"/>
<text xml:space="preserve" text-anchor="start" x="399.99" y="-775.6" font-family="Arial" font-size="20.00" fill="#eff6ff">4 · مصاحبه</text>
</g>
<!-- s1&#45;&gt;s2 -->
<g id="edge1" class="edge">
<title>s1&#45;&gt;s2</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M272,-1662.07C272,-1620.87 272,-1571.76 272,-1529.37"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="274.63,-1529.56 272,-1522.06 269.38,-1529.56 274.63,-1529.56"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="272,-1579.2 272,-1602 301.34,-1602 301.34,-1579.2 272,-1579.2"/>
<text xml:space="preserve" text-anchor="start" x="275" y="-1585" font-family="Arial" font-size="14.00" fill="#c9c9c9">بعد</text>
</g>
<!-- s5&#45;&gt;s6 -->
<g id="edge2" class="edge">
<title>s5&#45;&gt;s6</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M285,-370.87C285,-329.67 285,-280.56 285,-238.17"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="287.63,-238.36 285,-230.86 282.38,-238.36 287.63,-238.36"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="285,-288 285,-310.8 314.34,-310.8 314.34,-288 285,-288"/>
<text xml:space="preserve" text-anchor="start" x="288" y="-293.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">بله</text>
</g>
<!-- s5&#45;&gt;s3 -->
<g id="edge3" class="edge">
<title>s5&#45;&gt;s3</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M250.74,-550.61C236.1,-593.17 220.73,-645.29 213.44,-693.6 201.51,-772.71 198.34,-795.04 213.44,-873.6 222.15,-918.9 239.63,-966.62 257.07,-1006.9"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="254.62,-1007.86 260.04,-1013.67 259.43,-1005.75 254.62,-1007.86"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="213.44,-772.2 213.44,-795 235,-795 235,-772.2 213.44,-772.2"/>
<text xml:space="preserve" text-anchor="start" x="216.44" y="-778" font-family="Arial" font-size="14.00" fill="#c9c9c9">نه</text>
</g>
<!-- s2&#45;&gt;s3 -->
<g id="edge4" class="edge">
<title>s2&#45;&gt;s3</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M202.83,-1339.63C190.06,-1313.31 183.31,-1284.11 192.66,-1256.4 198.71,-1238.43 207.89,-1220.92 218.46,-1204.58"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="220.43,-1206.36 222.42,-1198.67 216.07,-1203.44 220.43,-1206.36"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="192.66,-1256.4 192.66,-1279.2 257,-1279.2 257,-1256.4 192.66,-1256.4"/>
<text xml:space="preserve" text-anchor="start" x="195.66" y="-1262.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">تأیید شد</text>
</g>
<!-- s3&#45;&gt;s2 -->
<g id="edge5" class="edge">
<title>s3&#45;&gt;s2</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M296.59,-1196.23C292.22,-1237.41 287.02,-1286.52 282.52,-1328.92"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="279.92,-1328.52 281.74,-1336.26 285.15,-1329.07 279.92,-1328.52"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="290.02,-1256.4 290.02,-1279.2 346.58,-1279.2 346.58,-1256.4 290.02,-1256.4"/>
<text xml:space="preserve" text-anchor="start" x="293.02" y="-1262.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">هیچ‌کس</text>
</g>
<!-- s3&#45;&gt;s4 -->
<g id="edge6" class="edge">
<title>s3&#45;&gt;s4</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M278.82,-1016.65C274.86,-989.11 275.33,-959.27 286.66,-933.6 295.05,-914.59 307.2,-896.95 321.14,-880.96"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="323,-882.82 326.09,-875.49 319.11,-879.29 323,-882.82"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="286.66,-933.6 286.66,-956.4 316,-956.4 316,-933.6 286.66,-933.6"/>
<text xml:space="preserve" text-anchor="start" x="289.66" y="-939.4" font-family="Arial" font-size="14.00" fill="#c9c9c9">بله</text>
</g>
<!-- s4&#45;&gt;s5 -->
<g id="edge7" class="edge">
<title>s4&#45;&gt;s5</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M404.26,-693.67C382.89,-652.12 357.38,-602.53 335.45,-559.9"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="337.84,-558.79 332.07,-553.32 333.17,-561.19 337.84,-558.79"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="372.45,-610.8 372.45,-633.6 409.56,-633.6 409.56,-610.8 372.45,-610.8"/>
<text xml:space="preserve" text-anchor="start" x="375.45" y="-616.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">قبول</text>
</g>
<!-- s4&#45;&gt;s3 -->
<g id="edge8" class="edge">
<title>s4&#45;&gt;s3</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M410.13,-873.43C391.52,-914.88 369.32,-964.34 350.2,-1006.93"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="347.84,-1005.79 347.16,-1013.7 352.63,-1007.94 347.84,-1005.79"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="382.32,-933.6 382.32,-956.4 403.88,-956.4 403.88,-933.6 382.32,-933.6"/>
<text xml:space="preserve" text-anchor="start" x="385.32" y="-939.4" font-family="Arial" font-size="14.00" fill="#c9c9c9">رد</text>
</g>
</g>
</svg>
`;case`s1`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 16.1.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="917pt" height="602pt"
 viewBox="0.00 0.00 917.00 602.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 587.05)">
<g id="clust1" class="cluster">
<title>cluster_s1</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="8,-282.8 8,-564 879,-564 879,-282.8 8,-282.8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-551.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">1 · تعریف نقش</text>
</g>
<!-- goal -->
<g id="node1" class="node">
<title>goal</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="380.35,-502.8 47.65,-502.8 47.65,-322.8 380.35,-322.8 380.35,-502.8"/>
<text xml:space="preserve" text-anchor="start" x="197.33" y="-424.8" font-family="Arial" font-size="20.00" fill="#eff6ff">هدف</text>
<text xml:space="preserve" text-anchor="start" x="67.71" y="-401.8" font-family="Arial" font-size="15.00" fill="#bfdbfe">skill: — · out: محصول + بازار + تعداد نفر ·</text>
<text xml:space="preserve" text-anchor="start" x="183.15" y="-383.8" font-family="Arial" font-size="15.00" fill="#bfdbfe">after: ask</text>
</g>
<!-- role -->
<g id="node2" class="node">
<title>role</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="839.02,-502.8 518.98,-502.8 518.98,-322.8 839.02,-322.8 839.02,-502.8"/>
<text xml:space="preserve" text-anchor="start" x="592.87" y="-424.8" font-family="Arial" font-size="20.00" fill="#eff6ff">شرح شغل و پورسانت</text>
<text xml:space="preserve" text-anchor="start" x="540.63" y="-401.8" font-family="Arial" font-size="15.00" fill="#bfdbfe">skill: first&#45;principles · out: وظایف + درصد +</text>
<text xml:space="preserve" text-anchor="start" x="627.32" y="-383.8" font-family="Arial" font-size="15.00" fill="#bfdbfe">سقف · after: ask</text>
</g>
<!-- s2 -->
<g id="node3" class="node">
<title>s2</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="839.02,-180 518.98,-180 518.98,0 839.02,0 839.02,-180"/>
<text xml:space="preserve" text-anchor="start" x="645.66" y="-82" font-family="Arial" font-size="20.00" fill="#eff6ff">2 · جذب</text>
</g>
<!-- goal&#45;&gt;role -->
<g id="edge1" class="edge">
<title>goal&#45;&gt;role</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M380.23,-412.8C422.02,-412.8 466.93,-412.8 508.9,-412.8"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="508.69,-415.43 516.19,-412.8 508.69,-410.18 508.69,-415.43"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="434.99,-415.8 434.99,-438.6 464.33,-438.6 464.33,-415.8 434.99,-415.8"/>
<text xml:space="preserve" text-anchor="start" x="437.99" y="-421.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">بعد</text>
</g>
<!-- role&#45;&gt;s2 -->
<g id="edge2" class="edge">
<title>role&#45;&gt;s2</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M679,-322.87C679,-281.67 679,-232.56 679,-190.17"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="681.63,-190.36 679,-182.86 676.38,-190.36 681.63,-190.36"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="679,-240 679,-262.8 708.34,-262.8 708.34,-240 679,-240"/>
<text xml:space="preserve" text-anchor="start" x="682" y="-245.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">بعد</text>
</g>
</g>
</svg>
`;case`s2`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 16.1.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="905pt" height="865pt"
 viewBox="0.00 0.00 905.00 865.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 849.85)">
<g id="clust1" class="cluster">
<title>cluster_s2</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="8,-282.8 8,-564 867,-564 867,-282.8 8,-282.8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-551.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">2 · جذب</text>
</g>
<!-- ad -->
<g id="node1" class="node">
<title>ad</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="368.02,-502.8 47.98,-502.8 47.98,-322.8 368.02,-322.8 368.02,-502.8"/>
<text xml:space="preserve" text-anchor="start" x="144.1" y="-424.8" font-family="Arial" font-size="20.00" fill="#eff6ff">آگهی استخدام</text>
<text xml:space="preserve" text-anchor="start" x="79.21" y="-401.8" font-family="Arial" font-size="15.00" fill="#bfdbfe">skill: marketing&#45;skills:copywriting · out:</text>
<text xml:space="preserve" text-anchor="start" x="121.92" y="-383.8" font-family="Arial" font-size="15.00" fill="#bfdbfe">متن + ۳ تیتر · after: auto</text>
</g>
<!-- post -->
<g id="node2" class="node">
<title>post</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="827.02,-502.8 506.98,-502.8 506.98,-322.8 827.02,-322.8 827.02,-502.8"/>
<text xml:space="preserve" text-anchor="start" x="608.66" y="-424.8" font-family="Arial" font-size="20.00" fill="#eff6ff">انتشار آگهی</text>
<text xml:space="preserve" text-anchor="start" x="556.55" y="-401.8" font-family="Arial" font-size="15.00" fill="#bfdbfe">skill: marketing&#45;skills:social · out:</text>
<text xml:space="preserve" text-anchor="start" x="539.46" y="-383.8" font-family="Arial" font-size="15.00" fill="#bfdbfe">پیش‌نویس، بدون انتشار · after: gate</text>
</g>
<!-- s1 -->
<g id="node3" class="node">
<title>s1</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="368.02,-834.8 47.98,-834.8 47.98,-654.8 368.02,-654.8 368.02,-834.8"/>
<text xml:space="preserve" text-anchor="start" x="144.09" y="-736.8" font-family="Arial" font-size="20.00" fill="#eff6ff">1 · تعریف نقش</text>
</g>
<!-- s3 -->
<g id="node4" class="node">
<title>s3</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="633.02,-180 312.98,-180 312.98,0 633.02,0 633.02,-180"/>
<text xml:space="preserve" text-anchor="start" x="428.54" y="-82" font-family="Arial" font-size="20.00" fill="#eff6ff">3 · غربال</text>
</g>
<!-- ad&#45;&gt;post -->
<g id="edge3" class="edge">
<title>ad&#45;&gt;post</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M367.89,-412.8C409.6,-412.8 454.7,-412.8 496.91,-412.8"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="496.77,-415.43 504.27,-412.8 496.77,-410.18 496.77,-415.43"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="422.83,-415.8 422.83,-438.6 452.17,-438.6 452.17,-415.8 422.83,-415.8"/>
<text xml:space="preserve" text-anchor="start" x="425.83" y="-421.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">بعد</text>
</g>
<!-- post&#45;&gt;s3 -->
<g id="edge4" class="edge">
<title>post&#45;&gt;s3</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M613.22,-322.87C588.04,-281.23 557.98,-231.52 532.16,-188.83"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="534.41,-187.48 528.29,-182.42 529.92,-190.2 534.41,-187.48"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="575.82,-240 575.82,-262.8 640.16,-262.8 640.16,-240 575.82,-240"/>
<text xml:space="preserve" text-anchor="start" x="578.82" y="-245.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">تأیید شد</text>
</g>
<!-- s1&#45;&gt;ad -->
<g id="edge1" class="edge">
<title>s1&#45;&gt;ad</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M208,-654.93C208,-611.1 208,-558.08 208,-512.94"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="210.63,-513.07 208,-505.57 205.38,-513.07 210.63,-513.07"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="208,-572 208,-594.8 237.34,-594.8 237.34,-572 208,-572"/>
<text xml:space="preserve" text-anchor="start" x="211" y="-577.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">بعد</text>
</g>
<!-- s3&#45;&gt;ad -->
<g id="edge2" class="edge">
<title>s3&#45;&gt;ad</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M399.62,-179.83C364.95,-221.8 323.49,-271.99 288.02,-314.93"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="286.15,-313.08 283.39,-320.53 290.19,-316.42 286.15,-313.08"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="348.45,-240 348.45,-262.8 405.01,-262.8 405.01,-240 348.45,-240"/>
<text xml:space="preserve" text-anchor="start" x="351.45" y="-245.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">هیچ‌کس</text>
</g>
</g>
</svg>
`;case`s3`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 16.1.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1015pt" height="1248pt"
 viewBox="0.00 0.00 1015.00 1248.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1232.65)">
<g id="clust1" class="cluster">
<title>cluster_s3</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="195.02,-282.8 195.02,-1209.6 595.02,-1209.6 595.02,-282.8 195.02,-282.8"/>
<text xml:space="preserve" text-anchor="start" x="203.02" y="-1196.7" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">3 · غربال</text>
</g>
<!-- reject -->
<g id="node1" class="node">
<title>reject</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="555.04,-1148.4 235,-1148.4 235,-968.4 555.04,-968.4 555.04,-1148.4"/>
<text xml:space="preserve" text-anchor="start" x="358.9" y="-1070.4" font-family="Arial" font-size="20.00" fill="#eff6ff">پیام رد</text>
<text xml:space="preserve" text-anchor="start" x="261.65" y="-1047.4" font-family="Arial" font-size="15.00" fill="#bfdbfe">skill: marketing&#45;skills:copywriting · after:</text>
<text xml:space="preserve" text-anchor="start" x="380.42" y="-1029.4" font-family="Arial" font-size="15.00" fill="#bfdbfe">gate</text>
</g>
<!-- screen -->
<g id="node2" class="node">
<title>screen</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="555.12,-825.6 234.92,-825.6 234.92,-645.6 555.12,-645.6 555.12,-825.6"/>
<text xml:space="preserve" text-anchor="start" x="317.23" y="-738.6" font-family="Arial" font-size="20.00" fill="#eff6ff">غربال رزومه‌ها</text>
<text xml:space="preserve" text-anchor="start" x="254.97" y="-715.6" font-family="Arial" font-size="15.00" fill="#bfdbfe">skill: — · out: امتیاز ۰ تا ۱۰ · after: auto</text>
</g>
<!-- d1 -->
<g id="node3" class="node">
<title>d1</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="555.04,-502.8 235,-502.8 235,-322.8 555.04,-322.8 555.04,-502.8"/>
<text xml:space="preserve" text-anchor="start" x="333.61" y="-415.8" font-family="Arial" font-size="20.00" fill="#ffe0c2">کسی ۷+ دارد؟</text>
<text xml:space="preserve" text-anchor="start" x="358.75" y="-392.8" font-family="Arial" font-size="15.00" fill="#f9b27c">after: route</text>
</g>
<!-- s2 -->
<g id="node4" class="node">
<title>s2</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="842.04,-180 522,-180 522,0 842.04,0 842.04,-180"/>
<text xml:space="preserve" text-anchor="start" x="648.68" y="-82" font-family="Arial" font-size="20.00" fill="#eff6ff">2 · جذب</text>
</g>
<!-- s4 -->
<g id="node5" class="node">
<title>s4</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="320.04,-180 0,-180 0,0 320.04,0 320.04,-180"/>
<text xml:space="preserve" text-anchor="start" x="110.01" y="-82" font-family="Arial" font-size="20.00" fill="#eff6ff">4 · مصاحبه</text>
</g>
<!-- s5 -->
<g id="node6" class="node">
<title>s5</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="985.04,-1148.4 665,-1148.4 665,-968.4 985.04,-968.4 985.04,-1148.4"/>
<text xml:space="preserve" text-anchor="start" x="755.56" y="-1050.4" font-family="Arial" font-size="20.00" fill="#eff6ff">5 · قرارداد 🔒</text>
</g>
<!-- reject&#45;&gt;screen -->
<g id="edge4" class="edge">
<title>reject&#45;&gt;screen</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M395.02,-968.47C395.02,-927.27 395.02,-878.16 395.02,-835.77"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="397.65,-835.96 395.02,-828.46 392.4,-835.96 397.65,-835.96"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="395.02,-885.6 395.02,-908.4 459.36,-908.4 459.36,-885.6 395.02,-885.6"/>
<text xml:space="preserve" text-anchor="start" x="398.02" y="-891.4" font-family="Arial" font-size="14.00" fill="#c9c9c9">نفر بعدی</text>
</g>
<!-- screen&#45;&gt;d1 -->
<g id="edge5" class="edge">
<title>screen&#45;&gt;d1</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M395.02,-645.67C395.02,-604.47 395.02,-555.36 395.02,-512.97"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="397.65,-513.16 395.02,-505.66 392.4,-513.16 397.65,-513.16"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="395.02,-562.8 395.02,-585.6 424.36,-585.6 424.36,-562.8 395.02,-562.8"/>
<text xml:space="preserve" text-anchor="start" x="398.02" y="-568.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">بعد</text>
</g>
<!-- d1&#45;&gt;s2 -->
<g id="edge6" class="edge">
<title>d1&#45;&gt;s2</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M474.58,-322.87C512.22,-280.8 557.23,-230.48 595.7,-187.49"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="597.49,-189.43 600.53,-182.09 593.57,-185.92 597.49,-189.43"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="547.13,-240 547.13,-262.8 603.69,-262.8 603.69,-240 547.13,-240"/>
<text xml:space="preserve" text-anchor="start" x="550.13" y="-245.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">هیچ‌کس</text>
</g>
<!-- d1&#45;&gt;s4 -->
<g id="edge7" class="edge">
<title>d1&#45;&gt;s4</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M329.87,-322.87C299.25,-281.06 262.65,-231.11 231.29,-188.29"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="233.43,-186.77 226.88,-182.27 229.19,-189.87 233.43,-186.77"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="284.57,-240 284.57,-262.8 313.9,-262.8 313.9,-240 284.57,-240"/>
<text xml:space="preserve" text-anchor="start" x="287.57" y="-245.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">بله</text>
</g>
<!-- s2&#45;&gt;screen -->
<g id="edge1" class="edge">
<title>s2&#45;&gt;screen</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M680.89,-179.85C676.56,-266.44 661.14,-399.75 610.02,-502.8 585.05,-553.14 545.67,-600.29 507.39,-638.75"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="505.88,-636.55 502.41,-643.7 509.58,-640.27 505.88,-636.55"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="671.03,-401.4 671.03,-424.2 735.37,-424.2 735.37,-401.4 671.03,-401.4"/>
<text xml:space="preserve" text-anchor="start" x="674.03" y="-407.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">تأیید شد</text>
</g>
<!-- s4&#45;&gt;reject -->
<g id="edge2" class="edge">
<title>s4&#45;&gt;reject</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M143.01,-179.9C119.94,-322.3 91.07,-607.67 180.02,-825.6 200.91,-876.79 238.65,-923.58 276.74,-961.52"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="274.5,-963 281.7,-966.37 278.18,-959.25 274.5,-963"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="124.48,-562.8 124.48,-585.6 146.04,-585.6 146.04,-562.8 124.48,-562.8"/>
<text xml:space="preserve" text-anchor="start" x="127.48" y="-568.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">رد</text>
</g>
<!-- s5&#45;&gt;screen -->
<g id="edge3" class="edge">
<title>s5&#45;&gt;screen</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M705.81,-968.47C648.72,-925.87 580.3,-874.83 522.21,-831.49"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="524.09,-829.62 516.51,-827.24 520.95,-833.83 524.09,-829.62"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="622.91,-885.6 622.91,-908.4 644.47,-908.4 644.47,-885.6 622.91,-885.6"/>
<text xml:space="preserve" text-anchor="start" x="625.91" y="-891.4" font-family="Arial" font-size="14.00" fill="#c9c9c9">نه</text>
</g>
</g>
</svg>
`;case`s4`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 16.1.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="780pt" height="1248pt"
 viewBox="0.00 0.00 780.00 1248.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1232.65)">
<g id="clust1" class="cluster">
<title>cluster_s4</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="64.02,-282.8 64.02,-1209.6 464.02,-1209.6 464.02,-282.8 64.02,-282.8"/>
<text xml:space="preserve" text-anchor="start" x="72.02" y="-1196.7" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">4 · مصاحبه</text>
</g>
<!-- qs -->
<g id="node1" class="node">
<title>qs</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="424.04,-1148.4 104,-1148.4 104,-968.4 424.04,-968.4 424.04,-1148.4"/>
<text xml:space="preserve" text-anchor="start" x="152.6" y="-1070.4" font-family="Arial" font-size="20.00" fill="#eff6ff">سؤال‌ها + نقش‌آفرینی</text>
<text xml:space="preserve" text-anchor="start" x="135.86" y="-1047.4" font-family="Arial" font-size="15.00" fill="#bfdbfe">skill: grilling · out: ۱۰ سؤال + سناریو ·</text>
<text xml:space="preserve" text-anchor="start" x="230.25" y="-1029.4" font-family="Arial" font-size="15.00" fill="#bfdbfe">after: auto</text>
</g>
<!-- iv -->
<g id="node2" class="node">
<title>iv</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="424.04,-825.6 104,-825.6 104,-645.6 424.04,-645.6 424.04,-825.6"/>
<text xml:space="preserve" text-anchor="start" x="197.34" y="-738.6" font-family="Arial" font-size="20.00" fill="#eff6ff">مصاحبه و نمره</text>
<text xml:space="preserve" text-anchor="start" x="128.98" y="-715.6" font-family="Arial" font-size="15.00" fill="#bfdbfe">skill: — · out: نمرهٔ هر سؤال · after: ask</text>
</g>
<!-- d2 -->
<g id="node3" class="node">
<title>d2</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="424.04,-502.8 104,-502.8 104,-322.8 424.04,-322.8 424.04,-502.8"/>
<text xml:space="preserve" text-anchor="start" x="222.35" y="-415.8" font-family="Arial" font-size="20.00" fill="#ffe0c2">قبول شد؟</text>
<text xml:space="preserve" text-anchor="start" x="227.75" y="-392.8" font-family="Arial" font-size="15.00" fill="#f9b27c">after: route</text>
</g>
<!-- s3 -->
<g id="node4" class="node">
<title>s3</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="750.04,-180 430,-180 430,0 750.04,0 750.04,-180"/>
<text xml:space="preserve" text-anchor="start" x="545.56" y="-82" font-family="Arial" font-size="20.00" fill="#eff6ff">3 · غربال</text>
</g>
<!-- s5 -->
<g id="node5" class="node">
<title>s5</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="320.04,-180 0,-180 0,0 320.04,0 320.04,-180"/>
<text xml:space="preserve" text-anchor="start" x="90.56" y="-82" font-family="Arial" font-size="20.00" fill="#eff6ff">5 · قرارداد 🔒</text>
</g>
<!-- qs&#45;&gt;iv -->
<g id="edge2" class="edge">
<title>qs&#45;&gt;iv</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M264.02,-968.47C264.02,-927.27 264.02,-878.16 264.02,-835.77"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="266.65,-835.96 264.02,-828.46 261.4,-835.96 266.65,-835.96"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="264.02,-885.6 264.02,-908.4 293.36,-908.4 293.36,-885.6 264.02,-885.6"/>
<text xml:space="preserve" text-anchor="start" x="267.02" y="-891.4" font-family="Arial" font-size="14.00" fill="#c9c9c9">بعد</text>
</g>
<!-- iv&#45;&gt;d2 -->
<g id="edge3" class="edge">
<title>iv&#45;&gt;d2</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M264.02,-645.67C264.02,-604.47 264.02,-555.36 264.02,-512.97"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="266.65,-513.16 264.02,-505.66 261.4,-513.16 266.65,-513.16"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="264.02,-562.8 264.02,-585.6 293.36,-585.6 293.36,-562.8 264.02,-562.8"/>
<text xml:space="preserve" text-anchor="start" x="267.02" y="-568.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">بعد</text>
</g>
<!-- d2&#45;&gt;s3 -->
<g id="edge4" class="edge">
<title>d2&#45;&gt;s3</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M354.4,-322.87C397.32,-280.62 448.7,-230.07 492.51,-186.96"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="494.09,-189.08 497.59,-181.95 490.41,-185.34 494.09,-189.08"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="436.79,-240 436.79,-262.8 458.35,-262.8 458.35,-240 436.79,-240"/>
<text xml:space="preserve" text-anchor="start" x="439.79" y="-245.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">رد</text>
</g>
<!-- d2&#45;&gt;s5 -->
<g id="edge5" class="edge">
<title>d2&#45;&gt;s5</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M235.19,-322.87C221.78,-281.49 205.78,-232.15 192,-189.63"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="194.56,-189.03 189.75,-182.71 189.57,-190.65 194.56,-189.03"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="215.14,-240 215.14,-262.8 252.26,-262.8 252.26,-240 215.14,-240"/>
<text xml:space="preserve" text-anchor="start" x="218.14" y="-245.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">قبول</text>
</g>
<!-- s3&#45;&gt;qs -->
<g id="edge1" class="edge">
<title>s3&#45;&gt;qs</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M593.04,-179.86C594.41,-323.11 582.5,-610.77 479.02,-825.6 454.69,-876.11 415.55,-923.22 377.29,-961.59"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="375.79,-959.38 372.31,-966.52 379.48,-963.11 375.79,-959.38"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="560.63,-562.8 560.63,-585.6 589.97,-585.6 589.97,-562.8 560.63,-562.8"/>
<text xml:space="preserve" text-anchor="start" x="563.63" y="-568.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">بله</text>
</g>
</g>
</svg>
`;case`s5`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 16.1.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1072pt" height="865pt"
 viewBox="0.00 0.00 1072.00 865.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 849.85)">
<g id="clust1" class="cluster">
<title>cluster_s5</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="8,-282.8 8,-564 867,-564 867,-282.8 8,-282.8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-551.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">5 · قرارداد 🔒</text>
</g>
<!-- offer -->
<g id="node1" class="node">
<title>offer</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="368.02,-502.8 47.98,-502.8 47.98,-322.8 368.02,-322.8 368.02,-502.8"/>
<text xml:space="preserve" text-anchor="start" x="138.54" y="-424.8" font-family="Arial" font-size="20.00" fill="#eff6ff">قرارداد درصدی</text>
<text xml:space="preserve" text-anchor="start" x="102.96" y="-401.8" font-family="Arial" font-size="15.00" fill="#bfdbfe">skill: anthropic&#45;skills:docx · out:</text>
<text xml:space="preserve" text-anchor="start" x="118.79" y="-383.8" font-family="Arial" font-size="15.00" fill="#bfdbfe">قرارداد.docx · after: gate</text>
</g>
<!-- d3 -->
<g id="node2" class="node">
<title>d3</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="827.02,-502.8 506.98,-502.8 506.98,-322.8 827.02,-322.8 827.02,-502.8"/>
<text xml:space="preserve" text-anchor="start" x="628.1" y="-415.8" font-family="Arial" font-size="20.00" fill="#ffe0c2">پذیرفت؟</text>
<text xml:space="preserve" text-anchor="start" x="633.23" y="-392.8" font-family="Arial" font-size="15.00" fill="#f9b27c">after: gate</text>
</g>
<!-- s4 -->
<g id="node3" class="node">
<title>s4</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="368.02,-834.8 47.98,-834.8 47.98,-654.8 368.02,-654.8 368.02,-834.8"/>
<text xml:space="preserve" text-anchor="start" x="157.99" y="-736.8" font-family="Arial" font-size="20.00" fill="#eff6ff">4 · مصاحبه</text>
</g>
<!-- s3 -->
<g id="node4" class="node">
<title>s3</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="612.02,-180 291.98,-180 291.98,0 612.02,0 612.02,-180"/>
<text xml:space="preserve" text-anchor="start" x="407.54" y="-82" font-family="Arial" font-size="20.00" fill="#eff6ff">3 · غربال</text>
</g>
<!-- s6 -->
<g id="node5" class="node">
<title>s6</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1042.02,-180 721.98,-180 721.98,0 1042.02,0 1042.02,-180"/>
<text xml:space="preserve" text-anchor="start" x="823.65" y="-82" font-family="Arial" font-size="20.00" fill="#eff6ff">6 · شروع کار</text>
</g>
<!-- offer&#45;&gt;d3 -->
<g id="edge2" class="edge">
<title>offer&#45;&gt;d3</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M367.89,-412.8C409.6,-412.8 454.7,-412.8 496.91,-412.8"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="496.77,-415.43 504.27,-412.8 496.77,-410.18 496.77,-415.43"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="422.83,-415.8 422.83,-438.6 452.17,-438.6 452.17,-415.8 422.83,-415.8"/>
<text xml:space="preserve" text-anchor="start" x="425.83" y="-421.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">بعد</text>
</g>
<!-- d3&#45;&gt;s3 -->
<g id="edge3" class="edge">
<title>d3&#45;&gt;s3</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M607.4,-322.87C579.43,-281.14 546.04,-231.31 517.38,-188.56"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="519.57,-187.11 513.22,-182.34 515.21,-190.04 519.57,-187.11"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="565.95,-240 565.95,-262.8 587.51,-262.8 587.51,-240 565.95,-240"/>
<text xml:space="preserve" text-anchor="start" x="568.95" y="-245.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">نه</text>
</g>
<!-- d3&#45;&gt;s6 -->
<g id="edge4" class="edge">
<title>d3&#45;&gt;s6</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M726.6,-322.87C754.57,-281.14 787.96,-231.31 816.62,-188.56"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="818.79,-190.04 820.78,-182.34 814.43,-187.11 818.79,-190.04"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="780.95,-240 780.95,-262.8 810.28,-262.8 810.28,-240 780.95,-240"/>
<text xml:space="preserve" text-anchor="start" x="783.95" y="-245.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">بله</text>
</g>
<!-- s4&#45;&gt;offer -->
<g id="edge1" class="edge">
<title>s4&#45;&gt;offer</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M208,-654.93C208,-611.1 208,-558.08 208,-512.94"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="210.63,-513.07 208,-505.57 205.38,-513.07 210.63,-513.07"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="208,-572 208,-594.8 245.12,-594.8 245.12,-572 208,-572"/>
<text xml:space="preserve" text-anchor="start" x="211" y="-577.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">قبول</text>
</g>
</g>
</svg>
`;case`s6`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 16.1.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="916pt" height="590pt"
 viewBox="0.00 0.00 916.00 590.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 575.05)">
<g id="clust1" class="cluster">
<title>cluster_s6</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="8,-8 8,-289.2 878,-289.2 878,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-276.3" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">6 · شروع کار</text>
</g>
<!-- kit -->
<g id="node1" class="node">
<title>kit</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="368.02,-228 47.98,-228 47.98,-48 368.02,-48 368.02,-228"/>
<text xml:space="preserve" text-anchor="start" x="166.33" y="-150" font-family="Arial" font-size="20.00" fill="#eff6ff">کیت فروش</text>
<text xml:space="preserve" text-anchor="start" x="72.12" y="-127" font-family="Arial" font-size="15.00" fill="#bfdbfe">skill: marketing&#45;skills:sales&#45;enablement ·</text>
<text xml:space="preserve" text-anchor="start" x="174.23" y="-109" font-family="Arial" font-size="15.00" fill="#bfdbfe">after: auto</text>
</g>
<!-- kpi -->
<g id="node2" class="node">
<title>kpi</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="837.72,-228 506.28,-228 506.28,-48 837.72,-48 837.72,-228"/>
<text xml:space="preserve" text-anchor="start" x="621.99" y="-141" font-family="Arial" font-size="20.00" fill="#eff6ff">هدف ۳۰ روز</text>
<text xml:space="preserve" text-anchor="start" x="526.33" y="-118" font-family="Arial" font-size="15.00" fill="#bfdbfe">skill: — · out: فروش + نرخ تبدیل · after: ask</text>
</g>
<!-- s5 -->
<g id="node3" class="node">
<title>s5</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="368.02,-560 47.98,-560 47.98,-380 368.02,-380 368.02,-560"/>
<text xml:space="preserve" text-anchor="start" x="138.54" y="-462" font-family="Arial" font-size="20.00" fill="#eff6ff">5 · قرارداد 🔒</text>
</g>
<!-- kit&#45;&gt;kpi -->
<g id="edge2" class="edge">
<title>kit&#45;&gt;kpi</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M368.01,-138C409.28,-138 453.93,-138 495.98,-138"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="495.79,-140.63 503.29,-138 495.79,-135.38 495.79,-140.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="422.48,-141 422.48,-163.8 451.82,-163.8 451.82,-141 422.48,-141"/>
<text xml:space="preserve" text-anchor="start" x="425.48" y="-146.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">بعد</text>
</g>
<!-- s5&#45;&gt;kit -->
<g id="edge1" class="edge">
<title>s5&#45;&gt;kit</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M208,-380.13C208,-336.3 208,-283.28 208,-238.14"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="210.63,-238.27 208,-230.77 205.38,-238.27 210.63,-238.27"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="208,-297.2 208,-320 237.34,-320 237.34,-297.2 208,-297.2"/>
<text xml:space="preserve" text-anchor="start" x="211" y="-303" font-family="Arial" font-size="14.00" fill="#c9c9c9">بله</text>
</g>
</g>
</svg>
`;case`workflow`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 16.1.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="6611pt" height="327pt"
 viewBox="0.00 0.00 6611.00 327.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 312.05)">
<g id="clust1" class="cluster">
<title>cluster_s1</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="8,-8 8,-289 923.07,-289 923.07,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-276.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">1 · تعریف نقش</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_s2</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="1025.41,-8 1025.41,-289 1927.83,-289 1927.83,-8 1025.41,-8"/>
<text xml:space="preserve" text-anchor="start" x="1033.41" y="-276.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">2 · جذب</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_s3</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="2065.17,-8 2065.17,-289 3014.43,-289 3014.43,-8 2065.17,-8"/>
<text xml:space="preserve" text-anchor="start" x="2073.17" y="-276.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">3 · غربال</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_s4</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="3116.77,-8 3116.77,-289 4529.34,-289 4529.34,-8 3116.77,-8"/>
<text xml:space="preserve" text-anchor="start" x="3124.77" y="-276.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">4 · مصاحبه</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_s5</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="4639.46,-8 4639.46,-289 5541.88,-289 5541.88,-8 4639.46,-8"/>
<text xml:space="preserve" text-anchor="start" x="4647.46" y="-276.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">5 · قرارداد 🔒</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_s6</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="5651.79,-8 5651.79,-289 6573.19,-289 6573.19,-8 5651.79,-8"/>
<text xml:space="preserve" text-anchor="start" x="5659.79" y="-276.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">6 · شروع کار</text>
</g>
<!-- goal -->
<g id="node1" class="node">
<title>goal</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="380.69,-228 48,-228 48,-48 380.69,-48 380.69,-228"/>
<text xml:space="preserve" text-anchor="start" x="197.68" y="-150" font-family="Arial" font-size="20.00" fill="#eff6ff">هدف</text>
<text xml:space="preserve" text-anchor="start" x="68.06" y="-127" font-family="Arial" font-size="15.00" fill="#bfdbfe">skill: — · out: محصول + بازار + تعداد نفر ·</text>
<text xml:space="preserve" text-anchor="start" x="183.5" y="-109" font-family="Arial" font-size="15.00" fill="#bfdbfe">after: ask</text>
</g>
<!-- role -->
<g id="node2" class="node">
<title>role</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="883.07,-228 563.03,-228 563.03,-48 883.07,-48 883.07,-228"/>
<text xml:space="preserve" text-anchor="start" x="636.92" y="-150" font-family="Arial" font-size="20.00" fill="#eff6ff">شرح شغل و پورسانت</text>
<text xml:space="preserve" text-anchor="start" x="584.68" y="-127" font-family="Arial" font-size="15.00" fill="#bfdbfe">skill: first&#45;principles · out: وظایف + درصد +</text>
<text xml:space="preserve" text-anchor="start" x="671.37" y="-109" font-family="Arial" font-size="15.00" fill="#bfdbfe">سقف · after: ask</text>
</g>
<!-- ad -->
<g id="node3" class="node">
<title>ad</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1385.45,-228 1065.41,-228 1065.41,-48 1385.45,-48 1385.45,-228"/>
<text xml:space="preserve" text-anchor="start" x="1161.53" y="-150" font-family="Arial" font-size="20.00" fill="#eff6ff">آگهی استخدام</text>
<text xml:space="preserve" text-anchor="start" x="1096.64" y="-127" font-family="Arial" font-size="15.00" fill="#bfdbfe">skill: marketing&#45;skills:copywriting · out:</text>
<text xml:space="preserve" text-anchor="start" x="1139.35" y="-109" font-family="Arial" font-size="15.00" fill="#bfdbfe">متن + ۳ تیتر · after: auto</text>
</g>
<!-- post -->
<g id="node4" class="node">
<title>post</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1887.83,-228 1567.79,-228 1567.79,-48 1887.83,-48 1887.83,-228"/>
<text xml:space="preserve" text-anchor="start" x="1669.46" y="-150" font-family="Arial" font-size="20.00" fill="#eff6ff">انتشار آگهی</text>
<text xml:space="preserve" text-anchor="start" x="1617.36" y="-127" font-family="Arial" font-size="15.00" fill="#bfdbfe">skill: marketing&#45;skills:social · out:</text>
<text xml:space="preserve" text-anchor="start" x="1600.27" y="-109" font-family="Arial" font-size="15.00" fill="#bfdbfe">پیش‌نویس، بدون انتشار · after: gate</text>
</g>
<!-- screen -->
<g id="node5" class="node">
<title>screen</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="2425.38,-228 2105.17,-228 2105.17,-48 2425.38,-48 2425.38,-228"/>
<text xml:space="preserve" text-anchor="start" x="2187.48" y="-141" font-family="Arial" font-size="20.00" fill="#eff6ff">غربال رزومه‌ها</text>
<text xml:space="preserve" text-anchor="start" x="2125.23" y="-118" font-family="Arial" font-size="15.00" fill="#bfdbfe">skill: — · out: امتیاز ۰ تا ۱۰ · after: auto</text>
</g>
<!-- d1 -->
<g id="node6" class="node">
<title>d1</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="2974.43,-228 2654.39,-228 2654.39,-48 2974.43,-48 2974.43,-228"/>
<text xml:space="preserve" text-anchor="start" x="2753" y="-141" font-family="Arial" font-size="20.00" fill="#ffe0c2">کسی ۷+ دارد؟</text>
<text xml:space="preserve" text-anchor="start" x="2778.14" y="-118" font-family="Arial" font-size="15.00" fill="#f9b27c">after: route</text>
</g>
<!-- qs -->
<g id="node7" class="node">
<title>qs</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="3476.81,-228 3156.77,-228 3156.77,-48 3476.81,-48 3476.81,-228"/>
<text xml:space="preserve" text-anchor="start" x="3205.37" y="-150" font-family="Arial" font-size="20.00" fill="#eff6ff">سؤال‌ها + نقش‌آفرینی</text>
<text xml:space="preserve" text-anchor="start" x="3188.62" y="-127" font-family="Arial" font-size="15.00" fill="#bfdbfe">skill: grilling · out: ۱۰ سؤال + سناریو ·</text>
<text xml:space="preserve" text-anchor="start" x="3283.02" y="-109" font-family="Arial" font-size="15.00" fill="#bfdbfe">after: auto</text>
</g>
<!-- iv -->
<g id="node8" class="node">
<title>iv</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="3979.19,-228 3659.15,-228 3659.15,-48 3979.19,-48 3979.19,-228"/>
<text xml:space="preserve" text-anchor="start" x="3752.49" y="-141" font-family="Arial" font-size="20.00" fill="#eff6ff">مصاحبه و نمره</text>
<text xml:space="preserve" text-anchor="start" x="3684.13" y="-118" font-family="Arial" font-size="15.00" fill="#bfdbfe">skill: — · out: نمرهٔ هر سؤال · after: ask</text>
</g>
<!-- d2 -->
<g id="node9" class="node">
<title>d2</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="4489.34,-228 4169.3,-228 4169.3,-48 4489.34,-48 4489.34,-228"/>
<text xml:space="preserve" text-anchor="start" x="4287.65" y="-141" font-family="Arial" font-size="20.00" fill="#ffe0c2">قبول شد؟</text>
<text xml:space="preserve" text-anchor="start" x="4293.05" y="-118" font-family="Arial" font-size="15.00" fill="#f9b27c">after: route</text>
</g>
<!-- offer -->
<g id="node10" class="node">
<title>offer</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="4999.5,-228 4679.46,-228 4679.46,-48 4999.5,-48 4999.5,-228"/>
<text xml:space="preserve" text-anchor="start" x="4770.02" y="-150" font-family="Arial" font-size="20.00" fill="#eff6ff">قرارداد درصدی</text>
<text xml:space="preserve" text-anchor="start" x="4734.44" y="-127" font-family="Arial" font-size="15.00" fill="#bfdbfe">skill: anthropic&#45;skills:docx · out:</text>
<text xml:space="preserve" text-anchor="start" x="4750.27" y="-109" font-family="Arial" font-size="15.00" fill="#bfdbfe">قرارداد.docx · after: gate</text>
</g>
<!-- d3 -->
<g id="node11" class="node">
<title>d3</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="5501.88,-228 5181.84,-228 5181.84,-48 5501.88,-48 5501.88,-228"/>
<text xml:space="preserve" text-anchor="start" x="5302.96" y="-141" font-family="Arial" font-size="20.00" fill="#ffe0c2">پذیرفت؟</text>
<text xml:space="preserve" text-anchor="start" x="5308.09" y="-118" font-family="Arial" font-size="15.00" fill="#f9b27c">after: gate</text>
</g>
<!-- kit -->
<g id="node12" class="node">
<title>kit</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="6011.83,-228 5691.79,-228 5691.79,-48 6011.83,-48 6011.83,-228"/>
<text xml:space="preserve" text-anchor="start" x="5810.13" y="-150" font-family="Arial" font-size="20.00" fill="#eff6ff">کیت فروش</text>
<text xml:space="preserve" text-anchor="start" x="5715.93" y="-127" font-family="Arial" font-size="15.00" fill="#bfdbfe">skill: marketing&#45;skills:sales&#45;enablement ·</text>
<text xml:space="preserve" text-anchor="start" x="5818.04" y="-109" font-family="Arial" font-size="15.00" fill="#bfdbfe">after: auto</text>
</g>
<!-- kpi -->
<g id="node13" class="node">
<title>kpi</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="6533.19,-228 6201.74,-228 6201.74,-48 6533.19,-48 6533.19,-228"/>
<text xml:space="preserve" text-anchor="start" x="6317.45" y="-141" font-family="Arial" font-size="20.00" fill="#eff6ff">هدف ۳۰ روز</text>
<text xml:space="preserve" text-anchor="start" x="6221.79" y="-118" font-family="Arial" font-size="15.00" fill="#bfdbfe">skill: — · out: فروش + نرخ تبدیل · after: ask</text>
</g>
<!-- goal&#45;&gt;role -->
<g id="edge1" class="edge">
<title>goal&#45;&gt;role</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M380.56,-138C435.75,-138 497.32,-138 552.81,-138"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="552.57,-140.63 560.07,-138 552.57,-135.38 552.57,-140.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="443.69,-141 443.69,-173.8 467.69,-173.8 467.69,-141 443.69,-141"/>
<text xml:space="preserve" text-anchor="start" x="451.8" y="-154.2" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">0</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="470.69,-141 470.69,-173.8 500.03,-173.8 500.03,-141 470.69,-141"/>
<text xml:space="preserve" text-anchor="start" x="473.69" y="-151.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">بعد</text>
</g>
<!-- role&#45;&gt;ad -->
<g id="edge2" class="edge">
<title>role&#45;&gt;ad</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M883.06,-138C938.02,-138 999.78,-138 1055.5,-138"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1055.3,-140.63 1062.8,-138 1055.3,-135.38 1055.3,-140.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="946.07,-141 946.07,-173.8 970.07,-173.8 970.07,-141 946.07,-141"/>
<text xml:space="preserve" text-anchor="start" x="954.18" y="-154.2" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">1</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="973.07,-141 973.07,-173.8 1002.41,-173.8 1002.41,-141 973.07,-141"/>
<text xml:space="preserve" text-anchor="start" x="976.07" y="-151.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">بعد</text>
</g>
<!-- ad&#45;&gt;post -->
<g id="edge3" class="edge">
<title>ad&#45;&gt;post</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1385.44,-138C1440.4,-138 1502.15,-138 1557.88,-138"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1557.68,-140.63 1565.18,-138 1557.68,-135.38 1557.68,-140.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1448.45,-141 1448.45,-173.8 1472.45,-173.8 1472.45,-141 1448.45,-141"/>
<text xml:space="preserve" text-anchor="start" x="1456.56" y="-154.2" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">2</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1475.45,-141 1475.45,-173.8 1504.79,-173.8 1504.79,-141 1475.45,-141"/>
<text xml:space="preserve" text-anchor="start" x="1478.45" y="-151.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">بعد</text>
</g>
<!-- post&#45;&gt;screen -->
<g id="edge4" class="edge">
<title>post&#45;&gt;screen</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1887.65,-138C1953.05,-138 2028.91,-138 2095.32,-138"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2094.95,-140.63 2102.45,-138 2094.95,-135.38 2094.95,-140.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1950.83,-141 1950.83,-173.8 1974.83,-173.8 1974.83,-141 1950.83,-141"/>
<text xml:space="preserve" text-anchor="start" x="1958.93" y="-154.2" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">3</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1977.83,-141 1977.83,-173.8 2042.17,-173.8 2042.17,-141 1977.83,-141"/>
<text xml:space="preserve" text-anchor="start" x="1980.83" y="-151.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">تأیید شد</text>
</g>
<!-- screen&#45;&gt;d1 -->
<g id="edge5" class="edge">
<title>screen&#45;&gt;d1</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M2425.26,-138C2493.98,-138 2574.47,-138 2644.28,-138"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2643.97,-140.63 2651.47,-138 2643.97,-135.38 2643.97,-140.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2488.38,-141 2488.38,-173.8 2512.38,-173.8 2512.38,-141 2488.38,-141"/>
<text xml:space="preserve" text-anchor="start" x="2496.48" y="-154.2" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">4</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2515.38,-141 2515.38,-173.8 2591.39,-173.8 2591.39,-141 2515.38,-141"/>
<text xml:space="preserve" text-anchor="start" x="2518.38" y="-151.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">امتیازدهی</text>
</g>
<!-- d1&#45;&gt;qs -->
<g id="edge6" class="edge">
<title>d1&#45;&gt;qs</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M2974.42,-138C3029.38,-138 3091.13,-138 3146.86,-138"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="3146.66,-140.63 3154.16,-138 3146.66,-135.38 3146.66,-140.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="3037.43,-141 3037.43,-173.8 3061.43,-173.8 3061.43,-141 3037.43,-141"/>
<text xml:space="preserve" text-anchor="start" x="3045.54" y="-154.2" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">5</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="3064.43,-141 3064.43,-173.8 3093.77,-173.8 3093.77,-141 3064.43,-141"/>
<text xml:space="preserve" text-anchor="start" x="3067.43" y="-151.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">بله</text>
</g>
<!-- qs&#45;&gt;iv -->
<g id="edge7" class="edge">
<title>qs&#45;&gt;iv</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M3476.8,-138C3531.76,-138 3593.51,-138 3649.24,-138"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="3649.04,-140.63 3656.54,-138 3649.04,-135.38 3649.04,-140.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="3539.81,-141 3539.81,-173.8 3563.81,-173.8 3563.81,-141 3539.81,-141"/>
<text xml:space="preserve" text-anchor="start" x="3547.91" y="-154.2" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">6</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="3566.81,-141 3566.81,-173.8 3596.15,-173.8 3596.15,-141 3566.81,-141"/>
<text xml:space="preserve" text-anchor="start" x="3569.81" y="-151.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">بعد</text>
</g>
<!-- iv&#45;&gt;d2 -->
<g id="edge8" class="edge">
<title>iv&#45;&gt;d2</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M3978.86,-138C4036.14,-138 4100.98,-138 4159.12,-138"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="4158.99,-140.63 4166.49,-138 4158.99,-135.38 4158.99,-140.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="4042.19,-141 4042.19,-173.8 4066.19,-173.8 4066.19,-141 4042.19,-141"/>
<text xml:space="preserve" text-anchor="start" x="4050.29" y="-154.2" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">7</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="4069.19,-141 4069.19,-173.8 4106.3,-173.8 4106.3,-141 4069.19,-141"/>
<text xml:space="preserve" text-anchor="start" x="4072.19" y="-151.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">نمره</text>
</g>
<!-- d2&#45;&gt;offer -->
<g id="edge9" class="edge">
<title>d2&#45;&gt;offer</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M4489.02,-138C4546.29,-138 4611.14,-138 4669.28,-138"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="4669.15,-140.63 4676.65,-138 4669.15,-135.38 4669.15,-140.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="4552.34,-141 4552.34,-173.8 4576.34,-173.8 4576.34,-141 4552.34,-141"/>
<text xml:space="preserve" text-anchor="start" x="4560.45" y="-154.2" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">8</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="4579.34,-141 4579.34,-173.8 4616.46,-173.8 4616.46,-141 4579.34,-141"/>
<text xml:space="preserve" text-anchor="start" x="4582.34" y="-151.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">قبول</text>
</g>
<!-- offer&#45;&gt;d3 -->
<g id="edge10" class="edge">
<title>offer&#45;&gt;d3</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M4999.49,-138C5054.45,-138 5116.21,-138 5171.93,-138"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="5171.73,-140.63 5179.23,-138 5171.73,-135.38 5171.73,-140.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="5062.5,-141 5062.5,-173.8 5086.5,-173.8 5086.5,-141 5062.5,-141"/>
<text xml:space="preserve" text-anchor="start" x="5070.61" y="-154.2" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">9</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="5089.5,-141 5089.5,-173.8 5118.84,-173.8 5118.84,-141 5089.5,-141"/>
<text xml:space="preserve" text-anchor="start" x="5092.5" y="-151.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">بعد</text>
</g>
<!-- d3&#45;&gt;kit -->
<g id="edge11" class="edge">
<title>d3&#45;&gt;kit</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M5501.83,-138C5558.94,-138 5623.53,-138 5681.48,-138"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="5681.31,-140.63 5688.81,-138 5681.31,-135.38 5681.31,-140.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="5564.88,-141 5564.88,-173.8 5596.45,-173.8 5596.45,-141 5564.88,-141"/>
<text xml:space="preserve" text-anchor="start" x="5572.88" y="-154.2" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">10</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="5599.45,-141 5599.45,-173.8 5628.79,-173.8 5628.79,-141 5599.45,-141"/>
<text xml:space="preserve" text-anchor="start" x="5602.45" y="-151.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">بله</text>
</g>
<!-- kit&#45;&gt;kpi -->
<g id="edge12" class="edge">
<title>kit&#45;&gt;kpi</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M6011.81,-138C6068.79,-138 6133.33,-138 6191.58,-138"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="6191.47,-140.63 6198.97,-138 6191.47,-135.38 6191.47,-140.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="6074.83,-141 6074.83,-173.8 6106.4,-173.8 6106.4,-141 6074.83,-141"/>
<text xml:space="preserve" text-anchor="start" x="6082.83" y="-154.2" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">11</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="6109.4,-141 6109.4,-173.8 6138.74,-173.8 6138.74,-141 6109.4,-141"/>
<text xml:space="preserve" text-anchor="start" x="6112.4" y="-151.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">بعد</text>
</g>
</g>
</svg>
`;case`reject_path`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 16.1.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2461pt" height="210pt"
 viewBox="0.00 0.00 2461.00 210.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 195.05)">
<!-- d2 -->
<g id="node1" class="node">
<title>d2</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="320.04,-180 0,-180 0,0 320.04,0 320.04,-180"/>
<text xml:space="preserve" text-anchor="start" x="118.35" y="-93" font-family="Arial" font-size="20.00" fill="#ffe0c2">قبول شد؟</text>
<text xml:space="preserve" text-anchor="start" x="123.75" y="-70" font-family="Arial" font-size="15.00" fill="#f9b27c">after: route</text>
</g>
<!-- reject -->
<g id="node2" class="node">
<title>reject</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="814.64,-180 494.6,-180 494.6,0 814.64,0 814.64,-180"/>
<text xml:space="preserve" text-anchor="start" x="618.5" y="-102" font-family="Arial" font-size="20.00" fill="#eff6ff">پیام رد</text>
<text xml:space="preserve" text-anchor="start" x="521.25" y="-79" font-family="Arial" font-size="15.00" fill="#bfdbfe">skill: marketing&#45;skills:copywriting · after:</text>
<text xml:space="preserve" text-anchor="start" x="640.02" y="-61" font-family="Arial" font-size="15.00" fill="#bfdbfe">gate</text>
</g>
<!-- screen -->
<g id="node3" class="node">
<title>screen</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1352.19,-180 1031.98,-180 1031.98,0 1352.19,0 1352.19,-180"/>
<text xml:space="preserve" text-anchor="start" x="1114.29" y="-93" font-family="Arial" font-size="20.00" fill="#eff6ff">غربال رزومه‌ها</text>
<text xml:space="preserve" text-anchor="start" x="1052.04" y="-70" font-family="Arial" font-size="15.00" fill="#bfdbfe">skill: — · out: امتیاز ۰ تا ۱۰ · after: auto</text>
</g>
<!-- d1 -->
<g id="node4" class="node">
<title>d1</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="1901.24,-180 1581.2,-180 1581.2,0 1901.24,0 1901.24,-180"/>
<text xml:space="preserve" text-anchor="start" x="1679.82" y="-93" font-family="Arial" font-size="20.00" fill="#ffe0c2">کسی ۷+ دارد؟</text>
<text xml:space="preserve" text-anchor="start" x="1704.95" y="-70" font-family="Arial" font-size="15.00" fill="#f9b27c">after: route</text>
</g>
<!-- ad -->
<g id="node5" class="node">
<title>ad</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="2430.85,-180 2110.81,-180 2110.81,0 2430.85,0 2430.85,-180"/>
<text xml:space="preserve" text-anchor="start" x="2206.93" y="-102" font-family="Arial" font-size="20.00" fill="#eff6ff">آگهی استخدام</text>
<text xml:space="preserve" text-anchor="start" x="2142.04" y="-79" font-family="Arial" font-size="15.00" fill="#bfdbfe">skill: marketing&#45;skills:copywriting · out:</text>
<text xml:space="preserve" text-anchor="start" x="2184.75" y="-61" font-family="Arial" font-size="15.00" fill="#bfdbfe">متن + ۳ تیتر · after: auto</text>
</g>
<!-- d2&#45;&gt;reject -->
<g id="edge1" class="edge">
<title>d2&#45;&gt;reject</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M319.93,-90C372.5,-90 431.17,-90 484.47,-90"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="484.18,-92.63 491.68,-90 484.18,-87.38 484.18,-92.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="383.04,-93 383.04,-125.8 407.04,-125.8 407.04,-93 383.04,-93"/>
<text xml:space="preserve" text-anchor="start" x="391.15" y="-106.2" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">0</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="410.04,-93 410.04,-125.8 431.6,-125.8 431.6,-93 410.04,-93"/>
<text xml:space="preserve" text-anchor="start" x="413.04" y="-103.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">رد</text>
</g>
<!-- reject&#45;&gt;screen -->
<g id="edge2" class="edge">
<title>reject&#45;&gt;screen</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M814.46,-90C879.87,-90 955.72,-90 1022.14,-90"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1021.76,-92.63 1029.26,-90 1021.76,-87.38 1021.76,-92.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="877.64,-93 877.64,-125.8 901.64,-125.8 901.64,-93 877.64,-93"/>
<text xml:space="preserve" text-anchor="start" x="885.75" y="-106.2" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">1</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="904.64,-93 904.64,-125.8 968.98,-125.8 968.98,-93 904.64,-93"/>
<text xml:space="preserve" text-anchor="start" x="907.64" y="-103.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">نفر بعدی</text>
</g>
<!-- screen&#45;&gt;d1 -->
<g id="edge3" class="edge">
<title>screen&#45;&gt;d1</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1352.08,-90C1420.79,-90 1501.28,-90 1571.09,-90"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1570.78,-92.63 1578.28,-90 1570.78,-87.38 1570.78,-92.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1415.19,-93 1415.19,-125.8 1439.19,-125.8 1439.19,-93 1415.19,-93"/>
<text xml:space="preserve" text-anchor="start" x="1423.3" y="-106.2" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">2</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1442.19,-93 1442.19,-125.8 1518.2,-125.8 1518.2,-93 1442.19,-93"/>
<text xml:space="preserve" text-anchor="start" x="1445.19" y="-103.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">امتیازدهی</text>
</g>
<!-- d1&#45;&gt;ad -->
<g id="edge4" class="edge">
<title>d1&#45;&gt;ad</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1901.24,-90C1964.31,-90 2036.93,-90 2100.94,-90"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2100.61,-92.63 2108.11,-90 2100.61,-87.38 2100.61,-92.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1964.24,-93 1964.24,-125.8 1988.24,-125.8 1988.24,-93 1964.24,-93"/>
<text xml:space="preserve" text-anchor="start" x="1972.35" y="-106.2" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">3</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1991.24,-93 1991.24,-125.8 2047.81,-125.8 2047.81,-93 1991.24,-93"/>
<text xml:space="preserve" text-anchor="start" x="1994.24" y="-103.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">هیچ‌کس</text>
</g>
</g>
</svg>
`;default:throw Error(`Unknown viewId: `+e)}};export{e as dotSource,t as svgSource};