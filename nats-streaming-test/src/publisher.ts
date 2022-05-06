import nats from 'node-nats-streaming'

const stan =  nats.connect('ticketin','abc',{
    url:"http://localhost:4222"
}) //client for the nats

stan.on("connect",()=>{
    console.log("Publisher connected to NATS")

    const data = JSON.stringify({
        id:"123",
        title:"concert",
        price:43
    })
    
    stan.publish("ticket:created",data,()=>{
        console.log('event published');
        
    })
})

