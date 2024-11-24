const customerReducer =(state={data:null},action)=>{


   switch(action.type){

case 'CUSTOMER_DETAILS':
 return {...state}

 case 'GET_DETAILS':
    return {...state,data:action.payload}

 default:
    return state;

}



}
export default customerReducer;