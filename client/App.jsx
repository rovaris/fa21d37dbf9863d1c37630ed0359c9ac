import React from 'react';
import { connect } from 'react-redux';
import { Container, Panel } from 'muicss/react';
import { LoadingDots } from 'components';
import { LoginView, DashboardView } from './views';

const App = ({ reducer }) => {
    const { isLoggedIn, loading } = reducer;

    if (loading) {
        return (
            <Panel className="mui--text-center">
                <LoadingDots numberOfDots={ 3 } />
            </Panel>
        );
    }

    return (
        <Container>
            { isLoggedIn ?
                <DashboardView { ...reducer } /> :
                <LoginView />
            }
        </Container>
    );
};

const mapStateToProps = ({ LoginReducer }) => ({
    reducer: LoginReducer,
});

export default connect(mapStateToProps, null)(App);
