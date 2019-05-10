
import apiFetch from '@wordpress/api-fetch';
import domReady from '@wordpress/dom-ready';

const { withSelect } = wp.data;

domReady(() => {
	if (typeof wp.plugins === 'undefined') {
		return;
	}

	const corePlugin = withSelect(select => {
		return {
			postId: select( 'core/editor' ).getCurrentPostId(),
		};
	})((props) => {
		const entryType = document.querySelector('[data-papi-page-type-key]');

		if (!entryType) {
			return null;
		}

		apiFetch({
			method: 'post',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			path: '/papi-ajax/?action=set_entry_type',
			body: JSON.stringify({
				'entry_type': entryType.value,
				'object_id': props.postId
			})
		});

		return null;
	});

	wp.plugins.registerPlugin('papi-core-plugin', {
		render: corePlugin,
	});
});
