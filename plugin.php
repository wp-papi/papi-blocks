<?php
/**
 * Plugin Name: Papi Blocks — Gutenberg Blocks
 * Plugin URI: https://github.com/wp-papi/papi-blocks/
 * Description: Papi blocks for Gutenberg.
 * Author: Fredrik Forsmo
 * Author URI: https://frozzare.com
 * Version: 1.0.0-dev
 * Plugin URI: https://wp-papi.github.io
 * Textdomain: papi-blocks
 * Domain Path: /languages/
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Boostrap plugin.
 */
add_action( 'plugins_loaded', function () {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
} );
