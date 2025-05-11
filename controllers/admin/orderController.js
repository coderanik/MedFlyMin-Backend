import Order from "../../models/Orders.js"

export const trackOrder = async(req,res)=>{
    const {orderId} = req.params

    try {
        const order = await Order.findOne({orderId});
        if(!order){
            return res.status(404).json({error:'Order not found'})
        }

        res.status(200).json({
            status:order.status,
            trackingNumber:order.trackingNumber,
            estimatedDeleiveryDate:order.estimatedDeliveryDate
        });
    } catch (error) {
        console.error('Error tracking order:', error.message);
        res.status(500).json({error:'Internal server error'})
    }
        
}