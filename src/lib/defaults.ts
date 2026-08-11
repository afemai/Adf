import type { SiteData } from "./types";

// Seed content built from the client's official materials:
// - CAC Certificate of Incorporation + Certified Extract (verified spelling: AFEMHAI DESCENDANT FORUM)
// - Official history document (6 LGAs, origins, rulers, timeline, aims & objectives)
// - Official letter of 3 Aug 2026 (leadership, phones, address, motto)
// - Client voice note (coconut products, 3D farm request)

export const DEFAULT_DATA: SiteData = {
  general: {
    orgName: "Afemhai Descendant Forum",
    orgNameFull: "Afemhai Descendant Forum",
    shortName: "ADF",
    tagline: "Unity is Power",
    philosophy: "One People. Diverse Communities. Shared Heritage. Common Future.",
    logo: "/brand/logo.jpeg",
    address: "20, Jattu Road, Opposite Secretariat Road, Auchi, Edo State, Nigeria",
    phones: ["+234 803 360 4406", "+234 803 294 8240", "+234 803 920 9090"],
    emails: ["idoghojohn93@gmail.com"],
    socials: { facebook: "", instagram: "", twitter: "", youtube: "", whatsapp: "" },
    regNo: "7309739",
    tin: "31904849-0001",
    incDate: "23 January 2024",
  },
  homepage: {
    heroTitle: "One People. Diverse Communities. Shared Heritage. Common Future.",
    heroSubtitle:
      "The Afemhai Descendant Forum unites the sons and daughters of Edo North — Etsako, Owan and Akoko-Edo — at home and in the diaspora, preserving our history, empowering our people and building our future.",
    heroBadge: "A Socio-Cultural & Civic Organisation · Incorporated 2024 (Reg. No. 7309739)",
    heroImage: "/images/executives.jpg",
    announcement: {
      enabled: true,
      text: "The investiture of High Chief Luchy Ohimai as Ambassador of Afemai Land holds on Saturday, 26 September 2026 in Auchi.",
      link: "/leadership",
      linkLabel: "Read more",
    },
    stats: [
      { value: "6", label: "Local Government Areas" },
      { value: "3", label: "Cultural Divisions" },
      { value: "8", label: "Incorporated Trustees" },
      { value: "21+", label: "Coconut Products" },
    ],
    pillars: [
      {
        title: "Unity",
        description:
          "Fostering solidarity among every Afemai descendant — by clan, community, Local Government Area, faith or location — at home and across the world.",
        icon: "handshake",
      },
      {
        title: "Heritage",
        description:
          "Preserving our history, languages, festivals, traditional institutions and arts so that the Afemai story is never lost to the next generation.",
        icon: "landmark",
      },
      {
        title: "Development",
        description:
          "Turning cultural unity into practical progress: education, enterprise, agriculture, youth leadership, women's empowerment and community investment.",
        icon: "sprout",
      },
    ],
    coconutTeaserTitle: "From Our Farms to the World",
    coconutTeaserText:
      "Coconut farming and processing is a proud Afemhai industry — over 21 products from a single fruit, from oils and nutrition to coir, briquettes and crafts.",
    ctaPrimary: { text: "Our Coconut Business", link: "/coconut" },
    ctaSecondary: { text: "Explore Our Heritage", link: "/about" },
  },
  about: {
    introTitle: "Who Are the Afemai?",
    introImage: "/images/executives.jpg",
    introText:
      "The Afemai (also written Afenmai) are one of the major ethnocultural groupings of northern Edo State, Nigeria. The area broadly corresponds to the six Local Government Areas of the Edo North Senatorial District — Etsako West, Etsako Central, Etsako East, Owan East, Owan West and Akoko-Edo. Afemai is not a single kingdom: it is a broad ethnocultural family of numerous clans, communities and traditional polities, bound by related Edoid languages, shared customs and an interconnected history.",
    originTitle: "The Question of Origin",
    originText:
      "Oral tradition maintains that substantial sections of the Afemai migrated northward from the ancient Benin Kingdom, particularly during the upheavals associated with the reign of Oba Ewuare I in the 15th century. Yet historical scholarship recognises that indigenous populations already inhabited parts of the region. The most historically responsible formulation is that the Afemai emerged through the interaction of indigenous communities and successive migrations — especially from the Benin cultural sphere — producing the diverse clans and kingdoms of Edo North today.",
    kukurukuTitle: "The Old Name — 'Kukuruku'",
    kukurukuText:
      "During the colonial period the area was widely known as Kukuruku Division, a name associated with a traditional battle cry and the Kukuruku Hills. Over time the term became undesirable to the people and was replaced by Afenmai/Afemai in official and popular usage.",
    divisionsTitle: "Three Great Divisions, Six Local Government Areas",
    divisionsText:
      "The Afemai are broadly considered in three cultural divisions — Etsako (Etsako West, Central and East), Owan (Owan East and West) and Akoko-Edo — together constituting the Edo North Senatorial District.",
    lgas: [
      {
        id: "etsako-west",
        name: "Etsako West",
        headquarters: "Auchi",
        division: "Etsako",
        communities: ["Auchi", "Uzairue/Jattu", "Agbede", "South Ibie", "Aviele", "Anwain", "Afashio", "Ivhiaro/Iyaro"],
        rulers: ["Otaru of Auchi", "Ogieneni of Uzairue"],
        economy:
          "One of the most commercially important areas of Edo North. Historically farming, hunting, blacksmithing, weaving and trade; today commerce, education, transport, construction, professional services and agriculture.",
      },
      {
        id: "etsako-central",
        name: "Etsako Central",
        headquarters: "Fugar",
        division: "Etsako",
        communities: ["Fugar", "Ogbona", "Anegbette", "Udochi", "Avianwu/Avainwu"],
        rulers: ["Ogieavianwu of Avianwu", "Oliola of Anegbette"],
        economy:
          "Predominantly rural with considerable agricultural potential — yam, cassava, maize, rice, groundnuts, livestock, hunting and trading. Traditional institutions here preserve clan identity and customary law.",
      },
      {
        id: "etsako-east",
        name: "Etsako East",
        headquarters: "Agenebode",
        division: "Etsako",
        communities: ["Agenebode", "Weppa-Wanno", "Okpella", "Okpekpe", "Iviagbapue"],
        rulers: ["Okumagbe of Weppa-Wanno", "Okuopellagbe of Okpella"],
        economy:
          "Historically significant for its relationship with the River Niger — fishing, farming, transportation, river-based commerce, craft, livestock and mineral resources.",
      },
      {
        id: "owan-east",
        name: "Owan East",
        headquarters: "Afuze",
        division: "Owan",
        communities: ["Afuze", "Ihievbe", "Warrake and surrounding settlements"],
        rulers: ["Ukor of Ihievbe"],
        economy:
          "Agriculture, palm production, yam and cassava cultivation, maize, hunting, forestry, trading and livestock. Traditional authority is organised around clans and communities.",
      },
      {
        id: "owan-west",
        name: "Owan West",
        headquarters: "Sabongida-Ora",
        division: "Owan",
        communities: ["Sabongida-Ora and surrounding communities"],
        rulers: ["Clan and community traditional authorities"],
        economy:
          "An important commercial centre associated with agriculture, palm products, rubber-related agriculture, food crops, forestry and trading.",
      },
      {
        id: "akoko-edo",
        name: "Akoko-Edo",
        headquarters: "Igarra",
        division: "Akoko-Edo",
        communities: ["Igarra", "Okpe", "Ososo", "Somorika", "Uneme communities", "Lampese", "Ibillo"],
        rulers: ["Otaru of Igarra and numerous clan authorities"],
        economy:
          "Culturally and geographically distinctive, with strong connections across the Edo/Kogi/Ondo borderlands and spectacular landscapes — the Ososo, Somorika and Kukuruku Hills — with considerable tourism potential.",
      },
    ],
    timelineTitle: "A Simple Historical Timeline",
    timeline: [
      { era: "Before the 15th century", text: "Indigenous communities already inhabited portions of present-day Afemai territory." },
      { era: "15th century", text: "Major movements of people from the Benin cultural sphere, traditionally associated with upheavals around the reign of Oba Ewuare." },
      { era: "15th–19th centuries", text: "Clans and communities consolidated their settlements and traditional political institutions." },
      { era: "19th century", text: "Trade, inter-community relations, warfare and contact with neighbouring peoples intensified." },
      { era: "Late 19th–early 20th century", text: "British expansion and colonial administration reorganised the region as Kukuruku Division." },
      { era: "1960s–1970s", text: "Post-independence administrative restructuring progressively replaced the older colonial divisions." },
      { era: "1991", text: "Edo State was created from the former Bendel State." },
      { era: "23 January 2024", text: "The Afemhai Descendant Forum was incorporated as a corporate body by the Corporate Affairs Commission (Reg. No. 7309739)." },
    ],
    aimsTitle: "Aims & Objectives of the Afemhai Descendant Forum",
    aimsIntro:
      "The aims and objectives of the Forum are enshrined in its constitution and aligned with the 1999 Constitution of the Federal Republic of Nigeria as amended.",
    aims: [
      {
        title: "Promote Unity",
        text: "To promote unity among the people of the Edo North Senatorial District — Akoko-Edo, Etsako East, Etsako Central, Etsako West, Owan East and Owan West — as contained in the 1999 Constitution of the Federal Republic of Nigeria as amended til today.",
      },
      {
        title: "Education & Culture",
        text: "To collaborate with government and non-governmental organisations in promoting the education of minds and young ones, sports and cultural heritage of the Afemai throughout the clans and Local Government Areas, with the best international practices.",
      },
      {
        title: "Social & Economic Welfare",
        text: "To promote the social and economic welfare of every Afemai son and daughter irrespective of age, sex, creed or location.",
      },
      {
        title: "Scholarships & Trust Funds",
        text: "To promote collaboration with government at all levels and their educational agencies through scholarships and trust funds for the benefit of qualified Afemai sons and daughters.",
      },
      {
        title: "Our Mother Tongue",
        text: "To partner with government at all levels, non-governmental organisations, corporate bodies and private individuals in the projection of our mother tongue at local and national levels of recognition.",
      },
      {
        title: "Equity & Common Interest",
        text: "To ensure the common unity of Afemai is negotiated with all sense of equity and the common interest of the Afemai people.",
      },
      {
        title: "Partnership",
        text: "To cooperate with other organisations whose aims and objectives are in harmony with those of the Association and in conformity with the provisions of its constitution.",
      },
      {
        title: "Democracy & Discipline",
        text: "To institutionalise, maintain and foster representative democracy, discipline and strict observance of the rule of law in the Association, in the common interest of Afemai.",
      },
      {
        title: "Internal Democracy",
        text: "To promote and uphold the practice of internal democracy at all levels of the Association.",
      },
      {
        title: "Preservation of Heritage",
        text: "To preserve and promote the rich history, culture, traditions, languages, customs and institutions of the Afemai people — oral histories, festivals, arts, dress, historical sites and genealogies.",
      },
      {
        title: "Peace & Social Cohesion",
        text: "To promote peacebuilding, dialogue, mutual respect and the constructive management of differences among Afemai communities and with neighbouring peoples.",
      },
      {
        title: "Youth & Women Empowerment",
        text: "To identify and develop young leaders, encourage mentorship and entrepreneurship, and promote women's participation in leadership, education and economic empowerment.",
      },
      {
        title: "Diaspora Engagement",
        text: "To connect Afemai descendants worldwide with their ancestral communities and to mobilise diaspora knowledge, investment and networks for development.",
      },
      {
        title: "Investment & Tourism",
        text: "To encourage investment in agriculture, real estate, tourism, hospitality, manufacturing, mining, technology, education and renewable energy, and to promote heritage attractions such as the Ososo and Somorika landscapes.",
      },
      {
        title: "Research & Documentation",
        text: "To establish the Forum as a centre for the systematic documentation of Afemai history — origins, migration, institutions, languages, personalities and traditional economies.",
      },
    ],
    philosophy: "One People. Diverse Communities. Shared Heritage. Common Future.",
  },
  coconut: {
    introTitle: "Coconut Farming & Processing",
    introText:
      "Beyond the soil of heritage grows the industry of the future. The Afemhai are turning the humble coconut into a diversified agro-industrial enterprise — from sustainable farming and harvesting to processing that yields over twenty-one valuable products, from food and nutrition to coir, briquettes and crafts.",
    journeyTitle: "From Farm to Product",
    journeyText:
      "Explore the journey: palms harvested from the farm, coconuts de-husked by modern processing machinery, and the kernel, husk and shell transformed into the full range of coconut products.",
    videos: [
      {
        id: "v1",
        src: "/videos/plantation-drone.mp4",
        poster: "/images/poster-plantation-drone.jpg",
        label: "Aerial plantation",
        caption: "Rows of coconut palms reaching the horizon",
      },
      {
        id: "v2",
        src: "/videos/coconut-sunset.mp4",
        poster: "/images/poster-coconut-sunset.jpg",
        label: "Palms at sunset",
        caption: "The grove glowing in golden hour light",
      },
      {
        id: "v3",
        src: "/videos/coconut-jungle.mp4",
        poster: "/images/poster-coconut-jungle.jpg",
        label: "Deep in the grove",
        caption: "Between the trunks — the farm from the ground",
      },
      {
        id: "v4",
        src: "/videos/coconut-palm-wind.mp4",
        poster: "/images/poster-coconut-palm-wind.jpg",
        label: "Wind through the leaves",
        caption: "Fronds swaying above the plantation floor",
      },
    ],
    factoryTitle: "Inside Our Processing Facility",
    factoryText:
      "Real footage from the Forum's coconut processing line — a modern de-husking machine at work, the first step in turning raw fruit into finished products.",
    productsTitle: "Over 21 Products From One Fruit",
    productsIntro:
      "Coconut is called the tree of life for a reason. Every part — meat, milk, oil, husk, shell and water — becomes a product. This list is the working portfolio of the Afemhai coconut enterprise.",
    products: [
      { id: "p1", name: "Coconut Oil", category: "Food & Nutrition", description: "Pure, cold-pressed cooking oil from fresh mature kernels — the kitchen staple of every home.", order: 1 },
      { id: "p2", name: "Virgin Coconut Oil", category: "Food & Nutrition", description: "Unrefined, unbleached, naturally fragrant oil extracted from fresh coconut milk.", order: 2 },
      { id: "p3", name: "Coconut Milk", category: "Food & Nutrition", description: "Rich, creamy plant-based milk used in cooking, baking and beverages.", order: 3 },
      { id: "p4", name: "Coconut Cream", category: "Food & Nutrition", description: "Thick, concentrated coconut extract for sauces, soups and desserts.", order: 4 },
      { id: "p5", name: "Coconut Flour", category: "Food & Nutrition", description: "Gluten-free, high-fibre baking flour made from dried coconut meat.", order: 5 },
      { id: "p6", name: "Coconut Sugar", category: "Food & Nutrition", description: "Natural, low-glycemic sweetener from coconut sap.", order: 6 },
      { id: "p7", name: "Coconut Chips", category: "Food & Nutrition", description: "Toasted, lightly sweetened coconut snacks.", order: 7 },
      { id: "p8", name: "Desiccated Coconut", category: "Food & Nutrition", description: "Dried, grated coconut for confectionery and baking industries.", order: 8 },
      { id: "p9", name: "Coconut Water", category: "Food & Nutrition", description: "Refreshing, electrolyte-rich drink from young green coconuts.", order: 9 },
      { id: "p10", name: "Coconut Hair & Body Care", category: "Health & Beauty", description: "Natural oils and blends for hair growth, skin care and massage.", order: 10 },
      { id: "p11", name: "Coconut Soap", category: "Health & Beauty", description: "Handcrafted, chemical-free soaps from virgin coconut oil.", order: 11 },
      { id: "p12", name: "Coconut Briquettes", category: "Coir & Industrial", description: "High-energy, low-smoke cooking briquettes — the 'brick pad' of clean household fuel.", order: 12 },
      { id: "p13", name: "Coir Pads", category: "Coir & Industrial", description: "Durable coconut-fibre pads for cleaning, scrubbing and industrial use.", order: 13 },
      { id: "p14", name: "Coir Fibre", category: "Coir & Industrial", description: "Strong natural fibre from the husk used in ropes, mats, brushes and erosion control.", order: 14 },
      { id: "p15", name: "Coco Peat", category: "Coir & Industrial", description: "Premium growing medium for nurseries, horticulture and soil improvement.", order: 15 },
      { id: "p16", name: "Coir Pots", category: "Coir & Industrial", description: "Biodegradable planting pots that nurture seedlings and enrich the soil as they decompose.", order: 16 },
      { id: "p17", name: "Activated Carbon", category: "Coir & Industrial", description: "High-grade coconut-shell activated carbon for water purification and industry.", order: 17 },
      { id: "p18", name: "Coir Rope & Mats", category: "Coir & Industrial", description: "Strong, weather-resistant ropes, doormats and geotextiles from coir fibre.", order: 18 },
      { id: "p19", name: "Coconut Charcoal", category: "Crafts & Energy", description: "Clean-burning shell charcoal for grilling and industry.", order: 19 },
      { id: "p20", name: "Coconut Shell Crafts", category: "Crafts & Energy", description: "Bowls, utensils, ornaments and beads handcrafted from polished coconut shell.", order: 20 },
      { id: "p21", name: "Coconut Animal Feed", category: "Crafts & Energy", description: "Nutritious copra cake and husk-based feed supplements for livestock.", order: 21 },
    ],
    ctaTitle: "Partner With the Forum",
    ctaText: "Investment, off-take agreements, distribution partnerships and technical collaborations are welcome. Let's grow the Afemhai coconut economy together.",
  },
  leadership: {
    introTitle: "Leadership & Trustees",
    introText:
      "The Afemhai Descendant Forum is led by a Board of eight Incorporated Trustees registered with the Corporate Affairs Commission on 23 January 2024. The Forum's structure honours the federal nature of Afemai society — many kingdoms, clans and communities — under one unifying roof.",
    execsTitle: "National Executives",
    execsIntro: "The Forum's principal officers, as published in official correspondence.",
    trusteesTitle: "Incorporated Trustees",
    trusteesIntro: "The eight duly appointed Trustees registered with the Corporate Affairs Commission (Reg. No. 7309739).",
    honorTitle: "Ambassador of Afemai Land",
    honorText:
      "In recognition of his distinguished service to Afemai heritage, cultural identity and community values, the Forum unanimously resolved to confer the title of Ambassador of Afemai Land on High Chief Luchy Ohimai — The Ogbuduwemi of Owan Nation and CEO of Tarex Conglomerate. The investiture ceremony will be conferred by the ADF Leadership on Saturday, 26 September 2026.",
    leaders: [
      {
        id: "l1",
        name: "Cmrd. John Aidenomo Idogho",
        title: "President-General & Chairman, Board of Trustees",
        email: "idoghojohn93@gmail.com",
        phone: "+234 803 360 4406",
        bio: "Chairman of the Board of Trustees and President-General of the Forum, leading the drive for Afemai unity, education and economic development.",
        order: 1,
        honorRoll: false,
      },
      {
        id: "l2",
        name: "Cmrd. Lucky Michael Asekokhai",
        title: "Secretary-General & Trustee Secretary",
        email: "asekokhailucky@gmail.com",
        phone: "+234 803 294 8240",
        bio: "Secretary-General and Trustee-Secretary, coordinating the Forum's programmes, records and official engagements.",
        order: 2,
        honorRoll: false,
      },
      {
        id: "l3",
        name: "Engr. Oshioluemoh Victor Iyobosa",
        title: "Incorporated Trustee",
        email: "victoroshioluemohv@gmail.com",
        phone: "+234 812 720 2784",
        bio: "Incorporated Trustee of the Forum.",
        order: 3,
        honorRoll: false,
      },
      {
        id: "l4",
        name: "Mr. Aliu Sunday Oyarebu",
        title: "Incorporated Trustee",
        email: "sunnyleadership@gmail.com",
        phone: "+234 803 560 3772",
        bio: "Incorporated Trustee of the Forum, Atte, Edo State.",
        order: 4,
        honorRoll: false,
      },
      {
        id: "l5",
        name: "Mr. Imela Emmanuel Oshio",
        title: "Incorporated Trustee",
        phone: "+234 803 062 2668",
        bio: "Incorporated Trustee of the Forum, Auchi, Edo State.",
        order: 5,
        honorRoll: false,
      },
      {
        id: "l6",
        name: "Mr. Idogho Campbell",
        title: "Incorporated Trustee",
        email: "campbellidogho@gmail.com",
        phone: "+234 805 934 2334",
        bio: "Incorporated Trustee of the Forum, Lagos State.",
        order: 6,
        honorRoll: false,
      },
      {
        id: "l7",
        name: "Mr. Omoba Okhumhode Emmanuel",
        title: "Incorporated Trustee",
        email: "emmanuel.omoba@yahoo.com",
        phone: "+234 703 442 4675",
        bio: "Incorporated Trustee of the Forum, Lagos State.",
        order: 7,
        honorRoll: false,
      },
      {
        id: "l8",
        name: "Mrs. Obogai Maureen",
        title: "Incorporated Trustee — Women's Affairs",
        email: "oshioneh73@gmail.com",
        phone: "+234 802 875 7026",
        bio: "Incorporated Trustee of the Forum, Uzairue, Edo State — champion of women's participation in Forum programmes.",
        order: 8,
        honorRoll: false,
      },
    ],
    galleryTitle: "The Forum in Pictures",
    galleryIntro: "Our executives, members and the people our work serves — at official gatherings and in portrait.",
    gallery: [
      { id: "g1", url: "/images/executives.jpg", caption: "ADF National Executives at an official gathering" },
      { id: "g2", url: "/images/leader-1.jpg", caption: "ADF Leadership portrait" },
      { id: "g3", url: "/images/leader-2.jpg", caption: "ADF Leadership portrait" },
      { id: "g4", url: "/images/leader-3.jpg", caption: "ADF Leadership portrait" },
      { id: "g5", url: "/images/leader-4.jpg", caption: "ADF Leadership portrait" },
      { id: "g6", url: "/images/leader-5.jpg", caption: "ADF Leadership portrait" },
      { id: "g7", url: "/images/leader-6.jpg", caption: "ADF Leadership portrait" },
      { id: "g8", url: "/images/leader-7.jpg", caption: "ADF women's wing" },
      { id: "g9", url: "/images/leader-8.jpg", caption: "ADF Leadership portrait" },
    ],
  },
  contact: {
    introTitle: "Get in Touch",
    introText:
      "Whether you are a descendant seeking to reconnect, a partner exploring the coconut economy, or a government or corporate body working with the Forum — we would love to hear from you.",
    formTitle: "Send Us a Message",
    formText: "Fill the form and the Forum's secretariat will respond promptly.",
    mapUrl: "https://www.openstreetmap.org/export/embed.html?bbox=6.26%2C7.07%2C6.30%2C7.09&layer=mapnik&marker=7.0784%2C6.2832",
    messages: [],
  },
  events: {
    events: [
      {
        id: "e1",
        title: "Investiture of the Ambassador of Afemai Land",
        description:
          "The Afemhai Descendant Forum confers the title of Ambassador of Afemai Land on High Chief Luchy Ohimai — The Ogbuduwemi of Owan Nation, CEO of Tarex Conglomerate — in recognition of his service to Afemai heritage, cultural identity and community values.",
        date: "2026-09-26",
        time: "To be announced",
        location: "Auchi, Edo State, Nigeria",
        featured: true,
      },
    ],
  },
  press: {
    items: [
      {
        id: "pr1",
        source: "Vanguard Nigeria",
        headline: "Edo 2024: Afemai group task candidates on good governance, security",
        url: "https://www.vanguardngr.com/2024/07/edo-2024-afemai-group-task-candidates-on-good-governance-security/",
        date: "July 2024",
      },
    ],
  },
  seo: {
    siteTitle: "Afemhai Descendant Forum | Unity is Power",
    siteDescription:
      "The Afemhai Descendant Forum unites the Afemai people of Edo North, Nigeria — Etsako, Owan and Akoko-Edo — at home and in the diaspora. Preserving heritage, empowering communities and growing the coconut economy.",
    keywords:
      "Afemhai Descendant Forum, Afemai, Afenmai, Edo North, Etsako, Owan, Akoko-Edo, Auchi, coconut products Nigeria, coconut briquettes, Afemai history",
    ogImage: "/brand/logo.jpeg",
    perPage: {
      home: { title: "Home", description: "One People. Diverse Communities. Shared Heritage. Common Future. The home of the Afemhai people — heritage, community and the coconut economy." },
      about: { title: "Our History & Heritage", description: "The history of the Afemai people of Edo North: origins, the six Local Government Areas, traditional institutions, and the Aims & Objectives of the Afemhai Descendant Forum." },
      coconut: { title: "Coconut Farming & Processing", description: "Over 21 coconut products from one fruit — oils, nutrition, coir, briquettes and crafts. Explore the Afemhai coconut economy from farm to product." },
      leadership: { title: "Leadership & Trustees", description: "Meet the Board of Incorporated Trustees and national executives of the Afemhai Descendant Forum, and discover the investiture of the Ambassador of Afemai Land." },
      contact: { title: "Contact Us", description: "Reach the Afemhai Descendant Forum in Auchi, Edo State, Nigeria — address, phones, email and a contact form." },
    },
  },
  theme: {
    primaryColor: "#0B2447",
    secondaryColor: "#F2B705",
    accentColor: "#1E5C3B",
    fontDisplay: "Fraunces",
    fontBody: "Inter",
  },
  settings: {
    // Seeded at first run (see dataStore) — never ship a plaintext password.
    adminPasswordHash: "",
    maintenanceMode: false,
    allowContactForm: true,
    seasonal: {
      mode: "none",
      message: "",
    },
  },
  updatedAt: new Date().toISOString(),
};