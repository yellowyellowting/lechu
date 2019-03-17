import $ from 'jquery';
import upload from '../../utils/upload';
import request from '../../utils/request';
import getImageDimen from '../../utils/image';

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


//用料添加行
for (let line = 0; line <= 4; line++) {
    var linecontent = `
        <tr>
            <td class="ingredients">
                <input type="text" class='ipts ipt_ingredients'>
                <span>食材：如鸡蛋</span>
            </td>
            <td class="dosage">
                <input type="text" class='ipts ipt_ingredients'>
                <span>食材：如鸡蛋</span>
            </td>
            <td class="opreat">
                <img src="https://s.chuimg.com/pic/drag.png" />
                <img src="https://s.chuimg.com/pic/close.png" />
            </td>
        </tr>
    `
    $('.table tbody').append(linecontent);
}

$('.addmaterial').on('click', function () {
    var addmaterial = `
    <tr>
        <td class="ingredients">
            <input type="text" class='ipts ipt_ingredients'>
            <span>食材：如鸡蛋</span>
        </td>
        <td class="dosage">
                <input type="text" class='ipts ipt_ingredients'>
                <span>食材：如鸡蛋</span>
        </td>
        <td class="opreat">
            <img src="https://s.chuimg.com/pic/drag.png" />
            <img src="https://s.chuimg.com/pic/close.png" />
        </td>
        </tr>
    `
    $('.table tbody').append(addmaterial);
})

//用料添加行表格聚焦事件
$('.table tbody').on('mouseover', '.ipts', function () {
    $(this).css('background', '#fffcea');
    $(this).parents('td').css('background', '#fffcea');
})
$('.table tbody').on('mouseout', '.ipts', function () {
    $(this).css('background', '#ffffff');
    $(this).parents('td').css('background', '#ffffff');
})
$('.table tbody').on('focus', '.ipts', function () {
    $(this).css('background', '#fffcea');
    $(this).parents('td').css('background', '#fffcea');
    $(this).siblings('span').hide();
})
$('.table tbody').on('blur', '.ipts', function () {
    $(this).css('background', '#ffffff');
    $(this).parents('td').css('background', '#ffffff');
    var value = $(this).val();
    if (!value) {
        $(this).siblings('span').show();
    }
})

//步骤添加聚焦事件
$('.thumbnail').on('mouseover', '.add_decription', function () {
    $(this).css('background', '#fffcea');
    $(this).parents('td').css('background', '#fffcea');
})
$('.thumbnail').on('mouseout', '.add_decription', function () {
    $(this).css('background', '#ffffff');
    $(this).parents('td').css('background', '#ffffff');
})
$('.thumbnail').on('focus', '.add_decription', function () {
    $(this).css('background', '#fffcea');
    $(this).parents('td').css('background', '#fffcea');
    $(this).siblings('span').hide();
})
$('.thumbnail').on('blur', '.add_decription', function () {
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
 * 添加步骤
 */
function addStep() {
    const stepIndex = $('.step').length + 1;
    const stepContent = `
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
                        <div class="upload-box step-cover-box">
                            <div class="upload-tip">
                                <span class="upload-text">
                                    <span class="main-title">+ 上传步骤图</span><br>
                                    <span class="sub-title">最佳尺寸：1280 × 1024</span>
                                </span>
                            </div>
                            <input class="fileupload stepe_img" type="file" name="files[]" />
                            <div class="upload-progress">
                                <span class="upload-progress-text">上传中•••</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="thumbnail oprating_box">
                        <div>
                            <img class='oprating_add' src="https://s.chuimg.com/pic/drag.png" />
                            <img class='oprating_delet' src="https://s.chuimg.com/pic/close.png" />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    $('.step_box').append(stepContent);
}

/**
 * 显示上传的预览图片
 */
function showPreviewImage(target, url) {
    console.log(target);
    const previewBox = `<div class="upload-preview">
        <img class="preview-image" src=${url} />
        <div class="preview-close-btn"></div>
    </div>`;
    $(target).append(previewBox);
    getImageDimen(url)
    .then(({ width, height }) => {
        let adjustHeight = $(target).width() / width * height;
        if (adjustHeight > $(target).height()) {
            $(target).attr('original-height', $(target).height());
            $(target).height(adjustHeight);
        }
    });
}

/**
 * 单文件上传
 */
function singleFileUpload(target, file) {
    if (!file || !target) {
        return;
    }

    $(target).children('.upload-progress').css('display', 'table');
    upload('/upload/recipe', file)//后端接头地址，图片传至后端，后端把数据处理，生成url后再返给前端
        .then(({ files }) => {
            $(target).children('.upload-progress').css('display', 'none');
            const fileList = files || [];
            const fileInfo = fileList[0] || {};
            if (fileInfo) {
                showPreviewImage(target, fileInfo.url);
            }
        })
        .catch(() => {
            $(target).children('.upload-progress').css('display', 'none');
        });
}

/**
 * 多文件上传
 */
function multiFileUpload(files) {
    if (!files || files.length == 0) {
        return;
    }

    // 补上差少的步骤
    const diffStepCount = files.length - $('.step_box').children('.step').length;
    if (diffStepCount > 0) {
        for (let i = 0; i < diffStepCount; i++) {
            addStep();
        }
    }
    const uploadBoxes = $('.upload-box');
    for (let i = 0; i < uploadBoxes.length; i++) {
        let uploadBox = uploadBoxes[i];
        let file = files[i];
        singleFileUpload(uploadBox, file);
    }
}

// 步骤点击添加行
$('.addstep').on('click', function() {
    addStep();
});

// 点击预览图删除按钮
$(document).on('click', '.preview-close-btn', function() {
    const uploadBox = $(this).parents('.upload-box');
    uploadBox.children('.upload-preview').remove();
    uploadBox.height(uploadBox.attr('original-height'));
});

//未来事件使用on()方法；value改变之后触发事件，所以使用change事件；
$('.step_box').on('change', '.fileupload', function () {
    singleFileUpload($(this).parents('.upload-box'), this.files[0]);
});

//未来事件使用on()方法；value改变之后触发事件，所以使用change事件；
$('.recipe-cover-box').on('change', '.fileupload', function () {
    singleFileUpload($(this).parents('.upload-box'), this.files[0]);
});

// 多文件文件选择完毕后触发
$('.multi-file-upload').on('change', function() {
    multiFileUpload(this.files);
});

// 预留4个步骤
for (let i = 0; i < 4; i++) {
    addStep();
}