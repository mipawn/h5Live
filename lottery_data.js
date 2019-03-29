var lottery_initial_datas =[
    	{
        "nameen": "avatar1",
        "namezh": "12222223630",
        "name": '钱琛'
        },
    	{
        "nameen": "avatar1",
        "namezh": "12222223630",
        "name": '钱琛'
        },
    	{
        "nameen": "avatar1",
        "namezh": "12222223630",
        "name": '钱琛'
        },
    	{
        "nameen": "avatar1",
        "namezh": "12222223630",
        "name": '钱琛'
        },
    	{
        "nameen": "avatar1",
        "namezh": "12222223630",
        "name": '钱琛'
        },
    	{
        "nameen": "avatar1",
        "namezh": "12222223630",
        "name": '钱琛'
        },
    	{
        "nameen": "avatar1",
        "namezh": "12222223630",
        "name": '钱琛'
        },
    	{
        "nameen": "avatar1",
        "namezh": "12222223630",
        "name": '钱琛'
        },
    	{
        "nameen": "avatar1",
        "namezh": "12222223630",
        "name": '钱琛'
        },
    	{
        "nameen": "avatar1",
        "namezh": "12222223630",
        "name": '钱琛'
        },
    	{
        "nameen": "avatar1",
        "namezh": "12222223630",
        "name": '钱琛'
        }
];

var xhr = new XMLHttpRequest()
xhr.onreadystatechange = (res) => {
    if (xhr.status === 200 && xhr.readyState === 4) {
        console.log(JSON.parse(xhr.responseText).res)
        localStorage.setItem('lottery_initial', JSON.stringify(JSON.parse(xhr.responseText).res));
    }
}
xhr.open('post', 'http://item.xianghunet.com/index/koi/luck_list', false)
xhr.send()

var award_config = {
    "award01": 1,
    "award02": 3,
    "award03": 6,
    "award04": 100//抽奖次数
};

// 初始化数据
//初始化抽奖号
// if (!localStorage.getItem('lottery_initial')) {
    // var data_str = JSON.stringify(lottery_initial_datas);
    // localStorage.setItem('lottery_initial', data_str);
// }
//初始化抽奖次数
if (!localStorage.getItem('award_initial')) {
    var award_str = JSON.stringify(award_config);
    localStorage.setItem('award_initial', award_str);
}