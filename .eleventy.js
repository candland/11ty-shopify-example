const pluginRss = require('@11ty/eleventy-plugin-rss')

module.exports = function (eleventyConfig) {
  // Add a filter using the Config API
  /* eleventyConfig.addFilter( "myFilter", function() {}); */

  eleventyConfig.addNunjucksFilter('keys', function (value) {
    return Object.keys(value)
  })

  eleventyConfig.addNunjucksFilter('fmtPrice', function (price) {
    return parseFloat(price).toFixed(2)
  })

  eleventyConfig.addNunjucksFilter('dateDisplay', function (date) {
    return date.toISOString()
  })

  eleventyConfig.addNunjucksFilter('isPreorder', function (tags) {
    return tags.some(t => t === 'Preorder')
  })

  eleventyConfig.addNunjucksFilter('filterFrontpage', function (colls) {
    return colls.filter(coll => coll.handle !== 'frontpage')
  })

  eleventyConfig.addNunjucksFilter('prepend', function (value, pre) {
    return `${pre}${value}`
  })

  eleventyConfig.addNunjucksFilter('productImage', function (product) {
    return product && product.images.edges[0] && product.images.edges[0].node.originalSrc
  })

  eleventyConfig.addNunjucksFilter('collectionImage', function (collection) {
    return collection && collection.image && collection.image.originalSrc
  })

  eleventyConfig.addNunjucksFilter('firstValue', function (values) {
    return values.find((val) => {
      return val !== null && val !== '' && val !== undefined
    })
  })

  eleventyConfig.addNunjucksFilter('forFrontpage', function (products) {
    return products.filter(prod => prod.collections.edges.some(n => n.node.handle === 'frontpage'))
  })

  eleventyConfig.addNunjucksFilter('prodOptions', function (nodes) {
    return nodes.reduce((opts, node) => {
      node.node.selectedOptions.forEach((opt) => {
        if (opts[opt.name]) {
          opts[opt.name].add(opt.value)
        } else {
          opts[opt.name] = new Set([opt.value])
        }
      })
      return opts
    }, {})
  })

  eleventyConfig.addPlugin(pluginRss)

  eleventyConfig.addPassthroughCopy('src/favicon.ico')

  // eleventyConfig.addCollection('collections', collection => {
  //   return collection.getFilteredByGlob('_collections/*.md')
  // })

  return {
    dir: {
      input: 'src'
    },
    templateFormats: [
      'html',
      'md',
      'njk'
    ],
    passthroughFileCopy: true
  }
}
