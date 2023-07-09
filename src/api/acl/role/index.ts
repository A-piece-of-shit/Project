//定义权限管理下的职位管理请求接口


//引入axios实例
import instance from '@/utils/axios.ts';

//引入权限管理下的职位管理类型接口
import type { ResponesJobInformationData, JobInformationData, ResponesData, ResponesPositionAuthorityData } from '@/api/acl/role/type.ts'

enum API {
    ALLJOBINFORMATION_URL = '/role/getall',//获取全部职位信息 
    ADDJOBINFORMATION_URL = '/role/add',//添加职位
    UPDATEJOBINFORMATION_URL = '/role/update',//更新职位
    POSITIONAUTHORITY_URL = '/role/authority',//获取职位权限
    ASSIGNAUTHORITY_URL = '/role/assignauthority',//分配权限
    DELETEPOSITION_URL = '/role/delete'//删除职位
};


//定义请求全部职位信息接口
export const reqAllJobInformation = (page: number, size: number, jobTitle: string) => instance.get<any, ResponesJobInformationData>(`${API.ALLJOBINFORMATION_URL}/${page}/${size}/?jobTitle=${jobTitle}`);

//定义请求 添加 or 更新 职位接口
export const reqAddJobInformation = (data: JobInformationData) => {
    //更新职位
    if (data.id) return instance.post<any, ResponesData>(API.UPDATEJOBINFORMATION_URL, data);
    //添加职位
    else return instance.post<any, ResponesData>(API.ADDJOBINFORMATION_URL, data);

};

//定义请求职位权限接口
export const reqPositionAuthority = (jobId: number) => instance.get<any, ResponesPositionAuthorityData>(`${API.POSITIONAUTHORITY_URL}/${jobId}`);

//定义请求分配权限接口
export const reqAssignAuthority = (jobId: number, authorityIdList: number[]) => instance.post<any, ResponesData>(`${API.ASSIGNAUTHORITY_URL}/${jobId}`, authorityIdList);

//定义请求删除职位接口
export const reqDeletePosition = (jobId: number) => instance.get<any, ResponesData>(`${API.DELETEPOSITION_URL}/${jobId}`);








