document.addEventListener('DOMContentLoaded',()=>{
    const products = [
        {id : 1 , name : 'Product 1', price: 29.99},
        {id : 2 , name : 'Product 2', price: 39.99},
        {id : 3 , name : 'Product 3', price: 49.99}
        
    ]
    
    const cart = []
    
    const prodcutlist = document.getElementById('product-list')
    const cartitems = document.getElementById('cart-items')
    const emptycartmessage = document.getElementById('empty-cart')
    const carttotalmessage = document.getElementById('cart-total')
    const cartprice = document.getElementById('total-price')
    const checkout = document.getElementById('checkout-btn')

    products.forEach(product =>{
        const productdiv = document.createElement('div')
        productdiv.classList.add('product')
        productdiv.innerHTML = `
            <span>${product.name} - ${product.price.toFixed(2)}</span>
            <button data-id="${product.id}">Add to Cart </button>
        `
        prodcutlist.appendChild(productdiv)
    })

    prodcutlist.addEventListener('click',(e)=>{
        if(e.target.tagName === 'BUTTON'){
            const productID = parseInt(e.target.getAttribute('data-id'))   
            const purchasedproduct = products.find(p => p.id === productID)
            addtoCart(purchasedproduct)
        }
    })

    function addtoCart(purchasedproduct){
        cart.push(purchasedproduct)
        rendercart()
    }

    function rendercart(){
        let totalprice = 0
        const oldItems = cartitems.querySelectorAll('.cart-item')
        oldItems.forEach(item => item.remove())
        emptycartmessage.classList.add('hidden')
        carttotalmessage.classList.remove('hidden')
        cart.forEach((itemm, index) => {
                totalprice +=itemm.price
                const purchaseddiv = document.createElement('div')
                purchaseddiv.classList.add('cart-item')
                purchaseddiv.innerHTML = `
                    ${itemm.name} - $ ${itemm.price.toFixed(2)}
                `
                cartitems.appendChild(purchaseddiv)
                cartprice.textContent = `$ ${totalprice.toFixed(2)}`
            })
        }
    

    checkout.addEventListener('click', () =>{
        alert('Successfully purchased the items')
        derendercart()

    })

    function derendercart(){
        cart.length = 0 
        const oldItems = cartitems.querySelectorAll('.cart-item')
        oldItems.forEach(item => item.remove())
        emptycartmessage.classList.remove('hidden')
        carttotalmessage.classList.add('hidden')
    }


})