"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _TreeViewContext = _interopRequireDefault(require("./TreeViewContext"));

var _styles = require("@material-ui/core/styles");

var styles = {
  /* Styles applied to the root element. */
  root: {
    padding: 0,
    margin: 0,
    listStyle: 'none'
  }
};
exports.styles = styles;
var defaultExpandedDefault = [];

var TreeView = _react.default.forwardRef(function TreeView(props, ref) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      defaultCollapseIcon = props.defaultCollapseIcon,
      defaultEndIcon = props.defaultEndIcon,
      _props$defaultExpande = props.defaultExpanded,
      defaultExpanded = _props$defaultExpande === void 0 ? defaultExpandedDefault : _props$defaultExpande,
      defaultExpandIcon = props.defaultExpandIcon,
      defaultParentIcon = props.defaultParentIcon,
      onNodeToggle = props.onNodeToggle,
      other = (0, _objectWithoutProperties2.default)(props, ["children", "classes", "className", "defaultCollapseIcon", "defaultEndIcon", "defaultExpanded", "defaultExpandIcon", "defaultParentIcon", "onNodeToggle"]);

  var _React$useState = _react.default.useState(defaultExpanded),
      expanded = _React$useState[0],
      setExpanded = _React$useState[1];

  var _React$useState2 = _react.default.useState(null),
      tabable = _React$useState2[0],
      setTabable = _React$useState2[1];

  var _React$useState3 = _react.default.useState(null),
      focused = _React$useState3[0],
      setFocused = _React$useState3[1];

  var firstNode = _react.default.useRef(null);

  var nodeMap = _react.default.useRef({});

  var firstCharMap = _react.default.useRef({});

  var isExpanded = _react.default.useCallback(function (id) {
    return expanded.indexOf(id) !== -1;
  }, [expanded]);

  var isTabable = function isTabable(id) {
    return tabable === id;
  };

  var isFocused = function isFocused(id) {
    return focused === id;
  };

  _react.default.useEffect(function () {
    nodeMap.current = {};

    var childIds = _react.default.Children.map(children, function (child) {
      return child.props.nodeId;
    });

    nodeMap.current[-1] = {
      parent: null,
      children: childIds
    };
    (childIds || []).forEach(function (id, index) {
      if (index === 0) {
        firstNode.current = id;
        setTabable(id);
      }

      nodeMap.current[id] = {
        parent: null
      };
    });
  }, [children]);

  var getLastNode = _react.default.useCallback(function (id) {
    var map = nodeMap.current[id];

    if (isExpanded(id) && map.children && map.children.length > 0) {
      return getLastNode(map.children[map.children.length - 1]);
    }

    return id;
  }, [isExpanded]);

  var focus = function focus(id) {
    if (id) {
      setTabable(id);
    }

    setFocused(id);
  };

  var getNextNode = function getNextNode(id, end) {
    var map = nodeMap.current[id];
    var parent = nodeMap.current[map.parent];

    if (!end) {
      if (isExpanded(id)) {
        return map.children[0];
      }
    }

    if (parent) {
      var nodeIndex = parent.children.indexOf(id);
      var nextIndex = nodeIndex + 1;

      if (parent.children.length > nextIndex) {
        return parent.children[nextIndex];
      }

      return getNextNode(parent.id, true);
    }

    var topLevelNodes = nodeMap.current[-1].children;
    var topLevelNodeIndex = topLevelNodes.indexOf(id);

    if (topLevelNodeIndex !== -1 && topLevelNodeIndex !== topLevelNodes.length - 1) {
      return topLevelNodes[topLevelNodeIndex + 1];
    }

    return null;
  };

  var getPreviousNode = function getPreviousNode(id) {
    var map = nodeMap.current[id];
    var parent = nodeMap.current[map.parent];

    if (parent) {
      var nodeIndex = parent.children.indexOf(id);

      if (nodeIndex !== 0) {
        var nextIndex = nodeIndex - 1;
        return getLastNode(parent.children[nextIndex]);
      }

      return parent.id;
    }

    var topLevelNodes = nodeMap.current[-1].children;
    var topLevelNodeIndex = topLevelNodes.indexOf(id);

    if (topLevelNodeIndex > 0) {
      return getLastNode(topLevelNodes[topLevelNodeIndex - 1]);
    }

    return null;
  };

  var focusNextNode = function focusNextNode(id) {
    var nextNode = getNextNode(id);

    if (nextNode) {
      focus(nextNode);
    }
  };

  var focusPreviousNode = function focusPreviousNode(id) {
    var previousNode = getPreviousNode(id);

    if (previousNode) {
      focus(previousNode);
    }
  };

  var focusFirstNode = function focusFirstNode() {
    if (firstNode.current) {
      focus(firstNode.current);
    }
  };

  var focusLastNode = function focusLastNode() {
    var topLevelNodes = nodeMap.current[-1].children;
    var lastNode = getLastNode(topLevelNodes[topLevelNodes.length - 1]);
    focus(lastNode);
  };

  var toggle = function toggle() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : focused;
    setExpanded(function (prevExpanded) {
      var newExpanded;

      if (prevExpanded.indexOf(value) !== -1) {
        newExpanded = prevExpanded.filter(function (id) {
          return id !== value;
        });
        setTabable(function (oldTabable) {
          var map = nodeMap.current[oldTabable];

          if (oldTabable && (map && map.parent ? map.parent.id : null) === value) {
            return value;
          }

          return oldTabable;
        });
      } else {
        newExpanded = [value].concat((0, _toConsumableArray2.default)(prevExpanded));
      }

      if (onNodeToggle) {
        onNodeToggle(value, newExpanded.indexOf(value) !== -1);
      }

      return newExpanded;
    });
  };

  var expandAllSiblings = function expandAllSiblings(id) {
    var map = nodeMap.current[id];
    var parent = nodeMap.current[map.parent];
    var diff;

    if (parent) {
      diff = parent.children.filter(function (child) {
        return !isExpanded(child);
      });
    } else {
      var topLevelNodes = nodeMap.current[-1].children;
      diff = topLevelNodes.filter(function (node) {
        return !isExpanded(node);
      });
    }

    setExpanded(function (oldExpanded) {
      return [].concat((0, _toConsumableArray2.default)(oldExpanded), (0, _toConsumableArray2.default)(diff));
    });
  };

  var handleLeftArrow = function handleLeftArrow(id, event) {
    var flag = false;

    if (isExpanded(id)) {
      toggle(id);
      flag = true;
    } else {
      var parent = nodeMap.current[id].parent;

      if (parent) {
        focus(parent);
        flag = true;
      }
    }

    if (flag && event) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  var getIndexFirstChars = function getIndexFirstChars(firstChars, startIndex, char) {
    for (var i = startIndex; i < firstChars.length; i += 1) {
      if (char === firstChars[i]) {
        return i;
      }
    }

    return -1;
  };

  var setFocusByFirstCharacter = function setFocusByFirstCharacter(id, char) {
    var start;
    var index;
    var lowercaseChar = char.toLowerCase();
    var firstCharIds = [];
    var firstChars = []; // This really only works since the ids are strings

    Object.entries(firstCharMap.current).forEach(function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          nodeId = _ref2[0],
          firstChar = _ref2[1];

      var map = nodeMap.current[nodeId];
      var visible = map.parent ? isExpanded(map.parent) : true;

      if (visible) {
        firstCharIds.push(nodeId);
        firstChars.push(firstChar);
      }
    }); // Get start index for search based on position of currentItem

    start = firstCharIds.indexOf(id) + 1;

    if (start === nodeMap.current.length) {
      start = 0;
    } // Check remaining slots in the menu


    index = getIndexFirstChars(firstChars, start, lowercaseChar); // If not found in remaining slots, check from beginning

    if (index === -1) {
      index = getIndexFirstChars(firstChars, 0, lowercaseChar);
    } // If match was found...


    if (index > -1) {
      focus(firstCharIds[index]);
    }
  };

  var handleNodeMap = function handleNodeMap(id, childrenIds) {
    var currentMap = nodeMap.current[id];
    nodeMap.current[id] = (0, _extends2.default)({}, currentMap, {
      children: childrenIds,
      id: id
    });
    (childrenIds || []).forEach(function (childId) {
      var currentChildMap = nodeMap.current[childId];
      nodeMap.current[childId] = (0, _extends2.default)({}, currentChildMap, {
        parent: id,
        id: childId
      });
    });
  };

  var handleFirstChars = function handleFirstChars(id, firstChar) {
    firstCharMap.current[id] = firstChar;
  };

  return _react.default.createElement(_TreeViewContext.default.Provider, {
    value: {
      expandAllSiblings: expandAllSiblings,
      focus: focus,
      focusFirstNode: focusFirstNode,
      focusLastNode: focusLastNode,
      focusNextNode: focusNextNode,
      focusPreviousNode: focusPreviousNode,
      handleFirstChars: handleFirstChars,
      handleLeftArrow: handleLeftArrow,
      handleNodeMap: handleNodeMap,
      icons: {
        defaultCollapseIcon: defaultCollapseIcon,
        defaultExpandIcon: defaultExpandIcon,
        defaultParentIcon: defaultParentIcon,
        defaultEndIcon: defaultEndIcon
      },
      isExpanded: isExpanded,
      isFocused: isFocused,
      isTabable: isTabable,
      setFocusByFirstCharacter: setFocusByFirstCharacter,
      toggle: toggle
    }
  }, _react.default.createElement("ul", (0, _extends2.default)({
    role: "tree",
    className: (0, _clsx.default)(classes.root, className),
    ref: ref
  }, other), children));
});

process.env.NODE_ENV !== "production" ? TreeView.propTypes = {
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
   * The default icon used to collapse the node.
   */
  defaultCollapseIcon: _propTypes.default.node,

  /**
   * The default icon displayed next to a end node. This is applied to all
   * tree nodes and can be overridden by the TreeItem `icon` prop.
   */
  defaultEndIcon: _propTypes.default.node,

  /**
   * Expanded node ids.
   */
  defaultExpanded: _propTypes.default.arrayOf(_propTypes.default.string),

  /**
   * The default icon used to expand the node.
   */
  defaultExpandIcon: _propTypes.default.node,

  /**
   * The default icon displayed next to a parent node. This is applied to all
   * parent nodes and can be overridden by the TreeItem `icon` prop.
   */
  defaultParentIcon: _propTypes.default.node,

  /**
   * Callback fired when a `TreeItem` is expanded/collapsed.
   *
   * @param {string} nodeId The id of the toggled node.
   * @param {boolean} expanded The node status - If `true` the node was expanded. If `false` the node was collapsed.
   */
  onNodeToggle: _propTypes.default.func
} : void 0;

var _default = (0, _styles.withStyles)(styles, {
  name: 'MuiTreeView'
})(TreeView);

exports.default = _default;