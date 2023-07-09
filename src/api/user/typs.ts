//定义用户接口数据的类型

//用户登录数据类型
export interface loginForm {
    accountNumber: string,
    password: string
}




//服务器通用接口返回数据类型
export interface ResponseData {
    code: number,
    message: string,
}

//服务器用户登录接口返回数据类型
export interface loginResponseData extends ResponseData {
    data: string
}

//服务器用户信息接口返回数据类型
export interface userInfoResponseData extends ResponseData {
    data: {
        // routes: string[],
        // buttons: string[],
        // roles: string[],
        username: string,
        useravatar: string,
        userRightsList: string[]//用户已有权限
    }
}

//服务器用户退出登录接口返回数据类型
export interface logoutResponseData extends ResponseData {
    data: null
}