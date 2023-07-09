//用于项目商品管理下属性管理相关接口

//引入axios实例
import instance from '@/utils/axios.ts'

//引入属性管理数据类型接口
import type { ClassificationResponesData, ClassificationDataListResponseData, ClassificationData, responesData } from '@/api/product/attr/type.ts'

enum API {
    PRIMARYCLASSIFICATIONATTR_URL = '/attr/primaryclassification',//一级分类属性接口
    SECONDARYCLASSIFICATIONATTR_URL = '/attr/secondaryclassification',//二级分类属性接口
    THREELEVELCLASSIFICATIONATTR_URL = '/attr/threelevelclassification',//三级分类属性接口

    CLASSIFIEDDATA_URL = '/attr/classifieddata',//分类数据接口

    ADDOREDITCLASSIFICATIONDATA_URL = '/attr/addoredit/classifieddata',//添加or编辑分类数据接口

    DELETECLASSIFICATIONDATA_URL = '/attr/delete/classifieddata'
}


//获取一级分类属性接口
export const reqPrimaryClassificationAttr = () => instance.get<any, ClassificationResponesData>(`${API.PRIMARYCLASSIFICATIONATTR_URL}`);


//获取二级分类属性接口
export const reqSecondaryClassificationAttr = (id: number) => instance.get<any, ClassificationResponesData>(`${API.SECONDARYCLASSIFICATIONATTR_URL}/${id}`);


//获取三级分类属性接口
export const reqThreelevelClassificationAttr = (id: number) => instance.get<any, ClassificationResponesData>(`${API.THREELEVELCLASSIFICATIONATTR_URL}/${id}`);


//获取分类数据接口
export const reqClassifiedData = (id1: number, id2: number, id3: number) => instance.get<any, ClassificationDataListResponseData>(`${API.CLASSIFIEDDATA_URL}/${id1}/${id2}/${id3}`);


//新增or编辑管理分类数据接口
export const reqAddOrEditClassifiedData = (data: ClassificationData, id1: number, id2: number, id3: number) => instance.post<any, responesData>(`${API.ADDOREDITCLASSIFICATIONDATA_URL}/${id1}/${id2}/${id3}`, data);


//删除管理分类数据接口
export const reqDeleteClassifiedData = (id: number) => instance.get<any, responesData>(`${API.DELETECLASSIFICATIONDATA_URL}/${id}`);