// 数字
const numberReg = /^\d+$|^\d+[.]?\d+$/
// 中文
const cnReg = /^[\u4e00-\u9fa5]+$/
// 邮箱
const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
// 手机号
const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/

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
    if (!emailReg.test(value)) {
        callback(new Error('请输入正确的邮箱'))
    } else {
        callback()
    }
}

// 电话验证
export function validatePhone(rule, value, callback) {
    if (!phoneReg.test(value)) {
        callback(new Error('请输入正确的手机号码'))
    } else {
        callback()
    }
}

// export default {
//     // 数字验证
//     validateNumber: function (rule, value, callback) {
//         if (!numberReg.test(value)) {
//             callback(new Error('请输入数字'))
//         } else {
//             callback()
//         }
//     },
//     // 中文验证
//     validateCn: function (rule, value, callback) {
//         if (!cnReg.test(value)) {
//             callback(new Error("请输入中文"));
//         } else {
//             callback()
//         }
//     },
//     // 邮箱验证
//     validateEmail: function (rule, value, callback) {
//         if (!emailReg.test(value)) {
//             callback(new Error('请输入正确的邮箱'))
//         } else {
//             callback()
//         }
//     },
//     // 电话验证
//     validatePhone: function (rule, value, callback) {
//         if (!phoneReg.test(value)) {
//             callback(new Error('请输入正确的手机号码'))
//         } else {
//             callback()
//         }
//     },
//     // n*70 70取余
//     validateDivide70: function (rule, value, callback) {
//         if (value % 70 != 0) {
//             callback(new Error('请输入70的倍数'))
//         } else {
//             callback()
//         }
//     }
// }