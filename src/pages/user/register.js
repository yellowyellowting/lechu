import $ from 'jquery';
import { sendSMSOfRegister, register } from '../../utils/api';

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
    verifycode: [
        {
            type: 'require',
            message: '请输入短信动态码',
        },
        {
            type: 'regExp',
            message: '短信动态码无效，请重新输入',
            value: '^\\d{6}$'
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
    repassword: [
        {
            type: 'require',
            message: '请确认您的密码',
        },
        {
            type: 'function',
            message: '两次输入密码不一致，请重新输入',
            value: (value) => $('.password').val() == value,
        }
    ],
};

/**
 * 显示输入错误的提示
 */
const showInputErrorTip = (target, message) => {
    target.removeClass('right').addClass('err');
    target.siblings('.tip').text(message).show();
    target.siblings('.remend').show();
}

/**
 * 显示输入正确的提示
 */
const showInputRightTip = (target) => {
    target.removeClass('err').addClass('right');
    target.siblings('.tip').hide();
    target.siblings('.remend').hide();
}

/**
 * 清楚点输入提示
 */
const clearInputTip = (target) => {
    target.removeClass('err').removeClass('right');
    target.siblings('.tip').hide();
    target.siblings('.remend').hide();
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
                showInputErrorTip(target, rule.message);
                return false;
            }
        } else if (rule.type == 'regExp') {
            if (!new RegExp(rule.value).test(value)) {
                showInputErrorTip(target, rule.message);
                return false;
            }
        } else if (rule.type == 'function') {
            if (!rule.value.call(null, value)) {
                showInputErrorTip(target, rule.message);
                return false;
            }
        }
    };
    showInputRightTip(target);
    return true;
}

/**
 * 发送验证码
 */
const doSendVerifyCode = (mobile) => {
    sendSMSOfRegister(mobile)
    .then(() => {
        alert('短信验证码发送成功，请留意手机短信');
        let counter = 60;
        const interval = setInterval(function() {
            if (--counter <= 0) {
                clearInterval(interval);
                $('.verifycode-btn').removeAttr('disabled').text('重新发送');
            } else {
                $('.verifycode-btn').attr('disabled', 'disabled').text(`${counter}秒后重新发送`);
            }
        }, 1000);
    })
    .catch(err => {
        alert(err);
    })
};

/**
 * 真正的开始注册
 */
const doRegister = (mobile, code, password) => {
    register(mobile, code, password)
    .then(() => {
        alert('注册成功');
        location.assign("./login.html");
    })
    .catch(error => {
        alert(error);
    });
}

$('.form-item-field').focus(function () {
    clearInputTip($(this));
});

$('.form-item-field').blur(function () {
    validationInput($(this));
});

$('.verifycode-btn').click(function() {
    if (validationInput($('.mobile'))) {
        doSendVerifyCode($('.mobile').val());
    }
});

// 点击登录按钮
$('.register-btn').click(() => {
    let correct = true;
    if (!validationInput($('.mobile'))) {
        correct = false;
    }
    if (!validationInput($('.verifycode'))) {
        correct = false;
    }
    if (!validationInput($('.password'))) {
        correct = false;
    }
    if (!validationInput($('.repassword'))) {
        correct = false;
    }
    if (correct) {
        const mobile = $('.mobile').val();
        const code = $('.verifycode').val();
        const password = $('.password').val();
        doRegister(mobile, code, password);
    }
});

// 按回车时触发登录
// $(document).on('keydown', 'body', event => event.keyCode == 13 && doRegister());
