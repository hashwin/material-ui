"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Collapse = _interopRequireDefault(require("@material-ui/core/Collapse"));

var _styles = require("@material-ui/core/styles");

var _utils = require("@material-ui/core/utils");

var _TreeViewContext = _interopRequireDefault(require("../TreeView/TreeViewContext"));

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions  */
var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      outline: 0,
      '&:focus > $content': {
        backgroundColor: theme.palette.grey[400]
      }
    },

    /* Pseudo-class applied to the root element when expanded. */
    expanded: {},

    /* Styles applied to the `role="group"` element. */
    group: {
      margin: 0,
      padding: 0,
      marginLeft: 26
    },

    /* Styles applied to the tree node content. */
    content: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.action.hover
      }
    },

    /* Styles applied to the tree node icon and collapse/expand icon. */
    iconContainer: {
      marginRight: 2,
      width: 24,
      display: 'flex',
      justifyContent: 'center'
    },

    /* Styles applied to the label element. */
    label: {
      width: '100%'
    }
  };
};

exports.styles = styles;

var isPrintableCharacter = function isPrintableCharacter(str) {
  return str && str.length === 1 && str.match(/\S/);
};

var TreeItem = _react.default.forwardRef(function TreeItem(props, ref) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      collapseIcon = props.collapseIcon,
      endIcon = props.endIcon,
      expandIcon = props.expandIcon,
      iconProp = props.icon,
      label = props.label,
      nodeId = props.nodeId,
      onClick = props.onClick,
      onFocus = props.onFocus,
      onKeyDown = props.onKeyDown,
      _props$TransitionComp = props.TransitionComponent,
      TransitionComponent = _props$TransitionComp === void 0 ? _Collapse.default : _props$TransitionComp,
      other = (0, _objectWithoutProperties2.default)(props, ["children", "classes", "className", "collapseIcon", "endIcon", "expandIcon", "icon", "label", "nodeId", "onClick", "onFocus", "onKeyDown", "TransitionComponent"]);

  var _React$useContext = _react.default.useContext(_TreeViewContext.default),
      expandAllSiblings = _React$useContext.expandAllSiblings,
      focus = _React$useContext.focus,
      focusFirstNode = _React$useContext.focusFirstNode,
      focusLastNode = _React$useContext.focusLastNode,
      focusNextNode = _React$useContext.focusNextNode,
      focusPreviousNode = _React$useContext.focusPreviousNode,
      handleFirstChars = _React$useContext.handleFirstChars,
      handleLeftArrow = _React$useContext.handleLeftArrow,
      handleNodeMap = _React$useContext.handleNodeMap,
      contextIcons = _React$useContext.icons,
      isExpanded = _React$useContext.isExpanded,
      isFocused = _React$useContext.isFocused,
      isTabable = _React$useContext.isTabable,
      setFocusByFirstCharacter = _React$useContext.setFocusByFirstCharacter,
      toggle = _React$useContext.toggle;

  var nodeRef = _react.default.useRef(null);

  var contentRef = _react.default.useRef(null);

  var handleRef = (0, _utils.useForkRef)(nodeRef, ref);
  var icon = iconProp;
  var expandable = Boolean(children);
  var expanded = isExpanded ? isExpanded(nodeId) : false;
  var focused = isFocused ? isFocused(nodeId) : false;
  var tabable = isTabable ? isTabable(nodeId) : false;
  var icons = contextIcons || {};

  if (!icon) {
    if (expandable) {
      if (!expanded) {
        icon = expandIcon || icons.defaultExpandIcon;
      } else {
        icon = collapseIcon || icons.defaultCollapseIcon;
      }

      if (!icon) {
        icon = icon || icons.defaultParentIcon;
      }
    } else {
      icon = icons.defaultEndIcon;
    }
  }

  var handleClick = function handleClick(event) {
    if (!focused) {
      focus(nodeId);
    }

    if (expandable) {
      toggle(nodeId);
    }

    if (onClick) {
      onClick(event);
    }
  };

  var handleKeyDown = function handleKeyDown(event) {
    var flag = false;
    var key = event.key;

    var printableCharacter = function printableCharacter() {
      if (key === '*') {
        expandAllSiblings(nodeId);
        flag = true;
      } else if (isPrintableCharacter(key)) {
        setFocusByFirstCharacter(nodeId, key);
        flag = true;
      }
    };

    if (event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }

    if (event.shift) {
      if (key === ' ' || key === 'Enter') {
        event.stopPropagation();
      } else if (isPrintableCharacter(key)) {
        printableCharacter();
      }
    } else {
      switch (key) {
        case 'Enter':
        case ' ':
          if (nodeRef.current === event.currentTarget && expandable) {
            toggle();
            flag = true;
          }

          event.stopPropagation();
          break;

        case 'ArrowDown':
          focusNextNode(nodeId);
          flag = true;
          break;

        case 'ArrowUp':
          focusPreviousNode(nodeId);
          flag = true;
          break;

        case 'ArrowRight':
          if (expandable) {
            if (expanded) {
              focusNextNode(nodeId);
            } else {
              toggle();
            }
          }

          flag = true;
          break;

        case 'ArrowLeft':
          handleLeftArrow(nodeId, event);
          break;

        case 'Home':
          focusFirstNode();
          flag = true;
          break;

        case 'End':
          focusLastNode();
          flag = true;
          break;

        default:
          if (isPrintableCharacter(key)) {
            printableCharacter();
          }

      }
    }

    if (flag) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  var handleFocus = function handleFocus(event) {
    if (!focused && tabable) {
      focus(nodeId);
    }

    if (onFocus) {
      onFocus(event);
    }
  };

  _react.default.useEffect(function () {
    var childIds = _react.default.Children.map(children, function (child) {
      return child.props.nodeId;
    });

    if (handleNodeMap) {
      handleNodeMap(nodeId, childIds);
    }
  }, [children, nodeId, handleNodeMap]);

  _react.default.useEffect(function () {
    if (handleFirstChars && label) {
      handleFirstChars(nodeId, contentRef.current.textContent.substring(0, 1).toLowerCase());
    }
  }, [handleFirstChars, nodeId, label]);

  _react.default.useEffect(function () {
    if (focused) {
      nodeRef.current.focus();
    }
  }, [focused]);

  return _react.default.createElement("li", (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className, expanded && classes.expanded),
    role: "treeitem",
    onKeyDown: handleKeyDown,
    onFocus: handleFocus,
    "aria-expanded": expandable ? expanded : null,
    ref: handleRef,
    tabIndex: tabable ? 0 : -1
  }, other), _react.default.createElement("div", {
    className: classes.content,
    onClick: handleClick,
    ref: contentRef
  }, icon ? _react.default.createElement("div", {
    className: classes.iconContainer
  }, icon) : null, _react.default.createElement(_Typography.default, {
    component: "div",
    className: classes.label
  }, label)), children && _react.default.createElement(TransitionComponent, {
    unmountOnExit: true,
    className: classes.group,
    in: expanded,
    component: "ul",
    role: "group"
  }, children));
});

process.env.NODE_ENV !== "production" ? TreeItem.propTypes = {
  /**
   * The content of the component.
   */
  children: _propTypes.default.node,

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
   * The icon used to collapse the node.
   */
  collapseIcon: _propTypes.default.node,

  /**
   * The icon displayed next to a end node.
   */
  endIcon: _propTypes.default.node,

  /**
   * The icon used to expand the node.
   */
  expandIcon: _propTypes.default.node,

  /**
   * The icon to display next to the tree node's label.
   */
  icon: _propTypes.default.node,

  /**
   * The tree node label.
   */
  label: _propTypes.default.node,

  /**
   * The id of the node.
   */
  nodeId: _propTypes.default.string.isRequired,

  /**
   * @ignore
   */
  onClick: _propTypes.default.func,

  /**
   * @ignore
   */
  onFocus: _propTypes.default.func,

  /**
   * @ignore
   */
  onKeyDown: _propTypes.default.func,

  /**
   * The component used for the transition.
   */
  TransitionComponent: _propTypes.default.elementType
} : void 0;

var _default = (0, _styles.withStyles)(styles, {
  name: 'MuiTreeItem'
})(TreeItem);

exports.default = _default;