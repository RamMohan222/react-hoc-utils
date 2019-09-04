import React from "react";

const withProps = (extProps = {}) => WrappedComponent => props => (
  <WrappedComponent {...props} {...extProps} />
);

// It will contert all context props to component props and then finally return the wrappedComponent
const withContextProps = (...contexts) => WrappedComponent => {
  contexts.reverse() /** user will expect first context props will over written with next context */
  return contexts.reduce(
    (WComponent, { Consumer }) => compProps => (
      <Consumer>
        {ctxProps => <WComponent {...compProps} {...ctxProps} />}
      </Consumer>
    ),
    WrappedComponent
  );
};

// It will compose all single argument HOC and return finall wrappedComponent
const composeHOC = (...hocs) => WrappedComponent =>
  hocs.reduce((component, hoc) => hoc(component), WrappedComponent);

export { composeHOC, withContextProps, withProps };
