import axios from '../../src/index'

// axios({
//     method: 'get',
//     url: "/base/get",
//     params: {
//         foo: ["bar", "baz"]
//     }
// })

// axios({
//     method: 'get',
//     url: "/base/get",
//     params: {
//         bar: "bar"
//     }
// })


// const date = new Date()

// axios({
//     method: 'get',
//     url: "/base/get",
//     params: {
//         date
//     }
// })

// 测试data

// axios({
//     method: 'post',
//     url: "/base/post",
//     data: {
//         a: 1
//     }
// })

// 测试header

// axios({
//     method: 'post',
//     url: "/base/post",
//     headers: {
//         "content-type": 'application/json',
//         "Accept": "application/json, text/plain, */*"
//     },
//     data: {
//         a: 1
//     }
// })

// 测试response

axios({
    method: 'post',
    url: "/base/post",
    data: {
        a: 1
    },
    responseType: 'json'
}).then((res) => {
    console.log(res)
})
