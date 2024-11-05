export enum Countries{
    UnitedStates = 0,
    Canada = 1,
    UnitedKingdom = 2,
    Australia = 3,
    Germany = 4,
    France = 5,
    Japan = 6,
    India = 7,
    China = 8,
    Brazil = 9,
}


  
export class Checkout {
    email:string="";
    fName:string="";
    lName:string="";
    country: Countries = Countries.UnitedStates; 
    streetNumberandName:string="";
    city:string="";
    state:string="";
    zipCode:number=0;
    phone:number=0;
    info:string="";

}
