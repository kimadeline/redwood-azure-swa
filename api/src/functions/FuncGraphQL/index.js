import {
  createGraphQLHandler,
  makeMergedSchema,
  makeServices,
} from '@redwoodjs/api'
import importAll from '@redwoodjs/api/importAll.macro'

import { getCurrentUser } from 'src/lib/auth.js'
import { db } from 'src/lib/db'

const schemas = importAll('api', 'graphql')
const services = importAll('api', 'services')

module.exports = async function (context, req) {
  context.res = {
    body: createGraphQLHandler({
      getCurrentUser,
      schema: makeMergedSchema({
        schemas,
        services: makeServices({ services }),
      }),
      db,
    }),
  }
}

// module.exports = async function (context, req) {
//   context.log('JavaScript HTTP trigger function processed a request.')

//   const name = req.query.name || (req.body && req.body.name)
//   const responseMessage = name
//     ? 'Hello, ' + name + '. This HTTP triggered function executed successfully.'
//     : 'This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.'

//   context.res = {
//     // status: 200, /* Defaults to 200 */
//     body: responseMessage,
//   }
// }
