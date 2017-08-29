import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { links } from './links';
import AppContainer from './containers/AppContainer';
import HomeContainer from './containers/HomeContainer';
import _404Container from './containers/_404Container';
import { preloadJobs } from './actions';
import { getURLQueryParams } from './helpers';

export default function getRoutes({ dispatch, getState }) {

    const onIndexEnter = () => {
        dispatch(updatePageMeta({ title: "Mansplaining the Game!" }));
    }

    const on404Enter = () => {
        dispatch(updatePageMeta({ title: "404 - MobileSyrup Job Board" }));
    }

    return (
        <Route path={links.home} component={AppContainer}>
            <IndexRoute component={HomeContainer} onEnter={onIndexEnter} />
            <Route path={links.notFound} component={_404Container} onEnter={on404Enter} />
            <Route path="*" component={_404Container} onEnter={on404Enter} />
        </Route>
    );
}
