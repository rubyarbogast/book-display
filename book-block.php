<?php
/**
 * Plugin Name: Book Block
 * Plugin URI: https://github.com/rubyarbogast/book-display
 * Description: A WordPress plugin that creates a custom Gutenberg block to display a book cover, blurb, and synopsis. 
 * Version: 1.0
 * Author: Ruby Arbogast
 *
 */
function book_block_register_block() {
    wp_register_script(
        'book-block',
        plugins_url( 'bookblock.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'underscore' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'bookblock.js' )
    );
 
    wp_register_style(
        'book-block-editor',
        plugins_url( 'editor.css', __FILE__ ),
        array( 'wp-edit-blocks', 'wp-components' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
    );
 
    wp_register_style(
        'book-block',
        plugins_url( 'style.css', __FILE__ ),
        array( ),
        filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
    );

    register_block_type( 'book-display/book-block', array(
        'style' => 'book-block',
        'editor_style' => 'book-block-editor',
        'editor_script' => 'book-block',
    ) );
 
}
add_action( 'init', 'book_block_register_block' ); 

function book_block_cover_right_register_block() {
    wp_register_script(
        'book-block-right',
        plugins_url( 'book-block-right.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'underscore' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'book-block-right.js' )
    );
 
    wp_register_style(
        'book-block-right-editor',
        plugins_url( 'editor.css', __FILE__ ),
        array( 'wp-edit-blocks', 'wp-components' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
    );
 
    wp_register_style(
        'book-block-right',
        plugins_url( 'style.css', __FILE__ ),
        array( ),
        filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
    );

    register_block_type( 'book-display/book-block-right', array(
        'style' => 'book-block-right',
        'editor_style' => 'book-block-right-editor',
        'editor_script' => 'book-block-right',
    ) );
 
}
add_action( 'init', 'book_block_cover_right_register_block' ); 
