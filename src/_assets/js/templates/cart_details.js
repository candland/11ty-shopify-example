const nunjucks = require('nunjucks')

const tmp = `
<table class="table table-sm table-borderless">
  {% for item in items %}
  <tr class="cart-item">
    <th>
    {{ item.title }}{% if item.variant.title != "Default Title" %}: {{ item.variant.title }}{% endif %}
    </th>
    <td class="text-right">\${{ item.variant.price }}</td>
    <td class="text-right">
      x {{ item.quantity }}
      <a href="#" data-action="cart#increment" data-id="{{ item.id }}" data-quantity="{{ item.quantity }}"><i class="fa fa-caret-up"></i></a>
      <a href="#" data-action="cart#decrement" data-id="{{ item.id }}" data-quantity="{{ item.quantity }}"><i class="fa fa-caret-down"></i></a>
    </td>
    <td class="text-right">\${{ currency(item.variant.price * item.quantity) }}</td>
    <td class="text-right"><a href="#" data-action="cart#remove" data-id="{{ item.id }}"><i class="fa fa-trash"></i></a></td> 
  </tr>
  {% endfor %}
  <tr class="cart-total">
    <th colspan="3" class="text-right">Subtotal:</th>
    <td class="text-right">\${{ subtotalPrice }}</td>
    <td class="text-right">&nbsp;</td> 
  </tr>
</table>
`

var cartDetailsTemplate = nunjucks.compile(tmp)

export default cartDetailsTemplate
