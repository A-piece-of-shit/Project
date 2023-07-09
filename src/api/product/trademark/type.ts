//定义品牌管理接口数据的类型


//基本响应数据类型接口
export interface responesData {
    code: number,
    message: string
};

//品牌数据
export interface brand {
    id?: number,
    //品牌logo添加时间
    creationDate: string,
    //品牌logo编辑时间：第一次为品牌logo添加时间
    editDate: string,
    //品牌名称
    brandName: string,
    //品牌url
    brandLogoImg: string,
    //品牌logo图片名称
    brandLogoFilename: string,
    brandLogoSize: number
};

//全部品牌数据
export type brands = brand[];

//获取已有品牌类型接口
export interface brandsResponesData extends responesData {
    total: number,
    data: brands
};