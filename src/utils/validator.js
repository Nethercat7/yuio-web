// 数字
const numberReg = /^\d+$|^\d+[.]?\d+$/
// 中文
const cnReg = /^[\u4e00-\u9fa5]+$/
// 邮箱
const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
// 手机号
const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
//英文和数字
const wordAndNumberReg = /^[A-Za-z0-9]+$/

//英文和数字
export function validateWaN(rule,value,callback){
    if (!numberReg.test(value)) {
        callback(new Error('只能是英文字母和数字'))
    } else {
        callback()
    }
}

// 数字验证
export function validateNumber(rule, value, callback) {
    if (!numberReg.test(value)) {
        callback(new Error('请输入数字'))
    } else {
        callback()
    }
}

// 中文验证
export function validateCn(rule, value, callback) {
    if (!cnReg.test(value)) {
        callback(new Error("请输入中文"));
    } else {
        callback()
    }
}

// 邮箱验证
export function validateEmail(rule, value, callback) {
    //如果required为false,并且数据不为空的话那么做校验
    if (rule.required) {
        if (!emailReg.test(value)) {
            callback(new Error('请输入正确的邮箱'))
        } else {
            callback()
        }
    } else {
        if (value == undefined || value == "") {
            callback()
        } else {
            if (!emailReg.test(value)) {
                callback(new Error('请输入正确的手机号码'))
            } else {
                callback()
            }
        }
    }
}

// 电话验证
export function validatePhone(rule, value, callback) {
    if (rule.required) {
        if (!phoneReg.test(value)) {
            callback(new Error('请输入正确的手机号码'))
        } else {
            callback()
        }
    } else {
        if (value == undefined || value == "") { callback() } else {
            if (!phoneReg.test(value)) {
                callback(new Error('请输入正确的手机号码'))
            } else {
                callback()
            }
        }
    }
}

//密码验证
export function validatePassword(rule, value, callback) {
    if (!wordAndNumberReg.test(value)) {
        callback(new Error("密码只能由数字和26个英文字母组成"));
    } else {
        callback();
    }
}

