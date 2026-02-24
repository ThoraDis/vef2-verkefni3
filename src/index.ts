import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import { app as authorsApi} from './api/authors.api.js'
import { app as newsApi} from './api/news.api.js'

const app = new Hono()

app.use(prettyJSON())

app.get('/', (c) => {
  return c.json({
    '/authors': [
      {
        method: 'get',
        description: 'get all authors, paginated'
      },
      {
        method: 'post',
        description: 'create a new author'
      },
      {
        method: 'put',
        description: 'updates existing author'
      },
      {
        method: 'delete',
        description: 'deletes existing author'
      },
    ],

        '/news': [
      {
        method: 'get',
        description: 'get all authors, paginated'
      },
      {
        method: 'post',
        description: 'create a new author'
      },
      {
        method: 'put',
      },
      {
        method: 'delete',
      },
    ]
  })
})

app.route('/authors',authorsApi);
app.route('/news',newsApi);


serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
