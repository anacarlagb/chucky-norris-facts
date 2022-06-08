import React from 'react';
import logo from '../chuck-norris-api.png';
import search from '../search.png';
import '../App.css';
import { format, parseISO } from "date-fns";




export class ChuckNorris extends React.Component {

   
    state = {
        category: "", 
        aleat: "",
        date: null,
        data: {
            created_at: "",
            categories: [],
            icon_url: "",
            id: "",
            updated_at: "",
            url: "",
            value: "",
           } 
           
    }

    constructor(props) {
        super(props);

        this.getData = this.getData.bind(this);
        this.setCategory = this.setCategory.bind(this);
        this.setAleat = this.setAleat.bind(this);
        this.callAleat = this.callAleat.bind(this);
        this.getDate = this.getDate.bind(this);

    }

    setCategory(value) {
        this.setState({
          category: value,
        });
      }

    setAleat(value) {
        this.setState({
            aleat: value,
        });
    }

    getDate(value){
       
        let dateTemp = new Date(value);
        this.state.date = dateTemp.toLocaleDateString();
    }

    async getSearch(value) {
        // Simple GET request using fetch
       const searchValue  = value; 
       const response = await fetch("https://api.chucknorris.io/jokes/random?category="+searchValue);
       const data = await response.json();
       
       if(data.status === 404){
          this.setCategory("Resultado não encontrado");
       }
       else{
          this.setCategory(data.value);
          this.getData(data);
       }
    }

    async getAleat() {
        // Simple GET request using fetch
       const response = await fetch("https://api.chucknorris.io/jokes/random");
       const data = await response.json();
       this.setCategory(data.value);
       this.getData(data);
    }

    getData(dataAPI) {
    
        this.setState({
             data: dataAPI
        });

        this.getDate(dataAPI.created_at);
    }

    callAleat() {
        this.getAleat();
    }
 
    render() {
    
        return (

            <div >

                <div className="card text-center m-3" style={{top: "30%", left: "60%", position: "fixed" }}>
                    <img src={logo}  width="500" height="300" />
                </div>

                <div id="divBusca" style={{top: "20%", left: "10%", position: "fixed" }}>
                    <input type="text" id="txtBusca" placeholder="Buscar por categoria.."
                        onChange={(e) => this.getSearch(e.target.value)} />      
          
                    </div>
                <div className="flex" style={{ top: "20%", left: "50%", position: "fixed" }}>
                    <button class="px-8 py-2 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
                        onClick={this.callAleat}>
                        Busca Aleatória
                    </button>
                </div>
              
                <div className=" max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800" style={{top: "30%", left: "10%", position: "fixed" }}>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-light text-gray-600 dark:text-gray-400"><b>{this.state.date}</b></span>
                        <a class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">Categoria</a>
                        </div>

                        <div className="mt-2">
                        <a href="#" class="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">Accessibility tools for designers and developers</a>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">{this.state.category}</p>
                        </div>
                    </div>
                </div>
        );
    }
}


