//定义权限管理下的用户管理请求接口


//引入axios实例
import instance from '@/utils/axios.ts';

//引入权限管理下的用户管理类型接口
import type { ResponesUserInfoData, UserInfo, ResponesData, ResponesPositionInfoData, AssignedPostInfoData } from '@/api/acl/user/type.ts'


enum API {
    ALLUSERINFO_URL = '/user/getall',//获取所有用户信息
    ADDUSERINFO_URL = '/user/add',//添加用户信息
    UPDATEUSERINFO_URL = '/user/update',//更新用户信息

    POSITIONINFO_URL = '/user/positioninfo',//获取所有职位
    POSTASSIGNED_URL = 'user/assignedpost',//分配职位信息
    DELETEUSERINFO_URL = '/user/delete',//删除用户信息
    DELETEALLUSERINFO_URL = '/user/deleteall',//批量删除用户信息

};



//请求获取所有用户信息接口
export const reqAllUserInfo = (page: number, size: number, userName: string) => instance.get<any, ResponesUserInfoData>(`${API.ALLUSERINFO_URL}/${page}/${size}/?username=${userName}`);


//请求添加用户信息接口
export const reqAddOrUpdateUserInfo = (data: UserInfo) => {
    //更新用户信息
    if (data.id) return instance.post<any, ResponesData>(API.UPDATEUSERINFO_URL, data);
    //添加用户信息
    else return instance.post<any, ResponesData>(API.ADDUSERINFO_URL, data);
};

//请求获取所有职位 以及 当前用户职位信息接口
export const reqPositionInfo = (userId: number) => instance.get<any, ResponesPositionInfoData>(`${API.POSITIONINFO_URL}/${userId}`);

//请求当前用户分配职位信息接口
export const reqAssignedPostInfo = (data: AssignedPostInfoData) => instance.post<any, ResponesData>(API.POSTASSIGNED_URL, data);


//请求删除用户信息接口
export const reqDeleteUserInfo = (userId: number) => instance.get<any, ResponesData>(`${API.DELETEUSERINFO_URL}/${userId}`);

//请求批量删除用户信息接口
export const reqDeleteAllUserInfo = (userIdList: number[]) => instance.post<any, ResponesData>(API.DELETEALLUSERINFO_URL, userIdList);





