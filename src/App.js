import './App.css';
import Login from './components/Login';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home';
import { useEffect } from 'react';
import {getUserAuth} from './Actions';
import { connect } from 'react-redux';


function App(props) {

useEffect(()=>{

  props.getUserAuth();
},[]);

  return (
    <div className="App">
   <Router>

<Switch>
<Route exact path="/">
  <Login></Login>
</Route>

<Route  path="/home">
<Header></Header>
<Home></Home>
</Route>

</Switch>

   </Router>
    </div>
  );
}


const mapSateToProps=(state)=>{
  return {};
};

const mapDispatchToProps=(dispatch)=>({
  getUserAuth: () => dispatch(getUserAuth())

});

export default connect(mapSateToProps,mapDispatchToProps)(App);