//定义属性管理接口数据的类型

//基本响应数据类型接口
export interface responesData {
    code: number,
    message: string
};


//一级or二级or三级分类数据类型接口
export interface Classification {
    id: number,
    name: string,
    classification1Id?: number,
    classification2Id?: number
};

//请求返回一级or二级or三级分类类型接口
export interface ClassificationResponesData extends responesData {
    data: Classification[]
};


//分类数据属性值类型接口
export interface ClassificationDataValue {
    id?: number,
    valueName: string,
    attrId?: number,
    //用于控制是否处于编辑模式
    flag?: boolean
};

//分类数据多个属性值类型接口
export type ClassificationDataValueList = ClassificationDataValue[];

//分类数据类型接口
export interface ClassificationData {
    id?: number | string,
    name: string,
    attrId: number | string,
    attrValueList: ClassificationDataValueList,

    //用于新增sku收集平台属性数据
    skuPlatformAttrIdAndValueId?: string
};

//多个分类数据类型接口
export type ClassificationDataList = ClassificationData[];

//
export interface ClassificationDataListResponseData extends responesData {
    data: ClassificationData[]
};