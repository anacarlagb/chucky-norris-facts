import React from 'react';
import logo from '../chuck-norris-api.png';
import search from '../search.png';
import '../App.css';
import { format, parseISO } from "date-fns";
var { graphql, buildSchema } = require('graphql');


// https://stackoverflow.com/questions/65789785/how-do-i-change-language-in-react-i18next

async function loadGreeting() {
    const response =  await fetch('http://localhost:9000/graphql', {
       method:'POST',
       headers:{'content-type':'application/json'},
       body:JSON.stringify({query:'{greeting}'})
    })
    const rsponseBody =  await response.json();
    return rsponseBody.data.greeting;
    console.log("end of function")
 }
 
 async function  loadSayhello(name) {
    const response =  await fetch('http://localhost:9000/graphql', {
       method:'POST',
       headers:{'content-type':'application/json'},
       body:JSON.stringify({query:`{sayHello(name:"${name}")}`})
    })
    const rsponseBody =  await response.json();
    return rsponseBody.data.sayHello;
 }

 
export class ChuckNorris extends React.Component {

   
    state = {
        value: "", 
        aleat: "",
        date: null,
        category: "Categoria",
        greetingMessage:'',
        sayHelloMessage:'',
        userName:'',
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
        this.setValue = this.setValue.bind(this);
        this.setAleat = this.setAleat.bind(this);
        this.callAleat = this.callAleat.bind(this);
        this.getDate = this.getDate.bind(this);
        this.updateName =  this.updateName.bind(this);
        this.showSayHelloMessage =  this.showSayHelloMessage.bind(this);
        this.showGreeting =  this.showGreeting.bind(this);

    }

    setValue(valueAPI) {
        this.setState({
          value: valueAPI,
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

    showGreeting() {
        loadGreeting().then(g => this.setState({greetingMessage:g+" :-)"}))
     }
     
     showSayHelloMessage() {
        const name = this.state.userName;
        console.log(name)
        loadSayhello(name).then(m => this.setState({sayHelloMessage:m}))
     }
     
     updateName(event) {
        this.setState({userName:event.target.value})
     }

    async getSearch(value) {
        // Simple GET request using fetch
       const searchValue  = value; 
       const response = await fetch("https://api.chucknorris.io/jokes/random?category="+searchValue);
       const data = await response.json();
       
       if(data.status === 404){
          this.setValue("Resultado não encontrado");
       }
       else{
          this.getData(data);
       }
    }

    async getAleat() {
        // Simple GET request using fetch
       const response = await fetch("https://api.chucknorris.io/jokes/random");
       const data = await response.json();
       this.getData(data);
    }

    getData(dataAPI) {
    
        this.setState({
             data: dataAPI
        });

        this.getDate(dataAPI.created_at);
        this.setValue(dataAPI.value);

        if(dataAPI.categories[0] != ''){
            this.state.category = dataAPI.categories[0];
        }


    }

    callAleat() {
        this.getAleat();
    }
 
    render() {
    
        return (

            <div >
                <div style={{top: "5%", left: "32%", position: "fixed" }}>
                    Seja Bem Vind@ ao Imortal Mundo de Chuck Norris</div>
                <div className="card text-center m-3" style={{top: "15%", left: "65%", position: "fixed" }}>
                    <img src={logo}  width="400" height="300" />
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
                        <span className="text-sm font-light text-gray-600 dark:text-gray-400"><b>Data de criação: {this.state.date}</b></span>
                        <a class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">{this.state.category}</a>
                        </div>

                        <div className="mt-2">
                        <a href="#" class="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">Chuck Norris API</a>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">{this.state.value}</p>
                        </div>
                     </div>

                   <div style={{top: "60%", left: "65%", position: "fixed" }}>
                       
                        <section>
                            <button id = "btnGreet" onClick = {this.showGreeting}></button>
                            <br/> <br/>
                            <div id = "greetingDiv">
                            <h1>{this.state.greetingMessage}</h1>
                            </div>
                        </section>
                    </div>
                    <div style={{top: "70%", left: "65%", position: "fixed" }}>
                       Saudações mero mortal
                        <section>
                            <input id = "divName" type = "text"  onChange = {this.updateName}
                            value = {this.state.userName}/>
                            <button id = "btnSayhello" className="px-8 py-2 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
                            onClick = {this.showSayHelloMessage}> Teste </button>
                            <br/>
                            Seu nome é: {this.state.userName}    <br/>
                            <div id = "SayhelloDiv">
                                <h1>{this.state.sayHelloMessage}</h1>
                            </div>
                        </section>
                    </div>
                </div>

                
        );
    }
}


