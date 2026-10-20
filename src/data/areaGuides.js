// Neighbourhood guides (EN + AR). Written as general lifestyle guidance, with no price or yield figures —
// current prices come from the live listings on each page.
// NOTE: please have a native Arabic speaker review the Arabic copy before launch.

export const AREA_META = {
  downtown: {
    key: 'downtown',
    keyword: 'Downtown',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80',
  },
  marina: {
    key: 'marina',
    keyword: 'Marina',
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1200&q=80',
  },
  palm: {
    key: 'palm',
    keyword: 'Palm Jumeirah',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80',
  },
  'business-bay': {
    key: 'bay',
    keyword: 'Business Bay',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
  },
  'creek-harbour': {
    key: 'creek',
    keyword: 'Creek',
    image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200&q=80',
  },
  jvc: {
    key: 'jvc',
    keyword: 'Jumeirah Village',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80',
  },
}

export const AREA_SLUGS = Object.keys(AREA_META)

export const areaGuides = {
  en: {
    downtown: {
      tagline: 'The beating heart of Dubai.',
      intro: "Home to the Burj Khalifa, The Dubai Mall and the Dubai Fountain, Downtown is Dubai's most recognisable address. Residents get walkable streets, fine dining and some of the city's best-connected towers.",
      highlights: ['Burj Khalifa, Dubai Mall and Dubai Opera on your doorstep', 'Popular with both long-term residents and short-stay guests', 'Mostly high-rise apartments, with some penthouses', 'Close to DIFC and Sheikh Zayed Road'],
      bestFor: ['Professionals who want to walk to work and dining', 'Investors looking for a prime, well-known address', 'Buyers who value views and landmarks'],
    },
    marina: {
      tagline: 'Waterfront living, city energy.',
      intro: 'Dubai Marina wraps around a man-made canal lined with towers, a promenade and a wide choice of cafes and restaurants. It sits next to JBR beach, and the metro and tram make getting around easy.',
      highlights: ['Marina Walk promenade with restaurants and cafes', 'Beach access close by at JBR', 'Metro and tram connections', 'Wide range of studios and one to three bedroom apartments'],
      bestFor: ['Young professionals and couples', 'Investors targeting rental demand', 'Anyone who loves a marina view'],
    },
    palm: {
      tagline: 'Iconic island living.',
      intro: 'Palm Jumeirah is the world-famous palm-shaped island, known for private beaches, luxury villas and high-end apartments along the trunk and fronds.',
      highlights: ['Beachfront villas and signature homes', 'Hotels, beach clubs and shopping on the island', 'Private-beach community living on the fronds', 'Apartments on the trunk and crescent'],
      bestFor: ['Luxury buyers and families who want space', 'Buyers who want a beach lifestyle', 'Long-term capital holders'],
    },
    'business-bay': {
      tagline: 'Where business meets the canal.',
      intro: 'Business Bay is a central district along the Dubai Canal, mixing offices, residential towers and cafes, just minutes from Downtown.',
      highlights: ['Dubai Canal waterfront and promenade', 'Minutes from Downtown and DIFC', 'Studios to larger apartments, plus offices', 'A wide choice for investors and renters'],
      bestFor: ['Professionals who want a central location', 'Investors seeking varied price points', 'Business owners looking for office space'],
    },
    'creek-harbour': {
      tagline: "Dubai's next skyline.",
      intro: 'Dubai Creek Harbour is a large waterfront master development beside the creek, designed around parks, promenades and views towards the Downtown skyline. Many projects here launch off plan.',
      highlights: ['Waterfront promenades and green spaces', 'Frequent off-plan launches with payment plans', 'Views towards the Downtown skyline', 'Newer buildings with modern layouts'],
      bestFor: ['Off-plan investors', 'Buyers who want a newer community', 'Those who like green, waterfront surroundings'],
    },
    jvc: {
      tagline: 'Community living at a friendlier budget.',
      intro: 'Jumeirah Village Circle is a family-friendly community of low- and mid-rise buildings, townhouses and parks, popular with buyers looking for more space for their budget.',
      highlights: ['Apartments, townhouses and villas', 'Parks and community facilities', 'Popular with renters, including families', 'Generally more affordable than central districts'],
      bestFor: ['First-time buyers', 'Investors seeking rental demand', 'Families who want space on a smaller budget'],
    },
  },
  ar: {
    downtown: {
      tagline: 'قلب دبي النابض.',
      intro: 'تضم منطقة وسط المدينة برج خليفة ودبي مول ونافورة دبي، وهي أشهر عنوان في دبي. يتمتع السكان بشوارع صالحة للمشي ومطاعم راقية وأبراج من أفضل الأبراج ارتباطاً بالطرق في المدينة.',
      highlights: ['برج خليفة ودبي مول ودار أوبرا دبي على مقربة منك', 'تحظى بإقبال السكان الدائمين والزوار لفترات قصيرة', 'معظمها شقق في أبراج عالية مع بعض البنتهاوس', 'قريبة من مركز دبي المالي العالمي وشارع الشيخ زايد'],
      bestFor: ['المهنيون الذين يريدون الوصول إلى العمل والمطاعم سيراً', 'المستثمرون الباحثون عن عنوان مميز ومعروف', 'المشترون الذين يقدّرون الإطلالات والمعالم'],
    },
    marina: {
      tagline: 'حياة على الواجهة المائية بنبض المدينة.',
      intro: 'تلتف دبي مارينا حول قناة مائية اصطناعية تصطف على جانبيها الأبراج وممشى ساحلي وخيارات واسعة من المقاهي والمطاعم. وتقع بجوار شاطئ جي بي آر، ويسهّل المترو والترام التنقل.',
      highlights: ['ممشى المارينا مع المطاعم والمقاهي', 'شاطئ جي بي آر على مقربة', 'ارتباط بالمترو والترام', 'تشكيلة واسعة من الاستوديوهات والشقق من غرفة إلى ثلاث غرف'],
      bestFor: ['المهنيون الشباب والأزواج', 'المستثمرون الساعون وراء الطلب على الإيجار', 'كل من يحب إطلالات المارينا'],
    },
    palm: {
      tagline: 'حياة جزيرة أيقونية.',
      intro: 'نخلة جميرا هي الجزيرة الشهيرة عالمياً على شكل نخلة، وتشتهر بالشواطئ الخاصة والفلل الفاخرة والشقق الراقية على الجذع والسعف.',
      highlights: ['فلل على الشاطئ ومنازل مميزة', 'فنادق ونوادٍ شاطئية ومتاجر على الجزيرة', 'مجتمعات بشواطئ خاصة على السعف', 'شقق على الجذع والهلال'],
      bestFor: ['مشترو العقارات الفاخرة والعائلات الباحثة عن المساحة', 'من يريدون نمط حياة شاطئياً', 'أصحاب الاستثمار طويل الأمد'],
    },
    'business-bay': {
      tagline: 'حيث يلتقي الأعمال بالقناة.',
      intro: 'الخليج التجاري منطقة مركزية على امتداد قناة دبي، تجمع المكاتب والأبراج السكنية والمقاهي، وعلى بُعد دقائق من وسط المدينة.',
      highlights: ['الواجهة المائية وممشى قناة دبي', 'دقائق من وسط المدينة ومركز دبي المالي العالمي', 'من الاستوديوهات إلى الشقق الأكبر، إضافة إلى المكاتب', 'خيارات واسعة للمستثمرين والمستأجرين'],
      bestFor: ['المهنيون الذين يريدون موقعاً مركزياً', 'المستثمرون الباحثون عن نطاقات أسعار متنوعة', 'أصحاب الأعمال الباحثون عن مساحات مكتبية'],
    },
    'creek-harbour': {
      tagline: 'أفق دبي القادم.',
      intro: 'ميناء خور دبي مشروع رئيسي ضخم على الواجهة المائية بجوار الخور، صُمّم حول الحدائق والممشيات مع إطلالات نحو أفق وسط المدينة. وتُطلق فيه مشاريع كثيرة على الخارطة.',
      highlights: ['ممشيات ومساحات خضراء على الواجهة المائية', 'إطلاقات متكررة على الخارطة مع خطط دفع', 'إطلالات نحو أفق وسط المدينة', 'مبانٍ أحدث بتصاميم عصرية'],
      bestFor: ['مستثمرو العقارات على الخارطة', 'من يريدون مجتمعاً أحدث', 'محبّو الأجواء الخضراء والمائية'],
    },
    jvc: {
      tagline: 'حياة مجتمعية بميزانية أنسب.',
      intro: 'قرية جميرا الدائرية مجتمع ملائم للعائلات من مبانٍ منخفضة ومتوسطة الارتفاع وتاون هاوس وحدائق، ويحظى بشعبية لدى المشترين الباحثين عن مساحة أكبر لميزانيتهم.',
      highlights: ['شقق وتاون هاوس وفلل', 'حدائق ومرافق مجتمعية', 'شائعة بين المستأجرين ومنهم العائلات', 'عموماً أكثر تكلفة معقولة من المناطق المركزية'],
      bestFor: ['مشترو المنزل الأول', 'المستثمرون الباحثون عن الطلب على الإيجار', 'العائلات التي تريد مساحة بميزانية أصغر'],
    },
  },
}
