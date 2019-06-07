( function( blocks, editor, i18n, element, components, _ ) {
    var el = element.createElement;
    var RichText = editor.RichText;
    var MediaUpload = editor.MediaUpload;

    blocks.registerBlockType( 'book-display/book-block-right', {
		title: i18n.__( 'Book Display: Cover Right', 'book-block-right' ),
        icon: 'book',
        category: 'layout',
        attributes: {
			title: {
				type: 'array',
				source: 'children',
				selector: 'h3',
			},
            blurb: {
                type: 'array',
                source: 'children',
                selector: 'h4',
            },
            mediaID: {
				type: 'number',
			},
			mediaURL: {
				type: 'string',
				source: 'attribute',
				selector: 'img',
				attribute: 'src',
            },
            summary: {
                type: 'array',
                source: 'children',
                selector: 'p',
			},
			purchase: {
				type: 'array',
				source: 'children',
				selector: '.purchase-links',
			}

        },
 
        edit: function( props ) {
			var attributes = props.attributes;

			var onSelectImage = function( media ) {
				return props.setAttributes( {
					mediaURL: media.url,
					mediaID: media.id,
				} );
			};

			return (
					el( 'div', { className: props.className },
						el (RichText, {
							tagName: 'h3',
							inline: false,
							placeholder: i18n.__( 'Enter Book Title', 'book-block-right' ),
							value: attributes.title,
							onChange: function( value ){
								props.setAttributes( { title: value } );
							}
						} ),
						el( RichText, {
							tagName: 'h4',
							inline: false,
							placeholder: i18n.__( 'Enter Book Blurb', 'book-block-right' ),
							value: attributes.blurb,
							onChange: function( value ) {
								props.setAttributes( { blurb: value } );
							},
						} ),
						el( 'div', { className: 'titlepage' },
							el( MediaUpload, {
								onSelect: onSelectImage,
								allowedTypes: 'image',
								value: attributes.mediaID,
								render: function( obj ) {
									return el( components.Button, {
											className: attributes.mediaID ? 'image-button' : 'button button-large',
											onClick: obj.open
										},
										! attributes.mediaID ? i18n.__( 'Upload Book Cover Image', 'book-block-right' ) : el( 'img', { src: attributes.mediaURL } )
									);
								}
							} )
						),
					el( RichText, {
						tagName: 'div',
						inline: false,
						placeholder: i18n.__( 'Enter Book Summary', 'book-block-right' ),
						value: attributes.summary,
						onChange: function( value ) {
							props.setAttributes( { summary: value } );
						},
					} ),
					el( RichText, {
						tagName: 'div',
						inline: false,
						placeholder: i18n.__( 'Enter Links to Purchase Book', 'book-block' ),
						value: attributes.purchase,
						onChange: function( value ) {
							props.setAttributes( { purchase: value } );
						},
					} )
				)
			);
		},
		save: function( props ) {
			var attributes = props.attributes;

			return (
					el( 'div', { className: props.className},
						el ( RichText.Content, {
							tagName: 'h3', value: attributes.title
                        } ),
                        
                        el( 'div', {className: 'row-flex' },
                        //Image first for small screens
                        attributes.mediaURL &&
                        el( 'div', { className: 'cover-style-mobile' },
                            el( 'img', { src: attributes.mediaURL, className: 'titlepage' } ),
                        ),
                            
						el ( 'div', {className: 'text-style' },	
							el( RichText.Content, {
								tagName: 'h4', className: 'blurb', value: attributes.blurb
							} ),
							el( RichText.Content, {
								tagName: 'p', className: 'summary', value: attributes.summary
							} ),
							el( RichText.Content, {
								tagName: 'p', className: 'purchase-links', value: attributes.purchase
							} )
                        ),
                        //Image second for larger screens
                        attributes.mediaURL &&
                        el( 'div', { className: 'cover-style-right' },
                            el( 'img', { src: attributes.mediaURL, className: 'titlepage' } ),
                        ),

					)
				)
			);
		},
	} );
}(
    window.wp.blocks,
    window.wp.editor,
	window.wp.i18n,
	window.wp.element,
	window.wp.components,
	window._,
) );