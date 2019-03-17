import $ from 'jquery';
import { login } from '../../utils/api';

const formRules = {
    mobile: [
        {
            type: 'require',
            message: '请输入您的手机号',
        },
        {
            type: 'regExp',
            message: '手机号无效，请重新填写',
            value: '^1[0-9]{10}$'
        }
    ],
    password: [
        {
            type: 'require',
            message: '请输入您的密码',
        },
        {
            type: 'regExp',
            message: '请输入至少9位的包含数字、字母和~的密码',
            value: '^[~\\dA-z]{9,}$'
        }
    ],
};

/**
 * 显示输入错误的提示
 */
function showInputErrorTip(message) {
    $('.validate-tip').text(message).show();
}

/**
 * 清楚错误提示
 */
function clearInputTip() {
    $('.validate-tip').text('').hide();
}

/**
 * 检查目标的有效性
 */
const validationInput = (target) => {
    const value = target.val();
    const name = target.attr('name');
    const rules = formRules[name];
    if (!rules) {
        return true;
    }

    for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        if (rule.type == 'require') {
            if (!value) {
                showInputErrorTip(rule.message);
                return false;
            }
        } else if (rule.type == 'regExp') {
            if (!new RegExp(rule.value).test(value)) {
                showInputErrorTip(rule.message);
                return false;
            }
        } else if (rule.type == 'function') {
            if (!rule.value.call(null, value)) {
                showInputErrorTip(rule.message);
                return false;
            }
        }
    };
    clearInputTip();
    return true;
}

/**
 * 发起网络请求
 */
function doLogin(mobile, password) {
    login(mobile, password)
    .then(({ token, user }) => {
        alert("登录成功");
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
        location.assign("./index.html");
    })
    .catch(error => {
        showInputErrorTip(error);
    });
}

/**
 * 聚焦时清除输入
 */
$('.form-item-field').focus(function() {
    clearInputTip();
});

/**
 * 离开焦点时验证输入
 */
$('.form-item-field').blur(function () {
    validationInput($(this));
});

/**
 * 点击按钮去登录
 */
$('.login-btn').click(function() {
    let correct = true;
    if (!validationInput($('.mobile'))) {
        correct = false;
    }
    if (!validationInput($('.password'))) {
        correct = false;
    }
    if (correct) {
        const mobile = $('.mobile').val();
        const password = $('.password').val();
        doLogin(mobile, password);
    }
});

// // 回车键登录事件
// var myBody = document.querySelector("body");//事件委托
// myBody.onkeydown = function () {
//     //回车键的键值为13
//     if (event.keyCode == 13) {
//         wantToLogin();
//     } 
// }