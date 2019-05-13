import DOMPurify from 'dompurify';
import apiFetch from '@wordpress/api-fetch';
import domReady from '@wordpress/dom-ready';
import { ServerSideRender } from '@wordpress/components';
import DangerousHTML from 'react-dangerous-html';

const { registerBlockType } = wp.blocks;
const { withDispatch } = wp.data;
const { BlockControls, InspectorControls } = wp.editor;
const { IconButton, Toolbar } = wp.components;
const { Component } = wp.element;

class BlockComponent extends Component {
	render() {
		const { attributes, className, name, title } = this.props;
		const editMode = attributes.mode === 'edit';

		return [
			<BlockControls>
				<Toolbar>
					<IconButton
						className='components-icon-button components-toolbar__control'
						label={editMode ? 'Switch to Preview' : 'Switch to Edit'}
						icon={editMode ? 'welcome-edit-site' : 'edit'}
					/>
				</Toolbar>
			</BlockControls>,
			<div className={className}>
				<h2>{title}</h2>
				<ServerSideRender block={name} />
			</div>
		]
	}
}

const Preview = props => {
	return (
		<div>Preview mode</div>
	);
};

const Edit = props => {
	const { block, className } = props;

	return (
		<ServerSideRender block={block.name} />
	);
};

/**
 * Register block.
 *
 * @param {object} block
 */
const registerBlock = block => {
	const settings = block;

	// The edit function describes the structure of your block in the context of the editor.
	// This represents what the editor will render when the block is used.
	settings.edit = props => {
		const editMode = props.attributes.mode === 'edit';
		const blockHtml = editMode ? <Edit block={block} {...props} /> : <Preview block={block} {...props} />;

		return [
			<BlockControls>
				<Toolbar>
					<IconButton
						className='components-icon-button components-toolbar__control'
						label={editMode ? 'Switch to Preview' : 'Switch to Edit'}
						icon={editMode ? 'welcome-view-site' : 'edit'}
						onClick={() => props.setAttributes({ mode: editMode ? 'preview' : 'edit'})}
					/>
				</Toolbar>
			</BlockControls>,
			<div className={props.className}>
				<div className="papi-block-title-wrapper">
					<h2>{block.title}</h2>
				</div>
				{blockHtml}
			</div>
		]
	};

	// The save function defines the way in which the different attributes should be combined
	// into the final markup, which is then serialized by Gutenberg into post_content.
	settings.save = props => {
		return null;
	};

	// Register block type.
	registerBlockType( block.name, settings );
};

domReady(() => {
	papi.blocks.forEach(registerBlock);
});
