// @flow
import { App, Home, Game, NotFound } from './modules'

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        component: Home,
        exact: true
      },
      {
        path: '/game/:address',
        component: Game,
        exact: true
      },
      {
        component: NotFound
      }
    ]
  }
]

export default routes
