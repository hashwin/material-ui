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

var _Add = _interopRequireDefault(require("../internal/svg-icons/Add"));

var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      height: 24
    },

    /* Styles applied to the icon component. */
    icon: {
      transition: theme.transitions.create(['transform', 'opacity'], {
        duration: theme.transitions.duration.short
      })
    },

    /* Styles applied to the icon component if `open={true}`. */
    iconOpen: {
      transform: 'rotate(45deg)'
    },

    /* Styles applied to the icon when and `openIcon` is provided & if `open={true}`. */
    iconWithOpenIconOpen: {
      opacity: 0
    },

    /* Styles applied to the `openIcon` if provided. */
    openIcon: {
      position: 'absolute',
      transition: theme.transitions.create(['transform', 'opacity'], {
        duration: theme.transitions.duration.short
      }),
      opacity: 0,
      transform: 'rotate(-45deg)'
    },

    /* Styles applied to the `openIcon` if provided & if `open={true}`. */
    openIconOpen: {
      transform: 'rotate(0deg)',
      opacity: 1
    }
  };
};

exports.styles = styles;

var SpeedDialIcon = _react.default.forwardRef(function SpeedDialIcon(props, ref) {
  var classes = props.classes,
      iconProp = props.icon,
      open = props.open,
      openIconProp = props.openIcon,
      other = (0, _objectWithoutProperties2.default)(props, ["classes", "icon", "open", "openIcon"]);
  var iconClassName = (0, _clsx.default)(classes.icon, open && [classes.iconOpen, openIconProp && classes.iconWithOpenIconOpen]);
  var openIconClassName = (0, _clsx.default)(classes.openIcon, open && classes.openIconOpen);

  function formatIcon(icon, className) {
    if (_react.default.isValidElement(icon)) {
      return _react.default.cloneElement(icon, {
        className: className
      });
    }

    return icon;
  }

  return _react.default.createElement("span", (0, _extends2.default)({
    className: classes.root,
    ref: ref
  }, other), openIconProp ? formatIcon(openIconProp, openIconClassName) : null, iconProp ? formatIcon(iconProp, iconClassName) : _react.default.createElement(_Add.default, {
    className: iconClassName
  }));
});

process.env.NODE_ENV !== "production" ? SpeedDialIcon.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * The icon to display in the SpeedDial Floating Action Button.
   */
  icon: _propTypes.default.node,

  /**
   * @ignore
   * If `true`, the SpeedDial is open.
   */
  open: _propTypes.default.bool,

  /**
   * The icon to display in the SpeedDial Floating Action Button when the SpeedDial is open.
   */
  openIcon: _propTypes.default.node
} : void 0;
SpeedDialIcon.muiName = 'SpeedDialIcon';

var _default = (0, _styles.withStyles)(styles, {
  name: 'MuiSpeedDialIcon'
})(SpeedDialIcon);

exports.default = _default;