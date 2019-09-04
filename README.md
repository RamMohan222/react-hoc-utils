# react-hoc-utils
Common useful utility functions in React Js

  ## HOC (Higher Order Components)
  
  ## 1. withProps
  There is a situation we need to export our component with some external properties such a situation we can use the **withProps** this will wrap the component with whatever the properties we are passing.

```jsx

const withProps = (extProps = {}) => WrappedComponent => props => (
  <WrappedComponent {...props} {...extProps} />
);

```
### Example 1:
```jsx
class App extends React.Component{/** */}

const props = {
  title:'Title',
  action:() => {console.log('Some Action')}
}

export default withProps(props)(App)
```
While rendering a component we can pass the props like following, but there is a situation we need to pass our component as a props without rendering it we need to pass some external props in this situation we can use **withProps** see the _**Example2**_

### Example 2:
While rendering props passing
```jsx
<Component title="Title" action={()=>console.log('Some Action')} >
```
From the below example we are not rendering the actuall Component **Cell** but we are wrapping it with external props with the help of **withProps**.
```jsx
const Cell = props =><><div>{props.title}</div>{props.value}<div></div></>
const props = {
  title:'Title',
  action:() => {console.log('Some Action')}
}
<Grid
  cell={withProps(props)(Cell)}
/>
```


## 2. withContextProps
```jsx
import React from "react";

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
```

In ReactJs recent release >=16.8 we can use more than one context by using useContext hook in functional components. But in class based components it is difficult to use more than one context. by using **withContextProps** HOC we can wrap more then one context with our component. It will convert all context props into component props. see the below example for normal usage and with HOC.

### Example:
```jsx
// Nornmal usage
const AppContext = React.createContext({ foo: 'bar' });
class App extends React.Component {
  static context = AppContext;
  render() {
    let value = this.context;
    ...
  }
}

// with withContextProps HOC.
// It will wrap all context props into component props.
export default withContextProps(Context1, Context2,..ContextN)(App);
```


## 3. composeHOC
```jsx
// It will compose all single argument HOC and return finall wrappedComponent
const composeHOC = (...hocs) => WrappedComponent =>
  hocs.reduce((component, hoc) => hoc(component), WrappedComponent);
```
  Sometimes we need to wrap our component with more then one HOC's that time our code looks like below.
```jsx
withStyle(withProps(styleProps)(withRouter(connect(mapState,mapDispatch)(App))))
```
  In this situation, we can **composeHOC** this will wrap the component with all HOC's what ever we want. see the below example for usage.

### Example:
```jsx
const enhance = composeHOC(connect(mapState,mapDispatch), withProps(extProps), withRouter, withStyle);
export default enhance(App);
or 
// we can make a reusable HOC by composing all HOC's.
const ReusableHOC = composeHOC(withProps(extProps), withRouter, withStyle)
export default connect(mapState,mapDispatch)(ReusableHOC)
```
