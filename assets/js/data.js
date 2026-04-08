const asset = (file) => new URL(`../images/${file}`, import.meta.url).href;

export const siteMeta = {
  studioName: "SLEEPER",
  companyName: "Công ty TNHH Thiết kế và Xây dựng Sleeper",
  locationLabel: "Đà Nẵng, VN",
  timezone: "Asia/Ho_Chi_Minh",
  phone: "0974 898 790",
  email: "sleeper2304@gmail.com",
  address: ["60 Nguyễn Quang Diêu, Hòa Xuân", "Đà Nẵng", "Việt Nam"],
  socials: [],
  services: [
    "Khảo sát & tư vấn (01)",
    "Concept công năng (02)",
    "Phối cảnh kiến trúc (03)",
    "Thiết kế nội thất (04)",
    "Hồ sơ kỹ thuật (05)",
    "Báo giá & tiến độ (06)",
    "Thi công & bàn giao (07)"
  ],
  values: [
    {
      title: "Bám sát nhu cầu",
      text: "Mỗi công trình đều bắt đầu từ cách sống, ngân sách, khu đất và kỳ vọng sử dụng thực tế của chủ đầu tư."
    },
    {
      title: "Thiết kế đồng bộ",
      text: "Sleeper ưu tiên sự thống nhất giữa kiến trúc, nội thất, vật liệu và cách thi công để hạn chế phát sinh khi ra công trình."
    },
    {
      title: "Khả thi khi xây dựng",
      text: "Chúng tôi theo đuổi những giải pháp đẹp, rõ ràng và có thể triển khai hiệu quả trên thực tế tại Đà Nẵng, miền Trung và trên cả nước."
    }
  ],
  visionCards: [
    {
      title: "Công năng",
      text: "Không gian được tổ chức mạch lạc, dễ ở, dễ sử dụng và giải quyết đúng nhu cầu sinh hoạt của từng gia đình."
    },
    {
      title: "Thẩm mỹ",
      text: "Sleeper theo đuổi ngôn ngữ thiết kế tiết chế, hiện đại và bền đẹp theo thời gian thay vì những xu hướng ngắn hạn."
    },
    {
      title: "Đồng bộ",
      text: "Từ ý tưởng đến thi công, đội ngũ luôn giữ sự nhất quán để công trình sau cùng gần sát với bản thiết kế nhất có thể."
    }
  ],
  initiatives: [
    {
      title: "Khảo sát và định hướng",
      image: asset("villadonghasleeper.jpg"),
      text: [
        "Chúng tôi bắt đầu bằng việc đọc khu đất, hướng nắng gió, giao thông tiếp cận và cách sinh hoạt của gia chủ để đưa ra hướng đi phù hợp.",
        "Giai đoạn này giúp công trình có một nền tảng rõ ràng về công năng, quy mô đầu tư và phong cách thiết kế."
      ]
    },
    {
      title: "Thiết kế kiến trúc và nội thất đồng bộ",
      image: asset("căn hộ 313 đống đa (1).jpg"),
      text: [
        "Sleeper phát triển song song kiến trúc, nội thất và vật liệu để tổng thể công trình được thống nhất ngay từ đầu.",
        "Hồ sơ được triển khai rõ ràng, ưu tiên giải pháp khả thi, dễ thi công và dễ kiểm soát chất lượng trên công trường."
      ]
    },
    {
      title: "Thi công, giám sát và bàn giao",
      image: asset("vanphongvsmsleeper.jpg"),
      text: [
        "Chúng tôi có thể đồng hành ở giai đoạn thi công, hỗ trợ kiểm tra vật liệu, chi tiết và giải quyết những phát sinh trong quá trình xây dựng.",
        "Mục tiêu là giữ được tinh thần của thiết kế và đem đến một công trình hoàn thiện gọn gàng, bền vững và đúng tiến độ."
      ]
    }
  ],
  accreditations: [
    {
      title: "Phạm vi triển khai",
      detail: "Sleeper nhận thiết kế và xây dựng nhà ở trên toàn quốc, trọng tâm tại Đà Nẵng và khu vực miền Trung."
    },
    {
      title: "Loại hình công trình",
      detail: "Nhà phố, villa, căn hộ, cải tạo nhà ở, showroom, shop, nhà hàng, studio, văn phòng và công trình dịch vụ quy mô vừa."
    }
  ],
  awards: [
    {
      year: "2026",
      project: "Nhà mái ngói Hà Tĩnh",
      award: "Hà Tĩnh",
      result: "Nhà ở thấp tầng"
    },
    {
      year: "2026",
      project: "Nancy Studio Đà Nẵng",
      award: "Đà Nẵng",
      result: "Studio / Thương mại"
    },
    {
      year: "2025",
      project: "Bamboo Restaurant",
      award: "Dịch vụ",
      result: "Nội thất nhà hàng"
    },
    {
      year: "2025",
      project: "Nhà hàng Khách sạn Hoianna",
      award: "Quảng Nam",
      result: "Dịch vụ & F&B"
    },
    {
      year: "2025",
      project: "Căn hộ 313 Đống Đa",
      award: "Đà Nẵng",
      result: "Căn hộ / Nội thất"
    },
    {
      year: "2025",
      project: "Shop Trần Phú",
      award: "Đà Nẵng",
      result: "Mặt tiền kinh doanh"
    }
  ],
  jobs: [
    {
      title: "Tư vấn thiết kế",
      meta: ["Nhà ở, nội thất, cải tạo", "sleeper2304@gmail.com"],
      href: "mailto:sleeper2304@gmail.com"
    },
    {
      title: "Đặt lịch làm việc",
      meta: ["Đà Nẵng, miền Trung và toàn quốc", "0974 898 790"],
      href: "tel:0974898790"
    }
  ]
};

const imagePool = {
  homeHero: asset("BAMBOO_RESTAURANT (11).jpg"),
  visionVilla: asset("villahoiansleeper.jpg"),
  studioHero: asset("Nancy studio Đà Nẵng (1).jpg"),
  studioOffice: asset("vanphongvsmsleeper.jpg"),
  studioCreative: asset("puustudiosleeper.jpg"),
  haTinhFront: asset("Nhà mái ngói Hà Tĩnh (1).jpg"),
  haTinhExterior: asset("Nhà mái ngói Hà Tĩnh (5).jpg"),
  haTinhYard: asset("Nhà mái ngói Hà Tĩnh (12).jpg"),
  haTinhLiving: asset("Nhà mái ngói Hà Tĩnh (23).jpg"),
  bambooHero: asset("BAMBOO_RESTAURANT (2).jpg"),
  bambooHall: asset("BAMBOO_RESTAURANT (6).jpg"),
  bambooDetail: asset("BAMBOO_RESTAURANT (10).jpg"),
  hoiannaHero: asset("Nhà hàng Khách sạn Hoianna (1).jpg"),
  hoiannaDining: asset("Nhà hàng Khách sạn Hoianna (7).jpg"),
  hoiannaLounge: asset("Nhà hàng Khách sạn Hoianna (13).jpg"),
  suwonExterior: asset("EXTERIOR_SUWON_PHÚ QUỐC (7).png"),
  suwonInterior: asset("INTERIOR_SUWON_PHÚ QUỐC (1).png"),
  suwonDining: asset("INTERIOR_SUWON_PHÚ QUỐC (6).png"),
  suwonPrivate: asset("INTERIOR_SUWON_PHÚ QUỐC (13).png"),
  apartmentHero: asset("căn hộ 313 đống đa (1).jpg"),
  apartmentKitchen: asset("căn hộ 313 đống đa (5).jpg"),
  apartmentBedroom: asset("căn hộ 313 đống đa (11).jpg"),
  apartmentDetail: asset("căn hộ 313 đống đa (16).jpg"),
  nancyHero: asset("Nancy studio Đà Nẵng (1).jpg"),
  nancySet: asset("Nancy studio Đà Nẵng (4).jpg"),
  nancyCorner: asset("Nancy studio Đà Nẵng (8).jpg"),
  villaDongHa: asset("villadonghasleeper.jpg"),
  villaHoiAn: asset("villahoiansleeper.jpg"),
  nguyenCongHoan: asset("nguyenconghoanhousesleeper.jpg"),
  tamKyHouse: asset("tamkyhousesleeper.jpg"),
  namDinhHouse: asset("namdinhhousesleeper.jpg"),
  tranPhuShop: asset("shop_tran_phu_sleeper.jpg"),
  giaBao: asset("tiemvanggiabao.jpg"),
  vsmOffice: asset("vanphongvsmsleeper.jpg"),
  kcnFactory: asset("nhaaxuongkcnsleeper.jpg"),
  englishCenter: asset("trungtamenglishslpeer.jpg"),
  morinLab: asset("morinsleeper.jpg"),
  bwShop: asset("bwshopsleeper.jpg"),
  puuStudio: asset("puustudiosleeper.jpg"),
  indochina: asset("indochinasleeper.jpg"),
  noithatAcong: asset("noithatacongsleeper.jpg"),
  noithatIndochina: asset("noithatindochinasleeper.jpg"),
  noithatMyAn: asset("noithatmyandnsleeper.jpg")
};

export const works = [
  {
    slug: "nha-mai-ngoi-ha-tinh",
    title: "Nhà mái ngói Hà Tĩnh",
    segment: "Nhà ở",
    typology: "Nhà ở",
    location: "Hà Tĩnh, Việt Nam",
    year: 2026,
    terms: ["residential"],
    image: imagePool.haTinhFront,
    ratio: "66%"
  },
  {
    slug: "villa-dong-ha",
    title: "Villa Đông Hà",
    segment: "Nhà ở",
    typology: "Biệt thự",
    location: "Đông Hà, Việt Nam",
    year: 2026,
    terms: ["residential"],
    image: imagePool.villaDongHa,
    ratio: "100%"
  },
  {
    slug: "villa-hoi-an",
    title: "Villa Hội An",
    segment: "Nhà ở",
    typology: "Biệt thự",
    location: "Hội An, Việt Nam",
    year: 2025,
    terms: ["residential"],
    image: imagePool.visionVilla,
    ratio: "56.25%"
  },
  {
    slug: "nha-nguyen-cong-hoan",
    title: "Nhà Nguyễn Công Hoan",
    segment: "Nhà ở",
    typology: "Nhà phố",
    location: "Đà Nẵng, Việt Nam",
    year: 2025,
    terms: ["residential"],
    image: imagePool.nguyenCongHoan,
    ratio: "100%"
  },
  {
    slug: "nha-tam-ky",
    title: "Nhà Tam Kỳ",
    segment: "Nhà ở",
    typology: "Nhà ở",
    location: "Tam Kỳ, Việt Nam",
    year: 2025,
    terms: ["residential"],
    image: imagePool.tamKyHouse,
    ratio: "100%"
  },
  {
    slug: "nha-nam-dinh",
    title: "Nhà Nam Định",
    segment: "Nhà ở",
    typology: "Nhà ở",
    location: "Nam Định, Việt Nam",
    year: 2025,
    terms: ["residential"],
    image: imagePool.namDinhHouse,
    ratio: "66%"
  },
  {
    slug: "can-ho-313-dong-da",
    title: "Căn hộ 313 Đống Đa",
    segment: "Căn hộ",
    typology: "Căn hộ",
    location: "Đống Đa, Đà Nẵng",
    year: 2025,
    terms: ["multi-residential"],
    image: imagePool.apartmentHero,
    ratio: "100%"
  },
  {
    slug: "bamboo-restaurant",
    title: "Bamboo Restaurant",
    segment: "Dịch vụ",
    typology: "Nhà hàng / F&B",
    location: "Việt Nam",
    year: 2025,
    terms: ["hospitality"],
    image: imagePool.bambooHero,
    ratio: "56.25%"
  },
  {
    slug: "nha-hang-khach-san-hoianna",
    title: "Nhà hàng Khách sạn Hoianna",
    segment: "Dịch vụ",
    typology: "Nhà hàng / Khách sạn",
    location: "Quảng Nam, Việt Nam",
    year: 2025,
    terms: ["hospitality"],
    image: imagePool.hoiannaHero,
    ratio: "56.25%"
  },
  {
    slug: "suwon-phu-quoc",
    title: "Suwon Phú Quốc",
    segment: "Dịch vụ",
    typology: "Nghỉ dưỡng / Dịch vụ",
    location: "Phú Quốc, Việt Nam",
    year: 2025,
    terms: ["hospitality"],
    image: imagePool.suwonExterior,
    ratio: "66%"
  },
  {
    slug: "nancy-studio-da-nang",
    title: "Nancy Studio Đà Nẵng",
    segment: "Thương mại",
    typology: "Studio / Dịch vụ",
    location: "Đà Nẵng, Việt Nam",
    year: 2026,
    terms: ["commercial"],
    image: imagePool.nancyHero,
    ratio: "66%"
  },
  {
    slug: "van-phong-vsm",
    title: "Văn phòng VSM",
    segment: "Thương mại",
    typology: "Văn phòng",
    location: "Đà Nẵng, Việt Nam",
    year: 2025,
    terms: ["commercial"],
    image: imagePool.vsmOffice,
    ratio: "100%"
  },
  {
    slug: "xuong-kcn",
    title: "Nhà xưởng KCN",
    segment: "Thương mại",
    typology: "Nhà xưởng",
    location: "Việt Nam",
    year: 2025,
    terms: ["commercial"],
    image: imagePool.kcnFactory,
    ratio: "56.25%"
  },
  {
    slug: "trung-tam-anh-ngu",
    title: "Trung tâm Anh ngữ",
    segment: "Thương mại",
    typology: "Giáo dục / Dịch vụ",
    location: "Đà Nẵng, Việt Nam",
    year: 2025,
    terms: ["commercial"],
    image: imagePool.englishCenter,
    ratio: "100%"
  },
  {
    slug: "shop-tran-phu",
    title: "Shop Trần Phú",
    segment: "Bán lẻ",
    typology: "Cửa hàng",
    location: "Đà Nẵng, Việt Nam",
    year: 2025,
    terms: ["retail"],
    image: imagePool.tranPhuShop,
    ratio: "100%"
  },
  {
    slug: "tiem-vang-gia-bao",
    title: "Tiệm vàng Gia Bảo",
    segment: "Bán lẻ",
    typology: "Trang sức",
    location: "Đà Nẵng, Việt Nam",
    year: 2025,
    terms: ["retail"],
    image: imagePool.giaBao,
    ratio: "100%"
  },
  {
    slug: "morin-lab-spa",
    title: "Morin Lab Spa",
    segment: "Bán lẻ",
    typology: "Spa / Chăm sóc sức khỏe",
    location: "Việt Nam",
    year: 2025,
    terms: ["retail"],
    image: imagePool.morinLab,
    ratio: "100%"
  }
];

export const teamMembers = [
  {
    name: "Thiết kế kiến trúc",
    role: "Tối ưu công năng, mặt tiền và tổ chức không gian sống cho nhà ở hiện đại.",
    image: imagePool.villaDongHa
  },
  {
    name: "Thiết kế nội thất",
    role: "Đồng bộ vật liệu, ánh sáng và trải nghiệm sử dụng bên trong mỗi công trình.",
    image: imagePool.apartmentKitchen
  },
  {
    name: "Dịch vụ & F&B",
    role: "Những không gian nhà hàng, cafe và dịch vụ được đầu tư về cảm xúc và vận hành.",
    image: imagePool.bambooHero
  },
  {
    name: "Bán lẻ & showroom",
    role: "Tăng nhận diện thương hiệu qua mặt tiền, không gian trưng bày và hành trình mua sắm.",
    image: imagePool.tranPhuShop
  },
  {
    name: "Văn phòng & studio",
    role: "Tổ chức nơi làm việc rõ ràng, thẩm mỹ và truyền tải được tính cách thương hiệu.",
    image: imagePool.vsmOffice
  },
  {
    name: "Cải tạo công trình",
    role: "Làm mới không gian cũ bằng giải pháp tiết chế, dễ thi công và dễ kiểm soát chi phí.",
    image: imagePool.morinLab
  },
  {
    name: "Hồ sơ kỹ thuật",
    role: "Triển khai chi tiết rõ ràng, giảm phát sinh và giúp quá trình thi công mạch lạc hơn.",
    image: imagePool.haTinhExterior
  },
  {
    name: "Thi công trọn gói",
    role: "Đồng hành từ tư vấn, báo giá, tổ chức thi công đến bàn giao hoàn thiện.",
    image: imagePool.kcnFactory
  }
];

function genericProjectMedia(work) {
  if (work.terms.includes("hospitality")) {
    return {
      gallery: [work.image, imagePool.bambooHall, imagePool.hoiannaDining, imagePool.suwonInterior],
      narrative: imagePool.hoiannaLounge,
      detail: imagePool.bambooDetail
    };
  }

  if (work.terms.includes("retail")) {
    return {
      gallery: [work.image, imagePool.giaBao, imagePool.bwShop, imagePool.tranPhuShop],
      narrative: imagePool.noithatIndochina,
      detail: imagePool.noithatAcong
    };
  }

  if (work.terms.includes("commercial")) {
    return {
      gallery: [work.image, imagePool.vsmOffice, imagePool.nancySet, imagePool.puuStudio],
      narrative: imagePool.studioCreative,
      detail: imagePool.kcnFactory
    };
  }

  if (work.terms.includes("multi-residential")) {
    return {
      gallery: [work.image, imagePool.apartmentKitchen, imagePool.apartmentBedroom, imagePool.apartmentDetail],
      narrative: imagePool.apartmentKitchen,
      detail: imagePool.apartmentBedroom
    };
  }

  return {
    gallery: [work.image, imagePool.haTinhExterior, imagePool.haTinhYard, imagePool.haTinhLiving],
    narrative: imagePool.visionVilla,
    detail: imagePool.nguyenCongHoan
  };
}

const genericProjectSections = (work) => {
  const media = genericProjectMedia(work);

  return [
    {
      index: "02",
      title: "Ý tưởng không gian",
      image: media.narrative,
      text: `${work.title} được Sleeper phát triển theo hướng cân bằng giữa công năng, thẩm mỹ và khả năng thi công thực tế tại ${work.location}.`
    },
    {
      index: "03",
      title: "Giải pháp thiết kế",
      image: media.detail,
      text: "Đội ngũ ưu tiên tổ chức mặt bằng rõ ràng, vật liệu phù hợp ngân sách và cách xử lý chi tiết để công trình sau cùng bền đẹp và dễ sử dụng."
    },
    {
      index: "04",
      title: "Giá trị sử dụng",
      image: work.image,
      text: "Mỗi đề xuất đều hướng đến trải nghiệm sống và vận hành lâu dài, giúp công trình không chỉ đẹp trên phối cảnh mà còn hiệu quả khi đưa vào sử dụng."
    }
  ];
};

export const projectDetails = {
  "nha-mai-ngoi-ha-tinh": {
    summary: "Dự án Nhà mái ngói Hà Tĩnh được định hướng như một ngôi nhà bình yên, thông thoáng và dễ sống. Sleeper tập trung vào sự cân bằng giữa hình khối hiện đại, mái dốc gần gũi với khí hậu và không gian sinh hoạt rõ ràng cho gia đình.",
    status: "Thiết kế & thi công",
    client: "Khách hàng nhà ở",
    country: "Hà Tĩnh, Việt Nam",
    discipline: "Kiến trúc nhà ở",
    awards: "Nhà ở thấp tầng / Sân vườn",
    quote: "Một ngôi nhà đẹp cần vừa hợp với khu đất, vừa hợp với cách sống của gia chủ và có thể xây dựng gọn gàng ngoài thực tế.",
    gallery: [imagePool.haTinhFront, imagePool.haTinhExterior, imagePool.haTinhYard, imagePool.haTinhLiving],
    sections: [
      {
        index: "02",
        title: "Tổng thể kiến trúc",
        image: imagePool.haTinhExterior,
        text: "Tổng thể công trình được tiết chế về hình khối, kết hợp chất liệu sáng màu và mái dốc để tạo cảm giác gần gũi, bền vững và phù hợp bối cảnh nhà ở miền Trung."
      },
      {
        index: "03",
        title: "Khoảng sân và không gian đệm",
        image: imagePool.haTinhYard,
        text: "Sân trước, lối tiếp cận và các khoảng đệm được xử lý rõ ràng giúp việc sử dụng hàng ngày trở nên thuận tiện, thoáng mát và sạch sẽ."
      },
      {
        index: "04",
        title: "Không gian sống",
        image: imagePool.haTinhLiving,
        text: "Nội thất hướng tới sự ấm áp, dễ bảo trì và tối ưu được ánh sáng tự nhiên, tạo nên một không gian sống bền đẹp trong quá trình sử dụng lâu dài."
      }
    ]
  },
  "nha-hang-khach-san-hoianna": {
    summary: "Nhà hàng Khách sạn Hoianna là đề bài dịch vụ với yêu cầu cao về trải nghiệm, ánh sáng và tinh thần thương hiệu. Sleeper phát triển giải pháp nội thất có nhận diện rõ, tạo tầng không gian và khả năng vận hành mạch lạc.",
    status: "Thiết kế nội thất",
    client: "Chủ đầu tư dịch vụ",
    country: "Quảng Nam, Việt Nam",
    discipline: "Nội thất dịch vụ",
    awards: "Nhà hàng / Khách sạn",
    quote: "Một không gian dịch vụ tốt là khi khách bước vào đã cảm nhận được không khí của nơi đó, nhưng vận hành vẫn phải gọn gàng và hiệu quả.",
    gallery: [imagePool.hoiannaHero, imagePool.hoiannaDining, imagePool.hoiannaLounge, imagePool.bambooHall],
    sections: [
      {
        index: "02",
        title: "Nhận diện không gian",
        image: imagePool.hoiannaDining,
        text: "Không gian được tạo lập bằng những lớp vật liệu, gam màu đậm và điểm nhấn ánh sáng, giúp nhà hàng có cá tính riêng nhưng vẫn giữ được sự ấm cúng và dễ tiếp cận."
      },
      {
        index: "03",
        title: "Tổ chức vận hành",
        image: imagePool.hoiannaLounge,
        text: "Mặt bằng và luồng di chuyển được cân nhắc để phục vụ đồng thời nhu cầu của khách, nhân sự và các khu vực phụ trợ, giúp việc vận hành ổn định hơn."
      },
      {
        index: "04",
        title: "Cảm xúc trải nghiệm",
        image: imagePool.hoiannaHero,
        text: "Từ góc nhìn tổng thể đến những điểm nhấn nhỏ, dự án hướng tới việc tạo một không gian có nhớ, có chiều sâu và phù hợp tính chất dịch vụ cao cấp."
      }
    ]
  },
  "bamboo-restaurant": {
    summary: "Bamboo Restaurant là dự án nội thất nhà hàng nổi bật bởi kết cấu trần, nhịp không gian và chất cảm vật liệu. Sleeper khai thác mạnh trải nghiệm thị giác và tính biểu tượng để tạo ấn tượng ngay từ lúc khách bước vào.",
    status: "Thiết kế nội thất",
    client: "Chủ đầu tư nhà hàng",
    country: "Việt Nam",
    discipline: "Nội thất nhà hàng",
    awards: "Dịch vụ / F&B",
    quote: "Không gian nhà hàng cần đủ để lại ấn tượng, nhưng vẫn phải thoải mái, rõ ràng và hỗ trợ tốt cho vận hành hằng ngày.",
    gallery: [imagePool.bambooHero, imagePool.bambooHall, imagePool.bambooDetail, imagePool.hoiannaDining],
    sections: [
      {
        index: "02",
        title: "Khung trần và nhịp điệu",
        image: imagePool.bambooHero,
        text: "Kết cấu trần được xem là nhân vật chính, tạo trục nhìn mạnh, định hình nhịp điệu cho toàn bộ không gian và giúp khách hàng có một trải nghiệm thị giác đặc biệt."
      },
      {
        index: "03",
        title: "Tổ chức khu vực ngồi",
        image: imagePool.bambooHall,
        text: "Các khu vực ngồi được sắp xếp để đảm bảo tầm nhìn đẹp, khoảng cách hợp lý và sự linh hoạt cho nhiều kiểu nhóm khách khác nhau."
      },
      {
        index: "04",
        title: "Vật liệu và ánh sáng",
        image: imagePool.bambooDetail,
        text: "Gam màu ấm, chất liệu gỗ và ánh sáng nhấn nhằm tạo một tổng thể gần gũi nhưng vẫn giữ được chất lượng thẩm mỹ của một công trình dịch vụ."
      }
    ]
  },
  "can-ho-313-dong-da": {
    summary: "Căn hộ 313 Đống Đa là đề bài tối ưu hóa diện tích, tăng khả năng lưu trữ và tạo một bộ nội thất gọn gàng, ấm áp. Sleeper phát triển giải pháp nội thất đồng bộ để không gian nhỏ vẫn rõ nhịp và dễ ở.",
    status: "Thiết kế nội thất",
    client: "Khách hàng căn hộ",
    country: "Đống Đa, Đà Nẵng",
    discipline: "Căn hộ / Nội thất",
    awards: "Căn hộ / Multi-residential",
    quote: "Nội thất đẹp là khi mỗi chi tiết đều có lý do tồn tại và góp phần làm cho cuộc sống hằng ngày dễ chịu hơn.",
    gallery: [imagePool.apartmentHero, imagePool.apartmentKitchen, imagePool.apartmentBedroom, imagePool.apartmentDetail],
    sections: [
      {
        index: "02",
        title: "Tổ chức mặt bằng",
        image: imagePool.apartmentKitchen,
        text: "Không gian bếp, ăn và sinh hoạt chung được tổ chức liền mạch để mở rộng cảm nhận về diện tích và giúp căn hộ có sự kết nối tốt hơn."
      },
      {
        index: "03",
        title: "Vật liệu và màu sắc",
        image: imagePool.apartmentBedroom,
        text: "Sleeper sử dụng bảng vật liệu trung tính, ấm màu và dễ bảo trì, giúp nội thất giữ được sự nhẹ nhàng và bền đẹp trong sử dụng hằng ngày."
      },
      {
        index: "04",
        title: "Chi tiết sử dụng",
        image: imagePool.apartmentDetail,
        text: "Hệ tủ, khu lưu trữ và những chi tiết nội thất được tính toán để tăng tính tiện nghi mà không làm căn hộ trở nên nặng nề hay chật chội."
      }
    ]
  },
  "suwon-phu-quoc": {
    summary: "Suwon Phú Quốc là dự án nghỉ dưỡng kết hợp giữa hình ảnh kiến trúc bên ngoài và không gian nội thất bên trong. Định hướng thiết kế tập trung vào trải nghiệm, sự thống nhất về vật liệu và tinh thần nghỉ dưỡng hiện đại.",
    status: "Thiết kế concept",
    client: "Chủ đầu tư nghỉ dưỡng",
    country: "Phú Quốc, Việt Nam",
    discipline: "Kiến trúc / Nội thất nghỉ dưỡng",
    awards: "Nhà hàng nghỉ dưỡng / dịch vụ",
    quote: "Đối với không gian nghỉ dưỡng, cảm xúc đến từ tổng thể: kiến trúc, ánh sáng, vật liệu và cách khách hàng đi qua mỗi khu vực.",
    gallery: [imagePool.suwonExterior, imagePool.suwonInterior, imagePool.suwonDining, imagePool.suwonPrivate],
    sections: [
      {
        index: "02",
        title: "Ngoại thất công trình",
        image: imagePool.suwonExterior,
        text: "Ngoại thất được định hướng để tạo ấn tượng rõ ràng từ xa, đồng thời mở ra một nhận diện phù hợp tính chất dịch vụ và nghỉ dưỡng."
      },
      {
        index: "03",
        title: "Không gian bên trong",
        image: imagePool.suwonInterior,
        text: "Bên trong công trình, Sleeper phát triển giải pháp nhấn mạnh trải nghiệm khách, tạo sự thống nhất giữa khu vực chung và các không gian có tính chất riêng tư."
      },
      {
        index: "04",
        title: "Không khí sử dụng",
        image: imagePool.suwonDining,
        text: "Gam vật liệu ấm và cách bố trí ánh sáng được cân chỉnh để giữ cho không gian có chiều sâu, dễ thưởng thức và phù hợp tính chất nghỉ dưỡng cao cấp."
      }
    ]
  },
  "nancy-studio-da-nang": {
    summary: "Nancy Studio Đà Nẵng là một không gian sáng tạo tối giản, sáng rõ và có tính trình bày cao. Sleeper hướng đến việc tạo nên một studio linh hoạt, dễ chụp hình, dễ làm việc và phản ánh tính cách thương hiệu.",
    status: "Thiết kế nội thất",
    client: "Studio sáng tạo",
    country: "Đà Nẵng, Việt Nam",
    discipline: "Nội thất thương mại",
    awards: "Studio / Không gian sáng tạo",
    quote: "Không gian làm việc sáng tạo cần đủ rộng để linh hoạt, nhưng vẫn phải có nhịp và nhận diện riêng.",
    gallery: [imagePool.nancyHero, imagePool.nancySet, imagePool.nancyCorner, imagePool.studioCreative],
    sections: [
      {
        index: "02",
        title: "Tinh thần không gian",
        image: imagePool.nancyHero,
        text: "Không gian được giữ sạch về hình ảnh, trung tính về màu sắc để phù hợp nhiều kiểu setup chụp hình và các hoạt động sáng tạo khác nhau."
      },
      {
        index: "03",
        title: "Độ linh hoạt khi sử dụng",
        image: imagePool.nancySet,
        text: "Mặt bằng rộng, bố trí nội thất tiết chế và ánh sáng được tính toán để studio có thể thay đổi bố cục nhanh cho từng nhu cầu khai thác."
      },
      {
        index: "04",
        title: "Nhận diện thương hiệu",
        image: imagePool.nancyCorner,
        text: "Từ vật liệu đến cách xử lý các điểm nhấn, dự án giúp không gian có chất riêng mà vẫn giữ được sự nhẹ nhàng, hiện đại và dễ tiếp cận."
      }
    ]
  }
};

export function getProjectContent(work) {
  const detail = projectDetails[work.slug];

  if (detail) {
    return detail;
  }

  const media = genericProjectMedia(work);
  const isResidential = work.terms.includes("residential");
  const isApartment = work.terms.includes("multi-residential");
  const isHospitality = work.terms.includes("hospitality");
  const isRetail = work.terms.includes("retail");

  return {
    summary: `${work.title} là một dự án tiêu biểu trong danh mục ${work.typology.toLowerCase()} của Sleeper, được phát triển với sự ưu tiên cho công năng, thẩm mỹ và tính khả thi khi triển khai thực tế.`,
    status: isResidential ? "Thiết kế & thi công" : "Thiết kế",
    client: isResidential || isApartment ? "Khách hàng tư nhân" : "Chủ đầu tư doanh nghiệp",
    country: work.location,
    discipline: isHospitality
      ? "Thiết kế dịch vụ"
      : isRetail
        ? "Bán lẻ / Thương mại"
        : isApartment
          ? "Nội thất căn hộ"
          : "Kiến trúc / Nội thất",
    awards: isResidential
      ? "Nhà ở dân dụng"
      : isApartment
        ? "Căn hộ / Multi-residential"
        : isHospitality
          ? "Không gian dịch vụ"
          : isRetail
            ? "Không gian kinh doanh"
            : "Nội thất thương mại",
    quote: "Mỗi công trình được Sleeper xem là một bài toán riêng, cần được giải quyết bằng sự cân bằng giữa bối cảnh, nhu cầu và khả năng thi công thực tế.",
    gallery: media.gallery,
    sections: genericProjectSections(work)
  };
}
