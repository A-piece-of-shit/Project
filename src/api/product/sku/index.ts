//用于项目商品管理下sku管理相关接口

//引入axios实例
import instance from '@/utils/axios.ts'

//引入sku管理接口数据的类型
import type { responseSkuData, responseSkuInfoData } from '@/api/product/sku/type.ts'

enum API {
    SKU_URL = '/sku/get',//获取sku
    SKULISTING_URL = '/sku/listing',//sku上架
    SKUDELIST_URL = '/sku/delist',//sku下架

    SKUINFO_URL = '/sku/info',//获取指定sku的信息
    SKUDELETE_URL = '/sku/delete'//删除指定sku
};


//请求获取sku
export const reqGetSku = (page: number, size: number) => instance.get<any, responseSkuData>(`${API.SKU_URL}/${page}/${size}`);


//请求当前sku上架
export const reqSkuListing = (skuId: number) => instance.get<any, responseSkuData>(`${API.SKULISTING_URL}/${skuId}`);

//请求当前sku下架
export const reqSkuDelist = (skuId: number) => instance.get<any, responseSkuData>(`${API.SKUDELIST_URL}/${skuId}`);

//请求指定sku的信息
export const reqSkuInfo = (skuId: number) => instance.get<any, responseSkuInfoData>(`${API.SKUINFO_URL}/${skuId}`);

//请求删除指定sku
export const reqDeleteSku = (skuId: number) => instance.get<any, responseSkuData>(`${API.SKUDELETE_URL}/${skuId}`);






