// 引入mockjs
// import Mock from 'mockjs2'

// mock方法--三个参数
  // 1. 拦截请求地址
  // 2. 请求方式
  // 3. 返回数据
    // 形式：1直接返回数据  2函数返回数据

// 定义全局数据
let arr =[]

// 定义函数-生成数据
// 函数返回数据--方便进行增删改查
// const createNews=()=>{
//   let newlist = []
//   for(let i =0;i<5;i++){
//     newlist.push({
//       // 生成的数据
//       cname:Mock.Random.cname()
//     })
//   }
//   return newlist
// }

// arr= createNews()

// // 定义函数-处理新增数据
// const handleAddName = (opt)=>{
//   // post传递过来的参数
//   // console.log(opt.body) //json字符串 需要转成对象
//   let {keyWords} = JSON.parse(opt.body)
//   console.log(keyWords)
//   arr.push({cname:keyWords})
//   return arr
// }

// // 定义函数-删除数据
// const handleDeleteName =(opt)=>{
//   // 通过opt.url截取字符串传递过来的参数
//   // console.log(opt.url)
//   let index = opt.url.split('=')[1]
//   // console.log(index)
//   arr.splice(index,1)
//   // console.log(arr)
//   return arr
// }

// // 查询接口--get
// Mock.mock('/mock/news','get',arr)
// // 新增接口--post
// Mock.mock('/mock/addNews','post',handleAddName)
// // 删除接口--delete(请求的查询参数拼接在请求路径中的，需要对路径进行处理，使用正则，只要是符合校验的进来进行操作)
// Mock.mock(/^\/mock\/deleteNews/,'delete',handleDeleteName)

