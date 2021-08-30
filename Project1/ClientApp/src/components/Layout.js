import React, { Component } from 'react';
import { NavMenu } from './NavMenu';

export function Layout(props) {

    return (
        <div>
            <NavMenu />
            <div className="body-container">
                <div className="container">
                    {props.children}
                </div>
            </div>
        </div>
    );
}
