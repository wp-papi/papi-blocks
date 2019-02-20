import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register Gutenberg Block.
 */
registerBlockType('cgb/block-papi-blocks', {
  title: __('papi-blocks - CGB Block'),
  icon: 'shield', // https://developer.wordpress.org/resource/dashicons/.
  category: 'common',
  keywords: [
    __('papi-blocks — CGB Block'),
    __('CGB Example'),
    __('create-guten-block')
  ],

  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   */
  edit: function (props) {
    // Creates a <p class='wp-block-cgb-block-papi-blocks'></p>.
    return (
      <div className={props.className}>
        <p>— Hello from the backend.</p>
        <p>
          CGB BLOCK: <code>papi-blocks</code> is a new Gutenberg block
        </p>
        <p>
          It was created via{' '}
          <code>
            <a href='https://github.com/ahmadawais/create-guten-block'>
              create-guten-block
            </a>
          </code>
          .
        </p>
      </div>
    );
  },

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by Gutenberg into post_content.
   *
   * The "save" property must be specified and must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   */
  save: function (props) {
    return (
      <div>
        <p>— Hello from the frontend.</p>
        <p>
          CGB BLOCK: <code>papi-blocks</code> is a new Gutenberg block.
        </p>
        <p>
          It was created via{' '}
          <code>
            <a href='https://github.com/ahmadawais/create-guten-block'>
              create-guten-block
            </a>
          </code>
          .
        </p>
      </div>
    );
  }
});
