# 11ty Shopify Example

This is a sample repo for some blog posts I'm writing about using
[Shopify] has a headless e-commerce solution built using [11ty].

It's built using the Shopify APIs, 11ty site generator, [ParcelJS]
to package front end assets, and [StimulusJS] for the frontend JS.

__WIP__

## Setup

Shopify account with an Storefront Access Token for the pubilc API.

Set the Access Token in a `SHOPIFY_ACCESS_TOKEN` environment variable.

Set your Shopify Domain in `SHOPIFY_DOMAIN`.

Might need to hard code these in the client side JS.

Search `11ty-shopify` and replace with your down domain. Doesn't matter for
running locally.


## Development

Run `npm install` to install everything.

Run `npm run start` to run locally.


## Build

Run `npm run build` to make a production build. Outputs to the `build`
directory.


## Blog Posts

* [Eleventy Collections - Pulling in the products via API](https://cloudsh.com/eleventy/eleventy_collections_pulling_in_the_products_via_api.html)
* [Eleventy & ParcelJS Working Together](https://cloudsh.com/eleventy/eleventy_and_parceljs_working_together.html)
* [Headless Shopify Storefront](https://cloudsh.com/eleventy/headless_shopify_storefront.html)


[Shopify]: https://shopify.com
[11ty]: https://11ty.io
[ParcelJS]: https://parceljs.org
[StimulusJS]: https://stimulusjs.org
