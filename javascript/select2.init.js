/**
 * Milkyway Multimedia
 *
 *
 * @package
 * @author Mellisa Hankins <mellisa.hankins@me.com>
 */

(
    function ($) {
        $.entwine('ss', function($) {
            $('.select2:input').entwine({
                onmatch: function() {
                    var that = this,
                        config = $.extend({}, this.configuration(that), that.data());

                    if(that.hasClass('has-select2'))
                        return this._super();

                    if(that.data('prefetchUrl')) {
                        var results = [];
                        that[0].disabled = true;

                        that.addClass('processing');

                        $.ajax({
                            type: 'GET',
                            url: that.data('prefetchUrl'),
                            success: function(response) {
                                results = response;
                            },
                            complete: function() {
                                config.data = {
                                    results: results
                                };

                                that[0].disabled = false;
                                that.select2(config);

                                that.removeClass('processing');
                            }
                        });
                    }
                    else
                        that.select2(config);

                    return this._super();
                },
                onunmatch: function() {
                    this._super();
                },
                configuration: function(that) {
                    var options = {
                            width: 'resolve'
                        };

                    if(that.data('suggestUrl')) {
                        options.ajax = {
                            url: that.data('suggestUrl'),
                            cache: true,
                            data: function (term) {
                                return {
                                    q: term
                                };
                            },
                            results: function(data) {
                                return {
                                    results: data
                                };
                            }
                        };
                    }
                    else {
                        options.data = {
                            results: that.data('local')
                        };
                    }

                    if(that.data('allowHtml')) {
                        options.escapeMarkup = function(m) {
                            return m;
                        };
                    }

                    if(!that.attr('required'))
                        options.allowClear = true;

                    if(!that.data('requireSelection')) {
                        options.createSearchChoice = function(term) {
                            return {
                                id: term,
                                text: term
                            };
                        };
                    }

                    return options;
                }
            });
        });
    }(jQuery)
);
