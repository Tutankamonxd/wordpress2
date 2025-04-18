<?php

namespace SureCart\WordPress\Templates;

use SureCartCore\ServiceProviders\ServiceProviderInterface;

/**
 * Templates service provider.
 */
class TemplatesServiceProvider implements ServiceProviderInterface {
	/**
	 * Register all dependencies in the IoC container.
	 *
	 * @param \Pimple\Container $container Service container.
	 * @return void
	 */
	public function register( $container ) {
		$container['surecart.templates.page'] = function ( $c ) {
			return new TemplatesService(
				$c,
				[
					'pages/template-surecart-blank.php' => 'SureCart',
					'pages/template-surecart-dashboard.php' => 'SureCart Customer Dashboard',
				],
				'page'
			);
		};

		$container['surecart.templates.product'] = function ( $c ) {
			return new TemplatesService(
				$c,
				[
					'pages/template-surecart-product.php' => 'SureCart Layout',
				],
				'sc_product'
			);
		};

		$container['surecart.templates.collection'] = function ( $c ) {
			return new CollectionTemplateService(
				[
					'pages/template-surecart-collection.php' => 'SureCart Layout',
				]
			);
		};

		$container['surecart.templates.upsell'] = function ( $c ) {
			return new UpsellTemplatesService(
				$c,
				[
					'pages/template-surecart-blank.php' => 'SureCart Layout',
				],
			);
		};

		$container['surecart.templates.blocks'] = function ( $c ) {
			$root_path = trailingslashit( $c[ SURECART_CONFIG_KEY ]['app_core']['path'] ) . '/templates/';
			return new BlockTemplatesService( $root_path . 'templates', $root_path . 'parts' );
		};

		$app = $container[ SURECART_APPLICATION_KEY ];
		$app->alias( 'templates', 'surecart.templates' );
	}

	/**
	 * Bootstrap the service.
	 *
	 * @param \Pimple\Container $container Service container.
	 * @return void
	 */
	public function bootstrap( $container ) {
		$container['surecart.templates.page']->bootstrap();
		$container['surecart.templates.product']->bootstrap();
		$container['surecart.templates.collection']->bootstrap();
		$container['surecart.templates.upsell']->bootstrap();
		$container['surecart.templates.blocks']->bootstrap();
	}
}
