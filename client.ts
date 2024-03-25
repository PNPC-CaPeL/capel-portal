import feathers from '@feathersjs/feathers'
import auth from '@feathersjs/authentication-client'

// export const client = feathers()
//
// // Connect to a different URL
// const restClient = rest(process.env.LCK_BASE_PATH)
//
// console.log('ddddd', process.env.LCK_BASE_PATH)
//
// // Configure an AJAX library (see below) with that client
// client.configure(restClient.fetch(fetch))
// client.configure(auth())

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createClient = (connection: any) => {
  const client = feathers()

  client.configure(connection)
  client.configure(auth())

  client.set('connection', connection)
  return client
}
