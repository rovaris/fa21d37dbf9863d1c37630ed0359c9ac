/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Panel, Button } from 'muicss/react';
import { twitterSignIn } from './actions';
import type { Reducer } from './reducer';

type Props = {
    signIn: () => void,
    reducer: Reducer,
};
class LoginView extends Component<Props> {
    render() {
        const { signIn } = this.props;
        return (
            <Container>
                <Panel>
                    <Button
                        variant="raised"
                        color="primary"
                        onClick={ signIn }
                    >
                        sign in with twitter;
                    </Button>
                </Panel>
            </Container>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    signIn: () => dispatch(twitterSignIn()),
});

const mapStateToProps = ({ LoginReducer }) => ({
    reducer: LoginReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
/* eslint-enable */
