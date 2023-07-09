//定义sku管理接口数据的类型


//基本响应数据类型接口
export interface responesData {
    code: number,
    message: string
};




//定义sku平台属性数据类型接口
export interface skuPlatformAttr { id?: number, attrId: string | number, valueId: string | number };

//定义sku销售属性数据类型接口
export interface skuSalesAttr { id?: number, attrId: string | number, valueId: string | number };



//定义sku数据类型接口
export interface SkuData {
    classification3Id: string | number,
    spuId: string | number,
    brandId: string | number,
    skuName: string,
    skuPrice: string | number,
    skuWeight: string | number,
    skuDesc: string,
    skuPlatformAttrList: skuPlatformAttr[],
    skuSalesAttrList: skuSalesAttr[],
    skuImgUrl: string,

    id?: number | string,
    isListing?: boolean,
};


//定义请求sku数据类型接口
export interface responseSkuData extends responesData {
    data: {
        records: SkuData[],
        total: number,
        size: number,
        page: number
    }
};





//定义sku信息平台属性数据类型接口
export interface PlatformAttr {
    id?: number,
    attrId: number,
    attrName: string
};

//定义sku信息销售属性数据类型接口
export interface SalesAttr {
    id?: number,
    attrId: number,
    attrName: string
};

//定义sku信息销售图片数据类型接口
export interface salesImg {
    id?: number,
    imgUrl: string,
    imgName?: string
};

//定义sku信息数据类型接口
export interface skuInfo {
    id?: number,
    platformAttrList: PlatformAttr[],
    salesAttrList: SalesAttr[],
    salesImgList: salesImg[]
};

//定义请求指定sku信息数据类型接口
export interface responseSkuInfoData extends responesData {
    data: skuInfo
};