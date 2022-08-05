import React, {FC} from 'react';
import {Routes, Route} from 'react-router-dom';
import { Navigate } from 'react-router';

import { ROUTES } from '../constants';
import AbsenceLanding from './AbsenceLanding';

const AbsenceManagerRoot: FC = () => {
    return (
        <Routes>
            <Route path={ROUTES.ABSENCE_LANDING} element={<AbsenceLanding/>}/>
            <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.ABSENCE_LANDING} />}/>
        </Routes>
    )
}

export default AbsenceManagerRoot;