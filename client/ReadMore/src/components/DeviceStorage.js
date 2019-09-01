import AsyncStorage from '@react-native-community/async-storage';

export default class DeviceStorage{
    static get(key) {
        return AsyncStorage.getItem(key).then(item => JSON.parse(item))
    }

    static save(key, value) {
        return AsyncStorage.setItem(key, JSON.stringify(value))
    }

    static update(key, value) {
        return DeviceStorage.get(key).then(store => {
            if (typeof store === 'string') {
                return DeviceStorage.save(key, store)
            } else if (store instanceof Array) {
                return DeviceStorage.save(key, [...store, ...value])
            } else {
                return DeviceStorage.save(key, Object.assign({}, store, value))
            }
        })
    }

    static delete(key) {
        return AsyncStorage.removeItem(key)
    }
}