import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Animated,
    Dimensions,
    Button
} from 'react-native';
const { width } = Dimensions.get('window')

class Notification extends PureComponent {
  static propTypes = {
    title: PropTypes.string, 
    message: PropTypes.string, 
    action: PropTypes.func,
    color: PropTypes.string
  }

  static defaultProps = {
    color: '#841584',
    title: '',
    message: '',
    action: () => {},
  };

  state={
    show: false,
    animation: new Animated.Value(0)
  }

  showNotify = () => {
    const toValue = this.state.show ? 0 : 1
    Animated.spring(this.state.animation, {
      toValue,
      tension: 50,
    },{
      nativeDriver: true
    }).start(() => this.setState({
      show: !this.state.show
    }))
  }

  acceptAction = async () => {
    await this.props.action()
    this.showNotify()
  }

  render() {
    const _translateY = this.state.animation.interpolate({
        inputRange: [0, .8, 1],
        outputRange: [width + 100, 100, 0]
    })
    const textY = this.state.animation.interpolate({
      inputRange: [ 0, .6, 1 ],
      outputRange: [ 0, 100, 0]
    })
    const animationStyle = { transform: [{ translateY: _translateY }] }
    const animatedText = { transform: [{ translateY: textY }] }
    const _opacity = this.state.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, .8]
    })
    const bgStyle = {  opacity: _opacity }
    const { show } = this.state;
    const { title, message, action, color='#841584' } = this.props;

    return (
      <View
          style={StyleSheet.absoluteFill}
          pointerEvents={show ? 'auto' : 'none'}
      >
        <Animated.View style={[styles.blur, bgStyle]}>
          <TouchableOpacity style={styles.touch} onPress={() => this.showNotify()}/>
        </Animated.View>
        <Animated.View style={[styles.toast, animationStyle]}>
          <Animated.View style={animatedText}>
              <Text style={styles.title}>
                  {title}
              </Text>
          </Animated.View>
          <Animated.View style={[styles.header, animatedText]}>
              <Text style={styles.headerStyle}>
                  {message}
              </Text>
          </Animated.View>
          <View style={styles.actionContainer}>
            <Button
              onPress={this.showNotify}
              title='Cancel'
              color='gray'
            />
            <Button
              onPress={this.acceptAction}
              title='Accept'
              color={color}
            />
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  touch: {
    flex: 1 
  },
  actionContainer: {
    flexDirection: 'row',
    width,
    justifyContent: 'space-around',
  },
  blur: {
    flex: 2,
    backgroundColor:  'rgba(0, 0, 0, .2)',
  },
  toast: {
    flex: 2,
    paddingTop: 30,
    backgroundColor: 'white',
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    textAlign: 'center',
    fontSize: 27,
    color: 'rgb(70, 70, 70)',
    fontWeight: '500'
  },
  header: {
    paddingHorizontal: 35
  },
  headerStyle: {
    textAlign: 'center',
    fontSize: 18,
    color: 'rgb(180, 180, 180)',
    fontWeight: '500'
  },
});

export default Notification
