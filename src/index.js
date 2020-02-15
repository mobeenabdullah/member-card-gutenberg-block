import { registerBlockType } from '@wordpress/blocks';
import { RichText, MediaUpload } from '@wordpress/block-editor';

const blockStyle = {
    backgroundColor: '#900',
    color: '#fff',
    padding: '20px',
};
const ALLOWED_MEDIA_TYPES = ['image'];

registerBlockType( 'member-card/member-card-block', {
    title: 'Member Card',
    icon: 'heart',
    category: 'layout',
    attributes: {
        profileImgUrl: {
            type: 'string',
            default: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61'
        },
        heading: {
            type: 'array',
            source: 'children',
            selector: 'h3',
        },
        designation: {
            type: 'array',
            source: 'children',
            selector: 'h5',
        },
        bio: {
            type: 'array',
            source: 'children',
            selector: 'p',
        },

    },
    example: {
        attributes: {
            heading: "",
            designation: "",
            bio: "",
            profileImgUrl: ""
        },
    },
    edit: ( props ) => {
        const { attributes: { profileImgUrl, heading, designation, bio }, setAttributes, className } = props;
        const onChangeImage = ( newImageUrl ) => {
            setAttributes( { profileImgUrl: newImageUrl.sizes.full.url } );
        };
        const onChangeHeading = ( newHeading ) => {
            setAttributes( { heading: newHeading } );
        };
        const onChangeDesg = ( newDesg ) => {
            setAttributes( { designation: newDesg } );
        };
        const onChangeBio = ( value ) => {
            setAttributes( { bio: value } );
        };
        return (
            <div className="team-profile-card">
                <div className="profile-image">
                    <MediaUpload
                        onSelect={ onChangeImage }
                        render={ ( { open } ) => {
                            return <img src={profileImgUrl} onClick={open}/>;
                        }}
                    />
                </div>
                <div className="profile-info">
                    <RichText tagName="h3" className={ className } onChange={ onChangeHeading } value={ heading } placeholder={"Enter Member Name"}/>
                    <RichText tagName="h5" className={ className } onChange={ onChangeDesg } value={ designation } placeholder={"Enter Member Designation"}/>
                    <RichText tagName="p" className={ className } onChange={ onChangeBio } value={ bio } placeholder={"Add Member Bio"}/>
                </div>
            </div>
        );
    },
    save: ( props ) => {
        return (
            <div className="team-profile-card">
                <div className="profile-image">
                    <img src={props.attributes.profileImgUrl} />
                </div>
                <div className="profile-info">
                    <RichText.Content tagName="h3" value={ props.attributes.heading } />
                    <RichText.Content tagName="h5" value={ props.attributes.designation } />
                    <RichText.Content tagName="p" value={ props.attributes.bio } />
                </div>
            </div>
        );
    },
} );