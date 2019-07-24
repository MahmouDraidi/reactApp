import React from "react"
import './App.css';
import connectToServer from './config'
import config from "./config"

class AddForm extends React.Component {

    constructor() {
        super()
        this.state = {
            prodName: "",
            desc: "",
            photo: "",
            prodDate: "",
            expDate: "",
            photoData: "",
            isUploaded: false,
            isUploading: false,
        }
        this.handleBackClicked = this.handleBackClicked.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.uploadImage=this.uploadImage.bind(this)

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    selectedFileHandler = (event) => {
         var reader = new FileReader();
         var output = document.getElementById('output_image');
         reader.onload = function () {
             output.setAttribute("width", "50%");
             output.setAttribute("style", "margin:auto");
             output.src = reader.result;
         }
         reader.readAsDataURL(event.target.files[0]);

         this.setState({photoData: event.target.files[0]})
         var rand = Math.floor((Math.random() * 100000) + 1);
         var fname = rand + "." + event.target.files[0].type.split('/').pop();
         this.setState({photo: fname})
       /* this.setState({
            photo: event.target.files[0].name,
            photoData: event.target.files[0],

        });*/

    }



    handleButtonClicked = () => {

        const imgData = new FormData();

        imgData.append("photoData", this.state.photoData);
        imgData.append("photo", this.state.photo);
        this.uploadImage()
        var data = {
            prodName: this.state.prodName,
            desc: this.state.desc,
            photo: this.state.photo,
            prodDate: this.state.prodDate,
            expDate: this.state.expDate,
        }

         connectToServer.connectToServer('put', JSON.stringify(data), 'add_item/0')
        
    }
    handleBackClicked = () => {
        this.props.history.push('');
    }

    uploadImage() {
        const data = new FormData();
        console.log(this.state.photo)
        data.append("photoData", this.state.photoData);
        data.append("photo", this.state.photo);
        fetch("http://127.0.0.1:8081/upload", {
            method: 'post',
            body: data
        }).then(response => {

            return response.json();
        })
            .then(json => {
            }).catch((error) => {
//success = false;
            console.log(error);
            alert("error:" + error)
//func_fail.apply(obj,[error]);
        });
    }

    componentDidMount(){
        config.configEmmiter.on('ADD_RESULT', (args)=>{
            alert(args['Status'])
            this.setState({
                prodName: "",
                desc: "",
                photo: "",
                prodDate: "",
                expDate: "",
                photoData: ""
            })

        })

    }

    render() {
        return (
            <div className="Add-form-container">
                <div className="Add-form">
                    <img className="Add-form-img" id="output_image"/>
                    <div>
                        <input className="details-text-input"
                               name="photoData"
                               type="file" accept="image/*"
                               onChange={this.selectedFileHandler}/>
                        <input className="details-text-input"
                               name="prodName"
                               type="text"
                               onChange={this.handleChange}
                               placeholder="Name"
                               value={this.state.prodName}/>
                        <input className="details-text-input"
                               name="desc" value={this.state.desc}
                               type="text"
                               onChange={this.handleChange}
                               placeholder="Description"/>
                        <input className="details-text-input"
                               name="prodDate"
                               value={this.state.prodDate}
                               type="date"
                               onChange={this.handleChange}
                               placeholder="Prod. date"/>
                        <input className="details-text-input"
                               name="expDate"
                               value={this.state.expDate}
                               type="date"
                               onChange={this.handleChange}
                               placeholder="Exp date"/>
                        <div>
                            <button
                                className="details-buttons"
                                onClick={this.handleButtonClicked}
                                >Add Item
                            </button>
                        </div>
                        <div>
                            <button className="details-buttons"
                                    onClick={this.handleBackClicked}>
                                Back to main page
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }


}

export default AddForm