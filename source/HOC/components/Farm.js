//React
import React from 'react';

import { Container, Button, Heading, Message } from '../styled';
import { withState } from './withState';

const stateName = 'apples';
const stateUpdaterName = '_yieldApples';

const Farm = (props) => {
    const applesJSX = Array(props[ stateName ]).fill('🍓');

    return (
        <Container>
            <Heading>🏡Farm🚜</Heading>
            <div>
                <Message>Урожай:</Message>
                <Message>{applesJSX}</Message>
            </div>
            <Button onClick = { props[ stateUpdaterName ] }>Собрать урожай!🍓</Button>
        </Container>
    );
};


export default withState({
    stateName,
    stateValue:   3,
    stateUpdater: (state) => ({
        [ stateName ]: state[ stateName ] + 1,
    }),
    stateUpdaterName,
})(Farm);
