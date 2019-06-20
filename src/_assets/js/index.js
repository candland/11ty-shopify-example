import $ from 'jQuery'
import popper from 'popper.js'
import bootstrap from 'bootstrap'
import { Application } from 'stimulus'

import CartController from './controllers/cart_controller.js'
import ProductController from './controllers/product_controller.js'

window.$ = window.jQuery = $
window.bootstrap = bootstrap
window.popper = popper

const application = Application.start()
application.register('cart', CartController)
application.register('product', ProductController)

// console.log('INDEX.JS LOADED')
