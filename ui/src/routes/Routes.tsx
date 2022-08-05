import React, { FC } from 'react';
import { Routes as Switch } from 'react-router';

import AbsenceManager from '../components';

const Routes: FC = () => {
    return <Switch>
        <AbsenceManager/>
    </Switch>
}