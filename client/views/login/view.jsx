// @flow
/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Panel, Button } from 'muicss/react';
import { loadUserSession } from 'helpers/session';
import { twitterSignIn, loadSession } from './actions';
import type { LoginReducerType } from './reducer';
import type Session from 'helpers/session';

type ViewType = {
    signIn: () => void,
    reducer: LoginReducer,
};

class LoginView extends Component<ViewType> {

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
            <Container className="login-box">
                <Panel>
                    <Button
                        variant="raised"
                        color="primary"
                        onClick={ signIn }
                    >
                        <span
                            style={ { paddingRight: '5px' } }
                            title="twitter sign in"
                            className="icon fa fa-twitter"
                        />
                        sign in
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
