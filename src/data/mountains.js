/**
 * Mountain Explorer 3D — Complete Dataset
 *
 * Categories:
 *   'seven-summits-oceania'   → Gold  — Traditional Seven Summits (Puncak Jaya for Oceania)
 *   'seven-summits-australia' → Green — Bass/Messner list (Kosciuszko for Australia)
 *   '8000m'                   → Red   — The 14 Eight-thousanders
 *   'special'                 → Blue  — Special/notable peaks
 */

export const mountains = [

  // ════════════════════════════════════════════════
  // SEVEN SUMMITS — OCEANIA / TRADITIONAL VERSION
  // ════════════════════════════════════════════════

  {
    id: 'everest',
    name: 'Mount Everest',
    shortName: 'Everest',
    elevation: 8849,
    lat: 27.9881,
    lng: 86.9250,
    continent: 'Asia',
    country: 'Nepal / China',
    // Everest qualifies as both the Oceania Seven Summit AND an 8000m peak
    categories: ['seven-summits-oceania', '8000m'],
    description:
      'The highest mountain on Earth above sea level, standing at 8,849 m. Located in the Mahalangur Himal sub-range of the Himalayas, it was first summited on 29 May 1953 by Edmund Hillary and Tenzing Norgay. Its Tibetan name, Chomolungma, means "Goddess Mother of the World."',
    firstAscent: '1953',
    climbers: 'Edmund Hillary & Tenzing Norgay',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/800px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg',
    funFact: 'Grows approximately 4 mm per year due to tectonic uplift of the Indian plate.',
  },

  {
    id: 'aconcagua',
    name: 'Aconcagua',
    shortName: 'Aconcagua',
    elevation: 6961,
    lat: -32.6532,
    lng: -70.0109,
    continent: 'South America',
    country: 'Argentina',
    categories: ['seven-summits-oceania'],
    description:
      'The highest peak in both the Western and Southern Hemispheres, rising 6,961 m in the Andes near the Chilean border. Its name likely derives from the Quechua "Ackon Cahuak" (Stone Sentinel). The Normal Route sees thousands of trekkers each austral summer.',
    firstAscent: '1897',
    climbers: 'Matthias Zurbriggen (solo)',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Aconcagua_from_west_-_ESA271443.jpg/800px-Aconcagua_from_west_-_ESA271443.jpg',
    funFact: 'Highest point in the Americas and the highest peak outside Asia.',
  },

  {
    id: 'denali',
    name: 'Denali',
    shortName: 'Denali',
    elevation: 6194,
    lat: 63.0695,
    lng: -151.0074,
    continent: 'North America',
    country: 'United States',
    categories: ['seven-summits-oceania'],
    description:
      'The highest peak in North America at 6,194 m, located in the Alaska Range. Denali has one of the greatest vertical rises from base to summit of any mountain on Earth (~5,500 m), making it exceptionally challenging despite its lower absolute elevation.',
    firstAscent: '1913',
    climbers: 'Hudson Stuck, Harry Karstens, Walter Harper & Robert Tatum',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Denali_Mt_McKinley.jpg/800px-Denali_Mt_McKinley.jpg',
    funFact: 'Renamed from "Mount McKinley" to the Indigenous Athabascan name "Denali" in 2015.',
  },

  {
    id: 'kilimanjaro',
    name: 'Kilimanjaro',
    shortName: 'Kilimanjaro',
    elevation: 5895,
    lat: -3.0674,
    lng: 37.3556,
    continent: 'Africa',
    country: 'Tanzania',
    categories: ['seven-summits-oceania'],
    description:
      'The highest peak in Africa, Kilimanjaro is a dormant stratovolcano with three volcanic cones: Kibo (5,895 m), Mawenzi, and Shira. Its iconic glaciated summit rises dramatically above the East African savanna and is accessible to non-technical climbers via guided routes.',
    firstAscent: '1889',
    climbers: 'Hans Meyer & Ludwig Purtscheller',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Kilimanjaro_from_amboseli.jpg/800px-Kilimanjaro_from_amboseli.jpg',
    funFact: 'Glaciers on Kilimanjaro have shrunk by over 85% since 1912, victims of climate change.',
  },

  {
    id: 'elbrus',
    name: 'Mount Elbrus',
    shortName: 'Elbrus',
    elevation: 5642,
    lat: 43.3499,
    lng: 42.4453,
    continent: 'Europe',
    country: 'Russia',
    categories: ['seven-summits-oceania'],
    description:
      'The highest mountain in Europe at 5,642 m, Elbrus is a dormant stratovolcano in the Caucasus range of southern Russia. Its twin peaks — West (5,642 m) and East (5,621 m) — are both above the second-highest European peak, Mont Blanc.',
    firstAscent: '1874',
    climbers: 'Florence Crauford Grove, F. Gardner, H. Walker & Ahiya Sottaiev',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Elbrus_from_north.jpg/800px-Elbrus_from_north.jpg',
    funFact: 'Has permanent fumaroles and dormant geothermal activity beneath its icy mantle.',
  },

  {
    id: 'vinson',
    name: 'Vinson Massif',
    shortName: 'Vinson',
    elevation: 4892,
    lat: -78.5254,
    lng: -85.6171,
    continent: 'Antarctica',
    country: 'Antarctica',
    categories: ['seven-summits-oceania'],
    description:
      'The highest mountain in Antarctica at 4,892 m, part of the Ellsworth Mountains. Located about 1,200 km from the South Pole, it was only discovered by aircraft in 1958 and first climbed in 1966. Extremely remote and expensive to reach, it is the last Seven Summit most climbers complete.',
    firstAscent: '1966',
    climbers: 'Nicholas Clinch American Antarctic Expedition',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Vinson_massif_from_nw_with_scale.jpg/800px-Vinson_massif_from_nw_with_scale.jpg',
    funFact: 'One of the coldest and most remote climbing destinations on Earth — flights cost ~$50,000.',
  },

  {
    id: 'puncak-jaya',
    name: 'Puncak Jaya',
    shortName: 'Puncak Jaya',
    elevation: 4884,
    lat: -4.0833,
    lng: 137.1833,
    continent: 'Oceania',
    country: 'Indonesia (Papua)',
    categories: ['seven-summits-oceania'],
    description:
      'Also known as Carstensz Pyramid, Puncak Jaya (4,884 m) is the highest island peak in the world and the highest point in Oceania. Located in the Sudirman Range of West Papua, Indonesia, it features technical rock climbing routes and is surrounded by glaciers — rare at equatorial latitudes.',
    firstAscent: '1962',
    climbers: 'Heinrich Harrer, Russell Kippax, Albert Huizenga & Puncak Jaya team',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Carstensz_Pyramid_by_Anton_Belovodchenko.jpg/800px-Carstensz_Pyramid_by_Anton_Belovodchenko.jpg',
    funFact: 'One of the last places near the equator with permanent glaciers — shrinking rapidly.',
  },

  // ════════════════════════════════════════════════
  // SEVEN SUMMITS — AUSTRALIA CONTINENTAL VERSION
  // ════════════════════════════════════════════════

  {
    id: 'kosciuszko',
    name: 'Mount Kosciuszko',
    shortName: 'Kosciuszko',
    elevation: 2228,
    lat: -36.4548,
    lng: 148.2636,
    continent: 'Australia',
    country: 'Australia',
    categories: ['seven-summits-australia'],
    description:
      'The highest mountain in Australia at 2,228 m, located in the Snowy Mountains of New South Wales. Named after the Polish geographer Paweł Edmund Strzelecki, who likened its shape to the tomb of Polish hero Tadeusz Kościuszko. Unlike other Seven Summits, it is easily reached by a gentle 13 km return walk.',
    firstAscent: '1840',
    climbers: 'Paweł Edmund Strzelecki (first recorded European ascent)',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Kosciuszko_summit.jpg/800px-Kosciuszko_summit.jpg',
    funFact: 'The most accessible of all Seven Summits — reachable by a paved chairlift and gentle hike.',
  },

  // ════════════════════════════════════════════════
  // 14 EIGHT-THOUSANDERS
  // (Everest already listed above with both categories)
  // ════════════════════════════════════════════════

  {
    id: 'k2',
    name: 'K2',
    shortName: 'K2',
    elevation: 8611,
    lat: 35.8825,
    lng: 76.5133,
    continent: 'Asia',
    country: 'Pakistan / China',
    categories: ['8000m'],
    description:
      'The second highest mountain on Earth and arguably the most dangerous, K2 (8,611 m) rises on the border of Pakistan and China. Known as the "Savage Mountain," it has a fatality-to-summit ratio near 1-in-4. Its pyramid shape, savage weather, and technical climbing make it the crown jewel of high-altitude mountaineering.',
    firstAscent: '1954',
    climbers: 'Lino Lacedelli & Achille Compagnoni (Italian expedition)',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/K2%2C_the_savage_mountain.jpg/800px-K2%2C_the_savage_mountain.jpg',
    funFact: 'The last 8000m peak to be first climbed in winter — finally summited in January 2021.',
  },

  {
    id: 'kangchenjunga',
    name: 'Kangchenjunga',
    shortName: 'Kangchenjunga',
    elevation: 8586,
    lat: 27.7025,
    lng: 88.1475,
    continent: 'Asia',
    country: 'Nepal / India',
    categories: ['8000m'],
    description:
      'The third highest mountain in the world at 8,586 m, Kangchenjunga means "Five Treasuries of Snow" in Tibetan. It straddles the Nepal–Sikkim border and is considered sacred. By tradition, climbers stop a few metres short of the true summit out of respect for local communities.',
    firstAscent: '1955',
    climbers: 'George Band & Norman Hardie (British expedition)',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Kangchenjunga_main.jpg/800px-Kangchenjunga_main.jpg',
    funFact: 'Climbers traditionally stop just below the summit out of respect for Sikkimese sacred beliefs.',
  },

  {
    id: 'lhotse',
    name: 'Lhotse',
    shortName: 'Lhotse',
    elevation: 8516,
    lat: 27.9617,
    lng: 86.9330,
    continent: 'Asia',
    country: 'Nepal / China',
    categories: ['8000m'],
    description:
      'The fourth highest mountain in the world at 8,516 m, Lhotse (meaning "South Peak" in Tibetan) is directly connected to Everest via the South Col. The Lhotse Face — a 1,100 m wall of blue glacial ice at 45°–55° — is the crux of the standard Everest south ridge route.',
    firstAscent: '1956',
    climbers: 'Ernst Reiss & Fritz Luchsinger (Swiss expedition)',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Lhotse_Suedwand.JPG/800px-Lhotse_Suedwand.JPG',
    funFact: 'The Lhotse Face is a shared obstacle for all Everest south-side expeditions.',
  },

  {
    id: 'makalu',
    name: 'Makalu',
    shortName: 'Makalu',
    elevation: 8485,
    lat: 27.8897,
    lng: 87.0882,
    continent: 'Asia',
    country: 'Nepal / China',
    categories: ['8000m'],
    description:
      'The fifth highest mountain in the world at 8,485 m, Makalu is an isolated four-sided pyramid located 19 km southeast of Everest. Its dramatic shape and the technical knife-edge ridges make it one of the most difficult 8000m peaks. Only the most experienced high-altitude climbers attempt it.',
    firstAscent: '1955',
    climbers: 'Jean Couzy & Lionel Terray (French expedition led by Jean Franco)',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Makalu.jpg/800px-Makalu.jpg',
    funFact: 'Its perfect pyramid shape makes it one of the most photographed peaks in the Himalayas.',
  },

  {
    id: 'cho-oyu',
    name: 'Cho Oyu',
    shortName: 'Cho Oyu',
    elevation: 8188,
    lat: 28.0944,
    lng: 86.6600,
    continent: 'Asia',
    country: 'Nepal / China',
    categories: ['8000m'],
    description:
      'The sixth highest mountain in the world at 8,188 m, Cho Oyu means "Turquoise Goddess" in Tibetan. Situated 20 km west of Everest on the Nepal–Tibet border, it is considered the most accessible 8000m peak and is frequently used as an acclimatization climb before Everest.',
    firstAscent: '1954',
    climbers: 'Herbert Tichy, Joseph Jöchler & Pasang Dawa Lama',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Cho-oyu.jpg/800px-Cho-oyu.jpg',
    funFact: 'The most frequently climbed 8000m peak due to its relatively moderate technical difficulty.',
  },

  {
    id: 'dhaulagiri',
    name: 'Dhaulagiri I',
    shortName: 'Dhaulagiri',
    elevation: 8167,
    lat: 28.6983,
    lng: 83.4882,
    continent: 'Asia',
    country: 'Nepal',
    categories: ['8000m'],
    description:
      'The seventh highest mountain in the world at 8,167 m, Dhaulagiri means "White Mountain" in Sanskrit and Nepali. It dominates north-central Nepal and is separated from Annapurna I by the Kali Gandaki Gorge — one of the world\'s deepest gorges at over 5,500 m from peak to river.',
    firstAscent: '1960',
    climbers: 'K. Diemberger, P. Diener, E. Forrer, A. Schelbert, Nawang Dorje & Nyima Dorje',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Dhaulagiri.jpg/800px-Dhaulagiri.jpg',
    funFact: 'For 30 years after discovery it was thought to be the world\'s highest mountain.',
  },

  {
    id: 'manaslu',
    name: 'Manaslu',
    shortName: 'Manaslu',
    elevation: 8163,
    lat: 28.5497,
    lng: 84.5597,
    continent: 'Asia',
    country: 'Nepal',
    categories: ['8000m'],
    description:
      'The eighth highest mountain in the world at 8,163 m, Manaslu means "Mountain of the Spirit" (Sanskrit: manasa = soul). It is the highest peak in the Gorkha district of Nepal. The famous Manaslu Circuit trek circles it at high altitude through remote Tibetan-Buddhist villages.',
    firstAscent: '1956',
    climbers: 'Toshio Imanishi & Gyalzen Norbu (Japanese expedition)',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Manaslu_from_Samagaon.jpg/800px-Manaslu_from_Samagaon.jpg',
    funFact: 'The Manaslu Circuit is one of Nepal\'s most popular and remote trekking routes.',
  },

  {
    id: 'nanga-parbat',
    name: 'Nanga Parbat',
    shortName: 'Nanga Parbat',
    elevation: 8126,
    lat: 35.2374,
    lng: 74.5894,
    continent: 'Asia',
    country: 'Pakistan',
    categories: ['8000m'],
    description:
      'The ninth highest mountain in the world at 8,126 m, Nanga Parbat means "Naked Mountain" in Urdu. Known historically as the "Killer Mountain," it claimed many lives before its first ascent. Its Rupal Face — a 4,600 m vertical rise — is the highest mountain face on Earth.',
    firstAscent: '1953',
    climbers: 'Hermann Buhl (solo, alpine style — one of history\'s greatest mountaineering feats)',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Nanga_Parbat%2C_Pakistan.jpg/800px-Nanga_Parbat%2C_Pakistan.jpg',
    funFact: 'Hermann Buhl\'s solo summit in 1953 without supplemental oxygen is a legendary mountaineering achievement.',
  },

  {
    id: 'annapurna',
    name: 'Annapurna I',
    shortName: 'Annapurna',
    elevation: 8091,
    lat: 28.5966,
    lng: 83.8200,
    continent: 'Asia',
    country: 'Nepal',
    categories: ['8000m'],
    description:
      'The tenth highest mountain in the world at 8,091 m, Annapurna I holds the historic distinction of being the first 8,000m peak ever climbed. It has the highest fatality-to-summit ratio of all fourteen eight-thousanders — approximately 32% — making it the most statistically dangerous high mountain.',
    firstAscent: '1950',
    climbers: 'Maurice Herzog & Louis Lachenal (French expedition)',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/AnnapurnaI_fromNorthBase.jpg/800px-AnnapurnaI_fromNorthBase.jpg',
    funFact: 'First 8000m peak ever climbed; it remains the most dangerous with a ~32% fatality rate.',
  },

  {
    id: 'gasherbrum-1',
    name: 'Gasherbrum I',
    shortName: 'Gasherbrum I',
    elevation: 8080,
    lat: 35.7242,
    lng: 76.6967,
    continent: 'Asia',
    country: 'Pakistan / China',
    categories: ['8000m'],
    description:
      'The eleventh highest mountain in the world at 8,080 m, Gasherbrum I is also called "Hidden Peak" because it is concealed from view by surrounding ridges. Part of the Gasherbrum massif in the Karakoram, it was the first Pakistani peak over 8,000 m to be climbed.',
    firstAscent: '1958',
    climbers: 'Pete Schoening & Andy Kauffman (American Karakoram Expedition)',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Gasherbrum1.jpg/800px-Gasherbrum1.jpg',
    funFact: 'Called "Hidden Peak" because it remains invisible from roads — only revealed deep in the Baltoro Glacier.',
  },

  {
    id: 'broad-peak',
    name: 'Broad Peak',
    shortName: 'Broad Peak',
    elevation: 8051,
    lat: 35.8118,
    lng: 76.5676,
    continent: 'Asia',
    country: 'Pakistan / China',
    categories: ['8000m'],
    description:
      'The twelfth highest mountain in the world at 8,051 m, Broad Peak is named for its wide, ~1.5 km summit plateau. Located in the Karakoram adjacent to K2, it was first climbed alpine-style without high-altitude camps or supplemental oxygen by an Austrian four-man team.',
    firstAscent: '1957',
    climbers: 'Fritz Wintersteller, Marcus Schmuck, Kurt Diemberger & Hermann Buhl',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Broad_peak_from_concordia.jpg/800px-Broad_peak_from_concordia.jpg',
    funFact: 'First 8000m peak climbed fully alpine-style (no fixed camps, no supplemental oxygen).',
  },

  {
    id: 'gasherbrum-2',
    name: 'Gasherbrum II',
    shortName: 'Gasherbrum II',
    elevation: 8035,
    lat: 35.7588,
    lng: 76.6536,
    continent: 'Asia',
    country: 'Pakistan / China',
    categories: ['8000m'],
    description:
      'The thirteenth highest mountain in the world at 8,035 m, Gasherbrum II (G2) is part of the Gasherbrum massif in the Karakoram. It is among the more frequently climbed 8000m peaks due to relatively moderate technical difficulty. "Gasherbrum" may derive from Balti "rgasha brum" meaning "Beautiful Mountain."',
    firstAscent: '1956',
    climbers: 'Fritz Moravec, Josef Larch & Hans Willenpart (Austrian expedition)',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/GashII_from_concordia.jpg/800px-GashII_from_concordia.jpg',
    funFact: 'One of the more approachable 8000m peaks; often combined with G1 and Broad Peak in a single expedition.',
  },

  {
    id: 'shishapangma',
    name: 'Shishapangma',
    shortName: 'Shishapangma',
    elevation: 8027,
    lat: 28.3523,
    lng: 85.7797,
    continent: 'Asia',
    country: 'China (Tibet)',
    categories: ['8000m'],
    description:
      'The fourteenth and lowest of the eight-thousanders at 8,027 m, Shishapangma is located entirely within the Tibet Autonomous Region of China. It was the last 8,000 m peak to receive its first ascent, delayed until 1964 due to Chinese restrictions on foreign access to Tibet.',
    firstAscent: '1964',
    climbers: 'Xǔ Jìng & 9 other Chinese climbers (Chinese expedition)',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Shishapangma_from_the_north.jpg/800px-Shishapangma_from_the_north.jpg',
    funFact: 'The only 8000m peak located entirely within China, and the last to be first climbed.',
  },

  // ════════════════════════════════════════════════
  // SPECIAL CASE: MAUNA KEA
  // ════════════════════════════════════════════════

  {
    id: 'mauna-kea',
    name: 'Mauna Kea',
    shortName: 'Mauna Kea',
    elevation: 4207,        // meters above sea level
    totalHeight: 10210,     // meters from ocean floor base to summit
    lat: 19.8207,
    lng: -155.4680,
    continent: 'Oceania',
    country: 'United States (Hawaii)',
    categories: ['special'],
    description:
      'While only 4,207 m above sea level, Mauna Kea is the tallest mountain on Earth when measured from its base on the Pacific Ocean floor — a staggering 10,210 m total. This dormant shield volcano on the Big Island of Hawaii sits atop the world\'s largest single mountain by mass. Its summit hosts 13 of the world\'s most advanced astronomical observatories, positioned above 40% of Earth\'s atmosphere.',
    firstAscent: 'Prehistoric',
    climbers: 'Ancient Hawaiian peoples (first historically recorded European ascent: Archibald Menzies, 1794)',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Mauna_Kea_from_Hilo.jpg/800px-Mauna_Kea_from_Hilo.jpg',
    funFact:
      'Tallest mountain on Earth from base to peak (10,210 m). Its summit is above 40% of Earth\'s atmosphere, making it the premier site for ground-based astronomy.',
  },
];

/** Total mountain count */
export const MOUNTAIN_COUNT = mountains.length;

/** Mountains grouped by category */
export const mountainsByCategory = {
  'seven-summits-oceania': mountains.filter(m => m.categories.includes('seven-summits-oceania')),
  'seven-summits-australia': mountains.filter(m => m.categories.includes('seven-summits-australia')),
  '8000m': mountains.filter(m => m.categories.includes('8000m')),
  'special': mountains.filter(m => m.categories.includes('special')),
};
