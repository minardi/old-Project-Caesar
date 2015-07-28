exports.getContributorsInfoList = getContributorsInfoList;

var _ = require("../../client/js/lib/underscore.js"),
    contrib,
    contributorsInfo =[
		{
            'id':'1',
            'firstName':'Карина',
            'lastName':'Чегорко',
            'contributorTeamId': '0'
        },
		{
            'id':'2',
            'firstName':'Алена',
            'lastName':'Борисова',
            'contributorTeamId': '0'
        },
		{
            'id':'3',
            'firstName':'Сергей',
            'lastName':'Андроник',
            'contributorTeamId': '0'
        },
		{
            'id':'4',
            'firstName':'Иван',
            'lastName':'Шитиков',
            'contributorTeamId': '0'
        },
		{
            'id':'5',
            'firstName':'Дмитрий',
            'lastName':'Селезень',
            'contributorTeamId': '0'
        },
		{
            'id':'6',
            'firstName':'Максим',
            'lastName':'Белинский',
            'contributorTeamId': '0'
        },
		{
            'id':'7',
            'firstName':'Алексей',
            'lastName':'Лебедянский',
            'contributorTeamId': '0'
        }
    ];

function getContributorsInfoList () {
    return contrib = _.clone(contributorsInfo);
}