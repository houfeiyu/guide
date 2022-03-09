import Axios from 'axios';
import { initHttpUtil } from './http';

// 读取配置的方法
async function fetchConfig(path = '') {
    return Axios.get('./config/application' + path + '.js').then(({ data }) =>
        eval(
            `(function() {var module = {exports:{}}; ${data}; return module.exports;})()`
        )
    );
}

// 根据配置获取外部配置
async function readBaseConfig() {
    // 基础配置
    const baseConfig = await fetchConfig();

    // 激活的配置项
    const { active } = baseConfig;
    // 其他配置项的配置
    let otherConfig = {};

    // 如果是开发模式
    // eslint-disable-next-line no-undef
    if (envIsDebug) {
        otherConfig = await fetchConfig('.dev');
    } else if (active) {
        otherConfig = await fetchConfig('.' + active);
    }

    // return
    return { ...baseConfig, ...otherConfig };
}

/**
 * 应用配置读取的方法
 */
export default async function () {
    const baseConfig = await readBaseConfig();
    initHttpUtil(baseConfig);

    /**
     * @todo
     * 在此处添加自定义配置读取（如地图应用读取后台配置参数，业务系统读取相关路由接口初始化数据等）
     */
    const serveConfig = {};

    // 合并并返回配置
    return { ...baseConfig, ...serveConfig };
}
