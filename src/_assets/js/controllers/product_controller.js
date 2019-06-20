import { Controller } from 'stimulus'
import Client from 'shopify-buy'

export default class extends Controller {
  static targets = [ "productId", "variantPrice", "cartButton" ]

  initialize() {
    // console.log("products!")

    this.client = Client.buildClient({
      domain: process.env.SHOPIFY_DOMAIN,
      storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN
    })  

    this.client.product.fetch(this.productId).then(product => this.product = product)

    this.options = {}
  }

  add(event) {
    event.preventDefault()
    // console.log("Adding")
    const data = {
      id: event.target.getAttribute('data-id'),
      options: event.target.getAttribute('data-options')
    }
    // console.log(data)

    const label = this.cartButtonTarget.innerHTML;
    this.cartButtonTarget.innerHTML = "Added!"

    window.setTimeout(() => {
      this.cartButtonTarget.innerHTML = label
    }, 2500)

    $(this.application).trigger("cart:add", data)
  }

  notify(event) {
    event.preventDefault()
    window.location = window.location + "#notify"
  }

  updateOptions(event) {
    event.preventDefault()
    const el = event.target
    const name = el.getAttribute('data-name')
    const value = el.getAttribute('data-value')
    this.options = Object.assign(this.options, {[name]: value})
    // console.log(this.options)

    this.getAllSiblings(el, (elem) => { return elem.nodeName.toUpperCase() == 'BUTTON'}).map((elem) => {
      elem.classList.remove('btn-secondary')
      elem.classList.add('btn-outline-secondary')
    })

    el.classList.remove('btn-outline-secondary');
    el.classList.add('btn-secondary');

    el.parentNode.getElementsByClassName('opt-value')[0].innerHTML = value

    const selectedVariant = this.client.product.helpers.variantForOptions(this.product, this.options);
    // console.log(selectedVariant)

    if (selectedVariant) {
      if (selectedVariant.available) {
        const variableId = selectedVariant.id
        const selectedOptions = selectedVariant.selectedOptions

        this.cartButtonTarget.setAttribute('data-id', variableId)
        this.cartButtonTarget.setAttribute('data-options', JSON.stringify(selectedOptions))
        this.cartButtonTarget.setAttribute('disabled', false) // HACK FOR IE EDGE
        this.cartButtonTarget.removeAttribute('disabled')
        // console.log(this.variantPriceTarget)
        this.variantPriceTarget.innerHTML = selectedVariant.price
      } else {
        this.cartButtonTarget.setAttribute('disabled', true)
      }
    } else {
      this.cartButtonTarget.setAttribute('disabled', true)
    }

  }

  getAllSiblings(elem, filter) {
    var sibs = [];
    elem = elem.parentNode.firstChild;
    do {
      if (elem.nodeType === 3) continue; // text node
      if (!filter || filter(elem)) sibs.push(elem);
    } while (elem = elem.nextSibling)
    return sibs;
  }


  get productId() {
    return this.productIdTarget.value
  }
}

