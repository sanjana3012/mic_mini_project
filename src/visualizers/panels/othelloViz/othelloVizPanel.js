/*globals define, _, WebGMEGlobal*/
/**
 * Generated by VisualizerGenerator 1.7.0 from webgme on Tue Dec 05 2023 16:30:51 GMT-0600 (Central Standard Time).
 */

define([
    'js/PanelBase/PanelBaseWithHeader',
    'js/PanelManager/IActivePanel',
    'widgets/othelloViz/othelloVizWidget',
    './othelloVizControl'
], function (
    PanelBaseWithHeader,
    IActivePanel,
    othelloVizWidget,
    othelloVizControl
) {
    'use strict';

    function othelloVizPanel(layoutManager, params) {
        var options = {};
        //set properties from options
        options[PanelBaseWithHeader.OPTIONS.LOGGER_INSTANCE_NAME] = 'othelloVizPanel';
        options[PanelBaseWithHeader.OPTIONS.FLOATING_TITLE] = true;

        //call parent's constructor
        PanelBaseWithHeader.apply(this, [options, layoutManager]);

        this._client = params.client;

        //initialize UI
        this._initialize();

        this.logger.debug('ctor finished');
    }

    //inherit from PanelBaseWithHeader
    _.extend(othelloVizPanel.prototype, PanelBaseWithHeader.prototype);
    _.extend(othelloVizPanel.prototype, IActivePanel.prototype);

    othelloVizPanel.prototype._initialize = function () {
        var self = this;

        //set Widget title
        this.setTitle('');

        this.widget = new othelloVizWidget(this.logger, this.$el);

        this.widget.setTitle = function (title) {
            self.setTitle(title);
        };

        this.control = new othelloVizControl({
            logger: this.logger,
            client: this._client,
            widget: this.widget
        });

        this.onActivate();
    };

    /* OVERRIDE FROM WIDGET-WITH-HEADER */
    /* METHOD CALLED WHEN THE WIDGET'S READ-ONLY PROPERTY CHANGES */
    othelloVizPanel.prototype.onReadOnlyChanged = function (isReadOnly) {
        //apply parent's onReadOnlyChanged
        PanelBaseWithHeader.prototype.onReadOnlyChanged.call(this, isReadOnly);

    };

    othelloVizPanel.prototype.onResize = function (width, height) {
        this.logger.debug('onResize --> width: ' + width + ', height: ' + height);
        this.widget.onWidgetContainerResize(width, height);
    };

    /* * * * * * * * Visualizer life cycle callbacks * * * * * * * */
    othelloVizPanel.prototype.destroy = function () {
        this.control.destroy();
        this.widget.destroy();

        PanelBaseWithHeader.prototype.destroy.call(this);
        WebGMEGlobal.KeyboardManager.setListener(undefined);
        WebGMEGlobal.Toolbar.refresh();
    };

    othelloVizPanel.prototype.onActivate = function () {
        this.widget.onActivate();
        this.control.onActivate();
        WebGMEGlobal.KeyboardManager.setListener(this.widget);
        WebGMEGlobal.Toolbar.refresh();
    };

    othelloVizPanel.prototype.onDeactivate = function () {
        this.widget.onDeactivate();
        this.control.onDeactivate();
        WebGMEGlobal.KeyboardManager.setListener(undefined);
        WebGMEGlobal.Toolbar.refresh();
    };

    return othelloVizPanel;
});
