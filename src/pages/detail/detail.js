// import $ from 'jquery';
import $ from 'jquery';
import upload from '../../utils/upload';
import { showDetail } from '../../utils/api';

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

//步骤添加
for (var step = 0; step <= 3; step++) {
    var stepcontent = `
    <div class="row clearfix step">
        <div class="col-md-12 column">
            <div class="row">
                <div class="col-md-1">
                    <div class="thumbnail">
                        <div class="caption">
                            <div class="number">
                                ${step + 1}
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
                    <div class="thumbnail  add_img">
                        <div class="caption  upload_imgbox">
                            <input class="fileupload stepe_img" type="file" name="files[]" />
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
   `
    $('.step_box').append(stepcontent);
}

// 步骤点击添加行
$('.content-wrapper').on('click', '.addstep', function () {
    var steps = $('.step');
    var number = steps.length;
    var addstep = `
    <div class="row clearfix step">
            <div class="col-md-12 column">
                <div class="row">
                    <div class="col-md-1">
                        <div class="thumbnail">
                            <div class="caption">
                                <div class="number">
                                    ${number + 1}
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
                        <div class="thumbnail  add_img">
                            <div class="caption upload_imgbox">
                                <input class="fileupload stepe_img" type="file" name="files[]" />
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
    `
    $('.step_box').append(addstep);
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


// 数据渲染

//获取节点
var name = $('.add');
var cover = $('.cover');
var description = $('.describe .textcontent');
var title = $('.title-box')
var addDecription = $('.add_decription');
var stepsImgs = $('.add_img');

// 详情页跳转，获取地址栏的ID
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //获取id
    var r = window.location.search.substr(1).match(reg); //返回从？开始的url
    if (r != null) {
        return unescape(r[2]); //使用 unescape() 对其解码
    }
    return null;
}

/**
 * 显示上传的预览图片
 */
function showPreviewImage(target, url) {
    // console.log(target);
    const previewBox = `<div class="upload-preview">
        <img class="preview-image" src=${data.cover} />
        <div class="preview-close-btn"></div>
    </div>`;
    const title = `
    <h2>${data.name}的做法</h2>
    `
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

(function () {
    var id = getQueryString("id");
    console.log(id);
    if (!id) {
        alert("餐馆ID不能为空");
        location.assign('./home.html');
        return;
    }

    function render(id) {
        showDetail(id)
            .then((data) => {
                console.log(data);
                const previewBox = `<div class="upload-preview">
                <img class="preview-image" src=${data.cover} />
                <div class="preview-close-btn"></div>
                </div>`;
                const picUrl = `<div class="upload-preview">
                <img class="preview-image" src=${data.picUrl} />
                <div class="preview-close-btn"></div>
                </div>`;
                name.val(data.name);
                cover.html(previewBox);
                description.val(data.description);
                title.html(title);
                data.steps.forEach((ele, index) => {
                    addDecription[index].val(ele.description);
                    stepsImgs[index].append(picUrl)
                });


            })
            .catch(error => {
                console.log(error);
            });

    }
})();
