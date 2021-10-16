import { App } from './App'

/**
 * 初期化
 */
const init = () => {
  new App({
    element: document.getElementById('app')
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}