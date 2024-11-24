const authReducer =(state ={data:null},action)=>{


switch(action.type)
{
    case "USER_LOGIN_REQUEST":
        return {loading:true};

    case "AUTH":
        localStorage.setItem('Profile',JSON.stringify({...action?.payload}))
        return {user:true,data:action.payload};
    case "USER_LOGIN_FAIL":
        return {error:true,data:action.payload};
        case "LOG_OUT":
            return {user:false}

default:
    return state;

}




}
export default authReducer;