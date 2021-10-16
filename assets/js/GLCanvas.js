import * as THREE from 'three'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

/**
 * WebGLレンダラー作成
 * @param {number} width 
 * @param {number} height 
 * @param {number} dpr 
 * @returns {THREE.WebGLRenderer}
 */
const createRenderer = (width, height, dpr) => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  })
  renderer.setPixelRatio(Math.min(dpr, 2))
  renderer.setSize(width, height)
  renderer.setClearColor(0x000000, 0.0)
  renderer.outputEncoding = THREE.sRGBEncoding
  return renderer
}

/**
 * WebGL Canvas
 */
class GLCanvas {
  /**
   * 
   * @param {Object} param 
   * @param {HTMLElement} param.container 
   */
  constructor({ container }) {
    this._container = container
    this._init()
  }

  /**
   * 初期化
   */
  _init() {
    this._width = this._container.clientWidth
    this._height = this._container.clientHeight
    this._renderer = createRenderer(this._width, this._height, window.devicePixelRatio)
    this._canvas = this._renderer.domElement
    this._container.appendChild(this._canvas)
    this._camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 10)
    this._scene = new THREE.Scene()
    this._time = 0
    this._addObjects()
  }

  /**
   * シーンにオブジェクトを追加
   */
  _addObjects() {
    this._material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: '#extension GL_OES_standard_derivatives : enable'
      },
      uniforms: {
        time: { value: this.time },
        mouse: { value: new THREE.Vector2(0, 0) },
        resolution: { value: new THREE.Vector2(this._width, this._height) },
      },
      transparent: true,
      vertexShader,
      fragmentShader,
    })
    this._geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1,)
    this._plane = new THREE.Mesh(this._geometry, this._material)
    this._scene.add(this._plane)
  }

  /**
   * レンダリング
   * @param {DOMHighResTimeStamp} time 
   */
  render(time) {
    this._time = time
    this._material.uniforms.time.value = this._time
    this._renderer.render(this._scene, this._camera)
  }

  /**
   * マウス位置更新
   * @param {number} x 
   * @param {number} y 
   */
  setMouse(x, y) {
    this._material.uniforms.mouse.value.set(x, y)
  }

  /**
   * リサイズ
   * @param {number} width 
   * @param {number} height 
   * @param {number} dpr 
   */
  resize(width, height, dpr) {
    this._width = width
    this._height = height
    this._material.uniforms.resolution.value.set(this._width, this._height)
    this._renderer.setPixelRatio(Math.min(dpr, 2))
    this._renderer.setSize(this._width, this._height)
    this._camera.aspect = this._width / this._height
    this._camera.updateProjectionMatrix()
  }
}

export {
  GLCanvas,
}