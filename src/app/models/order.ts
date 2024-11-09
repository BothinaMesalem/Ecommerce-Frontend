export class Order {
    orderId:number=0;
    totalamount:number=0;
    userId:number=0;
    order_date:Date=new Date;
    orderDetail:OrderDetail[]=[];
}
export class OrderDetail{
    orderDetailId:number=0;
    orderPrice:number=0;
    quantity:number=0;
    productId:number=0;
    size:string="";
    productName:string="";
    image:string="";

}
export class OrderSeller{
    orderId:number=0;
    totalamount:number=0;
    userId:number=0;
    order_date:Date=new Date;
    orderDetails:OrderDetail[]=[];
}
export class OrderQuantityDto {
    orderId: number = 0;
    orderDetailqty: OrderDeatailquantity[] = [];
}

export class OrderDeatailquantity {
    orderDetailId:number=0;
    quantity:number=0;
}
