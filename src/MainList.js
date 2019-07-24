import React from "react"
import ProdInList from "./productInList"
import './App.css';
import {Link} from "react-router-dom";

class MainList extends React.Component {

    constructor(d) {
        super();
        this.state = {
            productsFromDb: {}
        }
        this.d = d
        this.handleSignout=this.handleSignout.bind(this)
    }


    componentDidMount() {
        fetch('http://127.0.0.1:8081/get_item/0')
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                this.setState({productsFromDb: data});
                this.d = data;
                //console.log(data[0].name);
            })

    }

    createChildren() {
        var data = this.state.productsFromDb;
        let prods = Object.keys(data).map((item) => {

            return (<ProdInList key={data[item]['id']}
                                id={data[item]['id']}
                                name={data[item]['name']}
                                photo={data[item]['photo']}
                                isAvailable={data[item]['isAvailable']}
            />)
        })


        return prods
    }
    handleSignout(){
        this.props.history.push("")
        localStorage.removeItem("username")
    }

    render() {

        //
        // console.log(this.state.productsFromDb);

        return (

            <div className="List-container">
                <Link to={"/add"}>
                    <div className="Add-button"><i className="fas fa-plus"></i></div>
                </Link>
                {this.createChildren()}
                <div>
                    <div onClick={this.handleSignout} id="signoutButton" className="Add-button"><i className="fas fa-sign-in-alt"></i></div>
                </div>
            </div>

        )
    }
}

export default MainList;