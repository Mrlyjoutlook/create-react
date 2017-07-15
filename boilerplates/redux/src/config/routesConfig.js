/**
 * route list
 */

export const loginRoute = {
    key: 'login',
    name: '登录',
    path: '/login'
}

export const personalRoute = {
    key: 'personal',
    name: '个人',
    path: '/personal',
    child: {
        base: {
            key: 'base',
            name: '基础信息',
            path: '/personal/base'
        }
    }
}

export default { loginRoute, personalRoute };
