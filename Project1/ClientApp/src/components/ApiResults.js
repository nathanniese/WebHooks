import React, { Component } from 'react';

import { Link } from 'react-router-dom'

export class ApiResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: "",
            Results: [],
        };
        if (props) {
            if (props.location) {
                if (props.location.state) {
                    this.state.path = props.location.state.path;
                    this.loadPage();
                }
            }
        }
    }


    async loadPage() {
        const result = await fetch('Webhook/GetPath/' + this.state.path);
        const data = await result.json();
        this.setState({ Results: data });
    }
    render() {
        return (
            <div className="pure-u-5-5">
                <div className="pure-u-12-24 padding">
                    <ul>
                    {this.state.Results.map((object, i) =>
                        <li key={i}>
                            {object.data}
                        </li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}