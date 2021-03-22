import Vue from 'vue'
 
export default {
  namespaced: true,
  state: {},
  actions: {
    logout({ commit }) {
      Vue.$confirm({
        title: 'Are you sure?',
        message: 'Are you sure you want to logout?',
        button: {
          yes: 'Yes',
          no: 'Cancel'
        },
        callback: confirm => {
          // ...do something
        }
      })
    }
  }
}