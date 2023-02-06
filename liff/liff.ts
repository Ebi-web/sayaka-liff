// liff関連のlocalStorageのキーのリストを取得

const getLiffLocalStorageKeys = (prefix:string) => {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key === null) {
            continue
        }
        if (key.indexOf(prefix) === 0) {
            keys.push(key)
        }
    }
    return keys
}
// 期限切れのIDTokenをクリアする
export const clearExpiredIdToken = (liffId: string) => {
    if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
        return
    }
    const keyPrefix = `LIFF_STORE:${liffId}:`
    const key = keyPrefix + 'decodedIDToken'
    const decodedIDTokenString = localStorage.getItem(key)
    if (!decodedIDTokenString) {
        return
    }
    const decodedIDToken = JSON.parse(decodedIDTokenString)
    // 有効期限をチェック
    if (new Date().getTime() > decodedIDToken.exp * 1000) {
        const keys = getLiffLocalStorageKeys(keyPrefix)
        keys.forEach(function (key) {
            localStorage.removeItem(key)
        })
    }
}
