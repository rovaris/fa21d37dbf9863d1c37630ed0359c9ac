// @flow
import React from 'react';
import { Appbar, Container, Button } from 'muicss/react';
import UserProfile from './UserProfile';

type AppBarType = {
    disconnect: () => void,
    name: string,
    profile: string,
    imgUrl: string,
};

const AppBar = ({ disconnect, name, profile, imgUrl }):AppBarType => (
    <Appbar>
        <Container>
            <UserProfile
                className="mui--pull-left mui--appbar-height"
                name={ name }
                profile={ profile }
                imgUrl={ imgUrl }
            />
            <div className="mui--pull-right mui--appbar-line-height">
                <Button
                    variant="raised"
                    color="secondary"
                    onClick={ disconnect }
                >
                    <span
                        style={ { paddingRight: '5px' } }
                        title="remove"
                        className="icon fa fa-sign-out"
                    />
                    Logout
                </Button>
            </div>
        </Container>
    </Appbar>
);

export default AppBar;
