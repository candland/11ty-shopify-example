import { Controller } from 'stimulus'
import Client from 'shopify-buy'
import cartSummaryTemplate from '../templates/cart_summary.js'
import cartDetailsTemplate from '../templates/cart_details.js'

export default class extends Controller {
  static targets = [ "summary", "details" ]

  initialize() {
    // console.log("Hello, Stimulus!", this.element)

    this.client = Client.buildClient({
      domain: process.env.SHOPIFY_DOMAIN,
      storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN
    })  

    if (this.checkoutId) {
      this.client.checkout.fetch(this.checkoutId).then((checkout) => {
        // console.log("existing checkout");
        this.setCheckoutId(checkout.id)
        this.render(checkout)
      });
    } else {
      this.client.checkout.create().then((checkout) => {
        // Do something with the checkout
        // console.log("new checkout");
        this.setCheckoutId(checkout.id)
        this.render(checkout)
      });
    }

    this.addToCart = this.addToCart.bind(this)
  }

  get checkoutId() {
    return window.localStorage.getItem('checkoutId');
  }

  setCheckoutId(id) {
    window.localStorage.setItem('checkoutId', id)
    return id
  }

  connect() {
    $(this.application).on("cart:add", this.addToCart)
  }

  disconnect() {
    $(this.application).off("cart:add", this.addToCart)
  }

  addToCart(e, props) {
    // console.log('adding to cart')

    const cattrs = JSON.parse(props.options).map((h) => { 
      return {key: h.name, value: h.value}; 
    })

    const lineItemsToAdd = [
      {
        variantId: props.id,
        quantity: 1,
        customAttributes: cattrs
      }
    ];

    this.client.checkout.addLineItems(this.checkoutId, lineItemsToAdd).then((checkout) => {
      this.render(checkout)
    });
  }

  decrement(e) {
    e.preventDefault()
    // console.log('dec')
    const lineItemsToUpdate = [{
      id: e.target.parentElement.getAttribute("data-id"), 
      quantity: parseInt(e.target.parentElement.getAttribute("data-quantity")) - 1
    }];

    // console.log(lineItemsToUpdate)
    this.client.checkout.updateLineItems(this.checkoutId, lineItemsToUpdate).then((checkout) => {
      this.render(checkout)
    });
  }

  increment(e) {
    e.preventDefault()
    // console.log('inc')
    const lineItemsToUpdate = [{
      id: e.target.parentElement.getAttribute("data-id"), 
      quantity: parseInt(e.target.parentElement.getAttribute("data-quantity")) + 1
    }];

    // console.log(lineItemsToUpdate)
    this.client.checkout.updateLineItems(this.checkoutId, lineItemsToUpdate).then((checkout) => {
      this.render(checkout)
    });
  }

  remove(e) {
    e.preventDefault()
    // console.log('rem')
    const lineItemIdsToRemove = [
      e.target.parentElement.getAttribute("data-id")
    ];

    // console.log(lineItemIdsToRemove)
    this.client.checkout.removeLineItems(this.checkoutId, lineItemIdsToRemove).then((checkout) => {
      this.render(checkout)
    });
  }

  render(checkout) {
    // console.log(checkout);
    this.checkout = checkout
    // console.log("ITEMS")
    // console.log(this.checkout.lineItems)
    this.summaryTarget.innerHTML = cartSummaryTemplate.render({
      items: this.checkout.lineItems.reduce((m, item) => { return m + item.quantity }, 0),
      subtotalPrice: this.checkout.subtotalPrice,
      webUrl: this.checkout.webUrl,
    })
    this.detailsTarget.innerHTML = cartDetailsTemplate.render({
      items: this.checkout.lineItems,
      subtotalPrice: this.checkout.subtotalPrice,
      currency: function(value) { return value.toFixed(2); }
    })
  }

}
