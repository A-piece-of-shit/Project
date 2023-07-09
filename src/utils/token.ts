//对token的增删改查

//设置token
export const SET_TOKEN = (token: string) => {
    localStorage.setItem('TOKEN', (token as string));
};

//获取token
export const GET_TOKEN = () => localStorage.getItem('TOKEN');


//删除token
export const REMOVE_TOKEN = () => {
    localStorage.removeItem('TOKEN');
}






//设置暗黑主体
export const SET_THEME = () => {
    localStorage.setItem('THEME', 'true');
};


//获取theme
export const GET_THEME = () => localStorage.getItem('THEME');

//删除token
export const REMOVE_THEME = () => {
    localStorage.removeItem('THEME');
}