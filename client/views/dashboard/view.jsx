/* eslint-disable */
import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import { connect } from 'react-redux';
import { Container, Panel, Button } from 'muicss/react';
import { LoadingDots, Appbar, TweetContainer } from 'components';
import cx from 'classnames';
import { twitterDisconnect } from '../login/actions';
import { loadTweets } from './actions';
import type { DashboardReducerType } from './react'


type ViewType = {
    name: string,
    screenName: string,
    profileImageUrl: string,
    reducer: DashboardReducerType,
    disconnect: () => void,
    loadTweets: () => void,
};

class DashboardView extends Component<ViewType> {

    componentWillMount() {
        const { loadTweets } = this.props;
        loadTweets();
    }

    renderTweets = () => {
        const { reducer, loadTweets } = this.props;
        const { loading, tweets } = reducer;
        return (
            <Container>
                <Container>
                    <div className="mui--pull-left">
                        <h1>{ `{${tweets.length} Tweets}` }</h1>
                    </div>
                    <div className="mui--pull-right">
                        <span
                            title="remove"
                            className="icon fa fa-refresh"
                            style={{ fontSize: '48px' }}
                            onClick={ loadTweets }
                        />
                    </div>
                </Container>
                <br />
                <Panel>
                { tweets.map(entry => (
                    <TweetContainer key={ uniqueId(entry.id) } text={ entry.text }/>
                ))}
                </Panel>
            </Container>
        );
    }

    render() {
        const { name, screenName, profileImageUrl, reducer } = this.props
        const { loading } = reducer;

        return (
            <div>
                <Appbar
                    name={ name }
                    profile={ screenName }
                    imgUrl={ profileImageUrl }
                    disconnect={ this.props.disconnect }
                />
                <br/>
                {
                    loading ? (
                        <Container>
                            <LoadingDots numberOfDots={5} />                
                        </Container>
                    ):
                    this.renderTweets()
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    disconnect: () => dispatch(twitterDisconnect()),
    loadTweets: () => dispatch(loadTweets()),
});

const mapStateToProps = ({ DashboardReducer }) => ({
    reducer: DashboardReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);
/* eslint-enable */
