"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/utils");

var _styles = require("@material-ui/core/styles");

var _utils2 = require("@material-ui/core/utils");

var _Star = _interopRequireDefault(require("../internal/svg-icons/Star"));

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
  var decimalPart = num.toString().split('.')[1];
  return decimalPart ? decimalPart.length : 0;
}

function roundValueToPrecision(value, precision) {
  var nearest = Math.round(value / precision) * precision;
  return Number(nearest.toFixed(getDecimalPrecision(precision)));
}

var styles = function styles(theme) {
  return {
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
  };
};

exports.styles = styles;

function IconContainer(props) {
  var value = props.value,
      other = (0, _objectWithoutProperties2.default)(props, ["value"]);
  return _react.default.createElement("span", other);
}

process.env.NODE_ENV !== "production" ? IconContainer.propTypes = {
  value: _propTypes.default.number.isRequired
} : void 0;

var defaultIcon = _react.default.createElement(_Star.default, {
  fontSize: "inherit"
});

function defaultLabelText(value) {
  return "".concat(value, " Star").concat(value !== 1 ? 's' : '');
}

var Rating = _react.default.forwardRef(function Rating(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      emptyIcon = props.emptyIcon,
      _props$getLabelText = props.getLabelText,
      getLabelText = _props$getLabelText === void 0 ? defaultLabelText : _props$getLabelText,
      _props$icon = props.icon,
      icon = _props$icon === void 0 ? defaultIcon : _props$icon,
      _props$IconContainerC = props.IconContainerComponent,
      IconContainerComponent = _props$IconContainerC === void 0 ? IconContainer : _props$IconContainerC,
      _props$max = props.max,
      max = _props$max === void 0 ? 5 : _props$max,
      name = props.name,
      onChange = props.onChange,
      onChangeActive = props.onChangeActive,
      onMouseLeave = props.onMouseLeave,
      onMouseMove = props.onMouseMove,
      _props$precision = props.precision,
      precision = _props$precision === void 0 ? 1 : _props$precision,
      _props$readOnly = props.readOnly,
      readOnly = _props$readOnly === void 0 ? false : _props$readOnly,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      _props$value = props.value,
      valueProp2 = _props$value === void 0 ? null : _props$value,
      other = (0, _objectWithoutProperties2.default)(props, ["classes", "className", "disabled", "emptyIcon", "getLabelText", "icon", "IconContainerComponent", "max", "name", "onChange", "onChangeActive", "onMouseLeave", "onMouseMove", "precision", "readOnly", "size", "value"]);
  var valueProp = roundValueToPrecision(valueProp2, precision);
  var theme = (0, _styles.useTheme)();

  var _React$useState = _react.default.useState({
    hover: -1,
    focus: -1
  }),
      _React$useState$ = _React$useState[0],
      hover = _React$useState$.hover,
      focus = _React$useState$.focus,
      setState = _React$useState[1];

  var value = valueProp;

  if (hover !== -1) {
    value = hover;
  }

  if (focus !== -1) {
    value = focus;
  }

  var _useIsFocusVisible = (0, _utils2.useIsFocusVisible)(),
      isFocusVisible = _useIsFocusVisible.isFocusVisible,
      onBlurVisible = _useIsFocusVisible.onBlurVisible,
      focusVisibleRef = _useIsFocusVisible.ref;

  var _React$useState2 = _react.default.useState(false),
      focusVisible = _React$useState2[0],
      setFocusVisible = _React$useState2[1];

  var rootRef = _react.default.useRef();

  var handleFocusRef = (0, _utils2.useForkRef)(focusVisibleRef, rootRef);
  var handleRef = (0, _utils2.useForkRef)(handleFocusRef, ref);

  var handleMouseMove = function handleMouseMove(event) {
    if (onMouseMove) {
      onMouseMove(event);
    }

    var rootNode = rootRef.current;

    var _rootNode$getBounding = rootNode.getBoundingClientRect(),
        right = _rootNode$getBounding.right,
        left = _rootNode$getBounding.left;

    var _rootNode$firstChild$ = rootNode.firstChild.getBoundingClientRect(),
        width = _rootNode$firstChild$.width;

    var percent;

    if (theme.direction === 'rtl') {
      percent = (right - event.clientX) / (width * max);
    } else {
      percent = (event.clientX - left) / (width * max);
    }

    var newHover = roundValueToPrecision(max * percent + precision / 2, precision);
    newHover = clamp(newHover, precision, max);
    setState(function (prev) {
      return prev.hover === newHover && prev.focus === newHover ? prev : {
        hover: newHover,
        focus: newHover
      };
    });
    setFocusVisible(false);

    if (onChangeActive && hover !== newHover) {
      onChangeActive(event, newHover);
    }
  };

  var handleMouseLeave = function handleMouseLeave(event) {
    if (onMouseLeave) {
      onMouseLeave(event);
    }

    var newHover = -1;
    setState({
      hover: newHover,
      focus: newHover
    });

    if (onChangeActive && hover !== newHover) {
      onChangeActive(event, newHover);
    }
  };

  var handleChange = function handleChange(event) {
    if (onChange) {
      onChange(event, parseFloat(event.target.value));
    }
  };

  var handleFocus = function handleFocus(event) {
    if (isFocusVisible(event)) {
      setFocusVisible(true);
    }

    var newFocus = parseFloat(event.target.value);
    setState(function (prev) {
      return {
        hover: prev.hover,
        focus: newFocus
      };
    });

    if (onChangeActive && focus !== newFocus) {
      onChangeActive(event, newFocus);
    }
  };

  var handleBlur = function handleBlur(event) {
    if (hover !== -1) {
      return;
    }

    if (focusVisible !== false) {
      setFocusVisible(false);
      onBlurVisible();
    }

    var newFocus = -1;
    setState(function (prev) {
      return {
        hover: prev.hover,
        focus: newFocus
      };
    });

    if (onChangeActive && focus !== newFocus) {
      onChangeActive(event, newFocus);
    }
  };

  var item = function item(propsItem, state) {
    var id = "".concat(name, "-").concat(String(propsItem.value).replace('.', '-'));

    var container = _react.default.createElement(IconContainerComponent, (0, _extends2.default)({}, propsItem, {
      className: (0, _clsx.default)(classes.icon, state.filled ? classes.iconFilled : classes.iconEmpty, state.hover && classes.iconHover, state.focus && classes.iconFocus, state.active && classes.iconActive)
    }), emptyIcon && !state.filled ? emptyIcon : icon);

    if (readOnly || disabled) {
      return _react.default.createElement(_react.default.Fragment, {
        key: propsItem.value
      }, container);
    }

    return _react.default.createElement(_react.default.Fragment, {
      key: propsItem.value
    }, _react.default.createElement("label", {
      className: classes.label,
      htmlFor: id
    }, container, _react.default.createElement("span", {
      className: classes.visuallyhidden
    }, getLabelText(propsItem.value))), _react.default.createElement("input", {
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

  return _react.default.createElement("span", (0, _extends2.default)({
    ref: handleRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: (0, _clsx.default)(classes.root, className, size !== 'medium' && classes["size".concat((0, _utils2.capitalize)(size))], disabled && classes.disabled, focusVisible && classes.focusVisible, readOnly && classes.readOnly),
    role: readOnly ? 'img' : null,
    "aria-label": readOnly ? getLabelText(value) : null
  }, other), !readOnly && !disabled && value == null && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("input", {
    value: "0",
    id: "".concat(name, "-0"),
    type: "radio",
    name: name,
    defaultChecked: true,
    className: classes.visuallyhidden
  }), _react.default.createElement("label", {
    htmlFor: "".concat(name, "-0"),
    className: classes.pristine
  }, _react.default.createElement("span", {
    className: classes.visuallyhidden
  }, getLabelText(0)))), Array.from(new Array(max)).map(function (_, index) {
    var itemValue = index + 1;

    if (precision < 1) {
      var items = Array.from(new Array(1 / precision));
      return _react.default.createElement("span", {
        key: itemValue,
        className: (0, _clsx.default)(classes.decimal, itemValue === Math.ceil(value) && (hover !== -1 || focus !== -1) && classes.iconActive)
      }, items.map(function ($, indexDecimal) {
        var itemDeciamlValue = roundValueToPrecision(itemValue - 1 + (indexDecimal + 1) * precision, precision);
        return item({
          value: itemDeciamlValue,
          style: items.length - 1 === indexDecimal ? {} : {
            width: itemDeciamlValue === value ? "".concat((indexDecimal + 1) * precision * 100, "%") : '0%',
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
  classes: _propTypes.default.object.isRequired,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * If `true`, the rating will be disabled.
   */
  disabled: _propTypes.default.bool,

  /**
   * The icon to display when empty.
   */
  emptyIcon: _propTypes.default.node,

  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the rating.
   *
   * @param {number} value The rating label's value to format.
   * @returns {string}
   */
  getLabelText: _propTypes.default.func,

  /**
   * The icon to display.
   */
  icon: _propTypes.default.node,

  /**
   * The component containing the icon.
   */
  IconContainerComponent: _propTypes.default.elementType,

  /**
   * Maximum rating.
   */
  max: _propTypes.default.number,

  /**
   * The name attribute of the radio `input` elements.
   * If `readOnly` is false, the prop is required,
   * this input name`should be unique within the parent form.
   */
  name: (0, _utils.chainPropTypes)(_propTypes.default.string, function (props) {
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
  onChange: _propTypes.default.func,

  /**
   * Callback function that is fired when the hover state changes.
   *
   * @param {object} event The event source of the callback.
   * @param {number} value The new value.
   */
  onChangeActive: _propTypes.default.func,

  /**
   * @ignore
   */
  onMouseLeave: _propTypes.default.func,

  /**
   * @ignore
   */
  onMouseMove: _propTypes.default.func,

  /**
   * The minimum increment value change allowed.
   */
  precision: _propTypes.default.number,

  /**
   * Removes all hover effects and pointer events.
   */
  readOnly: _propTypes.default.bool,

  /**
   * The size of the rating.
   */
  size: _propTypes.default.oneOf(['small', 'medium', 'large']),

  /**
   * The rating value.
   */
  value: _propTypes.default.number
} : void 0;

var _default = (0, _styles.withStyles)(styles, {
  name: 'MuiRating'
})(Rating);

exports.default = _default;