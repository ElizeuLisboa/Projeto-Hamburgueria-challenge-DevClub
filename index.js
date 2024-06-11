import express from "express"

import { v4 as uuid } from 'uuid';

const port = 3000
const app = express()
app.use(express.json())


const orderService = []

const userReqId = (req, res, next) => {
    const { id } = req.params
   
    const index = orderService.findIndex( pedido => pedido.id === id) 
    
    if(index <0)
        return res.status(404).json({error: "🍞  Order not found"})
    
    req.orderIndex = index
    req.orderId = id
    console.log(orderService)
    next()
}

const typeMiddleware = ( req, res, next) => {
    let myUrl = req.url 
    let metodo = ''
    
    if ( req.method === "GET" ) {
        metodo = req.method
        
    } else if ( req.method === "POST" ) {
        metodo = req.method
        console.log(metodo)
    } else if ( req.method === "PUT"  ) {
        console.log(metodo)
        metodo = req.method
    } else if ( req.method === "PATCH" ) {
        metodo = req.method
        console.log(metodo)
    } else if ( req.method === "DELETE" ) {
        metodo = req.method
        console.log(metodo)
    } else  {
        metodo = req.url  
    }

    console.log( "🚀 Url: " + myUrl + " " + metodo )

    next()
}

app.get('/users', typeMiddleware, (req, res) => {
  
    const { id, order , clientName, price, status } = req.body    

    return res.json({orderService})
})

app.post('/users', typeMiddleware, (req, res) => {
    
    const { order, clientName, price, status } = req.body    
    
    const orders = { id:uuid(), order, clientName, price, status }
    
    orderService.push(orders)

    return res.json({orderService})
})

app.put('/users/:id', typeMiddleware, userReqId, (req, res) => {
    const { order, clientName, price, status } = req.body    
    const index = req.orderIndex
    const id = req.orderId 
    
    const updateOrder = { id, order, clientName, price, status }
    
    orderService[index] = updateOrder

    return res.json({updateOrder})
})

app.patch('/users/:id', typeMiddleware,userReqId, (req, res) => {

    const { id, order, clientName, price, status } = req.body    

    const index = req.orderIndex
   
    const updateOrder = { order, clientName, price, status }
    
    orderService[index] = updateOrder

    return res.json({updateOrder})
})

app.delete('/users/:id', typeMiddleware,userReqId, (req, res) => {

    const index = req.orderIndex
    orderService.splice(index,1)

    return res.status(204).json()
})


app.listen(port, () =>{
    console.log("⏰  Server running on port " + port)
})