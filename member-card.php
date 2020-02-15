<?php
/**
 * Plugin Name: Member Card Block
 * Plugin URI: #
 * Description: Member block demonstration.
 * Author: Mobeen Abdullah
 * Author URI: https://mobeenabdullah.php
 * Version: 1.0.1
 * License: GPL-v2.0 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

/**
 * exit if file is accessed directly
 */
defined('ABSPATH') || exit;

function gutenberg_examples_01_register_block() {

    // automatically load dependencies and version
    $asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

    wp_register_script(
        'member-card-block',
        plugins_url( 'build/index.js', __FILE__ ),
        $asset_file['dependencies'],
        $asset_file['version']
    );


    wp_register_style(
        'member-card-block-editor',
        plugins_url( 'editor.css', __FILE__ ),
        array( 'wp-edit-blocks' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
    );

    wp_register_style(
        'member-card-block',
        plugins_url( 'style.css', __FILE__ ),
        array( ),
        filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
    );

    register_block_type( 'member-card/member-card-block', array(
        'style' => 'member-card-block',
        'editor_style' => 'member-card-block-editor',
        'editor_script' => 'member-card-block',
    ) );

}
add_action( 'init', 'gutenberg_examples_01_register_block' );