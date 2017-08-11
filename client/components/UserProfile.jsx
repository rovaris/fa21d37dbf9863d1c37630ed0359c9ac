// @flow
import React from 'react';
import cx from 'classnames';

type UserProfileType = {
    name: string,
    profile: string,
    imgUrl: string,
    className?: string,
};

const UserProfile = ({ name, profile, imgUrl, className }):UserProfileType => (
    <div className={ cx('user-profile', className) }>
        <div>
            <img alt="profile" src={ imgUrl } />
        </div>
        <div className="text">
            <h2> { name } </h2>
            <p> {`@${profile}`} </p>
        </div>
    </div>
);

export default UserProfile;
