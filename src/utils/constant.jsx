/**
 * ******************************************************
 * 전역 상수 관리
 * ******************************************************
 * */

const CONST = {
  SIDE_MENU: [
    {
      level: 0,
      key: "menu01",
      label: "상품리뷰",
      url: "",
      more: true,
      route: false,
      hide: false,
      node: [
        {
          level: 1,
          key: "menu01_01_01",
          label: "리뷰 대시보드",
          url: "/prdReview/dashboard/search=",
          includeUrl: [],
          more: false,
          route: true,
          hide: false,
        },
        {
          level: 1,
          key: "menu01_01_02",
          label: "리뷰 분석",
          url: "/prdReview/overview/search=",
          includeUrl: ["/prdReview/overview/summary/search="],
          more: false,
          route: true,
          hide: false,
        },
        {
          level: 1,
          key: "menu01_01_03",
          label: "리뷰 상세 다운로드",
          url: "/prdReview/overview/detail/search=",
          includeUrl:[],
          more: false,
          route: true,
          hide: false,
        },
      ],
    },
    {
      level: 0,
      key: "menu01_03",
      label: "알람 관리",
      url: "/alarm",
      includeUrl:[],
      more: false,
      route: true,
      hide: false,
    },
    {
      level: 0,
      key: "menu01_04",
      label: "검색어 트렌드",
      url: "/searchRank",
      includeUrl:[],
      more: false,
      route: true,
      hide: false,
    },
  ],

  //전체, APP, SSG 구분
  SELECT_GUBUN_FILTER: [
    { key: "ALL", value: "ALL", text: "채널" },
    { key: "EAPP", value: "EAPP", text: "EAPP" },
    { key: "SSG", value: "SSG", text: "SSG" },
  ],
  SELECT_CHANNEL_FILTER: [
    { key: "ALL", value: "ALL", text: "전체" },
    { key: "EAPP", value: "EAPP", text: "EAPP" },
    { key: "SSG", value: "SSG", text: "SSG" },
  ],
  SELECT_DATE_FILTER: [
    { key: "day", value: "day", text: "일" },
    { key: "week", value: "week", text: "주" },
    { key: "month", value: "month", text: "월" },
    { key: "quarter", value: "quarter", text: "분기" },
  ],
  SELECT_AREA_FILTER: [
    { key: "a1", value: "area_nm", text: "권역" },
    { key: "a2", value: "area_nm01", text: "권역1" },
    { key: "a3", value: "area_nm02", text: "권역2" },
    { key: "a4", value: "area_nm03", text: "권역3" },
  ],
  SELECT_STORE_FILTER: [
    { key: "a1", value: "store_nm", text: "점포" },
    { key: "a2", value: "store_nm01", text: "점포1" },
    { key: "a3", value: "store_nm02", text: "점포2" },
    { key: "a4", value: "store_nm03", text: "점포3" },
  ],
  SELECT_POSITIVE_FILTER: [
    { key: "a1", value: 0, text: "긍/부정" },
    { key: "a2", value: 1, text: "긍정" },
    { key: "a3", value: 2, text: "부정" },
  ],
  SELECT_SCORE_FILTER : [
    { key: "a1", value: 0, text: "Score" },
    { key: "a2", value: 1, text: "1" },
    { key: "a3", value: 2, text: "2" },
    { key: "a4", value: 3, text: "3" },
    { key: "a5", value: 4, text: "4" },
    { key: "a6", value: 5, text: "5" },
  ],
  SELECT_ALARM_COND: [
    { key: "alarm_cond_default", value: "alarm_cond_default", text: "선택" },
    { key: "alarm_cond_ratio", value: "alarm_cond_ratio", text: "부정리뷰비율" },
    { key: "alarm_cond_rate", value: "alarm_cond_rate", text: "부정리뷰증감율" },
    { key: "alarm_cond_cnt", value: "alarm_cond_cnt", text: "부정리뷰건" },
  ],
  SELECT_ALARM_OPER: [
    { key: "alarm_oper_default", value: "alarm_oper_default", text: "선택" },
    { key: "alarm_oper_same", value: "alarm_oper_same", text: "=" },
    { key: "alarm_oper_only", value: "alarm_oper_only", text: ">" },
    { key: "alarm_oper_both", value: "alarm_oper_both", text: ">=" },
  ],
  SELECT_ALARM_VAL_TYP: [
    { key: "alarm_val_typ_default", value: "alarm_val_typ_default", text: "선택" },
    { key: "alarm_val_typ_cnt", value: "alarm_val_typ_cnt", text: "건" },
    { key: "alarm_val_typ_percent", value: "alarm_val_typ_percent", text: "%" },
  ],
  SUMMARY_TREND_CHATGPT : [
    {
      id: 1,
      start_date: "2022.01.01",
      end_date: "2022.01.07",
      summary_ag: "1. 맛이 좋음 2. 싱싱함 3. 자주 구매하는 제품 4. 가격이 조금 더 저렴했으면 좋겠음 5. 체리를 좋아함 6. 달콤함 7. 믿고 자주 구입하는 제품 8. 만족함 9. 체리 귀신이 있어서 삼 10. 조금 더 신선하면 좋겠음 11. 미국산 체리 가성비가 좋음 12. 세일 때 구매함 13. 크기와 가격이 좋음 14. 맛있어 보여서 삼 15. 맛과 크기가 좋음, 각각 두 개 정도 맛이 없음 16. 저렴하고 맛이 좋음 17. 달고 맛있음, 구매를 잘 한 것 같음 18. 체리가 구멍 사이로 빠지는 것이 있음, 맛은 좋음 19. 체리가 달콤하고 새콤함 20. 맛이 달콤하고 타임세일로 저렴하게 구입함",
      summary_ag_keyword: "1. 맛 (taste) 2. 냄새 (smell) 3. 비린내 (녹두 비린내) 4. 맛의 깊이 (밍밍한 맛)5. 가격 대비 만족도",
      summary_ng: "0.진짜 비추예요....닭잡고 핏물 제대로 안빠진거 조리하는건지... 뼈랑 고기고 시커멓고 냄새나고 맛없어요. 세일한다고 샀는데 처치곤란이예요. 제가 이런종류 삼계탕 꽤 많이 사먹어본 편인데 ... 이건 정말 별로예요 1.긋 베리 굿 아주 멋져요 굿 굿 멋지네요 멋지네요 ㅎㅎ 굿 아주 멋져요 굿 굿 멋지네요 멋지네요 ㅋㅋ 2.닭이 너무 부숴져서 먹기 불편했어요 ㅠㅠ3.너무.맛이 없었어요누룽지는 거의 없는 것과 마찬가지 4.애랑 먹으려고샀는데누룽지는 보이지도않고맛은 그냥저냥인데 뼈가 다녹아서조각조각....굵은뼈는 그냥 골라내면되는데뼈가다부스러져서 섞이는바랑메 먹기너무불편했어요 5.누룽지 삼계탕인데 누룽지 맛이 나지 않는거 같아요. 6.상품 잘 도착하여습니다. 7.누루지가 있어 구수할줄 알았는데 그렇지도 않고 닭도 들께삼계탕 보다 좀 적은거 같으며 뼈가 좀 어스러지는것도 있어 제겐 좀 아닌듯 했어요제겐 들께 삼계탕이 제일 나은거 같아요 8.내 입맛엔 안맞았어요..너무 맛 없어서 먹다먹다 마지막엔 버렸어요ㅠ 9.삼계탕으로 맛있게 먹어서 누룽지도 맛있을 줄 알았는데.. 생각보다 별로고 닭냄새가 넘 나서 먹기 힘들었어요. 0.진짜 비추예요....닭잡고 핏물 제대로 안빠진거 조리하는건지... 뼈랑 고기고 시커멓고 냄새나고 맛없어요. 세일한다고 샀는데 처치곤란이예요. 제가 이런종류 삼계탕 꽤 많이 사먹어본 편인데 ... 이건 정말 별로예요 1.긋 베리 굿 아주 멋져요 굿 굿 멋지네요 멋지네요 ㅎㅎ 굿 아주 멋져요 굿 굿 멋지네요 멋지네요 ㅋㅋ 2.닭이 너무 부숴져서 먹기 불편했어요 ㅠㅠ3.너무.맛이 없었어요누룽지는 거의 없는 것과 마찬가지 4.애랑 먹으려고샀는데누룽지는 보이지도않고맛은 그냥저냥인데 뼈가 다녹아서조각조각....굵은뼈는 그냥 골라내면되는데뼈가다부스러져서 섞이는바랑메 먹기너무불편했어요 5.누룽지 삼계탕인데 누룽지 맛이 나지 않는거 같아요. 6.상품 잘 도착하여습니다. 7.누루지가 있어 구수할줄 알았는데 그렇지도 않고 닭도 들께삼계탕 보다 좀 적은거 같으며 뼈가 좀 어스러지는것도 있어 제겐 좀 아닌듯 했어요제겐 들께 삼계탕이 제일 나은거 같아요 8.내 입맛엔 안맞았어요..너무 맛 없어서 먹다먹다 마지막엔 버렸어요ㅠ 9.삼계탕으로 맛있게 먹어서 누룽지도 맛있을 줄 알았는데.. 생각보다 별로고 닭냄새가 넘 나서 먹기 힘들었어요.",
      summary_ng_keyword: "1. 맛 (taste) 2. 냄새 (smell) 3. 비린내 (녹두 비린내) 4. 맛의 깊이 (밍밍한 맛)5. 가격 대비 만족도",
      summary_ng_rat: 10,
    },
    {
      id: 2,
      start_date: "2022.01.08",
      end_date: "2022.01.14",
      summary_ag:
        "0.진짜 비추예요....닭잡고 핏물 제대로 안빠진거 조리하는건지... ",
      summary_ag_keyword:
        "1. 맛 (taste) 2. 냄새 (smell) 3. 비린내 (녹두 비린내) 4. 맛의 깊이 (밍밍한 맛)5. 가격 대비 만족도",
      summary_ng:
        "0.진짜 비추예요....닭잡고 핏물 제대로 안빠진거 조리하는건지... 뼈랑 고기고 시커멓고 냄새나고 맛없어요. 세일한다고 샀는데 처치곤란이예요. ",
      summary_ng_keyword:
        "1. 맛 (taste) 2. 냄새 (smell) 3. 비린내 (녹두 비린내) 4. 맛의 깊이 (밍밍한 맛)5. 가격 대비 만족도",
      summary_ng_rat: -15,
    },
    {
      id: 3,
      start_date: "2022.01.15",
      end_date: "2022.01.21",
      summary_ag:
        "0.진짜 비추예요....닭잡고 핏물 제대로 안빠진거 조리하는건지... ",
      summary_ag_keyword:
        "1. 맛 (taste) 2. 냄새 (smell) 3. 비린내 (녹두 비린내) 4. 맛의 깊이 (밍밍한 맛)5. 가격 대비 만족도",
      summary_ng:
        "0.진짜 비추예요....닭잡고 핏물 제대로 안빠진거 조리하는건지... 뼈랑 고기고 시커멓고 냄새나고 맛없어요. 세일한다고 샀는데 처치곤란이예요. ",
      summary_ng_keyword:
        "1. 맛 (taste) 2. 냄새 (smell) 3. 비린내 (녹두 비린내) 4. 맛의 깊이 (밍밍한 맛)5. 가격 대비 만족도",
      summary_ng_rat: -4,
    },
    {
      id: 4,
      start_date: "2022.01.22",
      end_date: "2022.01.28",
      summary_ag:
        "0.진짜 비추예요....닭잡고 핏물 제대로 안빠진거 조리하는건지... ",
      summary_ag_keyword:
        "1. 맛 (taste) 2. 냄새 (smell) 3. 비린내 (녹두 비린내) 4. 맛의 깊이 (밍밍한 맛)5. 가격 대비 만족도",
      summary_ng:
        "0.진짜 비추예요....닭잡고 핏물 제대로 안빠진거 조리하는건지... 뼈랑 고기고 시커멓고 냄새나고 맛없어요. 세일한다고 샀는데 처치곤란이예요. ",
      summary_ng_keyword:
        "1. 맛 (taste) 2. 냄새 (smell) 3. 비린내 (녹두 비린내) 4. 맛의 깊이 (밍밍한 맛)5. 가격 대비 만족도",
      summary_ng_rat: 3,
    },
    {
      id: 5,
      start_date: "2022.01.01",
      end_date: "2022.01.07",
      summary_ag:
        "0.진짜 비추예요....닭잡고 핏물 제대로 안빠진거 조리하는건지... 뼈랑 고기고 시커멓고 냄새나고 맛없어요. 세일한다고 샀는데 처치곤란이예요. 제가 이런종류 삼계탕 꽤 많이 사먹어본 편인데 ... 이건 정말 별로예요 1.긋 베리 굿아주 멋져요 굿 굿 멋지네요 멋지네요 ㅎㅎ 굿 아주 멋져요 굿 굿 멋지네요 멋지네요 ㅋㅋ 2.닭이 너무 부숴져서 먹기 불편했어요 ㅠㅠ3.너무.맛이 없었어요누룽지는 거의 없는 것과 마찬가지",
      summary_ag_keyword:
        "1. 맛 (taste) 2. 냄새 (smell) 3. 비린내 (녹두 비린내) 4. 맛의 깊이 (밍밍한 맛)5. 가격 대비 만족도",
      summary_ng:
        "0.진짜 비추예요....닭잡고 핏물 제대로 안빠진거 조리하는건지... 뼈랑 고기고 시커멓고 냄새나고 맛없어요. 세일한다고 샀는데 처치곤란이예요. 제가 이런종류 삼계탕 꽤 많이 사먹어본 편인데 ... 이건 정말 별로예요 1.긋 베리 굿 아주 멋져요 굿 굿 멋지네요 멋지네요 ㅎㅎ 굿 아주 멋져요 굿 굿 멋지네요 멋지네요 ㅋㅋ 2.닭이 너무 부숴져서 먹기 불편했어요 ㅠㅠ3.너무.맛이 없었어요누룽지는 거의 없는 것과 마찬가지 4.애랑 먹으려고샀는데누룽지는 보이지도않고맛은 그냥저냥인데 뼈가 다녹아서조각조각....굵은뼈는 그냥 골라내면되는데뼈가다부스러져서 섞이는바랑메 먹기너무불편했어요 5.누룽지 삼계탕인데 누룽지 맛이 나지 않는거 같아요. 6.상품 잘 도착하여습니다. 7.누루지가 있어 구수할줄 알았는데 그렇지도 않고 닭도 들께삼계탕 보다 좀 적은거 같으며 뼈가 좀 어스러지는것도 있어 제겐 좀 아닌듯 했어요제겐 들께 삼계탕이 제일 나은거 같아요 8.내 입맛엔 안맞았어요..너무 맛 없어서 먹다먹다 마지막엔 버렸어요ㅠ 9.삼계탕으로 맛있게 먹어서 누룽지도 맛있을 줄 알았는데.. 생각보다 별로고 닭냄새가 넘 나서 먹기 힘들었어요. 0.진짜 비추예요....닭잡고 핏물 제대로 안빠진거 조리하는건지... 뼈랑 고기고 시커멓고 냄새나고 맛없어요. 세일한다고 샀는데 처치곤란이예요. 제가 이런종류 삼계탕 꽤 많이 사먹어본 편인데 ... 이건 정말 별로예요 1.긋 베리 굿 아주 멋져요 굿 굿 멋지네요 멋지네요 ㅎㅎ 굿 아주 멋져요 굿 굿 멋지네요 멋지네요 ㅋㅋ 2.닭이 너무 부숴져서 먹기 불편했어요 ㅠㅠ3.너무.맛이 없었어요누룽지는 거의 없는 것과 마찬가지 4.애랑 먹으려고샀는데누룽지는 보이지도않고맛은 그냥저냥인데 뼈가 다녹아서조각조각....굵은뼈는 그냥 골라내면되는데뼈가다부스러져서 섞이는바랑메 먹기너무불편했어요 5.누룽지 삼계탕인데 누룽지 맛이 나지 않는거 같아요. 6.상품 잘 도착하여습니다. 7.누루지가 있어 구수할줄 알았는데 그렇지도 않고 닭도 들께삼계탕 보다 좀 적은거 같으며 뼈가 좀 어스러지는것도 있어 제겐 좀 아닌듯 했어요제겐 들께 삼계탕이 제일 나은거 같아요 8.내 입맛엔 안맞았어요..너무 맛 없어서 먹다먹다 마지막엔 버렸어요ㅠ 9.삼계탕으로 맛있게 먹어서 누룽지도 맛있을 줄 알았는데.. 생각보다 별로고 닭냄새가 넘 나서 먹기 힘들었어요.",
      summary_ng_keyword:
        "1. 맛 (taste) 2. 냄새 (smell) 3. 비린내 (녹두 비린내) 4. 맛의 깊이 (밍밍한 맛)5. 가격 대비 만족도",
      summary_ng_rat: 10,
    },
    {
      id: 6,
      start_date: "2022.01.08",
      end_date: "2022.01.14",
      summary_ag:
        "0.진짜 비추예요....닭잡고 핏물 제대로 안빠진거 조리하는건지... ",
      summary_ag_keyword:
        "1. 맛 (taste) 2. 냄새 (smell) 3. 비린내 (녹두 비린내) 4. 맛의 깊이 (밍밍한 맛)5. 가격 대비 만족도",
      summary_ng:
        "0.진짜 비추예요....닭잡고 핏물 제대로 안빠진거 조리하는건지... 뼈랑 고기고 시커멓고 냄새나고 맛없어요. 세일한다고 샀는데 처치곤란이예요. ",
      summary_ng_keyword:
        "1. 맛 (taste) 2. 냄새 (smell) 3. 비린내 (녹두 비린내) 4. 맛의 깊이 (밍밍한 맛)5. 가격 대비 만족도",
      summary_ng_rat: -15,
    },
    {
      id: 7,
      start_date: "2022.01.15",
      end_date: "2022.01.21",
      summary_ag:
        "0.진짜 비추예요....닭잡고 핏물 제대로 안빠진거 조리하는건지... ",
      summary_ag_keyword:
        "1. 맛 (taste) 2. 냄새 (smell) 3. 비린내 (녹두 비린내) 4. 맛의 깊이 (밍밍한 맛)5. 가격 대비 만족도",
      summary_ng:
        "0.진짜 비추예요....닭잡고 핏물 제대로 안빠진거 조리하는건지... 뼈랑 고기고 시커멓고 냄새나고 맛없어요. 세일한다고 샀는데 처치곤란이예요. ",
      summary_ng_keyword:
        "1. 맛 (taste) 2. 냄새 (smell) 3. 비린내 (녹두 비린내) 4. 맛의 깊이 (밍밍한 맛)5. 가격 대비 만족도",
      summary_ng_rat: -4,
    },
    {
      id: 8,
      start_date: "2022.01.22",
      end_date: "2022.01.28",
      summary_ag:
        "0.진짜 비추예요....닭잡고 핏물 제대로 안빠진거 조리하는건지... ",
      summary_ag_keyword:
        "1. 맛 (taste) 2. 냄새 (smell) 3. 비린내 (녹두 비린내) 4. 맛의 깊이 (밍밍한 맛)5. 가격 대비 만족도",
      summary_ng:
        "0.진짜 비추예요....닭잡고 핏물 제대로 안빠진거 조리하는건지... 뼈랑 고기고 시커멓고 냄새나고 맛없어요. 세일한다고 샀는데 처치곤란이예요. ",
      summary_ng_keyword:
        "1. 맛 (taste) 2. 냄새 (smell) 3. 비린내 (녹두 비린내) 4. 맛의 깊이 (밍밍한 맛)5. 가격 대비 만족도",
      summary_ng_rat: 3,
    },
    {
      id: 9,
      start_date: "2022.01.15",
      end_date: "2022.01.21",
      summary_ag:
        "0.진짜 비추예요....닭잡고 핏물 제대로 안빠진거 조리하는건지... ",
      summary_ag_keyword:
        "1. 맛 (taste) 2. 냄새 (smell) 3. 비린내 (녹두 비린내) 4. 맛의 깊이 (밍밍한 맛)5. 가격 대비 만족도",
      summary_ng:
        "0.진짜 비추예요....닭잡고 핏물 제대로 안빠진거 조리하는건지... 뼈랑 고기고 시커멓고 냄새나고 맛없어요. 세일한다고 샀는데 처치곤란이예요. ",
      summary_ng_keyword:
        "1. 맛 (taste) 2. 냄새 (smell) 3. 비린내 (녹두 비린내) 4. 맛의 깊이 (밍밍한 맛)5. 가격 대비 만족도",
      summary_ng_rat: -4,
    },
    {
      id: 10,
      start_date: "2022.01.22",
      end_date: "2022.01.28",
      summary_ag:
        "0.진짜 비추예요....닭잡고 핏물 제대로 안빠진거 조리하는건지... ",
      summary_ag_keyword:
        "1. 맛 (taste) 2. 냄새 (smell) 3. 비린내 (녹두 비린내) 4. 맛의 깊이 (밍밍한 맛)5. 가격 대비 만족도",
      summary_ng:
        "0.진짜 비추예요....닭잡고 핏물 제대로 안빠진거 조리하는건지... 뼈랑 고기고 시커멓고 냄새나고 맛없어요. 세일한다고 샀는데 처치곤란이예요. ",
      summary_ng_keyword:
        "1. 맛 (taste) 2. 냄새 (smell) 3. 비린내 (녹두 비린내) 4. 맛의 깊이 (밍밍한 맛)5. 가격 대비 만족도",
      summary_ng_rat: 3,
    },
  ]
};

export default CONST;
