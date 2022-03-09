import Vue from 'vue';
import { hasOwnProperty } from '../utils/misc';

/**
 * 扩展unWatch属性（声明不需要被vue监听的对象）
 */

const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
};

function proxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
        return this[sourceKey][key];
    };
    sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val;
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
}

function defineObj(obj, key, val) {
    const property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
        return;
    }
    const getter = property && property.get;
    const setter = property && property.set;

    val = defineIsVue(val);
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            return getter ? getter.call(obj) : val;
        },
        set: function reactiveSetter(newVal) {
            const value = getter ? getter.call(obj) : val;
            if (newVal === value || (newVal !== newVal && value !== value)) {
                return;
            }

            newVal = getter ? setter.call(obj, newVal) : newVal;
            val = defineIsVue(newVal);
        },
    });
}

// 简单对象判断
function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

// 添加_isVue标识，有该标识的对象不会被监听
function defineIsVue(value) {
    // 如果是个数组或者是个对象
    if (
        (isPlainObject(value) || Array.isArray(value)) &&
        !hasOwnProperty(value, '_isVue')
    ) {
        Object.defineProperty(value, '_isVue', {
            configurable: false,
            get() {
                return true;
            },
        });
    }
    return value;
}

function ininUnWatch(vm, obj) {
    vm.__unwatchs__ = {};
    for (const key in obj) {
        const value = obj[key];
        defineObj(vm.__unwatchs__, key, value);
        if (!(key in vm)) {
            proxy(vm, '__unwatchs__', key);
        }
    }
}

Vue.mixin({
    beforeCreate: function () {
        let unwatchs = {};

        const list = [this.$options];
        while (list.length) {
            const item = list.shift();
            // 如果存在unWatch属性
            if (item.unWatch) {
                // 存入指定的值
                unwatchs = Object.assign(item.unWatch.call(this), unwatchs);
            }
            // 如果存在mixixns属性
            if (item.mixins) {
                list.push(...item.mixins);
            }
        }

        ininUnWatch(this, unwatchs);
    },
});
