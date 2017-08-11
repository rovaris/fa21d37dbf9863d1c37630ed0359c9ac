// @flow
/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Panel, Button } from 'muicss/react';
import { loadUserSession } from 'helpers/session';
import { twitterSignIn, loadSession } from './actions';
import type { Reducer } from './reducer';
import type Session from 'helpers/session';

type Props = {
    signIn: () => void,
    reducer: Reducer,
};
class LoginView extends Component<Props> {

    componentWillMount() {
        const { useSession, goTo, history } = this.props;
        const { isLoggedIn } = this.props.reducer;
        const session: Session = loadUserSession();

        if (session && !isLoggedIn) {
            useSession(session);
        }
    }

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
    useSession: session => dispatch(loadSession(session)),

});

const mapStateToProps = ({ LoginReducer }) => ({
    reducer: LoginReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
/* eslint-enable */
