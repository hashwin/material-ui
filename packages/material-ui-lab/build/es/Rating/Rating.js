import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes } from '@material-ui/utils';
import { useTheme, withStyles } from '@material-ui/core/styles';
import { capitalize, useForkRef, useIsFocusVisible } from '@material-ui/core/utils';
import Star from '../internal/svg-icons/Star';

function clamp(value, min, max) {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
}

function getDecimalPrecision(num) {
  const decimalPart = num.toString().split('.')[1];
  return decimalPart ? decimalPart.length : 0;
}

function roundValueToPrecision(value, precision) {
  const nearest = Math.round(value / precision) * precision;
  return Number(nearest.toFixed(getDecimalPrecision(precision)));
}

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'inline-flex',
    position: 'relative',
    fontSize: theme.typography.pxToRem(24),
    color: '#ffb400',
    cursor: 'pointer',
    '&$disabled': {
      opacity: 0.4,
      pointerEvents: 'none'
    },
    '&$focusVisible $iconActive': {
      outline: '1px solid #999'
    }
  },

  /* Styles applied to the root element if `size="small"`. */
  sizeSmall: {
    fontSize: theme.typography.pxToRem(18)
  },

  /* Styles applied to the root element if `size="large"`. */
  sizeLarge: {
    fontSize: theme.typography.pxToRem(30)
  },

  /* Styles applied to the root element if `readOnly={true}`. */
  readOnly: {
    pointerEvents: 'none'
  },

  /* Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: {},

  /* Pseudo-class applied to the root element if keyboard focused. */
  focusVisible: {},

  /* Visually hide an element. */
  visuallyhidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },

  /* Styles applied to the pristine label. */
  pristine: {
    'input:focus ~ &': {
      top: 0,
      bottom: 0,
      position: 'absolute',
      outline: '1px solid #999',
      width: '100%'
    }
  },

  /* Styles applied to the label elements. */
  label: {
    cursor: 'inherit'
  },

  /* Styles applied to the icon wrapping elements. */
  icon: {
    display: 'flex',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },

  /* Styles applied to the icon wrapping elements when empty. */
  iconEmpty: {
    color: theme.palette.action.disabled
  },

  /* Styles applied to the icon wrapping elements when filled. */
  iconFilled: {},

  /* Styles applied to the icon wrapping elements when hover. */
  iconHover: {},

  /* Styles applied to the icon wrapping elements when focus. */
  iconFocus: {},

  /* Styles applied to the icon wrapping elements when active. */
  iconActive: {
    transform: 'scale(1.2)'
  },

  /* Styles applied to the icon wrapping elements when decimals are necessary. */
  decimal: {
    position: 'relative'
  }
});

function IconContainer(props) {
  const other = _objectWithoutPropertiesLoose(props, ["value"]);

  return React.createElement("span", other);
}

process.env.NODE_ENV !== "production" ? IconContainer.propTypes = {
  value: PropTypes.number.isRequired
} : void 0;
const defaultIcon = React.createElement(Star, {
  fontSize: "inherit"
});

function defaultLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}`;
}

const Rating = React.forwardRef(function Rating(props, ref) {
  const {
    classes,
    className,
    disabled = false,
    emptyIcon,
    getLabelText = defaultLabelText,
    icon = defaultIcon,
    IconContainerComponent = IconContainer,
    max = 5,
    name,
    onChange,
    onChangeActive,
    onMouseLeave,
    onMouseMove,
    precision = 1,
    readOnly = false,
    size = 'medium',
    value: valueProp2 = null
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["classes", "className", "disabled", "emptyIcon", "getLabelText", "icon", "IconContainerComponent", "max", "name", "onChange", "onChangeActive", "onMouseLeave", "onMouseMove", "precision", "readOnly", "size", "value"]);

  const valueProp = roundValueToPrecision(valueProp2, precision);
  const theme = useTheme();
  const [{
    hover,
    focus
  }, setState] = React.useState({
    hover: -1,
    focus: -1
  });
  let value = valueProp;

  if (hover !== -1) {
    value = hover;
  }

  if (focus !== -1) {
    value = focus;
  }

  const {
    isFocusVisible,
    onBlurVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React.useState(false);
  const rootRef = React.useRef();
  const handleFocusRef = useForkRef(focusVisibleRef, rootRef);
  const handleRef = useForkRef(handleFocusRef, ref);

  const handleMouseMove = event => {
    if (onMouseMove) {
      onMouseMove(event);
    }

    const rootNode = rootRef.current;
    const {
      right,
      left
    } = rootNode.getBoundingClientRect();
    const {
      width
    } = rootNode.firstChild.getBoundingClientRect();
    let percent;

    if (theme.direction === 'rtl') {
      percent = (right - event.clientX) / (width * max);
    } else {
      percent = (event.clientX - left) / (width * max);
    }

    let newHover = roundValueToPrecision(max * percent + precision / 2, precision);
    newHover = clamp(newHover, precision, max);
    setState(prev => prev.hover === newHover && prev.focus === newHover ? prev : {
      hover: newHover,
      focus: newHover
    });
    setFocusVisible(false);

    if (onChangeActive && hover !== newHover) {
      onChangeActive(event, newHover);
    }
  };

  const handleMouseLeave = event => {
    if (onMouseLeave) {
      onMouseLeave(event);
    }

    const newHover = -1;
    setState({
      hover: newHover,
      focus: newHover
    });

    if (onChangeActive && hover !== newHover) {
      onChangeActive(event, newHover);
    }
  };

  const handleChange = event => {
    if (onChange) {
      onChange(event, parseFloat(event.target.value));
    }
  };

  const handleFocus = event => {
    if (isFocusVisible(event)) {
      setFocusVisible(true);
    }

    const newFocus = parseFloat(event.target.value);
    setState(prev => ({
      hover: prev.hover,
      focus: newFocus
    }));

    if (onChangeActive && focus !== newFocus) {
      onChangeActive(event, newFocus);
    }
  };

  const handleBlur = event => {
    if (hover !== -1) {
      return;
    }

    if (focusVisible !== false) {
      setFocusVisible(false);
      onBlurVisible();
    }

    const newFocus = -1;
    setState(prev => ({
      hover: prev.hover,
      focus: newFocus
    }));

    if (onChangeActive && focus !== newFocus) {
      onChangeActive(event, newFocus);
    }
  };

  const item = (propsItem, state) => {
    const id = `${name}-${String(propsItem.value).replace('.', '-')}`;
    const container = React.createElement(IconContainerComponent, _extends({}, propsItem, {
      className: clsx(classes.icon, state.filled ? classes.iconFilled : classes.iconEmpty, state.hover && classes.iconHover, state.focus && classes.iconFocus, state.active && classes.iconActive)
    }), emptyIcon && !state.filled ? emptyIcon : icon);

    if (readOnly || disabled) {
      return React.createElement(React.Fragment, {
        key: propsItem.value
      }, container);
    }

    return React.createElement(React.Fragment, {
      key: propsItem.value
    }, React.createElement("label", {
      className: classes.label,
      htmlFor: id
    }, container, React.createElement("span", {
      className: classes.visuallyhidden
    }, getLabelText(propsItem.value))), React.createElement("input", {
      onFocus: handleFocus,
      onBlur: handleBlur,
      onChange: handleChange,
      value: propsItem.value,
      id: id,
      type: "radio",
      name: name,
      checked: state.checked,
      className: classes.visuallyhidden
    }));
  };

  return React.createElement("span", _extends({
    ref: handleRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: clsx(classes.root, className, size !== 'medium' && classes[`size${capitalize(size)}`], disabled && classes.disabled, focusVisible && classes.focusVisible, readOnly && classes.readOnly),
    role: readOnly ? 'img' : null,
    "aria-label": readOnly ? getLabelText(value) : null
  }, other), !readOnly && !disabled && value == null && React.createElement(React.Fragment, null, React.createElement("input", {
    value: "0",
    id: `${name}-0`,
    type: "radio",
    name: name,
    defaultChecked: true,
    className: classes.visuallyhidden
  }), React.createElement("label", {
    htmlFor: `${name}-0`,
    className: classes.pristine
  }, React.createElement("span", {
    className: classes.visuallyhidden
  }, getLabelText(0)))), Array.from(new Array(max)).map((_, index) => {
    const itemValue = index + 1;

    if (precision < 1) {
      const items = Array.from(new Array(1 / precision));
      return React.createElement("span", {
        key: itemValue,
        className: clsx(classes.decimal, itemValue === Math.ceil(value) && (hover !== -1 || focus !== -1) && classes.iconActive)
      }, items.map(($, indexDecimal) => {
        const itemDeciamlValue = roundValueToPrecision(itemValue - 1 + (indexDecimal + 1) * precision, precision);
        return item({
          value: itemDeciamlValue,
          style: items.length - 1 === indexDecimal ? {} : {
            width: itemDeciamlValue === value ? `${(indexDecimal + 1) * precision * 100}%` : '0%',
            overflow: 'hidden',
            zIndex: 1,
            position: 'absolute'
          }
        }, {
          filled: itemDeciamlValue <= value,
          hover: itemDeciamlValue <= hover,
          focus: itemDeciamlValue <= focus,
          checked: itemDeciamlValue === valueProp
        });
      }));
    }

    return item({
      value: itemValue
    }, {
      active: itemValue === value && (hover !== -1 || focus !== -1),
      filled: itemValue <= value,
      hover: itemValue <= hover,
      focus: itemValue <= focus,
      checked: itemValue === valueProp
    });
  }));
});
process.env.NODE_ENV !== "production" ? Rating.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * If `true`, the rating will be disabled.
   */
  disabled: PropTypes.bool,

  /**
   * The icon to display when empty.
   */
  emptyIcon: PropTypes.node,

  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the rating.
   *
   * @param {number} value The rating label's value to format.
   * @returns {string}
   */
  getLabelText: PropTypes.func,

  /**
   * The icon to display.
   */
  icon: PropTypes.node,

  /**
   * The component containing the icon.
   */
  IconContainerComponent: PropTypes.elementType,

  /**
   * Maximum rating.
   */
  max: PropTypes.number,

  /**
   * The name attribute of the radio `input` elements.
   * If `readOnly` is false, the prop is required,
   * this input name`should be unique within the parent form.
   */
  name: chainPropTypes(PropTypes.string, props => {
    if (!props.readOnly && !props.name) {
      return new Error(['Material-UI: the prop `name` is required (when `readOnly` is false).', 'Additionally, the input name should be unique within the parent form.'].join('\n'));
    }

    return null;
  }),

  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {number} value The new value.
   */
  onChange: PropTypes.func,

  /**
   * Callback function that is fired when the hover state changes.
   *
   * @param {object} event The event source of the callback.
   * @param {number} value The new value.
   */
  onChangeActive: PropTypes.func,

  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,

  /**
   * @ignore
   */
  onMouseMove: PropTypes.func,

  /**
   * The minimum increment value change allowed.
   */
  precision: PropTypes.number,

  /**
   * Removes all hover effects and pointer events.
   */
  readOnly: PropTypes.bool,

  /**
   * The size of the rating.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),

  /**
   * The rating value.
   */
  value: PropTypes.number
} : void 0;
export default withStyles(styles, {
  name: 'MuiRating'
})(Rating);