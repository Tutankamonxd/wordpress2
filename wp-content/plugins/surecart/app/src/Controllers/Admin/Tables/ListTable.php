<?php

namespace SureCart\Controllers\Admin\Tables;

use SureCart\Models\Integration;
use SureCart\Support\TimeDate;

// WP_List_Table is not loaded automatically so we need to load it in our application.
if ( ! class_exists( 'WP_List_Table' ) ) {
	require_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
}

/**
 * Base list table class.
 */
abstract class ListTable extends \WP_List_Table {
	public $checkbox = true;

	/**
	 * Show filters in extra tablenav top
	 *
	 * @param [type] $which
	 * @return void
	 */
	protected function extra_tablenav( $which ) {
		if ( 'top' === $which ) {
			return $this->views();
		}
	}

	/**
	 * Define which columns are hidden
	 *
	 * @return Array
	 */
	public function get_hidden_columns() {
		return array();
	}

	/**
	 * Override the parent columns method. Defines the columns to use in your listing table
	 *
	 * @return Array
	 */
	public function get_columns() {
		$current_page = ! empty( $_GET['page'] ) ? sanitize_text_field( $_GET['page'] ) : '';

		/**
		 * Filters the columns displayed in the Coupons list table.
		 *
		 * @param string[] $coupon_columns An associative array of column headings.
		 */
		return (array) apply_filters( "manage_{$current_page}_columns", array() );
	}
	/**
	 * Handles the default column output.
	 *
	 * @param WP_Post $item        The current WP_Post object.
	 * @param string  $column_name The current column name.
	 */
	public function column_default( $item, $column_name ) {
		$current_page = ! empty( $_GET['page'] ) ? sanitize_text_field( $_GET['page'] ) : '';
		/**
		 * Fires for each custom column of any SureCart List Table.
		 *
		 * The dynamic portion of the hook name, `$current_page`, refers to the page name.
		 *
		 * Possible hook names include:
		 *
		 *  - `manage_orders_custom_column`
		 *  - `manage_products_custom_column`
		 *
		 * @param string $column_name The name of the column to display.
		 * @param mixed  $item        The current item's data object.
		 */
		do_action( "manage_{$current_page}_custom_column", $column_name, $item );
	}

	/**
	 * Get the archive query status.
	 *
	 * @return boolean|null
	 */
	public function getArchiveStatus( $default = 'active' ) {
		$status   = sanitize_text_field( wp_unslash( $_GET['status'] ?? $default ) );
		$archived = false;
		if ( 'archived' === $status ) {
			$archived = true;
		}
		if ( 'all' === $status ) {
			$archived = null;
		}

		return $archived;
	}

	/**
	 * Handle the date
	 *
	 * @param \SureCart\Models\Model $model Model.
	 *
	 * @return string
	 */
	public function column_date( $model ) {
		$created = sprintf(
			'<time datetime="%1$s" title="%2$s">%3$s</time>',
			esc_attr( $model->created_at ),
			esc_html( $model->created_at_date_time ),
			esc_html( TimeDate::humanTimeDiff( $model->created_at ) )
		);
		$updated = sprintf(
			'%1$s <time datetime="%2$s" title="%3$s">%4$s</time>',
			__( 'Updated', 'surecart' ),
			esc_attr( $model->updated_at_date_time ),
			esc_html( $model->updated_at_date_time ),
			esc_html( TimeDate::humanTimeDiff( $model->updated_at ) )
		);

		return $created . '<br /><small style="opacity: 0.75">' . $updated . '</small>';
	}

	/**
	 * Handle the created column
	 *
	 * @param \SureCart\Models\Model $model Model.
	 *
	 * @return string
	 */
	public function column_created( $model ) {
		return esc_attr( $model->created_at_date_time );
	}

	/**
	 * The mode for the model.
	 *
	 * @param \SureCart\Models\Model $model Model.
	 *
	 * @return string
	 */
	public function column_mode( $model ) {
		return empty( $model->live_mode ) ? '<sc-tag type="warning">' . __( 'Test', 'surecart' ) . '</sc-tag>' : '';
	}

	/**
	 * Show an integrations list based on a product id.
	 *
	 * @param string $args The args.
	 *
	 * @return string
	 */
	public function productIntegrationsList( $args ) {
		// parse the args.
		$args = wp_parse_args(
			$args,
			[
				'product_id' => '',
				'price_id'   => '',
				'variant_id' => '',
			]
		);

		// get the integration first by product id.
		$integrations = Integration::where( 'model_id', $args['product_id'] );

		$output       = '';
		$integrations = $integrations->group_by( 'integration_id' )->get();
		if ( empty( $integrations ) || is_wp_error( $integrations ) ) {
			return $output;
		}

		foreach ( $integrations as $integration ) {
			$provider = (object) apply_filters( "surecart/integrations/providers/find/{$integration->provider}", [] );
			$item     = (object) apply_filters( "surecart/integrations/providers/{$integration->provider}/item", $integration->integration_id );
			if ( $integration->price_id && $args['price_id'] && $integration->price_id !== $args['price_id'] ) {
				continue;
			}
			if ( $integration->variant_id && $args['variant_id'] && $integration->variant_id !== $args['variant_id'] ) {
				continue;
			}
			if ( ! empty( $item->label ) ) {
				ob_start();
				?>
				<sc-tooltip text="<?php echo esc_attr( $provider->label ?? '' ); ?>" type="text" style="display:inline-block; cursor: help">
					<sc-flex justify-content="flex-start">
					<?php if ( $provider->logo ) : ?>
							<img src="<?php echo esc_url( $provider->logo ); ?>" style="width: 18px; height: 18px"/>
						<?php endif; ?>
					<?php echo wp_kses_post( $item->label ); ?>
					</sc-flex>
				</sc-tooltip>
				<br />
				<?php
				$output .= ob_get_clean();
			}
		}
		return $output;
	}

	/**
	 * Get the search query from the url args.
	 *
	 * @return string
	 */
	public function get_search_query() {
		$search = urldecode( $_GET['s'] ?? '' );
		return str_replace( [ "\r", "\n" ], '', $search );
	}

	/**
	 * Display a search form
	 *
	 * @param string $text The 'submit' button label.
	 * @param string $input_id  ID attribute value for the search input field.
	 *
	 * @return void
	 */
	public function search_form( $text, $input_id ) {
		?>
		<form id="posts-filter" method="get">
			<?php if ( isset( $_GET['page'] ) ) : ?>
				<input type="hidden" name="page" value="<?php echo esc_attr( $_GET['page'] ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended ?>">
			<?php endif; ?>
			<?php if ( isset( $_GET['status'] ) ) : ?>
				<input type="hidden" name="status" value="<?php echo esc_attr( $_GET['status'] ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended ?>">
			<?php endif; ?>
			<?php if ( isset( $_GET['live_mode'] ) ) : ?>
				<input type="hidden" name="live_mode" value="<?php echo esc_attr( $_GET['live_mode'] ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended ?>">
			<?php endif; ?>
			<?php $this->search_box( $text, $input_id ); ?>
		</form>
		<?php
	}
}
