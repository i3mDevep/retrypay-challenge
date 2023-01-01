import type { InitStateInterface } from "./state"

const cloneDeep = (x: object) => JSON.parse(JSON.stringify(x))
const freeze = (state: object) => Object.freeze(cloneDeep(state))

export const observableFactory =  (initialState: InitStateInterface & Record<string, any>) => {
  let listeners: Function[] = []

  const proxy = new Proxy<typeof initialState>(cloneDeep(initialState), {
    set: (target, name, value) => {
      target[name as string] = value
      listeners.forEach((l: Function) => l(freeze(proxy)))
      return true
    }
  })

  proxy.addChangeListener = (cb: Function) => {
    listeners.push(cb)
    cb(freeze(proxy))
    return () =>
      listeners = listeners.filter((el: Function) => el !== cb)
  }

  return proxy
}

