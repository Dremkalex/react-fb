//Core
import React, { Component, createContext } from 'react';

//Instruments
import { getDisplayName } from 'instruments';

const { Provider, Consumer } = createContext();

const withProfile = (Enhanceable) => {
    class WithProfile extends Component {
        render() {
            return (
                <Consumer>
                    {(context) => (
                        <Enhanceable
                            { ...context }
                            { ...this.props }
                        />
                    )}
                </Consumer>
            );
        }
    }
    WithProfile.displayName = `WithProfile(${getDisplayName(Enhanceable)})`;

    return WithProfile;
};


export { Provider, Consumer, withProfile };
