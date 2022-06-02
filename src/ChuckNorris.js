import React from 'react';
import logo from './chuck-norris-api.png';

export class ChuckNorris extends React.Component {

    state = {
        data: {
            categories: [],
            created_at: "",
            icon_url: "",
            id: "",
            updated_at: "",
            url: "",
            value: ""
          },
    }


    constructor(props) {
        super(props);

        this.getData = this.getData.bind(this);

    }

    async componentDidMount() {
        // Simple GET request using fetch
        const response = await fetch("https://api.chucknorris.io/jokes/random");
        const data = await response.json();
        this.getData(data);
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
                <div className="card-body">
                    Data: {this.state.data.url}
                </div>
            </div>
        );
    }
}


