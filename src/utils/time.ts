//时间工具


//当前小时的提示信息
export const getHours = () => {
    let message = ''
    const hours = new Date().getHours();
    switch (hours) {
        case (hours < 8 ? hours : hours - 1): {
            message = '早上好';
            break;
        }
        case (hours < 12 ? hours : hours - 1): {
            message = '上午好';
            break;
        }
        case (hours < 18 ? hours : hours - 1): {
            message = '下午好';
            break;
        }
        case (hours < 22 ? hours : hours - 1): {
            message = '晚上好';
            break;
        }
        default: {
            message = 'hello'
            break;
        }
    }
    return message;
};


//获取当前的完整时间
export const getCompleteTime = () => {
    const date = new Date();
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日${date.getHours()}时${date.getMinutes()}分${date.getSeconds()}秒`;
};


//获取当前时间：用于数据大屏展示时间
export const getScreenTime = () => {
    const date = new Date();
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}时：${date.getMinutes()}分：${date.getSeconds()}秒`;
};