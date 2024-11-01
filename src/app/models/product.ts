export class Product {
    productId:number=0;
    productName:string="";
    productDescription:string="";
    price:number=0;
    stack_qty:number=0;
    image:string="";
    size:string="";
}

export class EditProduct{
    productName:string="";
    productDescription:string="";
    price:number=0;
    stack_qty:number=0;
    image:File |null=null;
    size: string[] = [];
}

export class AllProductWithSeller{
    productId:number=0;
    productName:string="";
    productDescription:string="";
    price:number=0;
    stack_qty:number=0;
    image:string ="";
    size:string[]=[];
    userName:string="";
}