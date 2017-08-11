// @flow
import React from 'react';
import { Container, Panel } from 'muicss/react';

type TweetContainerType = {
    text: string,
};

const TweetContainer = ({ text }):TweetContainerType => (
    <Container className="tweet-container">
        <Panel>
            <p>{ text }</p>
        </Panel>
    </Container>
);


export default TweetContainer;
