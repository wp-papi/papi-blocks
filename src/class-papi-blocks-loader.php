<?php

final class Papi_Blocks_Loader {

	/**
	 * The instance of Papi blocks loader class.
	 *
	 * @var Papi_Blocks_Loader
	 */
	protected static $instance;

	/**
	 * Papi blocks loader instance.
	 *
	 * @return Papi_Blocks_Loader
	 */
	public static function instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	/**
	 * Constructor.
	 */
	protected function __construct() {
		add_action( 'enqueue_block_assets', [$this, 'block_assets'] );
		add_action( 'enqueue_block_editor_assets', [$this, 'editor_assets'] );

		// Fires the loaded action.
		did_action( 'papi/blocks/loaded' ) || do_action( 'papi/blocks/loaded' );
	}

	/**
	 * Enqueue block assets for both frontend and backend.
	 */
	public function block_assets() {
		wp_enqueue_style(
			'papi-blocks-style-css', // Handle.
			plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
			['wp-editor']
			// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' )
		);
	}

	/**
	 * Enqueue editor assets.
	 */
	public function editor_assets() {
		wp_enqueue_script(
			'papi-blocks-editor-js',
			plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
			['wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'],
			// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ),
			true
		);

		wp_enqueue_style(
			'papi-blocks-editor-css',
			plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
			['wp-edit-blocks']
			// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' )
		);
	}
}
