import store from '../store'
class Postmessage {
  constructor() {
    this.targetOrigin = process.env.NODE_ENV === 'production' ? window.location.origin : 'http://127.0.0.1:3001'
    this.postMessageType = {
      pageHeightChange: 'pageHeightChange',
      pageChange: 'pageChange',
      setActive: 'setActive'
    }
  }
  postMessage(type, json) {
    let message = {
        type: this.postMessageType[type],
        value: json
    }
    window.parent.postMessage(message, this.targetOrigin)
  }
  listenMessage() {
    window.addEventListener('message', (event) => {
      if (event.origin === this.targetOrigin) {
        switch (event.data.type) {
          case 'pageChange': //父页面传入的事件
            store.commit('changeComponent', event.data.value)
            break
          case 'setPreview':
            store.commit('setPreview', event.data.value)
            break
          case 'deletePreview':
            store.commit('deletePreview', event.data.value)
            break
          case 'setActive':
            store.commit('setActiveId', event.data.value)
            break
          default:
        }
      }
    }, false)
  }
}
export default new Postmessage()
