import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import LanguageRank from '../language-rank/language-rank';
import GDPRank from '../gdp-rank/gdp-rank';
import AreaRank from '../area-rank/area-rank';
import PopulationRank from '../population-rank/population-rank';
import SystemsRank from '../systems-rank/systems-rank';

const RankingsMain = () => {
  const { path } = useRouteMatch();

  return (
    <div>
      <Route path={`${path}/language-prevalence`} component={ LanguageRank }/>
      <Route path={`${path}/gdp`} component={ GDPRank }/>
      <Route path={`${path}/area`} component={ AreaRank }/>
      <Route path={`${path}/population`} component={ PopulationRank }/>
      <Route path={`${path}/systems`} component={ SystemsRank }/>
    </div>
  );
};

export default RankingsMain;
