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

var _styles = require("@material-ui/core/styles");

var _Fab = _interopRequireDefault(require("@material-ui/core/Fab"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

// @inheritedComponent Tooltip
var styles = function styles(theme) {
  return {
    /* Styles applied to the root (`Tooltip`) component. */
    root: {
      position: 'relative'
    },

    /* Styles applied to the `Tooltip` label wrapper element */
    tooltip: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[1],
      fontSize: theme.typography.pxToRem(14),
      color: theme.palette.text.primary,
      padding: '5px 16px'
    },

    /* Styles applied to the `Button` component. */
    actionButton: {
      margin: 8,
      color: theme.palette.text.secondary,
      backgroundColor: (0, _styles.emphasize)(theme.palette.background.default, 0.12),
      '&:hover': {
        backgroundColor: (0, _styles.emphasize)(theme.palette.background.default, 0.15)
      }
    },

    /* Styles applied to the `Button` or `Paper` component if `open={true}`. */
    button: {
      transition: "".concat(theme.transitions.create('transform', {
        duration: theme.transitions.duration.shorter
      }), ", opacity 0.8s"),
      opacity: 1
    },

    /* Styles applied to the `Button` or `Paper` component if `open={false}`. */
    buttonClosed: {
      opacity: 0,
      transform: 'scale(0)'
    },

    /* Styles applied to the `Paper` component if `tooltipOpen={true}` */
    textLabel: {
      position: 'absolute',
      right: 65,
      top: 14,
      padding: '5px 16px'
    },

    /* Styles applied to the root (`span`) component if `tooltipOpen={true}`. */
    tooltipOpenContainer: {
      position: 'relative'
    }
  };
};

exports.styles = styles;

var SpeedDialAction = _react.default.forwardRef(function SpeedDialAction(props, ref) {
  var ButtonProps = props.ButtonProps,
      classes = props.classes,
      className = props.className,
      _props$delay = props.delay,
      delay = _props$delay === void 0 ? 0 : _props$delay,
      icon = props.icon,
      id = props.id,
      onClick = props.onClick,
      onKeyDown = props.onKeyDown,
      _props$open = props.open,
      open = _props$open === void 0 ? false : _props$open,
      TooltipClasses = props.TooltipClasses,
      _props$tooltipOpen = props.tooltipOpen,
      tooltipOpenProp = _props$tooltipOpen === void 0 ? false : _props$tooltipOpen,
      _props$tooltipPlaceme = props.tooltipPlacement,
      tooltipPlacement = _props$tooltipPlaceme === void 0 ? 'left' : _props$tooltipPlaceme,
      tooltipTitle = props.tooltipTitle,
      other = (0, _objectWithoutProperties2.default)(props, ["ButtonProps", "classes", "className", "delay", "icon", "id", "onClick", "onKeyDown", "open", "TooltipClasses", "tooltipOpen", "tooltipPlacement", "tooltipTitle"]);

  var _React$useState = _react.default.useState(tooltipOpenProp),
      tooltipOpen = _React$useState[0],
      setTooltipOpen = _React$useState[1];

  var handleTooltipClose = function handleTooltipClose() {
    return setTooltipOpen(false);
  };

  var handleTooltipOpen = function handleTooltipOpen() {
    return setTooltipOpen(true);
  };

  var clickProps = {
    onClick: onClick
  };

  if (typeof document !== 'undefined' && 'ontouchstart' in document.documentElement) {
    var startTime;

    clickProps.onTouchStart = function () {
      startTime = new Date();
    };

    clickProps.onTouchEnd = function (event) {
      // only perform action if the touch is a tap, i.e. not long press
      if (new Date() - startTime < 500) {
        onClick();
      }

      event.preventDefault();
      event.stopPropagation();
    };
  }

  clickProps.style = {
    transitionDelay: "".concat(delay, "ms")
  };

  if (ButtonProps.style) {
    ButtonProps.style.transitionDelay = "".concat(delay, "ms");
  }

  var actionButton = _react.default.createElement(_Fab.default, (0, _extends2.default)({
    size: "small",
    className: (0, _clsx.default)(className, classes.button, classes.actionButton, !open && classes.buttonClosed),
    style: {
      transitionDelay: "".concat(delay, "ms")
    },
    tabIndex: -1,
    role: "menuitem",
    onKeyDown: onKeyDown
  }, ButtonProps, clickProps), icon);

  if (tooltipOpenProp) {
    return _react.default.createElement("span", {
      className: classes.tooltipOpenContainer
    }, _react.default.createElement(_Paper.default, (0, _extends2.default)({
      className: (0, _clsx.default)(classes.textLabel, classes.button, !open && classes.buttonClosed)
    }, clickProps), _react.default.createElement(_Typography.default, {
      color: "inherit"
    }, tooltipTitle)), actionButton);
  }

  return _react.default.createElement(_Tooltip.default, (0, _extends2.default)({
    id: id,
    ref: ref,
    title: tooltipTitle,
    placement: tooltipPlacement,
    onClose: handleTooltipClose,
    onOpen: handleTooltipOpen,
    open: open && tooltipOpen,
    classes: TooltipClasses
  }, other), actionButton);
});

process.env.NODE_ENV !== "production" ? SpeedDialAction.propTypes = {
  /**
   * Props applied to the [`Button`](/api/button/) component.
   */
  ButtonProps: _propTypes.default.object,

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
   * Adds a transition delay, to allow a series of SpeedDialActions to be animated.
   */
  delay: _propTypes.default.number,

  /**
   * The Icon to display in the SpeedDial Floating Action Button.
   */
  icon: _propTypes.default.node.isRequired,

  /**
   * @ignore
   */
  id: _propTypes.default.string,

  /**
   * @ignore
   */
  onClick: _propTypes.default.func,

  /**
   * @ignore
   */
  onKeyDown: _propTypes.default.func,

  /**
   * @ignore
   */
  open: _propTypes.default.bool,

  /**
   * Classes applied to the [`Tooltip`](/api/tooltip/) element.
   */
  TooltipClasses: _propTypes.default.object,

  /**
   * Make the tooltip always visible when the SpeedDial is open.
   */
  tooltipOpen: _propTypes.default.bool,

  /**
   * Placement of the tooltip.
   */
  tooltipPlacement: _propTypes.default.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),

  /**
   * Label to display in the tooltip.
   */
  tooltipTitle: _propTypes.default.node.isRequired
} : void 0;

var _default = (0, _styles.withStyles)(styles, {
  name: 'MuiSpeedDialAction'
})(SpeedDialAction);

exports.default = _default;