// 图表
function chart() {
    let myChart = echarts.init(document.querySelector('#main'));
    let option = {
        title: {
            text: '网友最喜欢的菜谱',
            subtext: '2019.1-2019.3',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['可乐鸡翅', '红烧肉', '青团', '鱼香茄子', '牛肉']
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 335, name: '可乐鸡翅' },
                    { value: 310, name: '红烧肉' },
                    { value: 234, name: '青团' },
                    { value: 135, name: '鱼香茄子' },
                    { value: 1548, name: '牛肉' }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
}
export {chart}