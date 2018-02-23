# React Native Lazy Toast


<p align="center">
    ![Example](/media/giphy.gif)
</p>


## Installation

```sh
yarn add react-native-lazy-toast
```

## Usage

```jsx
import { withNotification } from 'react-native-lazy-toast';

// ...
import React from 'react';
import { Button } from 'react-native';
import { withNotification } from 'react-native-lazy-toast';

const Action = () => console.log('action')

const App = () => 
    <Button
      onPress={this.props.notify()}
      title="Join with HOC"
      color="#841584"
      accessibilityLabel="Learn more about this purple button"
    />

export default withNotification({ 
  title: 'Are you sure about that? ', 
  message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut`,
  action: Action,
 })(App);
// ...
```
Our you can use as a component
```jsx
import { Notification } from 'react-native-lazy-toast';

// ...
  render() {
    return (
     
        <Button
            onPress={ () => this.child.showNotify() } // here you can call showNotify with ref
            title="Join component"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        />

        <Notification 
            ref={ el =>  this.child = el }
            title={'Are you sure about that? '}
            action={() => { console.log('action props') }}
            message={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut` }  
        />
    )
  }
// ...
```

## Props

##### `title` (string)
The title of toast

##### `action` (function)
A function for `Accept` button.

##### `message` (string)
The message to appear below the title

##### `color` (string)
The color of the `Accept` button.

## Next features

- Add carousel for toast like steps
- 3 sizes
- Custom buttons
- Pass styles for childrens

## License

MIT © [Ronaldo Lima](http://github.com/ronal2do)