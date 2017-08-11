/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Panel, Button } from 'muicss/react';
import { twitterDisconnect } from '../login/actions';

class DashboardView extends Component<Props> {
    render() {
        return (
            <Container>
                <Panel>
                    <Button
                        variant="raised"
                        color="primary"
                        onClick={ this.props.disconnect }
                    >
                        Logout
                    </Button>
                </Panel>
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    disconnect: () => dispatch(twitterDisconnect()),
});

const mapStateToProps = ({ LoginReducer }) => ({
    loginReducer: LoginReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);
/* eslint-enable */
