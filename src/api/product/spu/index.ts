//用于项目商品管理下spu管理相关接口

//引入axios实例
import instance from '@/utils/axios.ts'

//引入spu管理接口数据的类型
import type { responesExistingSpuData, responesSpuBrandData, responesSpuBrandImgData, responesSpuSalesListData, responesSpuSalesAttrListData, spuData, responesData, addSkuData, responesSkuData } from '@/api/product/spu/type.ts'

enum API {
    EXISTINGSPU_URL = 'spu/get',//获取已有的spu

    SPUBRAND_URL = 'spu/get/brand',//获取所有的spu品牌
    SPUBRANDIMAGE_URL = 'spu/get/brandimg',//获取spu品牌图片
    SPUSALESLIST_URL = 'spu/get/saleslist',//获取spu销售列表
    SPUSLAESATTRLIST_URL = 'spu/get/salesattrlist/',//获取spu所有的销售属性列表

    SPUADD_URL = 'spu/add',//添加spu
    SPUEDIT_URL = 'spu/edit',//修改spu
    SPUDELETE_URL = 'spu/delete',//删除spu

    SKUADD_URL = 'spu/add/sku',//添加sku
    SKUINFO_URL = 'spu/get/sku'//查看当前spu下的sku信息
};


//请求获取已有的spu数据
export const reqGetAnExistingSpu = (page: number, size: number, classification3Id: number) => instance.get<any, responesExistingSpuData>(`${API.EXISTINGSPU_URL}/${page}/${size}/${classification3Id}`);

//请求获取所有的spu品牌数据
export const reqALLSpuBrandData = () => instance.get<any, responesSpuBrandData>(`${API.SPUBRAND_URL}`);

//请求获取spu品牌图片数据
export const reqSpuBrandImgData = (spuId: number) => instance.get<any, responesSpuBrandImgData>(`${API.SPUBRANDIMAGE_URL}/${spuId}`);

//请求获取spu销售列表数据
export const reqSpuSalesListData = (spuId: number) => instance.get<any, responesSpuSalesListData>(`${API.SPUSALESLIST_URL}/${spuId}`);

//请求获取所有的spu销售属性列表数据
export const reqALLSpuSalesAttrListData = () => instance.get<any, responesSpuSalesAttrListData>(`${API.SPUSLAESATTRLIST_URL}`);


//请求新增 or 修改spu
export const reqAddOrEditSpu = (data: spuData) => {
    //修改spu
    if (data.id) return instance.post<any, responesData>(API.SPUEDIT_URL, data);
    //新增spu
    else return instance.post<any, responesData>(API.SPUADD_URL, data);
};


//请求新增sku
export const reqAddSku = (data: addSkuData) => instance.post<any, responesData>(API.SKUADD_URL, data);;

//请求查看当前spu下sku的数据
export const reqSkuInfo = (spuId: number) => instance.get<any, responesSkuData>(`${API.SKUINFO_URL}/${spuId}`);

//请求删除spu
export const reqDeleteSpu = (spuId: number) => instance.get<any, responesData>(`${API.SPUDELETE_URL}/${spuId}`);

