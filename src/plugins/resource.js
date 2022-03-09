const STATUS = {
    UN_LOAD: 0, // 从未被加载
    LOADING: 1, // 加载过程中
    LOADED: 2, // 正确被加载
    LOADERROR: 3, // 加载错误
};

// 外部资源
const resources = {
    mapbox: {
        urls: ['./lib/mapbox/mapbox-gl.css', './lib/mapbox/mapbox-gl.js'],
        status: STATUS.UN_LOAD,
    },
    'mapbox-draw': {
        dependencies: ['mapbox'],
        urls: ['./lib/draw/mapbox-gl-draw.css', './lib/draw/mapbox-gl-draw.js'],
        status: STATUS.UN_LOAD,
    },
    GeoGlobe: {
        dependencies: ['mapbox'],
        urls: ['./lib/turf.min.js', './lib/GeoGlobe/GeoGlobeJS.min.js'],
        status: STATUS.UN_LOAD,
    },
};

// 构建资源dom
function newResourceDom(url) {
    let dom;
    if (/.(js|JS)$/.test(url)) {
        dom = document.createElement('script');
        dom.src = url;
    } else if (/.(css|CSS)$/.test(url)) {
        dom = document.createElement('link');
        dom.rel = 'stylesheet';
        dom.href = url;
    }
    return dom;
}

// 检查依赖
function checkDependencies(dependencies = []) {
    for (const key of dependencies) {
        const resource = resources[key];
        if (!resource) continue;

        if (
            resource.status === STATUS.UN_LOAD ||
            resource.status === STATUS.LOADING
        ) {
            return false;
        }
    }
    return true;
}

async function loadResource(config) {
    // 配置不存在
    if (!config) return;

    // 如果资源已经被加载
    if (config.status === STATUS.LOADED) return;

    // 如果资源加载失败，暂时不做处理
    if (config.status === STATUS.LOADERROR) return;

    // 如果资源正在加载中
    if (config.status === STATUS.LOADING) {
        return new Promise(resolve => {
            const timer = setInterval(() => {
                if (config.status !== STATUS.LOADING) {
                    resolve();
                    clearInterval(timer);
                }
            }, 10);
        });
    }

    // 节点对象
    const urls = config.urls || [];

    // 修改状态
    config.status == STATUS.LOADING;

    // 所有的请求
    const proms = urls.map(
        url =>
            new Promise((resolve, reject) => {
                const dom = newResourceDom(url);

                if (!dom) resolve();

                // 加载完成
                dom.onload = function () {
                    resolve();
                };
                // 加载失败
                dom.onerror = function (err) {
                    reject(err);
                };

                // 如果不存在依赖
                if (checkDependencies(config.dependencies)) {
                    document.querySelector('head').appendChild(dom);
                } else {
                    const timer = setInterval(() => {
                        if (checkDependencies(config.dependencies)) {
                            document.querySelector('head').appendChild(dom);
                            clearInterval(timer);
                        }
                    }, 10);
                }
            })
    );

    return Promise.allSettled(proms).then((...rest) => {
        for (let i = 0; i < rest.length; i++) {
            const r = rest[i];
            if (r.status === 'rejected') {
                config.status = STATUS.LOADERROR;
                return;
            }
        }
        config.status = STATUS.LOADED;
    });
}

export default async function load(keys = []) {
    const proms = [];
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        proms.push(loadResource(resources[key]));
    }
    return Promise.allSettled(proms);
}
