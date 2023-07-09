//定义权限管理下的用户管理类型接口



//基本响应数据类型接口
export interface ResponesData {
    code: number,
    message: string
};


//用户信息数据类型接口
export interface UserInfo {
    id?: number,
    createTime?: string,
    updateTime?: string,
    userName: string,
    position?: string,
    positionIdList?: number[],
    accountnumber: string,
    password?: string
};
//多个用户信息数据类型接口
export type UserInfoList = UserInfo[];


//请求获取所有用户信息响应类型接口
export interface ResponesUserInfoData extends ResponesData {
    data: {
        records: UserInfoList,
        total: number,
    }
};











//职位信息数据类型接口
export interface PositionInfo {
    id?: number,
    createTime?: string,
    updateTime?: string,
    jobTitle: string
};
//多个职位信息数据类型接口
export type PositionInfoList = PositionInfo[];


//请求获取所有职位 以及 当前用户职位信息响应类型接口
export interface ResponesPositionInfoData extends ResponesData {
    data: {
        userPosition: PositionInfoList,
        allPosition: PositionInfoList,
    }
};


//分配职位信息数据类型接口
export interface AssignedPostInfoData {
    positionIdList: number[],
    userId: number
};
