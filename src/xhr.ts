import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from "./types"
import { parseHeaders } from "./helpers/headers"

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        const { data = null, url, method = "get", headers, responseType, timeout } = config
        // xhr
        const request = new XMLHttpRequest()

        if (responseType) {
            request.responseType = responseType
        }

        if (timeout) {
            request.timeout = timeout
        }

        request.open(method.toUpperCase(), url, true)

        // readyState改变的监听函数
        request.onreadystatechange = function handleLoad() {
            /**
             * 0：初始
             * 1：open()之后
             * 2：send()之后
             * 3：请求中
             * 4：请求完成
             * 
             */
            if (request.readyState !== 4) {
                return
            }

            // 处理状态码为非200的情况
            if (request.status === 0) {
                return
            }

            // 获取请求头并变成对象结构
            const responseHeaders = parseHeaders(request.getAllResponseHeaders())
            const responseData = responseType !== "text" ? request.response : request.responseText

            // 处理响应值
            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            }
            // 返回响应
            handleResponse(response)
        }

        request.onerror = function handleError() {
            reject(new Error("Network Error"))
        }

        request.ontimeout = function handleTimeout() {
            reject(new Error(`Timeout of ${timeout} ms exceeded`))
        }

        Object.keys(headers).forEach((name) => {
            if (data === null && name.toLowerCase() === "content-type") {
                delete headers[name]
            } else {
                request.setRequestHeader(name, headers[name])
            }

        })

        request.send(data)


        function handleResponse(response: AxiosResponse): void {
            if (response.status >= 200 && response.status < 300) {
                resolve(response)
            } else {
                reject(new Error(`Request failed with status code ${response.status}`))
            }
        }
    })
}