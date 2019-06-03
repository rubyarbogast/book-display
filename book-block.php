<?php
/*
Plugin Name: Book Block
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
        array( 'wp-edit-blocks' ),
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
