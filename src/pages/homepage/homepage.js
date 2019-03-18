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
    lineContent.find('.delete-line').click(function() {
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
    stepContent.find('.oprating_delete').click(function() {
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
$('.multi-file-upload').on('change', function() {
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