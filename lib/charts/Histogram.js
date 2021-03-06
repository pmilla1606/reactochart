'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _d = require('d3');

var _d2 = _interopRequireDefault(_d);

var _BarChart = require('./BarChart.js');

var _BarChart2 = _interopRequireDefault(_BarChart);

var _util = require('../util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropTypes = _react2.default.PropTypes;

var Histogram = _react2.default.createClass({
    displayName: 'Histogram',

    mixins: [(0, _util.InterfaceMixin)('XYChart')],
    propTypes: {
        // the array of data objects
        data: PropTypes.array.isRequired,

        // accessor for X & Y coordinates
        getValue: PropTypes.object,
        axisType: PropTypes.object,
        scale: PropTypes.object
    },
    getDefaultProps: function getDefaultProps() {
        return {};
    },
    getInitialState: function getInitialState() {
        return {
            histogramData: null
        };
    },
    componentWillMount: function componentWillMount() {
        var histogramData = _d2.default.layout.histogram().bins(30)(this.props.data);
        //console.log('histogram', this.props.data, histogramData);
        this.setState({ histogramData: histogramData });
    },

    statics: {
        getOptions: function getOptions(props) {
            var data = props.data;
            var getValue = props.getValue;

            return {
                // todo: real x domain
                domain: {
                    x: _d2.default.extent(data, (0, _util.accessor)(getValue.x)),
                    // todo: real y domain
                    y: [0, 200]
                }
            };
        }
    },
    getHovered: function getHovered() {},
    render: function render() {
        if (!this.state.histogramData) return _react2.default.createElement('g', null);
        var _props = this.props;
        var name = _props.name;
        var scale = _props.scale;
        var axisType = _props.axisType;
        var scaleWidth = _props.scaleWidth;
        var scaleHeight = _props.scaleHeight;
        var plotWidth = _props.plotWidth;
        var plotHeight = _props.plotHeight;

        return _react2.default.createElement(_BarChart2.default, _extends({
            data: this.state.histogramData,
            getValue: { x: 'x', y: 'y' },
            getEndValue: { x: function x(d) {
                    return d.x + d.dx;
                } }
        }, { name: name, scale: scale, axisType: axisType, scaleWidth: scaleWidth, scaleHeight: scaleHeight, plotWidth: plotWidth, plotHeight: plotHeight }));
    }
});

exports.default = Histogram;