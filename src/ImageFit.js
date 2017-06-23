import React from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet} from 'react-native';

/**
 * @summary
 * ImageFit provides an extension of the default react-native
 * image component that will scale to fit it's parent component,
 * while keeping the ratio of the original image.
 *
 * @description
 * By default it will fit to the parents width. It can be configured
 * to fit height by passing the boolean prop `fitHeight`.
 *
 * Make sure to pass in originalHeight and originalWidth so it
 * can calculate the image dimension ratio.
 */
class ImageFit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ratio: 0,
      layout: {height: null, width: null},
    };

    this.onLayout = (event) => {
      const layout = event.nativeEvent.layout;

      const width = layout.width ? layout.width : this.state.width;
      const height = layout.height ? layout.height : this.state.height;
      this.setState({layout:{width,height}});
    };
    this.setRatio = (height, width) => this.setState({ratio: height / width});
  }

  componentWillMount() {
    this.setRatio(this.props.originalHeight, this.props.originalWidth);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.originalHeight !== this.props.originalHeight ||
      nextProps.originalWidth !== this.props.originalWidth
    ) {
      this.setRatio(nextProps.originalHeight, nextProps.originalWidth);
    }
  }

  render() {
    return (
      <Image
        {...this.props}
        onLayout={this.onLayout}
        style={[
          this.props.style,
          this.props.fitHeight === true ? {
              flex: 1,
              height: null,
              width: this.state.layout.height * 1 / this.state.ratio,
            } : {
              height: this.state.layout.width * this.state.ratio,
              width: null,
            },
        ]}
      />
    );
  }
}

ImageFit.propTypes = {
  ...Image.propTypes,
  originalHeight: PropTypes.number.isRequired,
  originalWidth: PropTypes.number.isRequired,
  fitHeight: PropTypes.bool,
};

ImageFit.defaultProps = {
  style: {},
  fitHeight: false,
};

export default ImageFit;
