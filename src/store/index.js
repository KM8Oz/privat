import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
import  pcm from './pcm';
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      pcm: pcm
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    plugins: [createPersistedState()],
    strict: process.env.DEV
  })
  if (process.env.DEV && module.hot) {
    module.hot.accept(['./pcm'], () => {
      const newpcm = require('./pcm').default
      Store.hotUpdate({ modules: { pcm: newpcm } })
    })
  }
  return Store
}
