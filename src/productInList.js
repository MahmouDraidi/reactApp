import React from "react"
import {Link} from 'react-router-dom';
import config from "./config"

class prodInList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Available: this.props.isAvailable !== 'false',
            myStyle: {textDecoration: "line-through"}
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        var val = '';
        this.setState((prev) => {
            console.log(prev)

            if (!prev.Available) {
                document.getElementById('checkbox' + this.props.id).checked = true
                val = ""
                this.updateAvailability("true")

            }
            else  {
                document.getElementById('checkbox' + this.props.id).checked = false
                val = "line-through"
                this.updateAvailability("false")
            }

            return {
                Available: !prev.Available,
                myStyle: {textDecoration: val}

            }
        })


    }

    updateAvailability(val) {

        var data = {
            availability: val,
        }
        config.connectToServer('POST',JSON.stringify(data),'updateAvailability/'+this.props.id)
    }

    componentDidMount() {
        if (this.props.isAvailable === 'true') {
            document.getElementById('checkbox' + this.props.id).checked = true
            this.setState({myStyle: {textDecoration: "none"}})
        }

    }

    render() {

        return (

            <div className="prod-list-item">
                <Link to={"/details/" + this.props.id}>
                    <img className="img-in-list"
                        //console.log(this.props.id)

                         src={"http://" + config.IP + "/HWimages/" + this.props.photo}/>
                </Link>
                <p style={this.state.myStyle}>{this.props.name}</p>
                <input id={'checkbox' + this.props.id} type="checkbox" onChange={this.handleChange}/>
            </div>

        );
    }
}

export default prodInList;