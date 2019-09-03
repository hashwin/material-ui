import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import warning from 'warning';
import { duration, withStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import { isMuiElement, useForkRef } from '@material-ui/core/utils';
import * as utils from './utils';

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
export var styles = {
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
var SpeedDial = React.forwardRef(function SpeedDial(props, ref) {
  var ariaLabel = props.ariaLabel,
      _props$ButtonProps = props.ButtonProps;
  _props$ButtonProps = _props$ButtonProps === void 0 ? {} : _props$ButtonProps;

  var origDialButtonRef = _props$ButtonProps.ref,
      ButtonProps = _objectWithoutProperties(_props$ButtonProps, ["ref"]),
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
      TransitionComponent = _props$TransitionComp === void 0 ? Zoom : _props$TransitionComp,
      _props$transitionDura = props.transitionDuration,
      transitionDuration = _props$transitionDura === void 0 ? {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen
  } : _props$transitionDura,
      TransitionProps = props.TransitionProps,
      other = _objectWithoutProperties(props, ["ariaLabel", "ButtonProps", "children", "classes", "className", "hidden", "icon", "onClick", "onClose", "onKeyDown", "open", "direction", "openIcon", "TransitionComponent", "transitionDuration", "TransitionProps"]);
  /**
   * an index in actions.current
   */


  var focusedAction = React.useRef(0);
  /**
   * pressing this key while the focus is on a child SpeedDialAction focuses
   * the next SpeedDialAction.
   * It is equal to the first arrow key pressed while focus is on the SpeedDial
   * that is not orthogonal to the direction.
   * @type {utils.ArrowKey?}
   */

  var nextItemArrowKey = React.useRef(undefined);
  /**
   * refs to the Button that have an action associated to them in this SpeedDial
   * [Fab, ...(SpeedDialActions > Button)]
   * @type {HTMLButtonElement[]}
   */

  var actions = React.useRef([]);
  var handleOwnFabRef = React.useCallback(function (fabFef) {
    actions.current[0] = fabFef;
  }, []);
  var handleFabRef = useForkRef(origDialButtonRef, handleOwnFabRef);
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
  React.Children.forEach(childrenProp, function (child) {
    if (React.isValidElement(child)) totalValidChildren += 1;
  });
  actions.current = [];
  var validChildCount = 0;
  var children = React.Children.map(childrenProp, function (child) {
    if (!React.isValidElement(child)) {
      return null;
    }

    process.env.NODE_ENV !== "production" ? warning(child.type !== React.Fragment, ["Material-UI: the SpeedDial component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n')) : void 0;
    var delay = 30 * (open ? validChildCount : totalValidChildren - validChildCount);
    validChildCount += 1;
    var _child$props$ButtonPr = child.props.ButtonProps;
    _child$props$ButtonPr = _child$props$ButtonPr === void 0 ? {} : _child$props$ButtonPr;

    var origButtonRef = _child$props$ButtonPr.ref,
        ChildButtonProps = _objectWithoutProperties(_child$props$ButtonPr, ["ref"]);

    var NewChildButtonProps = _extends({}, ChildButtonProps, {
      ref: createHandleSpeedDialActionButtonRef(validChildCount - 1, origButtonRef)
    });

    return React.cloneElement(child, {
      ButtonProps: NewChildButtonProps,
      delay: delay,
      onKeyDown: handleKeyboardNavigation,
      open: open,
      id: "".concat(id, "-item-").concat(validChildCount)
    });
  });

  var icon = function icon() {
    if (React.isValidElement(iconProp) && isMuiElement(iconProp, ['SpeedDialIcon'])) {
      return React.cloneElement(iconProp, {
        open: open
      });
    }

    return iconProp;
  };

  var actionsPlacementClass = clsx({
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

  return React.createElement("div", _extends({
    className: clsx(classes.root, actionsPlacementClass, classNameProp),
    ref: ref
  }, other), React.createElement(TransitionComponent, _extends({
    in: !hidden,
    timeout: transitionDuration,
    unmountOnExit: true
  }, TransitionProps), React.createElement(Fab, _extends({
    color: "primary",
    onKeyDown: handleKeyboardNavigation,
    "aria-label": ariaLabel,
    "aria-haspopup": "true",
    "aria-expanded": open ? 'true' : 'false',
    "aria-controls": "".concat(id, "-actions")
  }, clickProps, ButtonProps, {
    className: clsx(classes.fab, ButtonProps.className),
    ref: handleFabRef
  }), icon())), React.createElement("div", {
    id: "".concat(id, "-actions"),
    role: "menu",
    "aria-orientation": orientation,
    className: clsx(classes.actions, actionsPlacementClass, !open && classes.actionsClosed)
  }, children));
});
process.env.NODE_ENV !== "production" ? SpeedDial.propTypes = {
  /**
   * The aria-label of the `Button` element.
   * Also used to provide the `id` for the `SpeedDial` element and its children.
   */
  ariaLabel: PropTypes.string.isRequired,

  /**
   * Props applied to the [`Button`](/api/button/) element.
   */
  ButtonProps: PropTypes.object,

  /**
   * SpeedDialActions to display when the SpeedDial is `open`.
   */
  children: PropTypes.node.isRequired,

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
   * The direction the actions open relative to the floating action button.
   */
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),

  /**
   * If `true`, the SpeedDial will be hidden.
   */
  hidden: PropTypes.bool,

  /**
   * The icon to display in the SpeedDial Floating Action Button. The `SpeedDialIcon` component
   * provides a default Icon with animation.
   */
  icon: PropTypes.element.isRequired,

  /**
   * @ignore
   */
  onClick: PropTypes.func,

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} key The key pressed.
   */
  onClose: PropTypes.func,

  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,

  /**
   * If `true`, the SpeedDial is open.
   */
  open: PropTypes.bool.isRequired,

  /**
   * The icon to display in the SpeedDial Floating Action Button when the SpeedDial is open.
   */
  openIcon: PropTypes.node,

  /**
   * The component used for the transition.
   */
  TransitionComponent: PropTypes.elementType,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    enter: PropTypes.number,
    exit: PropTypes.number
  })]),

  /**
   * Props applied to the `Transition` element.
   */
  TransitionProps: PropTypes.object
} : void 0;
export default withStyles(styles, {
  name: 'MuiSpeedDial'
})(SpeedDial);