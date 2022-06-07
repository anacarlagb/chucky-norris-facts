import React from 'react';
import logo from '../chuck-norris-api.png';
import search from '../search.png';
import '../App.css';




export class ChuckNorris extends React.Component {

   
    state = {
        category: "", 
        aleat: "",
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
       }
    }

    async getAleat() {
        // Simple GET request using fetch
       const response = await fetch("https://api.chucknorris.io/jokes/random");
       const data = await response.json();
       this.setAleat(data.value);
    }

    getData(dataAPI) {
    //    let data = dataAPI;
        this.setState({
             data: dataAPI
        });

       
      

    }

    callAleat() {
        this.getAleat();
    }
      // Usage
     

    render() {
    
        return (

            <div>
                <div className="card text-center m-3" >
                    <img src={logo}  width="500" height="300" />

                
                </div>

                <div id="divBusca" style={{ position: "fixed" }}>
                    <input type="text" id="txtBusca" placeholder="Buscar por categoria.."
                        onChange={(e) => this.getSearch(e.target.value)} />      
          
                    </div>
               <div style={{top: "91%", left: "20%", position: "fixed" }}>{this.state.category}</div> 

                <div className="flex" style={{ top: "75%", left: "73%", position: "fixed" }}>
                    <button class="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                        onClick={this.callAleat}>
                        Busca Aleatória
                    </button>
                </div>
                <div style={{ top: "91%", left: "20%", position: "fixed" }}>{this.state.aleat}</div> 

            </div>
        );
    }
}


