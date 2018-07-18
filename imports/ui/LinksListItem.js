import { Meteor } from 'meteor/meteor';
import React from 'react';
import Clipboard from 'clipboard';

export default class LinksListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			justCopied: false
		};
	}
	componentDidMount() {
		const clipboard = new Clipboard(this.refs.copy);

		clipboard.on('success', () => {
			this.setState({justCopied: true});
			setTimeout(() => this.setState({ justCopied: false}), 1000);
		}).on('error', () => {
			alert('Sorry!');
		});
	}
	// componentWillUnmount() {
	// 	this.clipboard.destroy();
	// }
	render() {
		return (
			<div className="item">
				<h2>{this.props.url}</h2>
				<p className="item__message">{this.props.shortUrl}</p>
				{/* <p>{this.props.visitedCount} - {this.props.lastVisited}</p>*/}
				<a className="button button--pill button--link" href={this.props.shortUrl} target="_blank">
					Visit 
				</a>
				<button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>
					{this.state.justCopied ? 'Copied' : 'Copy'}
				</button>
				<button className="button button--pill" onClick={() => {
					Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
				}}>
					{this.props.visible ? 'Hide' : 'Unhide'}
				</button>
			</div>
		);
	}
};

// debugger;
// LinksListItem.propTypes = {
// 	visible: React.PropTypes.bool.isRequired
// };


