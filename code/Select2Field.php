<?php

class Select2Field extends TypeAheadField {

	public $valField = 'ID';

	/**
	 * @var boolean $hasEmptyDefault Show the first <option> element as
	 * empty (not having a value), with an optional label defined through
	 * {@link $emptyString}. By default, the <select> element will be
	 * rendered with the first option from {@link $source} selected.
	 */
	public $hasEmptyDefault = false;

	/**
	 * @var string $emptyString The title shown for an empty default selection,
	 * e.g. "Select...".
	 */
	public $emptyString = '';

	public $allowHTML = false;

	public function setHasEmptyDefault($flag = true) {
		$this->hasEmptyDefault = $flag;

		return $this;
	}

	public function getHasEmptyDefault() {
		return $this->hasEmptyDefault;
	}

	public function setEmptyString($str) {
		$this->setHasEmptyDefault(true);
		$this->emptyString = $str;

		return $this;
	}

	public function getEmptyString() {
		return $this->emptyString;
	}

	function getAttributes() {
		$this->extraClasses[] = 'has-chzn chzn-done';

		$vars = [
			'data-minimum-input-length' => $this->minSearchLength,
			'data-require-selection'    => $this->requireSelection,
			'data-allow-html'           => $this->allowHTML,
		];

		$placeholder = $this->hasEmptyDefault ? $this->emptyString ? $this->emptyString : _t('Select2DropdownField.SELECT___', 'Select...') : ' ';

		if ($placeholder) {
			$vars['placeholder']      = $placeholder;
			$vars['data-placeholder'] = $placeholder;
		}

		$attrs = array_merge(
			parent::getAttributes(), $vars, [
				'type' => 'hidden',
			]
		);

        if(isset($attrs['data-suggest-url']) && is_string($attrs['data-suggest-url'])) {
            $attrs['data-suggest-url'] = str_replace(['q=%QUERY', 'q=%25QUERY'], '', $attrs['data-suggest-url']);
        }

        return $attrs;
	}

	protected function includeJs() {
		Requirements::javascript(THIRDPARTY_DIR . '/jquery/jquery.js');
		Requirements::javascript(THIRDPARTY_DIR . '/jquery-entwine/dist/jquery.entwine-dist.js');
		Requirements::javascript(SS_MWM_AUTOCOMPLETE_DIR . '/thirdparty/select2/select2.js');
		Requirements::javascript(SS_MWM_AUTOCOMPLETE_DIR . '/javascript/select2.init.js');
	}

	protected function includeCss() {
		Requirements::css(SS_MWM_AUTOCOMPLETE_DIR . '/thirdparty/select2/select2.css');
		Requirements::css(SS_MWM_AUTOCOMPLETE_DIR . '/css/select2.field.css');
	}
}