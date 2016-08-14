/* @flow */

type Route = {
  name: string,
  path: string,
  puts?: Array<Function>,
  takes?: Array<string>
}

const routes: Array<Route> = [
  {
    name: 'home',
    path: '/'
  }
]

export default routes
