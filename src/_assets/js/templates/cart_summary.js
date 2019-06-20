const nunjucks = require('nunjucks')

const tmp = `
<i class="fa fa-fw fa-shopping-cart"></i>
{{ items }} Items
 - 
\${{ subtotalPrice }}
<a href="{{ webUrl }}" class="btn btn-xs btn-outline-secondary float-right">Checkout</button>
`

var cartSummaryTemplate = nunjucks.compile(tmp)

export default cartSummaryTemplate
