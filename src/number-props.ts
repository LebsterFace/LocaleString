import type { Options } from "./props.js";

const UNIT_VALUES = { "Acre": "acre", "Bit": "bit", "Byte": "byte", "Celsius": "celsius", "Centimeter": "centimeter", "Day": "day", "Degree": "degree", "Fahrenheit": "fahrenheit", "Fluid-ounce": "fluid-ounce", "Foot": "foot", "Gallon": "gallon", "Gigabit": "gigabit", "Gigabyte": "gigabyte", "Gram": "gram", "Hectare": "hectare", "Hour": "hour", "Inch": "inch", "Kilobit": "kilobit", "Kilobyte": "kilobyte", "Kilogram": "kilogram", "Kilometer": "kilometer", "Liter": "liter", "Megabit": "megabit", "Megabyte": "megabyte", "Meter": "meter", "Mile": "mile", "Mile-scandinavian": "mile-scandinavian", "Milliliter": "milliliter", "Millimeter": "millimeter", "Millisecond": "millisecond", "Minute": "minute", "Month": "month", "Ounce": "ounce", "Percent": "percent", "Petabyte": "petabyte", "Pound": "pound", "Second": "second", "Stone": "stone", "Terabit": "terabit", "Terabyte": "terabyte", "Week": "week", "Yard": "yard", "Year": "year" };

const NUMBER_OPTIONS: Options = {
	style: {
		labelText: "Formatting style",
		values: {
			"Decimal": "decimal",
			"Currency": "currency",
			"Percent": "percent",
			"Unit": "unit"
		},
		defaultValue: "decimal"
	},
	currency: {
		values: {
			"United Arab Emirates dirham": "AED",
			"Afghan afghani": "AFN",
			"Albanian lek": "ALL",
			"Armenian dram": "AMD",
			"Netherlands Antillean guilder": "ANG",
			"Angolan kwanza": "AOA",
			"Argentine peso": "ARS",
			"Australian dollar": "AUD",
			"Aruban florin": "AWG",
			"Azerbaijani manat": "AZN",
			"Bosnia and Herzegovina convertible mark": "BAM",
			"Barbados dollar": "BBD",
			"Bangladeshi taka": "BDT",
			"Bulgarian lev": "BGN",
			"Bahraini dinar": "BHD",
			"Burundian franc": "BIF",
			"Bermudian dollar": "BMD",
			"Brunei dollar": "BND",
			"Boliviano": "BOB",
			"Bolivian Mvdol": "BOV",
			"Brazilian real": "BRL",
			"Bahamian dollar": "BSD",
			"Bhutanese ngultrum": "BTN",
			"Botswana pula": "BWP",
			"Belarusian ruble": "BYN",
			"Belize dollar": "BZD",
			"Canadian dollar": "CAD",
			"Congolese franc": "CDF",
			"WIR euro (complementary currency)": "CHE",
			"Swiss franc": "CHF",
			"WIR franc (complementary currency)": "CHW",
			"Unidad de Fomento": "CLF",
			"Chilean peso": "CLP",
			"Colombian peso": "COP",
			"Unidad de Valor Real": "COU",
			"Costa Rican colon": "CRC",
			"Cuban convertible peso": "CUC",
			"Cuban peso": "CUP",
			"Cape Verdean escudo": "CVE",
			"Czech koruna": "CZK",
			"Djiboutian franc": "DJF",
			"Danish krone": "DKK",
			"Dominican peso": "DOP",
			"Algerian dinar": "DZD",
			"Egyptian pound": "EGP",
			"Eritrean nakfa": "ERN",
			"Ethiopian birr": "ETB",
			"Euro": "EUR",
			"Fiji dollar": "FJD",
			"Falkland Islands pound": "FKP",
			"Pound sterling": "GBP",
			"Georgian lari": "GEL",
			"Ghanaian cedi": "GHS",
			"Gibraltar pound": "GIP",
			"Gambian dalasi": "GMD",
			"Guinean franc": "GNF",
			"Guatemalan quetzal": "GTQ",
			"Guyanese dollar": "GYD",
			"Hong Kong dollar": "HKD",
			"Honduran lempira": "HNL",
			"Croatian kuna": "HRK",
			"Haitian gourde": "HTG",
			"Hungarian forint": "HUF",
			"Indonesian rupiah": "IDR",
			"Israeli new shekel": "ILS",
			"Indian rupee": "INR",
			"Iraqi dinar": "IQD",
			"Iranian rial": "IRR",
			"Icelandic króna (plural: krónur)": "ISK",
			"Jamaican dollar": "JMD",
			"Jordanian dinar": "JOD",
			"Japanese yen": "JPY",
			"Kenyan shilling": "KES",
			"Kyrgyzstani som": "KGS",
			"Cambodian riel": "KHR",
			"Comoro franc": "KMF",
			"North Korean won": "KPW",
			"South Korean won": "KRW",
			"Kuwaiti dinar": "KWD",
			"Cayman Islands dollar": "KYD",
			"Kazakhstani tenge": "KZT",
			"Lao kip": "LAK",
			"Lebanese pound": "LBP",
			"Sri Lankan rupee": "LKR",
			"Liberian dollar": "LRD",
			"Lesotho loti": "LSL",
			"Libyan dinar": "LYD",
			"Moroccan dirham": "MAD",
			"Moldovan leu": "MDL",
			"Malagasy ariary": "MGA",
			"North Macedonian denar": "MKD",
			"Myanmar kyat": "MMK",
			"Mongolian tögrög": "MNT",
			"Macanese pataca": "MOP",
			"Mauritanian ouguiya": "MRU",
			"Mauritian rupee": "MUR",
			"Maldivian rufiyaa": "MVR",
			"Malawian kwacha": "MWK",
			"Mexican peso": "MXN",
			"Mexican Unidad de Inversion": "MXV",
			"Malaysian ringgit": "MYR",
			"Mozambican metical": "MZN",
			"Namibian dollar": "NAD",
			"Nigerian naira": "NGN",
			"Nicaraguan córdoba": "NIO",
			"Norwegian krone": "NOK",
			"Nepalese rupee": "NPR",
			"New Zealand dollar": "NZD",
			"Omani rial": "OMR",
			"Panamanian balboa": "PAB",
			"Peruvian sol": "PEN",
			"Papua New Guinean kina": "PGK",
			"Philippine peso": "PHP",
			"Pakistani rupee": "PKR",
			"Polish złoty": "PLN",
			"Paraguayan guaraní": "PYG",
			"Qatari riyal": "QAR",
			"Romanian leu": "RON",
			"Serbian dinar": "RSD",
			"Renminbi": "CNY",
			"Russian ruble": "RUB",
			"Rwandan franc": "RWF",
			"Saudi riyal": "SAR",
			"Solomon Islands dollar": "SBD",
			"Seychelles rupee": "SCR",
			"Sudanese pound": "SDG",
			"Swedish krona": "SEK",
			"Singapore dollar": "SGD",
			"Saint Helena pound": "SHP",
			"Sierra Leonean leone": "SLL / SLE",
			"Somali shilling": "SOS",
			"Surinamese dollar": "SRD",
			"South Sudanese pound": "SSP",
			"São Tomé and Príncipe dobra": "STN",
			"Salvadoran colón": "SVC",
			"Syrian pound": "SYP",
			"Swazi lilangeni": "SZL",
			"Thai baht": "THB",
			"Tajikistani somoni": "TJS",
			"Turkmenistan manat": "TMT",
			"Tunisian dinar": "TND",
			"Tongan paʻanga": "TOP",
			"Turkish lira": "TRY",
			"Trinidad and Tobago dollar": "TTD",
			"New Taiwan dollar": "TWD",
			"Tanzanian shilling": "TZS",
			"Ukrainian hryvnia": "UAH",
			"Ugandan shilling": "UGX",
			"United States dollar": "USD",
			"United States dollar (next day)": "USN",
			"Uruguay Peso en Unidades Indexadas": "UYI",
			"Uruguayan peso": "UYU",
			"Unidad previsional": "UYW",
			"Uzbekistan sum": "UZS",
			"Venezuelan digital bolívar": "VED",
			"Venezuelan sovereign bolívar": "VES",
			"Vietnamese đồng": "VND",
			"Vanuatu vatu": "VUV",
			"Samoan tala": "WST",
			"CFA franc BEAC": "XAF",
			"Silver (one troy ounce)": "XAG",
			"Gold (one troy ounce)": "XAU",
			"East Caribbean dollar": "XCD",
			"Special drawing rights": "XDR",
			"CFA franc BCEAO": "XOF",
			"Palladium (one troy ounce)": "XPD",
			"CFP franc (franc Pacifique)": "XPF",
			"Platinum (one troy ounce)": "XPT",
			"SUCRE": "XSU",
			"Code reserved for testing": "XTS",
			"ADB Unit of Account": "XUA",
			"No currency": "XXX",
			"Yemeni rial": "YER",
			"South African rand": "ZAR",
			"Zambian kwacha": "ZMW",
			"Zimbabwean dollar": "ZWL"
		},
		labelText: "Currency",
		usageCondition: {
			prerequisite: { name: "style", value: "currency" },
			message: "Must be specified if and only if 'Formatting Style' is 'Currency'"
		}
	},
	currencyDisplay: {
		values: {
			"Currency symbol": "symbol",
			"Narrow format symbol": "narrowSymbol",
			"ISO currency code": "code",
			"Currency name": "name",
		},
		defaultValue: "symbol",
		labelText: "Currency Display",
		usageCondition: {
			prerequisite: { name: "style", value: "currency" },
			message: "Has no effect unless 'Formatting Style' is 'Currency'",
			optional: true
		}
	},
	currencySign: {
		values: {
			"Standard": "standard",
			"Accounting": "accounting"
		},
		defaultValue: "standard",
		labelText: "Currency Sign",
		usageCondition: {
			prerequisite: { name: "style", value: "currency" },
			message: "Has no effect unless 'Formatting Style' is 'Currency'",
			optional: true
		}
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
		usageCondition: {
			prerequisite: { name: "notation", value: "compact" },
			message: "Has no effect unless 'Notation' option is 'Compact'",
			optional: true
		}
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
		usageCondition: {
			prerequisite: { name: "style", value: "unit" },
			message: "Must be specified if and only if 'Formatting Style' is 'Unit'"
		},
	},
	unitPer: {
		labelText: "Unit Per",
		values: UNIT_VALUES,
		usageCondition: {
			prerequisite: { name: "style", value: "unit" },
			message: "Has no effect unless 'Formatting Style' is 'Unit'",
			optional: true
		},
	},
	unitDisplay: {
		labelText: "Unit Display",
		values: {
			"Short": "short",
			"Long": "long",
			"Narrow": "narrow"
		},
		defaultValue: "short",
		usageCondition: {
			prerequisite: { name: "style", value: "unit" },
			message: "Has no effect unless 'Formatting Style' is 'Unit'",
			optional: true
		}
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
			"Half-Even (ties towards the nearest even integer)": "halfEven",
		},
		defaultValue: "halfExpand"
	},
	// roundingPriority: {
	// 	labelText: "Rounding Priority",
	// 	// FIXME: if both "FractionDigits" (minimumFractionDigits/maximumFractionDigits) and "SignificantDigits" (minimumSignificantDigits/maximumSignificantDigits) are specified:
	// 	values: {
	// 		"Automatic": "auto", //: the result from the significant digits property is used (default).
	// 		"More Precision": "morePrecision", //: the result from the property that results in more precision is used.
	// 		"Less Precision": "lessPrecision", //: the result from the property that results in less precision is used.
	// 	},
	// 	defaultValue: "auto"
	// },
	// roundingIncrement: {
	// 	// FIXME: Cannot be mixed with significant-digits rounding or any setting of roundingPriority other than auto.
	// 	labelText: "Roudning Increment",
	// 	values: { "1": 1, "2": 2, "5": 5, "10": 10, "20": 20, "25": 25, "50": 50, "100": 100, "200": 200, "250": 250, "500": 500, "1000": 1000, "2000": 2000, "2500": 2500, "5000": 5000 }
	// },
	trailingZeroDisplay: {
		labelText: "Trailing Zero Display",
		values: {
			"Automatic": "auto",
			"Strip if integer": "stripIfInteger",
		},
		defaultValue: "auto"
	},
	// FIXME: [minimumIntegerDigits, minimumFractionDigits, maximumFractionDigits, minimumSignificantDigits, maximumSignificantDigits]
};

export default NUMBER_OPTIONS;