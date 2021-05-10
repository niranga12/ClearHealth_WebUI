import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";

// routes config
import routes from "../routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = () => {
  return (
    <main className="c-main p-2  bg-white">
      <CContainer fluid className="card boxshadow-contain  min-height-99 pt-2">
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      <CFade>
                        <route.component {...props} />
                      </CFade>
                    )}
                  />
                )
              );
            })}
            <Redirect from="/" to="/login" />
          </Switch>
        </Suspense>
      </CContainer>
     
      <div className="row">
        <div className="col-md-4">
        <FontAwesomeIcon icon={faPhone} className="pr-2 fa-x text-lightblue text-icon-footer" />
        <span>800 (229)-01528</span>
        </div>
        <div className="col-md-4 text-center">
          <span>Clear Health Inc |</span>
          <span> Privacy Policy |</span>
          <span> Accessibility Statement</span>

        </div>
      </div>

    </main>
  );
};

export default React.memo(TheContent);
