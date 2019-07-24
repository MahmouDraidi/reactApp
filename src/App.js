import React from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import MainList from "./MainList";
import ProdDetails from "./productDetails";
import AddNewItem from "./AddForm"
import Login from "./Login";

function App() {

    return (

        <Router>
            <div className="App">

                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route path="/home" component={MainList}/>
                    <Route path="/details/:id" component={ProdDetails}/>
                    <Route path="/add/" component={AddNewItem}/>

                </Switch>
            </div>
        </Router>

    );
}

export default App;
