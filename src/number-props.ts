import type { Options } from "./props.js";
import { assertRulesReferenceKnownOptions } from "./validation.js";

/** roundingIncrement values other than the default (1). */
const NON_DEFAULT_ROUNDING_INCREMENTS = [2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000, 2500, 5000];

const UNIT_VALUES = {
	"acre": "acre",
	"Bit": "bit",
	"Byte": "byte",
	"Degree Celsius": "celsius",
	"Centimetre": "centimeter",
	"Day": "day",
	"Degree": "degree",
	"Degree Fahrenheit": "fahrenheit",
	"US fluid ounce": "fluid-ounce",
	"Foot": "foot",
	"US gallon": "gallon",
	"Gigabit": "gigabit",
	"Gigabyte": "gigabyte",
	"Gram": "gram",
	"Hectare": "hectare",
	"Hour": "hour",
	"Inch": "inch",
	"Kilobit": "kilobit",
	"Kilobyte": "kilobyte",
	"Kilogram": "kilogram",
	"Kilometre": "kilometer",
	"Litre": "liter",
	"Megabit": "megabit",
	"Megabyte": "megabyte",
	"Metre": "meter",
	"Microsecond": "microsecond",
	"Mile": "mile",
	"Scandinavian mile": "mile-scandinavian",
	"Millilitre": "milliliter",
	"Millimetre": "millimeter",
	"Millisecond": "millisecond",
	"Minute": "minute",
	"Month": "month",
	"Nanosecond": "nanosecond",
	"Ounce": "ounce",
	"Per cent": "percent",
	"Petabyte": "petabyte",
	"Pound": "pound",
	"Second": "second",
	"Stone": "stone",
	"Terabit": "terabit",
	"Terabyte": "terabyte",
	"Week": "week",
	"Yard": "yard",
	"Year": "year"
};

const NUMBER_OPTIONS: Options = {
	style: {
		labelText: "Formatting style",
		values: {
			"Decimal": "decimal",
			"Currency": "currency",
			"Percent": "percent",
			"Unit": "unit"
		},
		defaultValue: "decimal",
		rules: [
			{
				type: "requires",
				triggerValues: ["currency"],
				option: "currency",
				message: "'Currency' is required when 'Formatting Style' is 'Currency'."
			},
			{
				type: "requires",
				triggerValues: ["unit"],
				option: "unit",
				message: "'Unit' is required when 'Formatting Style' is 'Unit'."
			}
		]
	},
	currency: {
		values: {
			"ADB Unit of Account": "XUA",
			"Afghan Afghani (1927–2002)": "AFA",
			"Afghan Afghani": "AFN",
			"Albanian Lek (1946–1965)": "ALK",
			"Albanian Lek": "ALL",
			"Algerian Dinar": "DZD",
			"Andorran Peseta": "ADP",
			"Angolan Kwanza (1977–1991)": "AOK",
			"Angolan Kwanza": "AOA",
			"Angolan New Kwanza (1990–2000)": "AON",
			"Angolan Readjusted Kwanza (1995–1999)": "AOR",
			"Argentine Austral": "ARA",
			"Argentine Peso (1881–1970)": "ARM",
			"Argentine Peso (1983–1985)": "ARP",
			"Argentine Peso Ley (1970–1983)": "ARL",
			"Argentine Peso": "ARS",
			"Armenian Dram": "AMD",
			"Aruban Florin": "AWG",
			"Australian Dollar": "AUD",
			"Austrian Schilling": "ATS",
			"Azerbaijani Manat (1993–2006)": "AZM",
			"Azerbaijani Manat": "AZN",
			"Bahamian Dollar": "BSD",
			"Bahraini Dinar": "BHD",
			"Bangladeshi Taka": "BDT",
			"Barbadian Dollar": "BBD",
			"Belarusian New Rouble (1994–1999)": "BYB",
			"Belarusian Rouble (2000–2016)": "BYR",
			"Belarusian Rouble": "BYN",
			"Belgian Franc (convertible)": "BEC",
			"Belgian Franc (financial)": "BEL",
			"Belgian Franc": "BEF",
			"Belize Dollar": "BZD",
			"Bermudian Dollar": "BMD",
			"Bhutanese Ngultrum": "BTN",
			"Bolívar Soberano": "VED",
			"Bolivian Boliviano (1863–1963)": "BOL",
			"Bolivian Boliviano": "BOB",
			"Bolivian Mvdol": "BOV",
			"Bolivian Peso": "BOP",
			"Bosnia-Herzegovina Convertible Mark": "BAM",
			"Bosnia-Herzegovina Dinar (1992–1994)": "BAD",
			"Bosnia-Herzegovina New Dinar (1994–1997)": "BAN",
			"Botswanan Pula": "BWP",
			"Brazilian Cruzado (1986–1989)": "BRC",
			"Brazilian Cruzeiro (1942–1967)": "BRZ",
			"Brazilian Cruzeiro (1990–1993)": "BRE",
			"Brazilian Cruzeiro (1993–1994)": "BRR",
			"Brazilian New Cruzado (1989–1990)": "BRN",
			"Brazilian New Cruzeiro (1967–1986)": "BRB",
			"Brazilian Real": "BRL",
			"British Pound": "GBP",
			"Brunei Dollar": "BND",
			"Bulgarian Hard Lev": "BGL",
			"Bulgarian Lev (1879–1952)": "BGO",
			"Bulgarian Lev": "BGN",
			"Bulgarian Socialist Lev": "BGM",
			"Burmese Kyat": "BUK",
			"Burundian Franc": "BIF",
			"Cambodian Riel": "KHR",
			"Canadian Dollar": "CAD",
			"Cape Verdean Escudo": "CVE",
			"Caribbean guilder": "XCG",
			"Cayman Islands Dollar": "KYD",
			"Central African CFA Franc": "XAF",
			"CFP Franc": "XPF",
			"Chilean Escudo": "CLE",
			"Chilean Peso": "CLP",
			"Chilean Unit of Account (UF)": "CLF",
			"Chinese People’s Bank Dollar": "CNX",
			"Chinese Yuan (offshore)": "CNH",
			"Chinese Yuan": "CNY",
			"Colombian Peso": "COP",
			"Colombian Real Value Unit": "COU",
			"Comorian Franc": "KMF",
			"Congolese Franc": "CDF",
			"Costa Rican Colón": "CRC",
			"Croatian Dinar": "HRD",
			"Croatian Kuna": "HRK",
			"Cuban Convertible Peso": "CUC",
			"Cuban Peso": "CUP",
			"Cypriot Pound": "CYP",
			"Czech Koruna": "CZK",
			"Czechoslovak Hard Koruna": "CSK",
			"Danish Krone": "DKK",
			"Djiboutian Franc": "DJF",
			"Dominican Peso": "DOP",
			"Dutch Guilder": "NLG",
			"East Caribbean Dollar": "XCD",
			"East German Mark": "DDM",
			"Ecuadorian Sucre": "ECS",
			"Ecuadorian Unit of Constant Value": "ECV",
			"Egyptian Pound": "EGP",
			"Equatorial Guinean Ekwele": "GQE",
			"Eritrean Nakfa": "ERN",
			"Estonian Kroon": "EEK",
			"Ethiopian Birr": "ETB",
			"Euro": "EUR",
			"European Composite Unit": "XBA",
			"European Currency Unit": "XEU",
			"European Monetary Unit": "XBB",
			"European Unit of Account (XBC)": "XBC",
			"European Unit of Account (XBD)": "XBD",
			"Falkland Islands Pound": "FKP",
			"Fijian Dollar": "FJD",
			"Finnish Markka": "FIM",
			"French Franc": "FRF",
			"French Gold Franc": "XFO",
			"French UIC-Franc": "XFU",
			"Gambian Dalasi": "GMD",
			"Georgian Kupon Larit": "GEK",
			"Georgian Lari": "GEL",
			"German Mark": "DEM",
			"Ghanaian Cedi (1979–2007)": "GHC",
			"Ghanaian Cedi": "GHS",
			"Gibraltar Pound": "GIP",
			"Gold": "XAU",
			"Greek Drachma": "GRD",
			"Guatemalan Quetzal": "GTQ",
			"Guinea-Bissau Peso": "GWP",
			"Guinean Franc": "GNF",
			"Guinean Syli": "GNS",
			"Guyanaese Dollar": "GYD",
			"Haitian Gourde": "HTG",
			"Honduran Lempira": "HNL",
			"Hong Kong Dollar": "HKD",
			"Hungarian Forint": "HUF",
			"Icelandic Króna (1918–1981)": "ISJ",
			"Icelandic Króna": "ISK",
			"Indian Rupee": "INR",
			"Indonesian Rupiah": "IDR",
			"Iranian Rial": "IRR",
			"Iraqi Dinar": "IQD",
			"Irish Pound": "IEP",
			"Israeli New Shekel": "ILS",
			"Israeli Pound": "ILP",
			"Israeli Shekel (1980–1985)": "ILR",
			"Italian Lira": "ITL",
			"Jamaican Dollar": "JMD",
			"Japanese Yen": "JPY",
			"Jordanian Dinar": "JOD",
			"Kazakhstani Tenge": "KZT",
			"Kenyan Shilling": "KES",
			"Kuwaiti Dinar": "KWD",
			"Kyrgyz Som": "KGS",
			"Laotian Kip": "LAK",
			"Latvian Lats": "LVL",
			"Latvian Rouble": "LVR",
			"Lebanese Pound": "LBP",
			"Lesotho Loti": "LSL",
			"Liberian Dollar": "LRD",
			"Libyan Dinar": "LYD",
			"Lithuanian Litas": "LTL",
			"Lithuanian Talonas": "LTT",
			"Luxembourg Financial Franc": "LUL",
			"Luxembourgian Convertible Franc": "LUC",
			"Luxembourgian Franc": "LUF",
			"Macanese Pataca": "MOP",
			"Macedonian Denar (1992–1993)": "MKN",
			"Macedonian Denar": "MKD",
			"Malagasy Ariary": "MGA",
			"Malagasy Franc": "MGF",
			"Malawian Kwacha": "MWK",
			"Malaysian Ringgit": "MYR",
			"Maldivian Rufiyaa": "MVR",
			"Maldivian Rupee (1947–1981)": "MVP",
			"Malian Franc": "MLF",
			"Maltese Lira": "MTL",
			"Maltese Pound": "MTP",
			"Mauritanian Ouguiya (1973–2017)": "MRO",
			"Mauritanian Ouguiya": "MRU",
			"Mauritian Rupee": "MUR",
			"Mexican Investment Unit": "MXV",
			"Mexican Peso": "MXN",
			"Mexican Silver Peso (1861–1992)": "MXP",
			"Moldovan Cupon": "MDC",
			"Moldovan Leu": "MDL",
			"Monegasque Franc": "MCF",
			"Mongolian Tugrik": "MNT",
			"Moroccan Dirham": "MAD",
			"Moroccan Franc": "MAF",
			"Mozambican Escudo": "MZE",
			"Mozambican Metical (1980–2006)": "MZM",
			"Mozambican Metical": "MZN",
			"Myanmar Kyat": "MMK",
			"Namibian Dollar": "NAD",
			"Nepalese Rupee": "NPR",
			"Netherlands Antillean Guilder": "ANG",
			"New Taiwan Dollar": "TWD",
			"New Zealand Dollar": "NZD",
			"Nicaraguan Córdoba (1988–1991)": "NIC",
			"Nicaraguan Córdoba": "NIO",
			"Nigerian Naira": "NGN",
			"North Korean Won": "KPW",
			"Norwegian Krone": "NOK",
			"Omani Rial": "OMR",
			"Pakistani Rupee": "PKR",
			"Palladium": "XPD",
			"Panamanian Balboa": "PAB",
			"Papua New Guinean Kina": "PGK",
			"Paraguayan Guarani": "PYG",
			"Peruvian Inti": "PEI",
			"Peruvian Sol (1863–1965)": "PES",
			"Peruvian Sol": "PEN",
			"Philippine Peso": "PHP",
			"Platinum": "XPT",
			"Polish Zloty (1950–1995)": "PLZ",
			"Polish Zloty": "PLN",
			"Portuguese Escudo": "PTE",
			"Portuguese Guinea Escudo": "GWE",
			"Qatari Riyal": "QAR",
			"Rhodesian Dollar": "RHD",
			"RINET Funds": "XRE",
			"Romanian Leu (1952–2006)": "ROL",
			"Romanian Leu": "RON",
			"Russian Rouble (1991–1998)": "RUR",
			"Russian Rouble": "RUB",
			"Rwandan Franc": "RWF",
			"Salvadoran Colón": "SVC",
			"Samoan Tala": "WST",
			"São Tomé & Príncipe Dobra (1977–2017)": "STD",
			"São Tomé & Príncipe Dobra": "STN",
			"Saudi Riyal": "SAR",
			"Serbian Dinar (2002–2006)": "CSD",
			"Serbian Dinar": "RSD",
			"Seychellois Rupee": "SCR",
			"Sierra Leonean Leone (1964—2022)": "SLL",
			"Sierra Leonean Leone": "SLE",
			"Silver": "XAG",
			"Singapore Dollar": "SGD",
			"Slovak Koruna": "SKK",
			"Slovenian Tolar": "SIT",
			"Solomon Islands Dollar": "SBD",
			"Somali Shilling": "SOS",
			"South African Rand (financial)": "ZAL",
			"South African Rand": "ZAR",
			"South Korean Hwan (1953–1962)": "KRH",
			"South Korean Won (1945–1953)": "KRO",
			"South Korean Won": "KRW",
			"South Sudanese Pound": "SSP",
			"Soviet Rouble": "SUR",
			"Spanish Peseta (A account)": "ESA",
			"Spanish Peseta (convertible account)": "ESB",
			"Spanish Peseta": "ESP",
			"Special Drawing Rights": "XDR",
			"Sri Lankan Rupee": "LKR",
			"St Helena Pound": "SHP",
			"Sucre": "XSU",
			"Sudanese Dinar (1992–2007)": "SDD",
			"Sudanese Pound (1957–1998)": "SDP",
			"Sudanese Pound": "SDG",
			"Surinamese Dollar": "SRD",
			"Surinamese Guilder": "SRG",
			"Swazi Lilangeni": "SZL",
			"Swedish Krona": "SEK",
			"Swiss Franc": "CHF",
			"Syrian Pound": "SYP",
			"Tajikistani Rouble": "TJR",
			"Tajikistani Somoni": "TJS",
			"Tanzanian Shilling": "TZS",
			"Testing Currency Code": "XTS",
			"Thai Baht": "THB",
			"Timorese Escudo": "TPE",
			"Tongan Paʻanga": "TOP",
			"Trinidad & Tobago Dollar": "TTD",
			"Tunisian Dinar": "TND",
			"Turkish Lira (1922–2005)": "TRL",
			"Turkish Lira": "TRY",
			"Turkmenistani Manat (1993–2009)": "TMM",
			"Turkmenistani Manat": "TMT",
			"Ugandan Shilling (1966–1987)": "UGS",
			"Ugandan Shilling": "UGX",
			"Ukrainian Hryvnia": "UAH",
			"Ukrainian Karbovanets": "UAK",
			"United Arab Emirates Dirham": "AED",
			"Unknown Currency": "XXX",
			"Uruguayan Nominal Wage Index Unit": "UYW",
			"Uruguayan Peso (1975–1993)": "UYP",
			"Uruguayan Peso (Indexed Units)": "UYI",
			"Uruguayan Peso": "UYU",
			"US Dollar (Next day)": "USN",
			"US Dollar (Same day)": "USS",
			"US Dollar": "USD",
			"Uzbekistani Som": "UZS",
			"Vanuatu Vatu": "VUV",
			"Venezuelan Bolívar (1871–2008)": "VEB",
			"Venezuelan Bolívar (2008–2018)": "VEF",
			"Venezuelan Bolívar": "VES",
			"Vietnamese Dong (1978–1985)": "VNN",
			"Vietnamese Dong": "VND",
			"West African CFA Franc": "XOF",
			"WIR Euro": "CHE",
			"WIR Franc": "CHW",
			"Yemeni Dinar": "YDD",
			"Yemeni Rial": "YER",
			"Yugoslavian Convertible Dinar (1990–1992)": "YUN",
			"Yugoslavian Hard Dinar (1966–1990)": "YUD",
			"Yugoslavian New Dinar (1994–2002)": "YUM",
			"Yugoslavian Reformed Dinar (1992–1993)": "YUR",
			"Zairean New Zaire (1993–1998)": "ZRN",
			"Zairean Zaire (1971–1993)": "ZRZ",
			"Zambian Kwacha (1968–2012)": "ZMK",
			"Zambian Kwacha": "ZMW",
			"Zimbabwean Dollar (1980–2008)": "ZWD",
			"Zimbabwean Dollar (2008)": "ZWR",
			"Zimbabwean Dollar (2009–2024)": "ZWL",
			"Zimbabwean Gold": "ZWG"
		},
		labelText: "Currency",
		rules: [
			{
				type: "requires",
				option: "style",
				value: "currency",
				message: "Must be specified only if 'Formatting Style' is 'Currency'."
			}
		]
	},
	currencyDisplay: {
		values: {
			"Currency symbol": "symbol",
			"Narrow format symbol": "narrowSymbol",
			"ISO currency code": "code",
			"Currency name": "name"
		},
		defaultValue: "symbol",
		labelText: "Currency Display",
		rules: [
			{
				type: "requires",
				option: "style",
				value: "currency",
				optional: true,
				message: "Has no effect unless 'Formatting Style' is 'Currency'."
			}
		]
	},
	currencySign: {
		values: {
			"Standard": "standard",
			"Accounting": "accounting"
		},
		defaultValue: "standard",
		labelText: "Currency Sign",
		rules: [
			{
				type: "requires",
				option: "style",
				value: "currency",
				optional: true,
				message: "Has no effect unless 'Formatting Style' is 'Currency'."
			}
		]
	},
	notation: {
		values: {
			"Standard": "standard",
			"Scientific": "scientific",
			"Engineering": "engineering",
			"Compact": "compact"
		},
		defaultValue: "standard",
		labelText: "Notation"
	},
	compactDisplay: {
		values: {
			"Short": "short",
			"Long": "long"
		},
		defaultValue: "short",
		labelText: "Compact Display",
		rules: [
			{
				type: "requires",
				option: "notation",
				value: "compact",
				optional: true,
				message: "Has no effect unless 'Notation' option is 'Compact'."
			}
		]
	},
	signDisplay: {
		values: {
			"Automatic": "auto",
			"Always": "always",
			"Except Zero": "exceptZero",
			"Never": "never",
			"Negative Only": "negative"
		},
		defaultValue: "auto",
		labelText: "Sign Display"
	},
	unit: {
		labelText: "Unit",
		values: UNIT_VALUES,
		rules: [
			{
				type: "requires",
				option: "style",
				value: "unit",
				message: "Must be specified only if 'Formatting Style' is 'Unit'."
			}
		]
	},
	unitPer: {
		labelText: "Unit Per",
		values: UNIT_VALUES,
		rules: [
			{
				type: "requires",
				option: "style",
				value: "unit",
				optional: true,
				message: "Has no effect unless 'Formatting Style' is 'Unit'."
			}
		]
	},
	unitDisplay: {
		labelText: "Unit Display",
		values: {
			"Short": "short",
			"Long": "long",
			"Narrow": "narrow"
		},
		defaultValue: "short",
		rules: [
			{
				type: "requires",
				option: "style",
				value: "unit",
				optional: true,
				message: "Has no effect unless 'Formatting Style' is 'Unit'."
			}
		]
	},
	useGrouping: {
		labelText: "Use grouping separators?",
		values: {
			"Automatic": "auto",
			"Always": "always",
			"No": false,
			"Minimum 2 digits": "min2"
		},
		defaultValue: "auto"
	},
	roundingMode: {
		labelText: "Rounding Mode",
		values: {
			"Ceil (round toward +∞)": "ceil",
			"Floor (round toward -∞)": "floor",
			"Expand (round away from 0)": "expand",
			"Truncate (round toward 0)": "trunc",
			"Half-Ceil (ties toward +∞)": "halfCeil",
			"Half-Floor (ties toward -∞)": "halfFloor",
			"Half-Expand (ties away from 0)": "halfExpand",
			"Half-Trunc (ties toward 0)": "halfTrunc",
			"Half-Even (ties towards the nearest even integer)": "halfEven"
		},
		defaultValue: "halfExpand"
	},
	minimumIntegerDigits: {
		labelText: "Minimum Integer Digits",
		min: 1,
		max: 21
	},
	minimumFractionDigits: {
		labelText: "Minimum Fraction Digits",
		min: 0,
		max: 100,
		defaultValue: 0,
		rules: [
			{
				type: "lessThanOrEqual",
				when: { option: "maximumFractionDigits" },
				unless: [
					[{ option: "minimumSignificantDigits" }, { option: "roundingPriority", values: ["auto"] }],
					[{ option: "maximumSignificantDigits" }, { option: "roundingPriority", values: ["auto"] }]
				],
				message: "Must not exceed 'Maximum Fraction Digits'."
			}
		]
	},
	maximumFractionDigits: {
		labelText: "Maximum Fraction Digits",
		min: 0,
		max: 100,
		defaultValue: 3,
		minimumRelativeTo: "minimumFractionDigits"
	},
	minimumSignificantDigits: {
		labelText: "Minimum Significant Digits",
		min: 1,
		max: 21,
		defaultValue: 1,
		rules: [
			{
				type: "lessThanOrEqual",
				when: { option: "maximumSignificantDigits" },
				message: "Must not exceed 'Maximum Significant Digits'."
			}
		]
	},
	maximumSignificantDigits: {
		labelText: "Maximum Significant Digits",
		min: 1,
		max: 21,
		defaultValue: 21
	},
	roundingPriority: {
		labelText: "Rounding Priority",
		values: {
			"Automatic": "auto",
			"More Precision": "morePrecision",
			"Less Precision": "lessPrecision"
		},
		defaultValue: "auto"
	},
	roundingIncrement: {
		labelText: "Rounding Increment",
		values: {
			"1": 1,
			"2": 2,
			"5": 5,
			"10": 10,
			"20": 20,
			"25": 25,
			"50": 50,
			"100": 100,
			"200": 200,
			"250": 250,
			"500": 500,
			"1000": 1000,
			"2000": 2000,
			"2500": 2500,
			"5000": 5000
		},
		defaultValue: 1,
		rules: [
			{
				type: "excludes",
				triggerValues: NON_DEFAULT_ROUNDING_INCREMENTS,
				option: "minimumSignificantDigits",
				message: "Cannot be combined with significant-digit rounding."
			},
			{
				type: "excludes",
				triggerValues: NON_DEFAULT_ROUNDING_INCREMENTS,
				option: "maximumSignificantDigits",
				message: "Cannot be combined with significant-digit rounding."
			},
			{
				type: "excludes",
				triggerValues: NON_DEFAULT_ROUNDING_INCREMENTS,
				option: "notation",
				values: ["compact"],
				unless: [{ option: "minimumFractionDigits" }],
				message: "Cannot be combined with 'Compact' notation unless 'Minimum Fraction Digits' is set explicitly."
			},
			{
				type: "equals",
				when: { option: "roundingIncrement", values: NON_DEFAULT_ROUNDING_INCREMENTS },
				option: "roundingPriority",
				value: "auto",
				message: "'Rounding Priority' must be 'Automatic' when 'Rounding Increment' is not 1."
			},
			{
				type: "equals",
				when: [
					{ option: "roundingIncrement", values: NON_DEFAULT_ROUNDING_INCREMENTS },
					{ option: "style", excludeValues: ["currency", "percent"] }
				],
				option: "maximumFractionDigits",
				equalsOption: "minimumFractionDigits",
				message: "'Minimum Fraction Digits' and 'Maximum Fraction Digits' must be equal when 'Rounding Increment' is not 1."
			},
			{
				type: "equals",
				when: [
					{ option: "roundingIncrement", values: NON_DEFAULT_ROUNDING_INCREMENTS },
					{ option: "style", values: ["currency", "percent"] }
				],
				requireExplicit: true,
				option: "maximumFractionDigits",
				equalsOption: "minimumFractionDigits",
				message: "'Minimum Fraction Digits' and 'Maximum Fraction Digits' must be equal when 'Rounding Increment' is not 1."
			}
		]
	},
	trailingZeroDisplay: {
		labelText: "Trailing Zero Display",
		values: {
			"Automatic": "auto",
			"Strip if integer": "stripIfInteger"
		},
		defaultValue: "auto"
	}
};

assertRulesReferenceKnownOptions(NUMBER_OPTIONS);

export default NUMBER_OPTIONS;