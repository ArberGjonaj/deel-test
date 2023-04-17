1. What is the difference between Component and PureComponent? give an
   example where it might break my app

Component is a react class that re-renders whenever there is a change in its state or props. Pure component is a subclass that rerenders only when its state or props have changed which makes it more efficient. It might break the app when we pass an object or array that have the same value but different memory references or might render unnecessarily when it gets arrays or objects with the same value but different memory references. This happens because PureComponent uses shallow comparison.

2. Context + ShouldComponentUpdate might be dangerous. Can think of why is
   that?

In my personal experience it can lead to a component subscribing to a context and also implementing shouldComponentUpdate and returning false when the context value changes. This will cause the component not to rerender even though its content may need to be updated based on the new context value.

3. Describe 3 ways to pass information from a component to its PARENT.

Prop drilling using callback functions - The parent component can pass a callback function to the component as a prop, which the child component can then call to pass information back to the parent.

Context API - The component can consume a value from a context provided by the parent component, and update that value as needed.

Ref forwarding - The component can use the useImperativeHandle hook to expose a function that the parent component can call to get information from the component. This technique is known as "ref forwarding".

4. Give 2 ways to prevent components from re-rendering.

Use shouldComponentUpdate or React.memo - The shouldComponentUpdate is a method that allows you to control if the component should re-render based on changes to its state or props. Alternatively we can use React.memo hoc to wrap our component and automatically apply shouldComponentUpdate based on props.

Use useCallback or useMemo - The useCallback and useMemo are hooks that allow you to memoize functions and values, so that they only recompute when their dependencies change. This can be useful when you need to pass functions or values as props to child components, as it ensures that the child components only re-render when necessary.

5. What is a fragment and why do we need it? Give an example where it might
   break my app.

A fragment is a built in feature of react that allows you to group elements without introducing needled dom nodes. An example would be wrapping it around the return of a [].map func that returns a list of components from a functions return method or from a class render method.

A fragment might break your app in some cases if the parent component expects to receive a single element from its child component. For example, if the parent component renders its child inside a div, and the child returns a fragment, it will break the layout by introducing an additional level of nesting in the DOM.

6. Give 3 examples of the HOC pattern.

withButtonColor HOC - An HOC that adds a color prop to a button component.

function withButtonColor(Component) {
return function WithButtonColor(props) {
return <Component color="blue" {...props} />;
}
}

function MyButton(props) {
return <button style={{backgroundColor: props.color}}>{props.label}</button>;
}

const MyButtonWithColor = withButtonColor(MyButton);

withMousePosition HOC - An HOC that adds mouse position functionality to a component.

function withMousePosition(Component) {
return class WithMousePosition extends React.Component {
state = {
x: 0,
y: 0,
};

    handleMouseMove = event => {
      this.setState({
        x: event.clientX,
        y: event.clientY,
      });
    };

    render() {
      return (
        <div onMouseMove={this.handleMouseMove}>
          <Component mousePosition={this.state} {...this.props} />
        </div>
      );
    }

};
}

function MyComponent(props) {
return (
<div>
<p>Mouse position: {props.mousePosition.x}, {props.mousePosition.y}</p>
</div>
);
}

const MyComponentWithMousePosition = withMousePosition(MyComponent);

withTitle HOC - An HOC that adds a title to a component.

function withTitle(Component) {
return function WithTitle(props) {
document.title = props.title;
return <Component {...props} />;
}
}

function MyComponent(props) {
return (
<div>
<h1>{props.title}</h1>
<p>{props.content}</p>
</div>
);
}

const MyComponentWithTitle = withTitle(MyComponent);

7. what's the difference in handling exceptions in promises, callbacks and
   async...await.

The main difference in handling exceptions in promises, callbacks, and async/await is the syntax and control flow of the code.

Promises: With promises, you can handle errors using the catch method. When a promise is rejected, it will reject with an error object, which you can catch and handle in the catch method

Callbacks: With callbacks, you typically handle errors by passing an error object as the first argument of the callback function. The error object will be null or undefined if there are no errors.

Async/await: With async/await, you can handle errors using the try...catch statement. When you await a promise, any errors that occur will be caught and can be handled in the catch block.

8. How many arguments does setState take and why is it async.

The setState method in React takes two arguments: an object representing the updated state, and an optional callback function to be called after the state has been updated.

The reason setState is asynchronous is that React batches multiple state updates together for performance reasons. This means that when you call setState, React may not update the state immediately, but instead wait for other state updates to be queued up before updating the state and triggering a re-render.

9. List the steps needed to migrate a Class to Function Component.

Identify the state and props used in the Class Component: In the Class Component, identify the state and props used by looking for references to this.state and this.props.

Create a Function Component: Create a new Function Component that takes the necessary props as arguments. If the Class Component has a constructor, copy any state initialization code to the Function Component.

Remove the Class Component: Remove the Class Component and replace it with the new Function Component.

Refactor lifecycle methods: If the Class Component uses any lifecycle methods, refactor them to use the corresponding React Hooks. For example, if the Class Component uses componentDidMount, refactor it to use the useEffect Hook.

Refactor event handlers: If the Class Component uses event handlers defined as methods, refactor them to use the useCallback Hook. This is necessary to ensure that the event handlers do not cause unnecessary re-renders.

Refactor state updates: If the Class Component updates its state using this.setState, refactor the code to use the useState Hook.

Refactor class methods: If the Class Component defines methods that are not event handlers or lifecycle methods, refactor them to regular functions.

Refactor class properties: If the Class Component defines properties that are not state or props, refactor them to regular variables or constants.

Test the Function Component: Test the new Function Component to ensure that it behaves the same way as the original Class Component.

10. List a few ways styles can be used with components.

Inline styles: Inline styles can be used to apply styles directly to an element using the style prop. Inline styles are defined as objects with keys representing the CSS properties and values representing the CSS values.

CSS modules: CSS modules allow you to write traditional CSS files and import them into your components. CSS modules generate unique class names for each CSS file, which prevents naming collisions and allows you to style components in isolation.

Styled components: Styled components allow you to define styles as part of the component definition using tagged template literals. Styled components generate unique class names for each component, which prevents naming collisions and allows you to style components in isolation.

11. How to render an HTML string coming from the server.

To render an HTML string coming from the server in React, you can use the dangerouslySetInnerHTML prop. This prop allows you to set the inner HTML of an element using a string, but it should be used with caution as it can be a potential security risk if used improperly.

Another way to render an HTML string coming from the server is to use a third-party library like react-html-parser. This library provides a safer and more flexible way to parse and render HTML strings in React.
