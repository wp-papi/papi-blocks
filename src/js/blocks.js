import DOMPurify from 'dompurify';
import apiFetch from '@wordpress/api-fetch';
import domReady from '@wordpress/dom-ready';
import DangerousHTML from 'react-dangerous-html';

const { registerBlockType } = wp.blocks;
const { withDispatch } = wp.data;

/**
 * Register block.
 *
 * @param {object} block
 */
const registerBlock = block => {
	const settings = block;

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	settings.edit = function (props) {
		return (
			<div className={ props.className }>
				<h2>{block.title}</h2>
				<DangerousHTML html={block.html} />
			</div>
		);
	};

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	settings.save = (props) => {
		return null;
	};

	// Register block type.
	registerBlockType( block.name, settings );
};

domReady(() => {
	const entryType = document.querySelector('[data-papi-page-type-key]');

	if (!entryType) {
		return;
	}

	// Fetch boxes that should act like blocks.
	apiFetch({ path: '/papi-ajax/?action=get_blocks&entry_type=' + entryType.value }).then(blocks => {
		blocks.forEach(registerBlock);
	});
});
