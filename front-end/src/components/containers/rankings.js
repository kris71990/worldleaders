import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import LanguageRank from '../rankings/language-rank/language-rank';
import GDPRank from '../rankings/gdp-rank/gdp-rank';
import AreaRank from '../rankings/area-rank/area-rank';
import PopulationRank from '../rankings/population-rank/population-rank';
import SystemsRank from '../rankings/systems-rank/systems-rank';

const RankingsContainer = () => {
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

export default RankingsContainer;
