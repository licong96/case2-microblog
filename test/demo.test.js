const server = require('./server');

// test('test demo 1', () => {
//   expect(1 + 1).toBe(2)
// })

test('string 接口返回', async () => {
  const res = await server.get('/string');
  expect(res.body).toEqual({
    title: 'koa2 string'
  })
})

