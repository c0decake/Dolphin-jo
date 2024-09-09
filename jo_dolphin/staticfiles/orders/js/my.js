const ordersBlock = document.getElementById('orders')

fetch('/api/v1/orders/my')
    .then(response => response.json())
    .then(orders => {
        if (orders.length > 0) {
            console.log('COT')
            orders.forEach(order => {
                ordersBlock.append(renderOrder(order));
            })
        } else {
            let orderSection = document.createElement('section')
            orderSection.classList.add('no-order-block')
            orderSection.textContent = "У тебя нет добавленных заказов!"
            ordersBlock.append(orderSection);
        }

    })


function renderOrder(order) {
    let orderSection = document.createElement('section')
    orderSection.classList.add('order')

    let orderId = document.createElement('span')
    orderId.classList.add('order-id')
    orderId.textContent = order['id']

    let orderDatetimeBlock = document.createElement('div')
    orderDatetimeBlock.classList.add('order-datetime')

    let orderDate = document.createElement('span')
    orderDate.classList.add('o-date')
    orderDate.textContent = order['work_date']

    let orderTime = document.createElement('span')
    orderTime.classList.add('o-time')
    orderTime.textContent = order['time_in'] + ' - ' + order['time_out']

    orderDatetimeBlock.append(orderDate, orderTime)

    let orderGeneral = document.createElement('div')
    orderGeneral.classList.add('order-general')

    let orderLocation = document.createElement('section')
    orderLocation.classList.add('o-location')

    let orderAddress = document.createElement('span')
    orderAddress.textContent = order['address']

    let orderDistrict = document.createElement('span')
    orderDistrict.textContent = order['district'] + " р-н"

    let orderCity = document.createElement('span')
    orderCity.textContent = order['city']

    orderLocation.append(orderCity, orderAddress, orderDistrict)

    let orderOther = document.createElement('section')
    orderOther.classList.add('o-other')

    let orderAdditions = document.createElement('span')
    orderAdditions.classList.add('o-additions')
    if (order['taxi_to']) {
        orderAdditions.textContent += '🚕 '
    }
    if (order['taxi_from']) {
        orderAdditions.textContent += '🚖 '
    }
    if (order['food']) {
        orderAdditions.textContent += '🍲 '
    }
    if (order['drinks']) {
        orderAdditions.textContent += '🥤 '
    }
    if (order['toilet']) {
        orderAdditions.textContent += '🚾'
    }

    let orderPost = document.createElement('span')
    orderPost.classList.add('o-post')
    orderPost.textContent = order['post_name']

    orderOther.append(orderAdditions, orderPost)

    orderGeneral.append(orderLocation, orderOther)

    let orderButton = document.createElement('section')
    orderButton.classList.add('order-button')

    let orderTakeButton = document.createElement('button')
    orderTakeButton.classList.add('take-btn')
    orderTakeButton.textContent = order['price'] + 'р'

    orderButton.append(orderTakeButton)

    orderSection.append(orderId, orderDatetimeBlock, orderGeneral, orderButton)

    return orderSection
}