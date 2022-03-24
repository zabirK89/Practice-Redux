// console.log("working")
const redux=require("redux")
const createStore=redux.createStore
const applyMiddleware=redux.applyMiddleware
const middlewarethunk=require("redux-thunk").default
const axios=require("axios")
//initilal state

const initialstate={
  Loading :true,
  data:[],
  error:""
}




//type
const fetch_data="fetch_data"
const error="error"
const fetch_success="fetch_success"



//Action

const fetchdata=()=>{
  return {
    type:"fetch_data"
  }
}

const fetchsucess=()=>{
  return {
    type:"fetch_success",
    payload:data
  }
}

const fetchfailed=(error)=>{
return{
  type:"error",
  payload:error
}
}


//reducer

const reducer=(state=initialstate,action)=>{
switch(action.type){
case fetch_data:
return {
  ...state,
  Loading:true
}
case fetch_success:
return {
  ...state,
  Loading:false,
  data:action.payload,
  error:""
}
case error:
return {
  ...state,
  data:[],
  error:action.payload
}
}
}


//store

const fetch=()=>{
  return function(dispatch){
    dispatch(fetchdata())
    axios.get("https://jsonplaceholder.typicode.com/users")
    .then((response)=>{
      const users=response.data.map(user=>console.log(user))
      dispatch(fetchsucess(users))
    }).catch((error)=>{
      // console.log(error)
      dispatch(error(error.message))
    })
  }
}



const store=createStore(reducer,applyMiddleware(middlewarethunk))
store.subscribe(()=>{
  console.log(store.getState())
})
store.dispatch(fetch())