export class OrderDetails{
    orderPrice:number=0;
    quantity:number=0;
    productId:number=0;
    size:string="";
}
export class AddOrder {
    totalamount:number=0;
    userId:number=0;
    order_date:Date=new Date;
    orderDetails:OrderDetails[]=[];
}
