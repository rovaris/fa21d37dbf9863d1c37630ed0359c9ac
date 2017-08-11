import React from 'react';
import { connect } from 'react-redux';
import { Panel } from 'muicss/react';
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
        <div>
            { isLoggedIn ?
                <DashboardView { ...reducer } /> :
                <LoginView />
            }
        </div>
    );
};

const mapStateToProps = ({ LoginReducer }) => ({
    reducer: LoginReducer,
});

export default connect(mapStateToProps, null)(App);
