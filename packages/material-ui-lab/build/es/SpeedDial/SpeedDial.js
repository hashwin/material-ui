import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
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

const dialRadius = 32;
const spacingActions = 16;
export const styles = {
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
const SpeedDial = React.forwardRef(function SpeedDial(props, ref) {
  const {
    ariaLabel,
    ButtonProps: {
      ref: origDialButtonRef
    } = {},
    children: childrenProp,
    classes,
    className: classNameProp,
    hidden = false,
    icon: iconProp,
    onClick,
    onClose,
    onKeyDown,
    open,
    direction = 'up',
    TransitionComponent = Zoom,
    transitionDuration = {
      enter: duration.enteringScreen,
      exit: duration.leavingScreen
    },
    TransitionProps
  } = props,
        ButtonProps = _objectWithoutPropertiesLoose(props.ButtonProps, ["ref"]),
        other = _objectWithoutPropertiesLoose(props, ["ariaLabel", "ButtonProps", "children", "classes", "className", "hidden", "icon", "onClick", "onClose", "onKeyDown", "open", "direction", "openIcon", "TransitionComponent", "transitionDuration", "TransitionProps"]);
  /**
   * an index in actions.current
   */


  const focusedAction = React.useRef(0);
  /**
   * pressing this key while the focus is on a child SpeedDialAction focuses
   * the next SpeedDialAction.
   * It is equal to the first arrow key pressed while focus is on the SpeedDial
   * that is not orthogonal to the direction.
   * @type {utils.ArrowKey?}
   */

  const nextItemArrowKey = React.useRef(undefined);
  /**
   * refs to the Button that have an action associated to them in this SpeedDial
   * [Fab, ...(SpeedDialActions > Button)]
   * @type {HTMLButtonElement[]}
   */

  const actions = React.useRef([]);
  const handleOwnFabRef = React.useCallback(fabFef => {
    actions.current[0] = fabFef;
  }, []);
  const handleFabRef = useForkRef(origDialButtonRef, handleOwnFabRef);
  /**
   * creates a ref callback for the Button in a SpeedDialAction
   * Is called before the original ref callback for Button that was set in buttonProps
   *
   * @param dialActionIndex {number}
   * @param origButtonRef {React.RefObject?}
   */

  const createHandleSpeedDialActionButtonRef = (dialActionIndex, origButtonRef) => {
    return buttonRef => {
      actions.current[dialActionIndex + 1] = buttonRef;

      if (origButtonRef) {
        origButtonRef(buttonRef);
      }
    };
  };

  const closeActions = (event, key) => {
    actions.current[0].focus();

    if (onClose) {
      onClose(event, key);
    }
  };

  const handleKeyboardNavigation = event => {
    const key = event.key.replace('Arrow', '').toLowerCase();
    const {
      current: nextItemArrowKeyCurrent = key
    } = nextItemArrowKey;

    if (event.key === 'Escape') {
      closeActions(event, 'esc');
    } else if (utils.sameOrientation(key, direction)) {
      event.preventDefault();
      const actionStep = key === nextItemArrowKeyCurrent ? 1 : -1; // stay within array indices

      const nextAction = clamp(focusedAction.current + actionStep, 0, actions.current.length - 1);
      const nextActionRef = actions.current[nextAction];
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


  const id = ariaLabel.replace(/^[^a-z]+|[^\w:.-]+/gi, '');
  const orientation = utils.getOrientation(direction);
  let totalValidChildren = 0;
  React.Children.forEach(childrenProp, child => {
    if (React.isValidElement(child)) totalValidChildren += 1;
  });
  actions.current = [];
  let validChildCount = 0;
  const children = React.Children.map(childrenProp, child => {
    if (!React.isValidElement(child)) {
      return null;
    }

    process.env.NODE_ENV !== "production" ? warning(child.type !== React.Fragment, ["Material-UI: the SpeedDial component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n')) : void 0;
    const delay = 30 * (open ? validChildCount : totalValidChildren - validChildCount);
    validChildCount += 1;

    const {
      ButtonProps: {
        ref: origButtonRef
      } = {}
    } = child.props,
          ChildButtonProps = _objectWithoutPropertiesLoose(child.props.ButtonProps, ["ref"]);

    const NewChildButtonProps = _extends({}, ChildButtonProps, {
      ref: createHandleSpeedDialActionButtonRef(validChildCount - 1, origButtonRef)
    });

    return React.cloneElement(child, {
      ButtonProps: NewChildButtonProps,
      delay,
      onKeyDown: handleKeyboardNavigation,
      open,
      id: `${id}-item-${validChildCount}`
    });
  });

  const icon = () => {
    if (React.isValidElement(iconProp) && isMuiElement(iconProp, ['SpeedDialIcon'])) {
      return React.cloneElement(iconProp, {
        open
      });
    }

    return iconProp;
  };

  const actionsPlacementClass = clsx({
    up: classes.directionUp,
    down: classes.directionDown,
    left: classes.directionLeft,
    right: classes.directionRight
  }[direction]);
  let clickProps = {
    onClick
  };

  if (typeof document !== 'undefined' && 'ontouchstart' in document.documentElement) {
    clickProps.onTouchEnd = event => {
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
    "aria-controls": `${id}-actions`
  }, clickProps, ButtonProps, {
    className: clsx(classes.fab, ButtonProps.className),
    ref: handleFabRef
  }), icon())), React.createElement("div", {
    id: `${id}-actions`,
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