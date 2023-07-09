//定义权限管理下的职位管理类型接口

//基本响应数据类型接口
export interface ResponesData {
    code: number,
    message: string
};


//职位信息数据类型接口
export interface JobInformationData {
    id?: number,
    creatTime?: string,
    updateTime?: string,
    name: string
};

//多个用户信息数据类型接口
export type JobInformationDataList = JobInformationData[];


//请求获取所有用户信息响应类型接口
export interface ResponesJobInformationData extends ResponesData {
    data: {
        records: JobInformationDataList,
        total: number,
    }
};



//职位子权限数据类型接口
export type ChildPermission = PositionAuthorityData[];

//职位权限数据类型接口
export interface PositionAuthorityData {
    id: number,
    name: string
    authorityLevel: number,
    children?: ChildPermission,
    select: boolean
};


//请求职位权限响应类型接口
export interface ResponesPositionAuthorityData extends ResponesData {
    data: ChildPermission
};

