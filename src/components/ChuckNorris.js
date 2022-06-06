import React from 'react';
import logo from '../chuck-norris-api.png';
import search from '../search.png';
import '../App.css';



export class ChuckNorris extends React.Component {

   
    state = {
        category: "", 
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

    }

    setCategory(value) {
        this.setState({
          category: value,
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

    getData(dataAPI) {
    //    let data = dataAPI;
        this.setState({
             data: dataAPI
        });

    }

    render() {
    
        return (
            <div className="card text-center m-3">
                <img src={logo}  width="500" height="300" />
               
                <div id="divBusca" >
                    <input type="text" id="txtBusca" placeholder="Buscar por categoria.."
                    onChange={(e) => this.getSearch(e.target.value)} />      
                      {this.state.category}  
                </div>

            </div>
        );
    }
}


