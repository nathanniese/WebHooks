import React, { Component } from 'react';

import { Link } from 'react-router-dom'

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newUrl: "",
            deleteUrl: "",
            Urls: [],
            Validated: false,
            CurrentUrl: window.location.href
        };
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    async addData(url) {
        await fetch('Webhook/CreatePath/' + url);
        this.componentDidMount();
    }
    async deleteData(url) {

        await fetch('Webhook/DeletePath/' + url);
        this.componentDidMount();
    }
   async componentDidMount() {
       const result = await fetch('Webhook/GetAllPaths');
       const data = await result.json();
       this.setState({ Urls: data });
    }
    render() {
        const formSubmitUrl = (e) => {
            e.preventDefault();
            this.addData(this.state.newUrl.value);
        };
        const deleteUrl = (path) => {
            this.deleteData(path);
        };
        return (
            <div className="pure-u-5-5">
            <div className="pure-u-18-24 padding">
                <input type="text" className="pure-input pure-u-2-5" placeholder="New Url" ref={(v) => this.state.newUrl = v} required="" />

                <button className="pure-button pure-button-primary pure-u-lg-2-24" type="submit" onClick={formSubmitUrl} >Create</button>
                <table className='pure-table-horizontal stretch'>
                    <thead >
                        <tr>
                            <th style={{ textAlign: 'center', width: '70%' }}>Url</th>
                            <th style={{ textAlign: 'center', width: '30%' }}></th>
                        </tr>
                    </thead>
                        <tbody style={{ textAlign: 'center' }}>
                            {this.state.Urls.map(Url =>
                                <tr key={Url.path}>
                                    <td>{this.state.CurrentUrl + "Webhook/"+ Url.path}</td>
                                <td><Link className="pure-button pure-button-primary" to={{ pathname: './' + Url.path, state: { path: Url.path, data: [] } }} >View</Link><button className="button-error pure-button" onClick={() => deleteUrl(Url.path)}>Delete</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>
            </div>
        );
    }

}
