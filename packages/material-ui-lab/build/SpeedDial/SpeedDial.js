"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _warning = _interopRequireDefault(require("warning"));

var _styles = require("@material-ui/core/styles");

var _Zoom = _interopRequireDefault(require("@material-ui/core/Zoom"));

var _Fab = _interopRequireDefault(require("@material-ui/core/Fab"));

var _utils = require("@material-ui/core/utils");

var utils = _interopRequireWildcard(require("./utils"));

function clamp(value, min, max) {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
}

var dialRadius = 32;
var spacingActions = 16;
var styles = {
  /* Styles applied to the root element. */
  root: {
    zIndex: 1050,
    display: 'flex',
    pointerEvents: 'none'
  },

  /* Styles applied to the Button component. */
  fab: {
    pointerEvents: 'auto'
  },

  /* Styles applied to the root and action container elements when direction="up" */
  directionUp: {
    flexDirection: 'column-reverse'
  },

  /* Styles applied to the root and action container elements when direction="down" */
  directionDown: {
    flexDirection: 'column'
  },

  /* Styles applied to the root and action container elements when direction="left" */
  directionLeft: {
    flexDirection: 'row-reverse'
  },

  /* Styles applied to the root and action container elements when direction="right" */
  directionRight: {
    flexDirection: 'row'
  },

  /* Styles applied to the actions (`children` wrapper) element. */
  actions: {
    display: 'flex',
    pointerEvents: 'auto',
    '&$directionUp': {
      marginBottom: -dialRadius,
      paddingBottom: spacingActions + dialRadius
    },
    '&$directionRight': {
      marginLeft: -dialRadius,
      paddingLeft: spacingActions + dialRadius
    },
    '&$directionDown': {
      marginTop: -dialRadius,
      paddingTop: spacingActions + dialRadius
    },
    '&$directionLeft': {
      marginRight: -dialRadius,
      paddingRight: spacingActions + dialRadius
    }
  },

  /* Styles applied to the actions (`children` wrapper) element if `open={false}`. */
  actionsClosed: {
    transition: 'top 0s linear 0.2s',
    pointerEvents: 'none'
  }
};
exports.styles = styles;

var SpeedDial = _react.default.forwardRef(function SpeedDial(props, ref) {
  var ariaLabel = props.ariaLabel,
      _props$ButtonProps = props.ButtonProps;
  _props$ButtonProps = _props$ButtonProps === void 0 ? {} : _props$ButtonProps;
  var origDialButtonRef = _props$ButtonProps.ref,
      ButtonProps = (0, _objectWithoutProperties2.default)(_props$ButtonProps, ["ref"]),
      childrenProp = props.children,
      classes = props.classes,
      classNameProp = props.className,
      _props$hidden = props.hidden,
      hidden = _props$hidden === void 0 ? false : _props$hidden,
      iconProp = props.icon,
      onClick = props.onClick,
      onClose = props.onClose,
      onKeyDown = props.onKeyDown,
      open = props.open,
      _props$direction = props.direction,
      direction = _props$direction === void 0 ? 'up' : _props$direction,
      openIcon = props.openIcon,
      _props$TransitionComp = props.TransitionComponent,
      TransitionComponent = _props$TransitionComp === void 0 ? _Zoom.default : _props$TransitionComp,
      _props$transitionDura = props.transitionDuration,
      transitionDuration = _props$transitionDura === void 0 ? {
    enter: _styles.duration.enteringScreen,
    exit: _styles.duration.leavingScreen
  } : _props$transitionDura,
      TransitionProps = props.TransitionProps,
      other = (0, _objectWithoutProperties2.default)(props, ["ariaLabel", "ButtonProps", "children", "classes", "className", "hidden", "icon", "onClick", "onClose", "onKeyDown", "open", "direction", "openIcon", "TransitionComponent", "transitionDuration", "TransitionProps"]);
  /**
   * an index in actions.current
   */

  var focusedAction = _react.default.useRef(0);
  /**
   * pressing this key while the focus is on a child SpeedDialAction focuses
   * the next SpeedDialAction.
   * It is equal to the first arrow key pressed while focus is on the SpeedDial
   * that is not orthogonal to the direction.
   * @type {utils.ArrowKey?}
   */


  var nextItemArrowKey = _react.default.useRef(undefined);
  /**
   * refs to the Button that have an action associated to them in this SpeedDial
   * [Fab, ...(SpeedDialActions > Button)]
   * @type {HTMLButtonElement[]}
   */


  var actions = _react.default.useRef([]);

  var handleOwnFabRef = _react.default.useCallback(function (fabFef) {
    actions.current[0] = fabFef;
  }, []);

  var handleFabRef = (0, _utils.useForkRef)(origDialButtonRef, handleOwnFabRef);
  /**
   * creates a ref callback for the Button in a SpeedDialAction
   * Is called before the original ref callback for Button that was set in buttonProps
   *
   * @param dialActionIndex {number}
   * @param origButtonRef {React.RefObject?}
   */

  var createHandleSpeedDialActionButtonRef = function createHandleSpeedDialActionButtonRef(dialActionIndex, origButtonRef) {
    return function (buttonRef) {
      actions.current[dialActionIndex + 1] = buttonRef;

      if (origButtonRef) {
        origButtonRef(buttonRef);
      }
    };
  };

  var closeActions = function closeActions(event, key) {
    actions.current[0].focus();

    if (onClose) {
      onClose(event, key);
    }
  };

  var handleKeyboardNavigation = function handleKeyboardNavigation(event) {
    var key = event.key.replace('Arrow', '').toLowerCase();
    var _nextItemArrowKey$cur = nextItemArrowKey.current,
        nextItemArrowKeyCurrent = _nextItemArrowKey$cur === void 0 ? key : _nextItemArrowKey$cur;

    if (event.key === 'Escape') {
      closeActions(event, 'esc');
    } else if (utils.sameOrientation(key, direction)) {
      event.preventDefault();
      var actionStep = key === nextItemArrowKeyCurrent ? 1 : -1; // stay within array indices

      var nextAction = clamp(focusedAction.current + actionStep, 0, actions.current.length - 1);
      var nextActionRef = actions.current[nextAction];
      nextActionRef.focus();
      focusedAction.current = nextAction;
      nextItemArrowKey.current = nextItemArrowKeyCurrent;
    }

    if (onKeyDown) {
      onKeyDown(event, key);
    }
  }; // actions were closed while navigation state was not reset


  if (!open && nextItemArrowKey.current !== undefined) {
    focusedAction.current = 0;
    nextItemArrowKey.current = undefined;
  } // Filter the label for valid id characters.


  var id = ariaLabel.replace(/^[^a-z]+|[^\w:.-]+/gi, '');
  var orientation = utils.getOrientation(direction);
  var totalValidChildren = 0;

  _react.default.Children.forEach(childrenProp, function (child) {
    if (_react.default.isValidElement(child)) totalValidChildren += 1;
  });

  actions.current = [];
  var validChildCount = 0;

  var children = _react.default.Children.map(childrenProp, function (child) {
    if (!_react.default.isValidElement(child)) {
      return null;
    }

    process.env.NODE_ENV !== "production" ? (0, _warning.default)(child.type !== _react.default.Fragment, ["Material-UI: the SpeedDial component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n')) : void 0;
    var delay = 30 * (open ? validChildCount : totalValidChildren - validChildCount);
    validChildCount += 1;
    var _child$props$ButtonPr = child.props.ButtonProps;
    _child$props$ButtonPr = _child$props$ButtonPr === void 0 ? {} : _child$props$ButtonPr;
    var origButtonRef = _child$props$ButtonPr.ref,
        ChildButtonProps = (0, _objectWithoutProperties2.default)(_child$props$ButtonPr, ["ref"]);
    var NewChildButtonProps = (0, _extends2.default)({}, ChildButtonProps, {
      ref: createHandleSpeedDialActionButtonRef(validChildCount - 1, origButtonRef)
    });
    return _react.default.cloneElement(child, {
      ButtonProps: NewChildButtonProps,
      delay: delay,
      onKeyDown: handleKeyboardNavigation,
      open: open,
      id: "".concat(id, "-item-").concat(validChildCount)
    });
  });

  var icon = function icon() {
    if (_react.default.isValidElement(iconProp) && (0, _utils.isMuiElement)(iconProp, ['SpeedDialIcon'])) {
      return _react.default.cloneElement(iconProp, {
        open: open
      });
    }

    return iconProp;
  };

  var actionsPlacementClass = (0, _clsx.default)({
    up: classes.directionUp,
    down: classes.directionDown,
    left: classes.directionLeft,
    right: classes.directionRight
  }[direction]);
  var clickProps = {
    onClick: onClick
  };

  if (typeof document !== 'undefined' && 'ontouchstart' in document.documentElement) {
    clickProps.onTouchEnd = function (event) {
      onClick();
      event.preventDefault();
      event.stopPropagation();
    };
  }

  return _react.default.createElement("div", (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, actionsPlacementClass, classNameProp),
    ref: ref
  }, other), _react.default.createElement(TransitionComponent, (0, _extends2.default)({
    in: !hidden,
    timeout: transitionDuration,
    unmountOnExit: true
  }, TransitionProps), _react.default.createElement(_Fab.default, (0, _extends2.default)({
    color: "primary",
    onKeyDown: handleKeyboardNavigation,
    "aria-label": ariaLabel,
    "aria-haspopup": "true",
    "aria-expanded": open ? 'true' : 'false',
    "aria-controls": "".concat(id, "-actions")
  }, clickProps, ButtonProps, {
    className: (0, _clsx.default)(classes.fab, ButtonProps.className),
    ref: handleFabRef
  }), icon())), _react.default.createElement("div", {
    id: "".concat(id, "-actions"),
    role: "menu",
    "aria-orientation": orientation,
    className: (0, _clsx.default)(classes.actions, actionsPlacementClass, !open && classes.actionsClosed)
  }, children));
});

process.env.NODE_ENV !== "production" ? SpeedDial.propTypes = {
  /**
   * The aria-label of the `Button` element.
   * Also used to provide the `id` for the `SpeedDial` element and its children.
   */
  ariaLabel: _propTypes.default.string.isRequired,

  /**
   * Props applied to the [`Button`](/api/button/) element.
   */
  ButtonProps: _propTypes.default.object,

  /**
   * SpeedDialActions to display when the SpeedDial is `open`.
   */
  children: _propTypes.default.node.isRequired,

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
   * The direction the actions open relative to the floating action button.
   */
  direction: _propTypes.default.oneOf(['up', 'down', 'left', 'right']),

  /**
   * If `true`, the SpeedDial will be hidden.
   */
  hidden: _propTypes.default.bool,

  /**
   * The icon to display in the SpeedDial Floating Action Button. The `SpeedDialIcon` component
   * provides a default Icon with animation.
   */
  icon: _propTypes.default.element.isRequired,

  /**
   * @ignore
   */
  onClick: _propTypes.default.func,

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} key The key pressed.
   */
  onClose: _propTypes.default.func,

  /**
   * @ignore
   */
  onKeyDown: _propTypes.default.func,

  /**
   * If `true`, the SpeedDial is open.
   */
  open: _propTypes.default.bool.isRequired,

  /**
   * The icon to display in the SpeedDial Floating Action Button when the SpeedDial is open.
   */
  openIcon: _propTypes.default.node,

  /**
   * The component used for the transition.
   */
  TransitionComponent: _propTypes.default.elementType,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
    enter: _propTypes.default.number,
    exit: _propTypes.default.number
  })]),

  /**
   * Props applied to the `Transition` element.
   */
  TransitionProps: _propTypes.default.object
} : void 0;

var _default = (0, _styles.withStyles)(styles, {
  name: 'MuiSpeedDial'
})(SpeedDial);

exports.default = _default;