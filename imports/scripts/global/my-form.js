function closeAllDropdowns()
{
	$('.my-form .field.select').each(function(i, elm){
		var $this = $(this);
		if($this.data('status') == 'open')
		{
			$this.data('status', 'closed');
			$this.find('.select-dropdown').fadeOut(300);
		}
	});
}

function closeOthersDropdowns(name)
{
	$('.my-form .field.select').each(function(i, elm){
		var $this = $(this);
		if($this.data('name') != name && $this.data('status') == 'open')
		{
			$this.data('status', 'closed');
			$this.find('.select-dropdown').fadeOut(300);
		}
	});
}

function closeDropdown(name)
{
	var $this = $('.my-form .field.select[data-name="'+name+'"]');
	$this.data('status', 'closed');
	$this.find('.select-dropdown').fadeOut(300);
}

$(function($){
	
	// select
	$('.my-form .field.select').each(function(i, elm){
		var $this = $(elm);
		var $select = $(elm).find('select');
		var name = $select.attr('name');
		var options = {};
		var selected = $select.val();
		var size = $this.data('size');
		
		$this.find('option').each(function(i, elm){
			var $option = $(elm);
			options[$option.attr('value')] = $option.html();
		});
		$select.remove();
		$this.data('status', 'closed');
		$this.data('name', name);
		$this.attr('data-name', name);
		
		var $input_value = $('<input type="hidden" name="'+name+'" class="selected-value" value="'+selected+'" />').appendTo($this);
		var $input_text = $('<input type="text" data-name="'+name+'" class="selected-text" value="'+options[selected]+'" readonly="readonly" />').appendTo($this);
		var $dropdown = $('<ul class="select-dropdown" data-name="'+name+'"></ul>').hide().appendTo($this);
		
		if(size)
			$input_text.attr('size', size);
		
		for(var j in options)
			$('<li data-value="'+j+'">'+options[j]+'</li>').appendTo($dropdown);
	});
	$('.my-form .field.select, .my-form .field.select .selected-text').click(function(e){
		e.stopPropagation();
		if($(this).hasClass('field'))
			var $this = $(this);
		else
			var $this = $(this).parent();
		var name = $this.data('name');
		closeOthersDropdowns(name);

		if($this.data('status') == 'open')
		{
			$this.data('status', 'closed');
			$this.find('.select-dropdown').fadeOut(300);
		}
		else
		{
			$this.data('status', 'open');
			$this.find('.select-dropdown').fadeIn(300);
		}
	});
	$('body').click(function(e){
		closeAllDropdowns();
	});
	$('.my-form .field.select .select-dropdown li').click(function(e){
		e.stopPropagation();
		var $this = $(this);
		var value = $this.data('value');
		var text = $this.html();
		var name = $this.parent().data('name');
		$('.selected-value[name="'+name+'"]').val(value);
		$('.selected-text[data-name="'+name+'"]').val(text);
		closeDropdown(name);
	});
	
	
	// slider
	$('.my-form .field.slider').each(function(i, elm){
		var $this = $(elm);
		var $text = $(elm).find('input');
		var name = $text.attr('name');
		var min = $this.data('min');
		var max = $this.data('max');
		var width = $this.data('width');
		if(!$text.val())
			$text.val(min);
		var value = $text.val();
		
		$text.detach();
		$this.data('name', name);
		$this.attr('data-name', name);
		
		var $slider = $('<div data-name="'+name+'" class="slider-block"></div>').appendTo($this);
		if(width)
			$slider.css('width', width);
		$slider.slider(
			{
				min: min,
				max: max,
				value: value,
				slide: function(e, ui){
					$text.val(ui.value);
				}
			}
		);
		$text.appendTo($this);
	});
	
});