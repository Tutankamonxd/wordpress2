<span <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
	<?php echo esc_html( $price->name ?? $product->name ?? '' ); ?>
</span>
