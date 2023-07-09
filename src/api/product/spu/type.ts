//定义spu管理接口数据的类型


//基本响应数据类型接口
export interface responesData {
    code: number,
    message: string
};


//spu数据类型接口
export interface spuData {
    id?: number,
    spuName: string,
    description: string,
    classification3Id: number | string,
    brandId: number | string,
    salexInformationList: null | spuSalesList[],//spu品牌销售信息列表
    imageInformationList: null | spuBrandImgData[]//spu品牌图片信息列表
};


//响应spu数据类型
export type Records = spuData[];

//定义获取已有的spu接口返回的数据类型
export interface responesExistingSpuData extends responesData {
    data: {
        records: Records,
        total: number
    }
};


//定义spu品牌数据类型接口
export interface spuBrandData {
    id: number,
    brandName: string,
    brandUrl?: string
};

//定义请求所有spu品牌数据类型接口
export interface responesSpuBrandData extends responesData {
    data: spuBrandData[]
};

//定义spu品牌图片数据类型接口
export interface spuBrandImgData {
    id?: number,
    createTime?: string,
    updateTime?: string,
    brandId?: number,
    imgName?: string,
    imgUrl?: string,


    Url?: string,

    //以下两个属性用于适配element上传接口
    name?: string,
    url?: string
};

//定义请求spu品牌图片数据类型接口
export interface responesSpuBrandImgData extends responesData {
    data: spuBrandImgData[]
};


//定义spu销售列表属性值数据类型接口
export interface spuSalesListAttrValue {
    id?: number,
    createTime?: string,
    updateTime?: string,
    brandId?: number,
    attrId: number,
    attrName: string,
    isChecked?: null,
    valueName: string
};

//定义存储spu品牌图片数据类型
export type spuSalesListAttrValueList = spuSalesListAttrValue[];

//定义spu销售列表数据类型接口
export interface spuSalesList {
    id?: number,
    createTime?: string,
    updateTime?: string,
    brandId?: number,
    attrId: number,
    attrName: string,
    spuSalesListAttrValueList: spuSalesListAttrValueList,

    //以下两个属性
    flag?: boolean,
    attrValue?: string

    //用于新增sku收集销售属性数据
    skuSalesAttrIdAndValueId?: string
};

//定义请求spu销售列表数据类型接口
export interface responesSpuSalesListData extends responesData {
    data: spuSalesList[];
};

//定义spu销售列表属性数据类型接口
export interface spuSalesListAttrList {
    id: number | string,
    name: string
};

//定义请求spu所有的销售属性列表数据类型接口
export interface responesSpuSalesAttrListData extends responesData {
    data: spuSalesListAttrList[];
};



//定义新增sku平台属性数据类型接口
export interface skuPlatformAttr { attrId: string | number, valueId: string | number };

//定义新增sku销售属性数据类型接口
export interface skuSalesAttr { attrId: string | number, valueId: string | number };



//定义新增sku数据类型接口
export interface addSkuData {
    classification3Id: string | number,
    spuId: string | number,
    brandId: string | number,
    skuName: string,
    skuPrice: string | number,
    skuWeight: string | number,
    skuDesc: string,
    skuPlatformAttrList: skuPlatformAttr[],
    skuSalesAttrList: skuSalesAttr[],
    skuImgUrl: string
};






//定义请求当前spu下sku的数据类型接口
export interface responesSkuData extends responesData {
    data: addSkuData[]
};