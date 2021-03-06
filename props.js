const blockedByDT_Style = ["weekday", "year", "month", "day", "hour", "minute", "second", "fractionalSecondDigits", "timeZoneName", "era"],
	blocksDT_Style = ["dateStyle", "timeStyle"];

// Blocked = what becomes blocked when you use

const possibleProps = {
	dateStyle: {
		values: ["full", "long", "medium", "short"],
		readableValues: ["Full", "Long", "Medium", "Short"],
		blocked: blockedByDT_Style,
		description: "Date style"
	},
	timeStyle: {
		values: ["full", "long", "medium", "short"],
		readableValues: ["Full", "Long", "Medium", "Short"],
		blocked: blockedByDT_Style,
		description: "Time style"
	},
	hour12: {
		values: [true, false],
		readableValues: ["Yes", "No"],
		blocked: ["hourCycle"],
		description: "12 Hour cycle?"
	},
	hourCycle: {
		values: ["h11", "h12", "h23", "h24"],
		readableValues: ["11 Hours", "12 Hours", "23 Hours", "24 Hours"],
		blocked: [],
		description: "Hour cycle"
	},
	era: {
		values: ["long", "short", "narrow"],
		readableValues: ["Long", "Short", "Narrow"],
		blocked: blocksDT_Style,
		description: "Era"
	},
	year: {
		values: ["numeric", "2-digit"],
		readableValues: ["Numeric", "2 Digit"],
		blocked: blocksDT_Style,
		description: "Year"
	},
	month: {
		values: ["numeric", "2-digit", "long", "short", "narrow"],
		readableValues: ["Numeric", "2 Digit", "Long", "Short", "Narrow"],
		blocked: blocksDT_Style,
		description: "Month"
	},
	weekday: {
		values: ["long", "short", "narrow"],
		readableValues: ["Long", "Short", "Narrow"],
		blocked: blocksDT_Style,
		description: "Weekday"
	},
	day: {
		values: ["numeric", "2-digit"],
		readableValues: ["Numeric", "2 Digit"],
		blocked: blocksDT_Style,
		description: "Day"
	},
	timeZoneName: {
		values: ["long", "short"],
		readableValues: ["Long", "Short"],
		blocked: blocksDT_Style,
		description: "Timezone Name"
	},
	hour: {
		values: ["numeric", "2-digit"],
		readableValues: ["Numeric", "2 Digit"],
		blocked: blocksDT_Style,
		description: "Hour"
	},
	minute: {
		values: ["numeric", "2-digit"],
		readableValues: ["Numeric", "2 Digit"],
		blocked: blocksDT_Style,
		description: "Minute"
	},
	second: {
		values: ["numeric", "2-digit"],
		readableValues: ["Numeric", "2 Digit"],
		blocked: blocksDT_Style,
		description: "Second"
	},
	fractionalSecondDigits: {
		values: [1, 2, 3],
		readableValues: ["One", "Two", "Three"],
		blocked: blocksDT_Style,
		description: "Fractional Second Digits"
	},
	calendar: {
		values: ["buddhist", "chinese", "coptic", "ethiopia", "ethiopic", "gregory", "hebrew", "indian", "islamic", "iso8601", "japanese", "persian", "roc"],
		blocked: [],
		description: "Calendar"
	},
	dayPeriod: {
		values: ["narrow", "short", "long"],
		readableValues: ["Narrow", "Short", "Long"],
		blocked: [],
		description: "Day Period"
	},
	numberingSystem: {
		values: ["adlm", "ahom", "arab", "arabext", "armn", "armnlow", "bali", "beng", "bhks", "brah", "cakm", "cham", "cyrl", "deva", "ethi", "finance", "fullwide", "geor", "gong", "gonm", "grek", "greklow", "gujr", "guru", "hanidays", "hanidec", "hans", "hansfin", "hant", "hantfin", "hebr", "hmng", "hmnp", "java", "jpan", "jpanfin", "jpanyear", "kali", "khmr", "knda", "lana", "lanatham", "laoo", "latn", "lepc", "limb", "mathbold", "mathdbl", "mathmono", "mathsanb", "mathsans", "mlym", "modi", "mong", "mroo", "mtei", "mymr", "mymrshan", "mymrtlng", "native", "newa", "nkoo", "olck", "orya", "osma", "rohg", "roman", "romanlow", "saur", "shrd", "sind", "sinh", "sora", "sund", "takr", "talu", "taml", "tamldec", "telu", "thai", "tirh", "tibt", "traditio", "vaii", "wara", "wcho"],
		readableValues: ["Adlam", "Ahom", "Arabic-Indic", "Extended Arabic-Indic", "Armenian uppercase", "Armenian lowercase", "Balinese", "Bengali", "Bhaiksuki", "Brahmi", "Chakma", "Cham", "Cyrillic", "Devanagari", "Ethiopic", "Financial numerals", "Full width", "Georgian", "Gunjala Gondi", "Masaram Gondi", "Greek uppercase", "Greek lowercase", "Gujarati", "Gurmukhi", "Han-character", "Chinese ideographs decimal", "Simplified Chinese", "Simplified Chinese financial", "Traditional Chinese", "Traditional Chinese financial", "Hebrew", "Pahawh Hmong", "Nyiakeng Puachue Hmong", "Javanese", "Japanese", "Japanese financial", "Japanese Gannen", "Kayah Li", "Khmer", "Kannada", "Tai Tham Hora", "Tai Tham", "Lao", "Latin", "Lepcha", "Limbu", "Mathematical bold", "Mathematical double-struck", "Mathematical monospace", "Mathematical sans-serif bold", "Mathematical sans-serif", "Malayalam", "Modi", "Mongolian", "Mro", "Meetei Mayek", "Myanmar", "Myanmar Shan", "Myanmar Tai Laing", "Native", "Newa", "N'Ko", "Ol Chiki", "Oriya", "Osmanya", "Hanifi Rohingya", "Roman uppercase", "Roman lowercase", "Saurashtra", "Sharada", "Khudawadi", "Sinhala Lith", "Sora_Sompeng", "Sundanese", "Takri", "New Tai Lue", "Tamil", "Modern Tamil decimal", "Telugu", "Thai", "Tirhuta", "Tibetan", "Traditional", "Vai", "Warang Citi", "Wancho"],
		blocked: [],
		description: "Numbering System"
	},
	localeMatcher: {
		values: ["lookup", "best fit"],
		readableValues: ["Lookup", "Best Fit"],
		blocked: [],
		description: "Locale matching algorithm"
	},
	formatMatcher: {
		values: ["basic", "best fit"],
		readableValues: ["Lookup", "Best Fit"],
		blocked: [],
		description: "Format matching algorithm"
	},
	timeZone: {
		values: ["Africa/Abidjan", "Africa/Accra", "Africa/Addis_Ababa", "Africa/Algiers", "Africa/Asmara", "Africa/Asmera", "Africa/Bamako", "Africa/Bangui", "Africa/Banjul", "Africa/Bissau", "Africa/Blantyre", "Africa/Brazzaville", "Africa/Bujumbura", "Africa/Cairo", "Africa/Casablanca", "Africa/Ceuta", "Africa/Conakry", "Africa/Dakar", "Africa/Dar_es_Salaam", "Africa/Djibouti", "Africa/Douala", "Africa/El_Aaiun", "Africa/Freetown", "Africa/Gaborone", "Africa/Harare", "Africa/Johannesburg", "Africa/Juba", "Africa/Kampala", "Africa/Khartoum", "Africa/Kigali", "Africa/Kinshasa", "Africa/Lagos", "Africa/Libreville", "Africa/Lome", "Africa/Luanda", "Africa/Lubumbashi", "Africa/Lusaka", "Africa/Malabo", "Africa/Maputo", "Africa/Maseru", "Africa/Mbabane", "Africa/Mogadishu", "Africa/Monrovia", "Africa/Nairobi", "Africa/Ndjamena", "Africa/Niamey", "Africa/Nouakchott", "Africa/Ouagadougou", "Africa/Porto-Novo", "Africa/Sao_Tome", "Africa/Timbuktu", "Africa/Tripoli", "Africa/Tunis", "Africa/Windhoek", "America/Adak", "America/Anchorage", "America/Anguilla", "America/Antigua", "America/Araguaina", "America/Argentina/Buenos_Aires", "America/Argentina/Catamarca", "America/Argentina/ComodRivadavia", "America/Argentina/Cordoba", "America/Argentina/Jujuy", "America/Argentina/La_Rioja", "America/Argentina/Mendoza", "America/Argentina/Rio_Gallegos", "America/Argentina/Salta", "America/Argentina/San_Juan", "America/Argentina/San_Luis", "America/Argentina/Tucuman", "America/Argentina/Ushuaia", "America/Aruba", "America/Asuncion", "America/Atikokan", "America/Atka", "America/Bahia", "America/Bahia_Banderas", "America/Barbados", "America/Belem", "America/Belize", "America/Blanc-Sablon", "America/Boa_Vista", "America/Bogota", "America/Boise", "America/Buenos_Aires", "America/Cambridge_Bay", "America/Campo_Grande", "America/Cancun", "America/Caracas", "America/Catamarca", "America/Cayenne", "America/Cayman", "America/Chicago", "America/Chihuahua", "America/Coral_Harbour", "America/Cordoba", "America/Costa_Rica", "America/Creston", "America/Cuiaba", "America/Curacao", "America/Danmarkshavn", "America/Dawson", "America/Dawson_Creek", "America/Denver", "America/Detroit", "America/Dominica", "America/Edmonton", "America/Eirunepe", "America/El_Salvador", "America/Ensenada", "America/Fort_Nelson", "America/Fort_Wayne", "America/Fortaleza", "America/Glace_Bay", "America/Godthab", "America/Goose_Bay", "America/Grand_Turk", "America/Grenada", "America/Guadeloupe", "America/Guatemala", "America/Guayaquil", "America/Guyana", "America/Halifax", "America/Havana", "America/Hermosillo", "America/Indiana/Indianapolis", "America/Indiana/Knox", "America/Indiana/Marengo", "America/Indiana/Petersburg", "America/Indiana/Tell_City", "America/Indiana/Vevay", "America/Indiana/Vincennes", "America/Indiana/Winamac", "America/Indianapolis", "America/Inuvik", "America/Iqaluit", "America/Jamaica", "America/Jujuy", "America/Juneau", "America/Kentucky/Louisville", "America/Kentucky/Monticello", "America/Knox_IN", "America/Kralendijk", "America/La_Paz", "America/Lima", "America/Los_Angeles", "America/Louisville", "America/Lower_Princes", "America/Maceio", "America/Managua", "America/Manaus", "America/Marigot", "America/Martinique", "America/Matamoros", "America/Mazatlan", "America/Mendoza", "America/Menominee", "America/Merida", "America/Metlakatla", "America/Mexico_City", "America/Miquelon", "America/Moncton", "America/Monterrey", "America/Montevideo", "America/Montreal", "America/Montserrat", "America/Nassau", "America/New_York", "America/Nipigon", "America/Nome", "America/Noronha", "America/North_Dakota/Beulah", "America/North_Dakota/Center", "America/North_Dakota/New_Salem", "America/Nuuk", "America/Ojinaga", "America/Panama", "America/Pangnirtung", "America/Paramaribo", "America/Phoenix", "America/Port-au-Prince", "America/Port_of_Spain", "America/Porto_Acre", "America/Porto_Velho", "America/Puerto_Rico", "America/Punta_Arenas", "America/Rainy_River", "America/Rankin_Inlet", "America/Recife", "America/Regina", "America/Resolute", "America/Rio_Branco", "America/Rosario", "America/Santa_Isabel", "America/Santarem", "America/Santiago", "America/Santo_Domingo", "America/Sao_Paulo", "America/Scoresbysund", "America/Shiprock", "America/Sitka", "America/St_Barthelemy", "America/St_Johns", "America/St_Kitts", "America/St_Lucia", "America/St_Thomas", "America/St_Vincent", "America/Swift_Current", "America/Tegucigalpa", "America/Thule", "America/Thunder_Bay", "America/Tijuana", "America/Toronto", "America/Tortola", "America/Vancouver", "America/Virgin", "America/Whitehorse", "America/Winnipeg", "America/Yakutat", "America/Yellowknife", "Antarctica/Casey", "Antarctica/Davis", "Antarctica/DumontDUrville", "Antarctica/Macquarie", "Antarctica/Mawson", "Antarctica/McMurdo", "Antarctica/Palmer", "Antarctica/Rothera", "Antarctica/South_Pole", "Antarctica/Syowa", "Antarctica/Troll", "Antarctica/Vostok", "Arctic/Longyearbyen", "Asia/Aden", "Asia/Almaty", "Asia/Amman", "Asia/Anadyr", "Asia/Aqtau", "Asia/Aqtobe", "Asia/Ashgabat", "Asia/Ashkhabad", "Asia/Atyrau", "Asia/Baghdad", "Asia/Bahrain", "Asia/Baku", "Asia/Bangkok", "Asia/Barnaul", "Asia/Beirut", "Asia/Bishkek", "Asia/Brunei", "Asia/Calcutta", "Asia/Chita", "Asia/Choibalsan", "Asia/Chongqing", "Asia/Chungking", "Asia/Colombo", "Asia/Dacca", "Asia/Damascus", "Asia/Dhaka", "Asia/Dili", "Asia/Dubai", "Asia/Dushanbe", "Asia/Famagusta", "Asia/Gaza", "Asia/Harbin", "Asia/Hebron", "Asia/Ho_Chi_Minh", "Asia/Hong_Kong", "Asia/Hovd", "Asia/Irkutsk", "Asia/Istanbul", "Asia/Jakarta", "Asia/Jayapura", "Asia/Jerusalem", "Asia/Kabul", "Asia/Kamchatka", "Asia/Karachi", "Asia/Kashgar", "Asia/Kathmandu", "Asia/Katmandu", "Asia/Khandyga", "Asia/Kolkata", "Asia/Krasnoyarsk", "Asia/Kuala_Lumpur", "Asia/Kuching", "Asia/Kuwait", "Asia/Macao", "Asia/Macau", "Asia/Magadan", "Asia/Makassar", "Asia/Manila", "Asia/Muscat", "Asia/Nicosia", "Asia/Novokuznetsk", "Asia/Novosibirsk", "Asia/Omsk", "Asia/Oral", "Asia/Phnom_Penh", "Asia/Pontianak", "Asia/Pyongyang", "Asia/Qatar", "Asia/Qostanay", "Asia/Qyzylorda", "Asia/Rangoon", "Asia/Riyadh", "Asia/Saigon", "Asia/Sakhalin", "Asia/Samarkand", "Asia/Seoul", "Asia/Shanghai", "Asia/Singapore", "Asia/Srednekolymsk", "Asia/Taipei", "Asia/Tashkent", "Asia/Tbilisi", "Asia/Tehran", "Asia/Tel_Aviv", "Asia/Thimbu", "Asia/Thimphu", "Asia/Tokyo", "Asia/Tomsk", "Asia/Ujung_Pandang", "Asia/Ulaanbaatar", "Asia/Ulan_Bator", "Asia/Urumqi", "Asia/Ust-Nera", "Asia/Vientiane", "Asia/Vladivostok", "Asia/Yakutsk", "Asia/Yangon", "Asia/Yekaterinburg", "Asia/Yerevan", "Atlantic/Azores", "Atlantic/Bermuda", "Atlantic/Canary", "Atlantic/Cape_Verde", "Atlantic/Faeroe", "Atlantic/Faroe", "Atlantic/Jan_Mayen", "Atlantic/Madeira", "Atlantic/Reykjavik", "Atlantic/South_Georgia", "Atlantic/St_Helena", "Atlantic/Stanley", "Australia/ACT", "Australia/Adelaide", "Australia/Brisbane", "Australia/Broken_Hill", "Australia/Canberra", "Australia/Currie", "Australia/Darwin", "Australia/Eucla", "Australia/Hobart", "Australia/LHI", "Australia/Lindeman", "Australia/Lord_Howe", "Australia/Melbourne", "Australia/North", "Australia/NSW", "Australia/Perth", "Australia/Queensland", "Australia/South", "Australia/Sydney", "Australia/Tasmania", "Australia/Victoria", "Australia/West", "Australia/Yancowinna", "Brazil/Acre", "Brazil/DeNoronha", "Brazil/East", "Brazil/West", "Canada/Atlantic", "Canada/Central", "Canada/Eastern", "Canada/Mountain", "Canada/Newfoundland", "Canada/Pacific", "Canada/Saskatchewan", "Canada/Yukon", "CET", "Chile/Continental", "Chile/EasterIsland", "CST6CDT", "Cuba", "EET", "Egypt", "Eire", "EST", "EST5EDT", "Etc/GMT", "Etc/GMT+0", "Etc/GMT+1", "Etc/GMT+10", "Etc/GMT+11", "Etc/GMT+12", "Etc/GMT+2", "Etc/GMT+3", "Etc/GMT+4", "Etc/GMT+5", "Etc/GMT+6", "Etc/GMT+7", "Etc/GMT+8", "Etc/GMT+9", "Etc/GMT-0", "Etc/GMT-1", "Etc/GMT-10", "Etc/GMT-11", "Etc/GMT-12", "Etc/GMT-13", "Etc/GMT-14", "Etc/GMT-2", "Etc/GMT-3", "Etc/GMT-4", "Etc/GMT-5", "Etc/GMT-6", "Etc/GMT-7", "Etc/GMT-8", "Etc/GMT-9", "Etc/GMT0", "Etc/Greenwich", "Etc/UCT", "Etc/Universal", "Etc/UTC", "Etc/Zulu", "Europe/Amsterdam", "Europe/Andorra", "Europe/Astrakhan", "Europe/Athens", "Europe/Belfast", "Europe/Belgrade", "Europe/Berlin", "Europe/Bratislava", "Europe/Brussels", "Europe/Bucharest", "Europe/Budapest", "Europe/Busingen", "Europe/Chisinau", "Europe/Copenhagen", "Europe/Dublin", "Europe/Gibraltar", "Europe/Guernsey", "Europe/Helsinki", "Europe/Isle_of_Man", "Europe/Istanbul", "Europe/Jersey", "Europe/Kaliningrad", "Europe/Kiev", "Europe/Kirov", "Europe/Lisbon", "Europe/Ljubljana", "Europe/London", "Europe/Luxembourg", "Europe/Madrid", "Europe/Malta", "Europe/Mariehamn", "Europe/Minsk", "Europe/Monaco", "Europe/Moscow", "Europe/Nicosia", "Europe/Oslo", "Europe/Paris", "Europe/Podgorica", "Europe/Prague", "Europe/Riga", "Europe/Rome", "Europe/Samara", "Europe/San_Marino", "Europe/Sarajevo", "Europe/Saratov", "Europe/Simferopol", "Europe/Skopje", "Europe/Sofia", "Europe/Stockholm", "Europe/Tallinn", "Europe/Tirane", "Europe/Tiraspol", "Europe/Ulyanovsk", "Europe/Uzhgorod", "Europe/Vaduz", "Europe/Vatican", "Europe/Vienna", "Europe/Vilnius", "Europe/Volgograd", "Europe/Warsaw", "Europe/Zagreb", "Europe/Zaporozhye", "Europe/Zurich", "Factory", "GB", "GB-Eire", "GMT", "GMT+0", "GMT-0", "GMT0", "Greenwich", "Hongkong", "HST", "Iceland", "Indian/Antananarivo", "Indian/Chagos", "Indian/Christmas", "Indian/Cocos", "Indian/Comoro", "Indian/Kerguelen", "Indian/Mahe", "Indian/Maldives", "Indian/Mauritius", "Indian/Mayotte", "Indian/Reunion", "Iran", "Israel", "Jamaica", "Japan", "Kwajalein", "Libya", "MET", "Mexico/BajaNorte", "Mexico/BajaSur", "Mexico/General", "MST", "MST7MDT", "Navajo", "NZ", "NZ-CHAT", "Pacific/Apia", "Pacific/Auckland", "Pacific/Bougainville", "Pacific/Chatham", "Pacific/Chuuk", "Pacific/Easter", "Pacific/Efate", "Pacific/Enderbury", "Pacific/Fakaofo", "Pacific/Fiji", "Pacific/Funafuti", "Pacific/Galapagos", "Pacific/Gambier", "Pacific/Guadalcanal", "Pacific/Guam", "Pacific/Honolulu", "Pacific/Johnston", "Pacific/Kiritimati", "Pacific/Kosrae", "Pacific/Kwajalein", "Pacific/Majuro", "Pacific/Marquesas", "Pacific/Midway", "Pacific/Nauru", "Pacific/Niue", "Pacific/Norfolk", "Pacific/Noumea", "Pacific/Pago_Pago", "Pacific/Palau", "Pacific/Pitcairn", "Pacific/Pohnpei", "Pacific/Ponape", "Pacific/Port_Moresby", "Pacific/Rarotonga", "Pacific/Saipan", "Pacific/Samoa", "Pacific/Tahiti", "Pacific/Tarawa", "Pacific/Tongatapu", "Pacific/Truk", "Pacific/Wake", "Pacific/Wallis", "Pacific/Yap", "Poland", "Portugal", "PRC", "PST8PDT", "ROC", "ROK", "Singapore", "Turkey", "UCT", "Universal", "US/Alaska", "US/Aleutian", "US/Arizona", "US/Central", "US/East-Indiana", "US/Eastern", "US/Hawaii", "US/Indiana-Starke", "US/Michigan", "US/Mountain", "US/Pacific", "US/Samoa", "UTC", "W-SU", "WET", "Zulu"],
		blocked: [],
		description: "Timezone"
	}
};

const locales = {
	"Arabic (Saudi Arabia)": "ar-SA",
	"Bangla (Bangladesh)": "bn-BD",
	"Bangla (India)": "bn-IN",
	"Czech (Czech Republic)": "cs-CZ",
	"Danish (Denmark)": "da-DK",
	"Austrian German": "de-AT",
	"Swiss German": "de-CH",
	"Standard German (Germany)": "de-DE",
	"Modern Greek": "el-GR",
	"Australian English": "en-AU",
	"Canadian English": "en-CA",
	"British English": "en-GB",
	"Irish English": "en-IE",
	"Indian English": "en-IN",
	"New Zealand English": "en-NZ",
	"US English": "en-US",
	"English (South Africa)": "en-ZA",
	"Argentine Spanish": "es-AR",
	"Chilean Spanish": "es-CL",
	"Colombian Spanish": "es-CO",
	"Castilian Spanish (Central-Northern Spain)": "es-ES",
	"Mexican Spanish": "es-MX",
	"American Spanish": "es-US",
	"Finnish (Finland)": "fi-FI",
	"Belgian French": "fr-BE",
	"Canadian French": "fr-CA",
	"Swiss French": "fr-CH",
	"Standard French": "fr-FR",
	"Hebrew (Israel)": "he-IL",
	"Hindi (India)": "hi-IN",
	"Hungarian (Hungary)": "hu-HU",
	"Indonesian (Indonesia)": "id-ID",
	"Swiss Italian": "it-CH",
	"Standard Italian (Italy)": "it-IT",
	"Japanese (Japan)": "jp-JP",
	"Korean (Republic of Korea)": "ko-KR",
	"Belgian Dutch": "nl-BE",
	"Standard Dutch (The Netherlands)": "nl-NL",
	"Norwegian (Norway)": "no-NO",
	"Polish (Poland)": "pl-PL",
	"Brazilian Portuguese": "pt-BR",
	"European Portuguese (Portugal)": "pt-PT",
	"Romanian (Romania)": "ro-RO",
	"Russian (Russian Federation)": "ru-RU",
	"Slovak (Slovakia)": "sk-SK",
	"Swedish (Sweden)": "sv-SE",
	"Indian Tamil": "ta-IN",
	"Sri Lankan Tamil": "ta-LK",
	"Thai (Thailand)": "th-TH",
	"Turkish (Turkey)": "tr-TR",
	"Mainland China": "zh-CN",
	"Mainland China, simplified characters": "zh-CN",
	"Hong Kong, traditional characters": "zh-HK",
	"Taiwan, traditional characters": "zh-TW"
};