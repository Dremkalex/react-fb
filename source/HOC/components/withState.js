//React
import React, { Component } from 'react';

import { getDisplayName } from '../helpers';

/*
    function withState(options){
        return function(WrappedComponent) {
            WithState определяет логику из options

            return WithState - рендерит WrappedComponent
        }
    }
*/

export const withState = ({
    stateName,
    stateValue,
    stateUpdater,
    stateUpdaterName,
}) => (WrappedComponent) => {
    class WithState extends Component {
        state = {
            [ stateName ]: stateValue,
        };

        [ stateUpdaterName ] = () => {
            this.setState(stateUpdater);
        }

        render() {
            const updatersToForward = {
                [ stateUpdaterName ]: this[ stateUpdaterName ],
            };

            return (
                <WrappedComponent
                    { ...this.props }
                    { ...this.state }
                    { ...updatersToForward }
                />
            );
        }
    }

    WithState.displayName = `WithState(${getDisplayName(WrappedComponent)})`;

    return WithState;
};

