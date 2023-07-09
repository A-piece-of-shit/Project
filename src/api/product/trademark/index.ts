//用于项目商品管理下品牌管理相关接口

//引入axios实例
import instance from '@/utils/axios.ts'

//引入品牌管理类型接口
import type { brandsResponesData, brand, responesData } from '@/api/product/trademark/type.ts'



enum API {

    BXISTINGBRAND_URL = '/manage/brand',//获取已有品牌接口
    ADDBRAND_URL = '/manage/addbrand',//添加新品牌接口
    UPDATEBRAND_URL = '/manage/updatebrand',//编辑品牌接口
    CANCELBRANDUPLOAD_URL = '/manage/cancel/upload',//取消上传品牌图片接口
    DELETEBRAND_URL = '/manage/deletebrand'//删除品牌接口

}

//暴露接口

//获取已有品牌接口
export const reqExistingBrand = (page: number, numberOfPages: number) => instance.get<any, brandsResponesData>(`${API.BXISTINGBRAND_URL}/${page}/${numberOfPages}`);

//新增or编辑品牌接口
export const reqAddOrUpdateBrand = (data: brand) => {
    //编辑品牌
    if (data.id) return instance.post<any, responesData>(API.UPDATEBRAND_URL, data);
    //新增品牌
    else return instance.post(API.ADDBRAND_URL, data);
};

//取消品牌图片上传接口
export const reqCancelUploadBrandImg = (fileName: string) => instance.get<any, responesData>(`${API.CANCELBRANDUPLOAD_URL}/${fileName}`);

//删除品牌接口
export const reqDeleteBrand = (id: number) => instance.get<any, responesData>(`${API.DELETEBRAND_URL}/${id}`);