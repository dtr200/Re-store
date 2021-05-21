const updateCartItems = (cartItems, item, idx) => {
    if(idx === -1){
        return [
            ...cartItems,
            item
        ]
    }

    if(item.count === 0){
        return [
            ...cartItems.slice(0, idx), 
            ...cartItems.slice(idx + 1)
        ]
    }

    return [
        ...cartItems.slice(0, idx),
        item, 
        ...cartItems.slice(idx + 1)
    ]
}

const updateCartItem = (book, item = {}, quantity) => {
    const { id = book.id, 
            title = book.title, 
            count = 0, 
            total = 0 } = item; 

    return {
        id,
        title,
        count: count + quantity,
        total: total + book.price * quantity
    }
} 

const updateOrder = (state, bookId, quantity) => {
    const { bookList: { books } , shoppingCart: { cartItems } } = state;
    const itemIndex = cartItems.findIndex(item => item.id === bookId);    
    const item = cartItems[itemIndex];

    const book = books.find(book => book.id === bookId);            
    const newItem = updateCartItem(book, item, quantity);
    return {
        orderTotal: 0,
        cartItems: updateCartItems(cartItems, newItem, itemIndex)
      };
}

const updateShoppingCart = (state, action) => {
    if(state === undefined){
        return {
            cartItems: [],
            orderTotal: 0
        }
    }

    switch(action.type){
        case 'BOOK_ADDED_TO_CART':
            return updateOrder(state, action.payload, 1);
            
        case 'BOOK_REMOVED_FROM_CART':            
            return updateOrder(state, action.payload, -1);

        case 'ALL_BOOKS_REMOVED_FROM_CART':
            const item = state.shoppingCart.cartItems.find(item => item.id === action.payload);
            return updateOrder(state, action.payload, -item.count);
        default:
            return state.shoppingCart;
    }
}

export default updateShoppingCart;