const fetch = require('node-fetch')

const collectionsQuery = `
{
  collections(first: 20) {
    edges {
      node {
        id
        handle
        title
        descriptionHtml
        image() {      
          id
          altText
          originalSrc
        }
        products(first: 100) {
          edges {
            node {
              id
              title
              handle
              availableForSale
              descriptionHtml
              productType
              tags
              priceRange {
                minVariantPrice {
                  amount
                }
                maxVariantPrice {
                  amount
                }
              }
              images(first: 1) {
                edges {
                  node {
                    altText
                    originalSrc
                    transformedSrc(maxWidth: 300, maxHeight:300, crop: CENTER, scale: 1)
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`

module.exports = function () {
  console.log('GETTING COLLECTIONS')
  return fetch(`https://${process.env.SHOPIFY_DOMAIN}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN
    },
    body: JSON.stringify({ query: collectionsQuery })
  })
    .then(r => r.json())
    .then(data => data.data.collections.edges)
    .then(data => data.map((node) => node.node))
}
