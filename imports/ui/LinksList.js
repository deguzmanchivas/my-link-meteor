import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import Flipmove from 'react-flip-move';

import { Links } from '../api/links';
import LinksListItem from './LinksListItem';

export default class LinksList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			links: []
		};
	}
	componentDidMount() {
		this.listTracker = Tracker.autorun(() => {
		Meteor.subscribe('myLinks');
		const links = Links.find({
			visible: Session.get('showVisible')
		}).fetch();
		this.setState({ links });
	});
	}
	componentWillUnmount() {
		console.log('componentWillUnmount LinksList');
		this.listTracker.stop();

	}
	renderLinksListItems() {

		if (this.state.links.length === 0) {
			return (
				<div className="item">
					<p className="item__status-message">No Links Found</p>
				</div>
			);
		}

			return this.state.links.map((link) => {
				const shortUrl = Meteor.absoluteUrl(link._id);
				return <LinksListItem key= {link._id} shortUrl={shortUrl} {...link}/>;
				// return <p key={link._id}>{ link.url }</p>
		});
	}
	render() {
		return (
			<div>
				<Flipmove maintainContainerHeight={true}>
					{this.renderLinksListItems()}
				</Flipmove>
			</div>
		);
	}
};