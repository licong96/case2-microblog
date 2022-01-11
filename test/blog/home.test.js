/**
 * @description 首页 test
 * @author 双越老师
 */

const server = require('../server')
const { Z_COOKIE } = require('../testUserInfo')

test('创建一条微博，应该成功', async () => {
    // 定义测试内容
    const content = '单元测试自动创建的微博_' + Date.now()
    const image = '/xxx.png'

    // 开始测试
    const res = await server
        .post('/api/blog/create')
        .send({
            content,
            image
        })
        .set('cookie', Z_COOKIE)
    expect(res.body.errno).toBe(0)
})