import $ from 'jquery';
import Sortable from 'sortablejs';
import imageUpload from '../../widgets/image-upload';
import { createRecipe } from '../../utils/api';

//输入框点击时间
(function ipt() {
    $('.add').focus(function () {
        $(this).css('border', '1px solid #ececec');
        $(this).val("");
    })
    $('.add').blur(function () {
        $(this).css('border', '0');
    })
})();

$('.draft').on('click', function () {
    location.assign('./buildmenu.html');
})
$('.img-box').on('click', function () {
    location.assign('./buildmenu.html');
})
$('.ipt').focus(function () {
    $(this).css('border', '1px solid #beac83')
})
$('.ipt').blur(function () {
    $(this).css('border', '1px solid #cccccc')
})

// 点击添加菜谱
$('.textcontent').on('click', function () {
    $(this).siblings('.placehoder').hide();
})
$('.textcontent').focus(function () {
    $(this).css('background', '#fffcea');
})
$('.textcontent').blur(function () {
    $(this).css('background', '#ffffff');
})
$('.textcontent').mouseover(function () {
    $(this).css('background', '#fffcea');
})
$('.textcontent').mouseout(function () {
    $(this).css('background', '#ffffff');
})

//步骤添加聚焦事件
$('.step_box').on('mouseover', '.add_decription', function () {
    $(this).css('background', '#fffcea');
    $(this).parents('td').css('background', '#fffcea');
})
$('.step_box').on('mouseout', '.add_decription', function () {
    $(this).css('background', '#ffffff');
    $(this).parents('td').css('background', '#ffffff');
})
$('.step_box').on('focus', '.add_decription', function () {
    $(this).css('background', '#fffcea');
    $(this).parents('td').css('background', '#fffcea');
    $(this).siblings('span').hide();
})
$('.step_box').on('blur', '.add_decription', function () {
    $(this).css('background', '#ffffff');
    $(this).parents('td').css('background', '#ffffff');
    var value = $(this).val();
    if (!value) {
        $(this).siblings('span').show();
    }
})

//小贴士聚焦事件
function changecolor(parent, child, color) {
    $(parent).on('mouseover', child, function () {
        $(this).css('background', '#fffcea');
        $(this).parents('td').css('background', '#fffcea');
    })
    $(parent).on('mouseout', child, function () {
        $(this).css('background', color);
        $(this).parents('td').css('background', color);
    })
    $(parent).on('focus', child, function () {
        $(this).css('background', '#fffcea');
        $(this).parents('td').css('background', '#fffcea');
        $(this).siblings('span').hide();
    })
    $(parent).on('blur', child, function () {
        $(this).css('background', color);
        $(this).parents('td').css('background', color);
        var value = $(this).val();
        if (!value) {
            $(this).siblings('span').show();
        }
    })
}

//聚焦事件函数
changecolor('.jumbotron', '.addtip', '#eeeeee');

$('.temporary').on('click', function () {
    $(this).css('background', '#ed9d91');
    $(this).css('border', '1px solid #ed9d91');
})

/**
 * 添加用料行
 */
function addMaterial() {
    const lineContent = $(`
        <tr class="material-row">
            <td class="text-input">
                <input type="text" class='ipts ipt_ingredients' placeholder="食材：如鸡蛋">
            </td>
            <td class="text-input">
                <input type="text" class='ipts ipt_dosage' placeholder="用量：如1只">
            </td>
            <td class="opreat">
                <img class='drag-line' src="https://s.chuimg.com/pic/drag.png" />
                <img class="delete-line" src="https://s.chuimg.com/pic/close.png" />
            </td>
        </tr>
    `);
    lineContent.find('.delete-line').click(function () {
        if ($('.material-table .material-row').length > 1) {
            $(this).parents('.material-row').remove();
        }
    });
    $('.material-table').append(lineContent);
}

/**
 * 添加步骤
 */
function addStep() {
    const stepIndex = $('.step').length + 1;
    const stepContent = $(`
        <div class="row clearfix step">
            <div class="col-md-12 column">
                <div class="row">
                    <div class="col-md-1">
                        <div class="thumbnail">
                            <div class="caption">
                                <div class="number">
                                    ${stepIndex}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="thumbnail">
                            <textarea class="caption add_decription"></textarea>
                            <span>
                                <i class="iconfont icon-bi"></i>
                                点击添加菜谱步骤
                            </span>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="step-cover-box"></div>
                    </div>
                    <div class="col-md-2">
                        <div class="thumbnail oprating_box">
                        <div>
                            <img class='oprating_drag' src="https://s.chuimg.com/pic/drag.png" />
                            <img class='oprating_delete' src="https://s.chuimg.com/pic/close.png" />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);
    stepContent.find('.oprating_delete').click(function () {
        if ($('.step').length > 1) {
            $(this).parents('.step').remove();
            $('.step').each((index, element) => {
                $(element).find('.number').text(index + 1);
            });
        }
    });
    // 初始化图片上传的能力
    stepContent.find('.step-cover-box').initImageUpload({
        uploadUrl: '/upload/recipe',
        mainTitle: '+ 上传步骤图',
        subTitle: '最佳尺寸：1280 × 1024'
    });
    $('.step_box').append(stepContent);
}

/**
 * 发起网络请求创建菜谱
 */
function doCreateRecipe(obj) {
    createRecipe(obj)
        .then(({ id }) => {
            alert('创建菜谱成功');
            location.assign(`./detail.html?id=${id}`);
        })
        .catch(error => {
            alert(error);
        });
}

// 用料点击添加行
$('.add-material-btn').on('click', function () {
    addMaterial();
})

// 步骤点击添加行
$('.add-step-btn').on('click', function () {
    addStep();
});

// 多文件文件选择完毕后触发
$('.multi-file-upload').on('change', function () {
    if (!this.files || this.files.length == 0) {
        return;
    }

    // 补上差少的步骤
    const diffStepCount = this.files.length - $('.step_box').find('.step').length;
    if (diffStepCount > 0) {
        for (let i = 0; i < diffStepCount; i++) {
            addStep();
        }
    }
    const stepCoverBoxes = $('.step-cover-box');
    for (let i = 0; i < stepCoverBoxes.length; i++) {
        let stepCoverBox = stepCoverBoxes[i];
        let file = this.files[i];
        $(stepCoverBox).doImageUpload(file);
    }
});

$('.relase').on('click', function () {
    var name = $('.add').val();
    var cover = $('.preview-image')[0].src;
    var description = $('.describe .textcontent').val();
    var addDecription = $('.add_decription');
    var stepsImgs = $('.preview-image');
    var steps = [];
    for (let i = 0; i < addDecription.length; i++) {
        var step = $(addDecription[i]).val();
        var picUrl = stepsImgs[i + 1].src;
        var order = i + 1;
        var stepsobj = {
            description: step,
            picUrl: picUrl,
            order: order
        }
        steps.push(stepsobj);
        console.log(steps);
    }

    var recipeInfo = {
        name,
        cover,
        description,
        steps
    }
    console.log(recipeInfo);
    doCreateRecipe(recipeInfo);
});

// 菜谱封面初始化上传能力
$('.recipe-cover-box').initImageUpload({
    uploadUrl: '/upload/recipe',
    mainTitle: '+ 上传菜谱封面',
    subTitle: '最佳尺寸：1280 × 1024'
});

// 拖拽功能
Sortable.create($('.step_box')[0], {
    handle: '.oprating_drag',
    animation: 150,
    onUpdate: function () {
        $('.step').each((index, element) => {
            $(element).find('.number').text(index + 1);
        });
    }
});

Sortable.create($('.material-table')[0], {
    handle: '.drag-line',
    animation: 150,
});

// 预留5个用料行
for (let line = 0; line < 5; line++) {
    addMaterial();
}

// 预留4个步骤
for (let i = 0; i < 4; i++) {
    addStep();
}

$('.img-box').on('click', function () {


})




// var data = {
//     "name": "青团",
//     "cover": "http://i2.chuimg.com/1965957e989040cca89b1069a444b93d_1860w_1242h.jpg?imageView2/2/w/660/interlace/1/q/90",
//     "description": "清明节快到了，每个地方有不同的习俗，坐标武汉，其实我们这里并没有清明吃青团的习俗，只是会把老艾蒿扎一把挂在门口的屋檐上；今年我也做了不少这个团子，试了很多方法，这次尝试把水换成牛奶，味道不错哦，不过，如果不是刻意要去比较的话，跟加水做的，也吃不出太大区别，哈哈，口感跟汤圆，还有我们这边的糍粑一样的感觉，都是Q弹软糯的，哈哈；青团，叫法很多，清明果、艾米果、艾草团、艾果，起源于用艾草捣泥或者榨汁，跟糯米粉混合均匀，包馅蒸熟制作而成，江南地区盛行；一共有两种做法，一种是生面团包完馅再蒸，另一种是面团蒸熟了再包馅，不管哪一种，都好吃；❣️❣️❣️此方成品10个，是两个方子各10个哈，可以先做一半试试看，觉得好吃了再多做点；",
//     "steps": [
//         {
//             "description": "青团分为皮和馅，我们先把馅做好了再做皮；",
//             "picUrl": "http://i2.chuimg.com/0bc075500c444698b3e2f0b95a380087_1920w_1080h.jpg?imageView2/2/w/300/interlace/1/q/90",
//             "order": 1
//         },
//         {
//             "description": "做个咸蛋黄肉松馅，也可以包豆沙馅，或者其他任何你喜欢吃的馅，都提前做好；豆沙馅教程可以点这里查看:",
//             "picUrl": "http://i2.chuimg.com/0d7d372f15134befa6449f5a1dcfa6d8_1920w_1080h.jpg?imageView2/2/w/300/interlace/1/q/90",
//             "order": 2
//         },
//         {
//             "description": "我买的生咸鸭蛋，蛋黄剥出来，将蛋清完全冲洗干净，然后放烤箱，上下管165摄氏度左右，烤10分钟，温度时间仅供参考；",
//             "picUrl": "http://i2.chuimg.com/1cd85ef987694354a3b1695978382a84_1920w_1080h.jpg?imageView2/2/w/300/interlace/1/q/90",
//             "order": 3
//         },
//         {
//             "description": "将蛋黄捏碎，不需要特别碎，分开就行了；",
//             "picUrl": "http://i2.chuimg.com/ca20d4a515804286937bd67421ccc4b3_1920w_1080h.jpg?imageView2/2/w/300/interlace/1/q/90",
//             "order": 4
//         },
//         {
//             "description": "中间有白色硬心的话，不要，这个会有点腥，口感也不好；",
//             "picUrl": "http://i2.chuimg.com/07077d56dc9e4140b00af68a4b6e9032_1920w_1080h.jpg?imageView2/2/w/300/interlace/1/q/90",
//             "order": 5
//         },
//         {
//             "description": "准备好所有材料；",
//             "picUrl": "http://i2.chuimg.com/f89e1a612f9848b8811c7158b7d15042_1920w_1080h.jpg?imageView2/2/w/300/interlace/1/q/90",
//             "order": 6
//         },
//         {
//             "description": "准备一个大点的容器，倒入肉松；",
//             "picUrl": "http://i2.chuimg.com/efd6f8dcd5cc49e0ba06dd5528c727ea_1920w_1080h.jpg?imageView2/2/w/300/interlace/1/q/90",
//             "order": 7
//         },
//         {
//             "description": "倒入咸蛋黄；",
//             "picUrl": "http://i2.chuimg.com/723033c082cf4e2aaf3ab9c396f8604f_1920w_1080h.jpg?imageView2/2/w/300/interlace/1/q/90",
//             "order": 8
//         },
//         {
//             "description": "再倒入沙拉酱；",
//             "picUrl": "http://i2.chuimg.com/40f9ef60b6e74e6485756a9bdc2bc837_1920w_1080h.jpg?imageView2/2/w/300/interlace/1/q/90",
//             "order": 9
//         },
//         {
//             "description": "抓均匀揉成团；",
//             "picUrl": "http://i2.chuimg.com/14de08603a744e7abaf6cbd60ff85bf5_1920w_1080h.jpg?imageView2/2/w/300/interlace/1/q/90",
//             "order": 10
//         },
//         {
//             "description": "分成10等份，一份大约30-31克，多几克少几克都没关系；搓成团的时候要轻轻搓，捏紧了再轻轻搓，不然容易散；",
//             "picUrl": "http://i2.chuimg.com/ac372746aed04af3b93f219c57bb8875_1920w_1080h.jpg?imageView2/2/w/300/interlace/1/q/90",
//             "order": 11
//         },
//         {
//             "description": "准备好所有材料；艾草泥的做法看这里：https://www.xiachufang.com/recipe/103713450/",
//             "picUrl": "http://i2.chuimg.com/4f4319834d6d4a5189327d0c26d04a30_1920w_1080h.jpg?imageView2/2/w/300/interlace/1/q/90",
//             "order": 12
//         },
//         {
//             "description": "蒸熟的青团三天内吃不完的话，建议放冰箱冷冻保存，要吃的时候再拿出来蒸一会儿，个人建议可以直接将生团子冷冻，吃的时候再蒸，跟现做的一样一样的，但是，冷冻后的生胚，会有冰渣，蒸完后，表皮没有现蒸的光滑，如果想让它光滑些，那就等完全回温解冻后水分稍微干点了再蒸；",
//             "picUrl": "http://i2.chuimg.com/984cb9ca377c4ec88518aaaa810ec44a_1920w_1080h.jpg?imageView2/2/w/300/interlace/1/q/90",
//             "order": 13
//         },
//         {
//             "description": "喜欢吃豆沙馅的可以准备点豆沙馅；反正此方是做10个青团的量，一个青团的馅我分的是30克左右；如果你全部包豆沙馅，那就准备400克左右的豆沙，因为豆沙没有咸蛋黄肉松馅那么蓬松，所以我会一个多放10克，哈哈，或者豆沙馅和咸蛋黄肉松馅一样做一半；",
//             "picUrl": "http://i2.chuimg.com/e7c717a73634458b99d855c78a8e2ca4_1920w_1080h.jpg?imageView2/2/w/300/interlace/1/q/90",
//             "order": 14
//         },
//         {
//             "description": "喜欢吃豆沙馅的可以准备点豆沙馅；反正此方是做10个青团的量，一个青团的馅我分的是30克左右；如果你全部包豆沙馅，那就准备400克左右的豆沙，因为豆沙没有咸蛋黄肉松馅那么蓬松，所以我会一个多放10克，哈哈，或者豆沙馅和咸蛋黄肉松馅一样做一半；",
//             "picUrl": "http://i2.chuimg.com/e7c717a73634458b99d855c78a8e2ca4_1920w_1080h.jpg?imageView2/2/w/300/interlace/1/q/90",
//             "order": 15
//         },
//         {
//             "description": "喜欢吃豆沙馅的可以准备点豆沙馅；反正此方是做10个青团的量，一个青团的馅我分的是30克左右；如果你全部包豆沙馅，那就准备400克左右的豆沙，因为豆沙没有咸蛋黄肉松馅那么蓬松，所以我会一个多放10克，哈哈，或者豆沙馅和咸蛋黄肉松馅一样做一半；",
//             "picUrl": "http://i2.chuimg.com/e7c717a73634458b99d855c78a8e2ca4_1920w_1080h.jpg?imageView2/2/w/300/interlace/1/q/90",
//             "order": 16
//         },

//     ]
// }

// var data = {
//     "name": "香煎豆腐(烧烤铁板味)",
//     "cover": "http://i1.chuimg.com/525d4bd7433d40698e99041ff55532da_1080w_810h.jpg@2o_50sh_1pr_1l_660w_90q_1wh",
//     "description": "就算木有蘸料，味道也是极好哒～",
//     "steps": [
//         {
//             "description": "准备材料～",
//             "picUrl": "http://i1.chuimg.com/04b127b2b57048408f7706c9ff36bba0_1152w_864h.jpg@2o_50sh_1pr_1l_300w_90q_1wh",
//             "order": 1
//         },
//         {
//             "description": "❤调料汁:碗内放入生抽，白糖，耗油，鸡精，清水搅拌混合均匀～",
//             "picUrl": "http://i2.chuimg.com/22cb724e2d124bbb8b05fb84918ce53b_1280w_960h.jpg?imageView2/2/w/300/interlace/1/q/90",
//             "order": 2
//         },
//         {
//             "description": "豆腐切成1厘米厚的方块，小葱洗净备用～",
//             "picUrl": "http://i2.chuimg.com/c0c7ae779b90442b9482cfe3e7a9513a_1280w_960h.jpg?imageView2/2/w/300/interlace/1/q/90",
//             "order": 3
//         },
//         {
//             "description": "平底锅内倒入适量油，摆入豆腐块～小火煎至豆腐块两面金黄～倒入搅拌混合好的调料汁～继续煎至收汤汁即可～",
//             "picUrl": "http://i2.chuimg.com/9d7f8e2c3b41453a8e0c4b841fcd880e_1600w_1200h.jpg?imageView2/2/w/300/interlace/1/q/90",
//             "order": 4
//         },
//         {
//             "description": "装盘撒烧烤蘸料和小葱，香煎豆腐就做好啦～",
//             "picUrl": "http://i2.chuimg.com/f5a7ecdcd2da412c935b908dc13b3184_1080w_810h.jpg?imageView2/2/w/300/interlace/1/q/90",
//             "order": 5
//         },
//         {
//             "description": "铁板烧烤味，好好吃～",
//             "picUrl": "http://i2.chuimg.com/fca94420f51a4dd59533b19688454689_1080w_810h.jpg?imageView2/2/w/300/interlace/1/q/90",
//             "order": 6
//         },
//         {
//             "description": "太好吃啦，赶快试试",
//             "picUrl": "http://i2.chuimg.com/80c266364a9b45e8b96e9b701876dfbb_1080w_810h.jpg?imageView2/2/w/300/interlace/1/q/90",
//             "order": 7
//         }

//     ]
// }
var data = {
    "name": "轻乳酪蛋糕（低油低糖版）",
    "cover": "http://i1.chuimg.com/ff1337128b4911e6a9a10242ac110002_1080w_1080h.jpg@2o_50sh_1pr_1l_660w_90q_1wh",
    "description": "喜欢轻乳酪蛋糕细腻的组织，略带酸味的奶酪香和丝滑的口感，清爽不腻口～",
    "steps": [
        {
            "description": "准备材料～",
            "picUrl": "http://i2.chuimg.com/05871b2e8e0411e6a9a10242ac110002_1024w_1024h.jpg?imageView2/2/w/300/interlace/1/q/90",
            "order": 1
        },
        {
            "description": "奶油奶酪和牛奶放入盆中，隔热水用打蛋器搅打至细腻无颗粒状态。",
            "picUrl": "http://i2.chuimg.com/054708228e0411e6b87c0242ac110003_1080w_1080h.jpg?imageView2/2/w/300/interlace/1/q/90",
            "order": 2
        },
        {
            "description": "加入黄油搅打至完全融化～",
            "picUrl": "http://i2.chuimg.com/04c905808e0411e6b87c0242ac110003_1024w_1024h.jpg?imageView2/2/w/300/interlace/1/q/90",
            "order": 3
        },
        {
            "description": "离火后加入蛋黄，然后迅速搅打均匀～",
            "picUrl": "http://i2.chuimg.com/04845dd68e0411e6b87c0242ac110003_1024w_1024h.jpg?imageView2/2/w/300/interlace/1/q/90",
            "order": 4
        },
        {
            "description": "筛入低筋面粉～",
            "picUrl": "http://i2.chuimg.com/044583408e0411e6a9a10242ac110002_1024w_1024h.jpg?imageView2/2/w/300/interlace/1/q/90",
            "order": 5
        },
        {
            "description": "用刮刀从2点切拌到8点钟位置翻拌均匀，切记不可转圈搅拌，免得面糊起筋。翻拌好的奶酪糊盖保鲜膜冷藏备用～",
            "picUrl": "http://i1.chuimg.com/03e562448e0411e6a9a10242ac110002_1024w_1024h.jpg@2o_50sh_1pr_1l_300w_90q_1wh",
            "order": 6
        },
        {
            "description": "蛋白分3次加入细砂糖，出现粗泡状态时加入1/3砂糖，打至泡沫细腻状态时再加入1/3，出现纹路时倒入剩下的砂糖。全程用中低速打至出现大弯钩，也就是湿性发泡即可～",
            "picUrl": "http://i2.chuimg.com/039f5d308e0411e6a9a10242ac110002_1024w_1024h.jpg?imageView2/2/w/300/interlace/1/q/90",
            "order": 7
        },
        {
            "description": "烤箱预热170度。取1/3蛋白加入奶酪糊中，切拌混合均匀，然后再取1/3切拌均匀，最后把混合好的奶酪糊倒入蛋白盆中，切拌均匀后倒入模具中～",
            "picUrl": "http://i2.chuimg.com/034657588e0411e6a9a10242ac110002_1024w_1024h.jpg?imageView2/2/w/300/interlace/1/q/90",
            "order": 8
        },
        {
            "description": "烤盘中注入高约3cm的水，然后把模具放到水中。（活底模请包锡纸防止进水）烤箱中下层，160度烤70分钟左右，如果上色较浅可在最后8分钟提高温度烤一下～轻乳酪蛋糕出炉后无需倒扣，放置5－10分钟即可脱模，冷却后放入冰箱，冷藏4小时后风味更佳哦～",
            "picUrl": "http://i2.chuimg.com/0309ffa68e0411e6b87c0242ac110003_1024w_1024h.jpg?imageView2/2/w/300/interlace/1/q/90",
            "order": 9
        },
        {
            "description": "做我的方子有任何问题欢迎加微博或微信咨询，加入时验证码请写上您的下厨房昵称，方便对号入座哦。 欢迎关注微博：http://weibo.com/u/5586961638微信号：yjyhcf1206",
            "picUrl": "http://i2.chuimg.com/0309ffa68e0411e6b87c0242ac110003_1024w_1024h.jpg?imageView2/2/w/300/interlace/1/q/90",
            "order": 10
        }
    ]
}
$('#btn').on('click', function () {
    createRecipe(data)
        .then(({ id }) => {
            alert('创建菜谱成功');
            location.assign(`./detail.html?id=${id}`);
        })
        .catch(error => {
            alert(error);
        });
})