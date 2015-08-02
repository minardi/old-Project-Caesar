var weeksDb = [
	{
		"id": 0,
		"1": { // week
			"1": { // day of week
				"1": ["0"] // interval: [event ids]
			},
			"2": {
				"1": ["0"],			
				"4": ["1"],
				"5": ["3"]
			},
			"3": {
				"1": ["0"],

			},
			"4": {
				"1": ["0"],
				"15": ["2"],
				"16": ["2"]
			},
			"5": {
				"1": ["0"],
				"15": ["2"],
				"16": ["2"]
			},
		}
	},
	{
		"id": 1,
		"2": {
			"1": {
				"1": ["2"]
			},
			"2": {
				"4": ["1"],
				"5": ["3"]
			},		
			"4": {
				"15": ["2"],
				"16": ["2"]
			},
			"5": {
				"15": ["2"],
				"16": ["2"]
			},
		}
	}
];

var eventsDb = [
	{
		"id": 0,
		"name": "IT Academy WEB UI courses",
		"type": "lecture",
		"resources": [0, 1, 2]
	},
	{
		"id": 1,
		"name": "Project Caesar",
		"type": "scrum",
		"resources": [0, 1, 4, 5]
	},
	{
		"id": 2,
		"name": "Web Sockets practice",
		"type": "practice",
		"resources": [4, 5, 6, 2]
	},
	{
		"id": 3,
		"name": "WEB UI 2nd Demo",
		"type": "weekly report",
		"resources": [3, 5, 8, 1]
	}	
];

var resources = [
	{
		"id": 0,
		"type": "group",
		"name": "DP 080 UI"
	},
	{
		"id": 1,
		"type": "room",
		"name": "703"
	},
	{
		"id": 2,
		"type": "teacher",
		"name": "Yoda Master"
	},
	{
		"id": 3,
		"type": "group",
		"name": "DP 076 UI"
	},
	{
		"id": 4,
		"type": "room",
		"name": "704"
	},
	{
		"id": 5,
		"type": "teacher",
		"name": "Wader Dart"
	},
	{
		"id": 6,
		"type": "group",
		"name": "DP 072 UI"
	},
	{
		"id": 7,
		"type": "room",
		"name": "705"
	},
	{
		"id": 8,
		"type": "teacher",
		"name": "Solo Han"
	}
];

var intervals = {
	"1": "8:00-8:30",
	"2": "8:30-9:00",
	"3": "9:00-9:30",
	"4": "9:30-10:00",
	"5": "10:00-10:30",
	"6": "10:30-11:00",
	"7": "11:00-11:30",
	"8": "11:30-12:00",
	"9": "12:00-12:30",
	"10": "12:30-13:00",
	"11": "13:00-13:30",
	"12": "13:30-14:00",
	"13": "14:00-14:30",
	"14": "14:30-15:00",
	"15": "15:00-15:30",
	"16": "15:30-16:00",
	"17": "16:00-16:30",
	"18": "16:30-17:00",	
	"19": "17:00-17:30",
	"20": "17:30-18:00"
};