const EventEmitter = require('events')
///////////////////////////////////
// Events can be created using EventEmitter
// Events can be emitted using .emit() and listened to using .on()
const event = new EventEmitter()
event.on('stock', () => console.log('Stock received'))
event.on('stock', () => console.log('Customer name: Rakesh Venkat.'))
event.emit('stock')
event.on('stock', num => console.log(`${num} of stocks have been received`))
event.emit('stock', 100)
console.log('---------------------')

//////////////////////////////////
// Use a ES6 class to create an EventEmiiter
// This is how a File system event, Server event is being created
class Sales extends EventEmitter {
    constructor(){
        super()
    }
}
const salesEvent = new Sales()
salesEvent.on('createOrder', (order) => {
    console.log(`Order was created with order id ${order.orderId} by customer ${order.customerId}`)
})
salesEvent.on('updateOrder', order => {
    console.log(`The order ${order.orderId} is ${order.status}`)
})
salesEvent.on('closeOrder', order => {
    console.log(`The order ${order.orderId} is now closed`)
})
salesEvent.emit('createOrder', {orderId: 'O-554567', customerId: 'C-1234'})
salesEvent.emit('updateOrder', {orderId: 'O-554567', status: 'shipped'})
salesEvent.emit('updateOrder', {orderId: 'O-554567', status: 'delivered'})
salesEvent.emit('closeOrder', {orderId: 'O-554567'})

salesEvent.emit('createOrder', {orderId: 'O-155456', customerId: 'C-1234'})
salesEvent.emit('updateOrder', {orderId: 'O-155456', status: 'shipped'})
salesEvent.emit('updateOrder', {orderId: 'O-155456', status: 'not delivered'})
salesEvent.emit('closeOrder', {orderId: 'O-155456'})


class Case extends Sales {
    constructor(){
        super()
// WOW: if you register the events in the constructor, then all the instances can send events for that event
        this.on('updateCase', (c) => {console.log(`Case ${c.id} status updated to: ${c.status}`)})
        this.on('deleteCase', (c) => {console.log(`Case ${c.id} status deleted`)})
    }
    
}

const case1 = new Case();
// Because Case extends Sales, the following methods: .on() & .emit() could be used !!
case1.on('createCase', (caseIds) => {console.log(`Cases Created: ${caseIds}`)})
case1.emit('createCase', ['C-87878', 'C-43424', 'C-989878'])

// The event defined in parent is emitted here, but its lost. The Listener didn't capture this event
// Qtn: how do you solve this? Child objects CANNOt emit events defined in parent??
case1.emit('createOrder', {orderId: 'O-99999', customerId: 'C-9999'})
// The following is still possible
salesEvent.emit('createOrder', {orderId: 'O-554567', customerId: 'C-1234'})
// OOOH !! events are registered on an instance of a class. Not on their Class prototype!!
const case2 = new Case();
case2.emit('createCase', ['C-5677', 'C-8888'])

case2.emit('updateCase', {id: 'C-5677', status: 'assigned'})
case1.emit('updateCase', {id: 'C-87878', status: 'resolved'})
case1.emit('deleteCase', {id: 'C-87878'})
case2.emit('deleteCase', {id: 'C-5677'})

// You need to use the EventEmitter class in order to use the .on() & .emit() functions !!
class Hello {
    constructor(){
    }
}

const helloHanlder1 = new Hello()
//helloHanlder1.on('sayHello', (msg) => {console.log(`You just recieved a msg: ${msg}`)})
// TypeError: helloHanlder1.on is not a function
//helloHanlder1.emit('sayHello', 'You have 3 new messages!!')
// TypeError: helloHanlder1.emit is not a function