/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Panel, Button } from 'muicss/react';

class DashboardView extends Component<Props> {
    render() {
        return (
            <Container>
                <Panel>
                    <Button
                        variant="raised"
                        color="primary"
                        onClick={ () => {} }
                    >
                        Logout
                    </Button>
                </Panel>
            </Container>
        );
    }
}

const mapStateToProps = ({ LoginReducer }) => ({
    loginReducer: LoginReducer,
});

export default connect(mapStateToProps, null)(DashboardView);
/* eslint-enable */
