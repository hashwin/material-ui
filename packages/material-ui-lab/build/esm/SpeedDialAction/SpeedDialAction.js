import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
// @inheritedComponent Tooltip
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { emphasize, withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
export var styles = function styles(theme) {
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
      backgroundColor: emphasize(theme.palette.background.default, 0.12),
      '&:hover': {
        backgroundColor: emphasize(theme.palette.background.default, 0.15)
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
      padding: '3px 16px',
      whiteSpace: 'nowrap'
    },

    /* Styles applied to the root (`span`) component if `tooltipOpen={true}`. */
    tooltipOpenContainer: {
      position: 'relative'
    }
  };
};
var SpeedDialAction = React.forwardRef(function SpeedDialAction(props, ref) {
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
      other = _objectWithoutProperties(props, ["ButtonProps", "classes", "className", "delay", "icon", "id", "onClick", "onKeyDown", "open", "TooltipClasses", "tooltipOpen", "tooltipPlacement", "tooltipTitle"]);

  var _React$useState = React.useState(tooltipOpenProp),
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

  if (ButtonProps && ButtonProps.style) {
    ButtonProps.style.transitionDelay = "".concat(delay, "ms");
  }

  var actionButton = React.createElement(Fab, _extends({
    size: "small",
    className: clsx(className, classes.button, classes.actionButton, !open && classes.buttonClosed),
    tabIndex: -1,
    role: "menuitem",
    onKeyDown: onKeyDown
  }, clickProps, ButtonProps), icon);

  if (tooltipOpenProp) {
    return React.createElement("span", {
      className: classes.tooltipOpenContainer
    }, React.createElement(Paper, _extends({
      className: clsx(classes.textLabel, classes.button, !open && classes.buttonClosed)
    }, clickProps), React.createElement(Typography, {
      color: "inherit"
    }, tooltipTitle)), actionButton);
  }

  return React.createElement(Tooltip, _extends({
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
  ButtonProps: PropTypes.object,

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
   * Adds a transition delay, to allow a series of SpeedDialActions to be animated.
   */
  delay: PropTypes.number,

  /**
   * The Icon to display in the SpeedDial Floating Action Button.
   */
  icon: PropTypes.node.isRequired,

  /**
   * @ignore
   */
  id: PropTypes.string,

  /**
   * @ignore
   */
  onClick: PropTypes.func,

  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,

  /**
   * @ignore
   */
  open: PropTypes.bool,

  /**
   * Classes applied to the [`Tooltip`](/api/tooltip/) element.
   */
  TooltipClasses: PropTypes.object,

  /**
   * Make the tooltip always visible when the SpeedDial is open.
   */
  tooltipOpen: PropTypes.bool,

  /**
   * Placement of the tooltip.
   */
  tooltipPlacement: PropTypes.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),

  /**
   * Label to display in the tooltip.
   */
  tooltipTitle: PropTypes.node.isRequired
} : void 0;
export default withStyles(styles, {
  name: 'MuiSpeedDialAction'
})(SpeedDialAction);