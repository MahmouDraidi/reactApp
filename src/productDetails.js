import React from "react"
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import config from "./config"

class Product extends React.Component {

    constructor({match}) {
        super()
        this.state = {
            newName: "",
            newDesc: "",
            newProdDate: "",
            newExpDate: "",
            photo: "",
            id: match.params.id,
            isInputDisabled: true,
            firstButtonTxt: "Edit",
            secondButtonTxt: "Delete",

        }
        this.doEdit = this.doEdit.bind(this);
        this.doDelete = this.doDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onDeleteResultEvent = this.onDeleteResultEvent.bind(this);
        this.onEditResultEvent = this.onEditResultEvent.bind(this);

    }

    getProduct(id) {
        fetch('http://127.0.0.1:8081/get_item/' + this.state.id)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                this.setState({prodInfo: data[0]})
                this.setState({
                    newProdDate: data[0].prodDate.split('T')[0],
                    newExpDate: data[0].expDate.split('T')[0],
                    newName: data[0].name,
                    newDesc: data[0].description,
                    photo: data[0].photo,

                })


            })
    }

    doEdit() {
        console.log(this.state.firstButtonTxt)
        if (this.state.firstButtonTxt === "Edit") {
            this.setState({
                isInputDisabled: false,
                firstButtonTxt: "Confirm edit",
                secondButtonTxt: "Cancel",
            })
        }
        else if (this.state.firstButtonTxt === "Confirm edit") {
            var data = {

                newName: this.state.newName,
                newDesc: this.state.newDesc,
                newPhoto: this.state.prodInfo.photo,
                newProdDate: this.state.newProdDate,
                newExpDate: this.state.newExpDate,
            };

            config.connectToServer("post", JSON.stringify(data), 'post_item/' + this.state.prodInfo.id)
            /* return fetch('http://127.0.0.1:8081/, {

                 method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
                 body: JSON.stringify(data),
                 // Coordinate the body type with 'Content-Type'
                 headers: new Headers({'Content-Type': 'application/json',}),
             }).then(response => response.json())
                 .then(json => {
                     console.log("json", json);
                     alert(json['Status']);
                     this.setState({
                         isInputDisabled: true,
                         firstButtonTxt: "Edit",
                         secondButtonTxt: "Delete",
                     })

                 })
                 .catch(error => console.log(error))*/
        }

    }

    doDelete() {
        if (this.state.secondButtonTxt === "Cancel") {
            this.setState({
                isInputDisabled: true,
                firstButtonTxt: "Edit",
                secondButtonTxt: "Delete",
            })
        }
        else if (this.state.secondButtonTxt === "Delete") {
            this.deleteItem(this.state.id)
        }

    }

    onDeleteResultEvent(args) {

        confirmAlert({
            title: 'Deletion status',
            message: 'Product is deleted successfullly',
            buttons: [
                {
                    label: 'Ok',
                    onClick: () => {

                        this.props.history.push('')

                    }
                }
            ]
        });
    }

    onEditResultEvent(args) {
        confirmAlert({
            title: 'Edition status',
            message: 'Product is updated successfully',
            buttons: [
                {
                    label: 'Ok',
                    onClick: () => {

                    }
                }
            ]
        });
        this.setState({
            isInputDisabled: true,
            firstButtonTxt: "Edit",
            secondButtonTxt: "Delete",
        })
    }

    componentWillMount() {
        config.configEmmiter.on('DELETE_RESULT', this.onDeleteResultEvent)
        config.configEmmiter.on('EDIT_RESULT', this.onEditResultEvent)

    }

    componentWillUnmount() {
        config.configEmmiter.removeListener('DELETE_RESULT', this.onDeleteResultEvent);
        config.configEmmiter.removeListener('EDIT_RESULT', this.onEditResultEvent);

    }

    deleteItem = (id) => {
        confirmAlert({
            title: 'Confirm deletion',
            message: 'Are you sure you want to delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        config.connectToServer('delete', "", 'del_item/' + id);

                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                    }
                }
            ]
        });
    };

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    componentDidMount() {
        this.getProduct(this.state.id)
    }

    render() {
        const enabledInputStye = {
            textColor: "black",
            background: "",
            fontsize: "40px",
        }
        return (
            <div className="Details-div">

                <div>
                    <img className="details-img" src={"http://" + config.IP + "/HWimages/" + this.state.photo}/>
                </div>
                <div>
                    <div>
                        <p>Name</p>
                        <input onChange={this.handleChange} name="newName" className="details-text-input"
                               type="text" disabled={this.state.isInputDisabled}
                               value={this.state.newName}/>
                    </div>
                    <div>
                        <p>Description</p>
                        <input onChange={this.handleChange} name="newDesc" className="details-text-input"
                               type="text" disabled={this.state.isInputDisabled}
                               value={this.state.newDesc}/>
                    </div>
                    <div>
                        <p>Production date</p>
                        <input onChange={this.handleChange} name="newProdDate" className="details-text-input"
                               type="date" disabled={this.state.isInputDisabled}
                               value={this.state.newProdDate}/>
                    </div>
                    <div>
                        <p>Exp. date</p>
                        <input onChange={this.handleChange} name="newExpDate" className="details-text-input"
                               type="date" disabled={this.state.isInputDisabled}
                               value={this.state.newExpDate}/>
                    </div>
                    <div>
                        <button className="details-buttons" onClick={this.doEdit}>{this.state.firstButtonTxt}</button>
                    </div>
                    <div>
                        <button className="details-buttons"
                                onClick={this.doDelete}>{this.state.secondButtonTxt}</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Product;