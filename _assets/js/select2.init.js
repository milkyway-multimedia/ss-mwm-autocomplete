/**
 * Milkyway Multimedia
 *
 *
 * @package
 * @author Mellisa Hankins <mellisa.hankins@me.com>
 */

(
    function ($) {
        $.entwine('ss', function ($) {
            $('.select2:input').entwine({
                onmatch:       function () {
                    var $this = this,
                        config = $.extend({}, this.configuration($this), $this.data());

                    if ($this.hasClass('has-select2')) {
                        return this._super();
                    }

                    if ($this.data('prefetchUrl')) {
                        var results = [];
                        $this[0].disabled = true;

                        $this.addClass('processing');

                        $.ajax({
                            type:     'GET',
                            url:      $this.data('prefetchUrl'),
                            success:  function (response) {
                                results = response;
                            },
                            complete: function () {
                                config.data = {
                                    results: results
                                };

                                $this[0].disabled = false;
                                $this.select2(config);

                                $this.removeClass('processing');
                            }
                        });
                    }
                    else {
                        $this.select2(config);
                    }

                    return this._super();
                },
                onunmatch:     function () {
                    this._super();
                },
                configuration: function ($this) {
                    var options = {
                        width: 'resolve'
                    };

                    if ($this.data('suggestUrl')) {
                        options.ajax = {
                            url:     $this.data('suggestUrl'),
                            cache:   true,
                            data:    function (term) {
                                return {
                                    q: term
                                };
                            },
                            processResults: function (data) {
                                return {
                                    results: data
                                };
                            }
                        };
                    }
                    else if($this.data('local')) {
                        options.data = {
                            results: $this.data('local')
                        };
                    }

                    if ($this.data('allowHtml')) {
                        options.escapeMarkup = function (m) {
                            return m;
                        };
                    }

                    if (!$this.attr('required')) {
                        options.allowClear = true;

                        if (options.hasOwnProperty('data') && !this.hasEmptyItem(options.data.results)) {
                            options.data.results.unshift(options.data.results, {
                                id:   '',
                                text: ($this.attr('placeholder') || $this.data('placeholder') || '')
                            });
                        }
                    }

                    if (!$this.data('requireSelection')) {
                        options.createSearchChoice = function (term) {
                            return {
                                id:   term,
                                text: term
                            };
                        };
                    }

                    return options;
                },
                hasEmptyItem: function(data) {
                    for(var item in data) {
                        if(!data.hasOwnProperty(item)) {
                            continue;
                        }

                        if(data['item'].hasOwnProperty['id'] && !data['item'].id) {
                            return true;
                        }
                    }

                    return false;
                }
            });
        });
    }(jQuery)
);
