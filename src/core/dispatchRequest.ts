import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from "../types"
import { buildURL } from "../helpers/url"
import xhr from "./xhr"
import { flattenHeaders } from "../helpers/headers"
import transform from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
    // 判断是否使用token
    throwIfCancellationRequested(config)
    processConfig(config)
    return xhr(config).then((res) => { return transformResponseData(res) })
}

function processConfig(config: AxiosRequestConfig): void {
    config.url = transformURL(config)
    config.data = transform(config.data, config.headers, config.transformRequest)
    config.headers = flattenHeaders(config.headers, config.method!)
}

function transformURL(config: AxiosRequestConfig): string {
    const { url, params } = config
    return buildURL(url!, params)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
    res.data = transform(res.data, res.headers, res.config.transformResponse)
    return res
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
    if (config.cancelToken) {
        config.cancelToken.throwIfRequested()
    }
}
