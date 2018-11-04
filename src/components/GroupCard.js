import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Typography from '@material-ui/core/Typography';

import ForwardIcon from '@material-ui/icons/Forward';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import PauseIcon from '@material-ui/icons/Pause';

const styles = theme => ({
	card: {
		maxWidth: 400
	},
	media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
	},
	actions: {
		display: 'flex'
	},
	expand: {
		transform: 'rotate(0deg)',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		}),
		marginLeft: 'auto',
		[theme.breakpoints.up('sm')]: {
			marginRight: -8
		}
	},
	expandOpen: {
		transform: 'rotate(180deg)'
	},
	avatar: {
		backgroundColor: red[500]
	}
});

class GroupCard extends React.Component {
	state = {
		isExpanded: false,
		isPaused: false,
		isPlaying: false
	};

	handleExpandClick = () => {
		this.setState(state => ({ isExpanded: !state.isExpanded }));
	};

	togglePlay = () => {
		if (this.state.isPlaying) {
			// scan is stopped
			this.setState({
				isPlaying: false,
				isPaused: false
			});
			this.props.stopScan();
			return;
		}
		// scan is started
		this.setState({ isPlaying: true });
		this.props.startScan();
	};

	togglePause = () => {
		if (this.state.isPaused) {
			// scan is unpaused
			this.setState({ isPaused: false });
			this.props.startScan(true);
			return;
		}
		// scan is paused
		this.setState({ isPaused: true });
		this.props.pauseScan();
	};

	render() {
		const { classes, group, openItem } = this.props;
		const { isExpanded, isPlaying, isPaused } = this.state;
		let cardControls = null;

		// console.log('isPlaying', isPlaying);
		// console.log('isPaused', isPaused);

		if (isPlaying && !isPaused) {
			cardControls = (
				<React.Fragment>
					<IconButton aria-label="Pause" onClick={this.togglePause}>
						<PauseIcon />
					</IconButton>
					<IconButton aria-label="Stop" onClick={this.togglePlay}>
						<StopIcon />
					</IconButton>
				</React.Fragment>
			);
		} else if (isPlaying && isPaused) {
			cardControls = (
				<React.Fragment>
					<IconButton aria-label="Play" onClick={this.togglePause}>
						<PlayArrowIcon />
					</IconButton>
					<IconButton aria-label="Stop" onClick={this.togglePlay}>
						<StopIcon />
					</IconButton>
				</React.Fragment>
			);
		} else {
			cardControls = (
				<IconButton aria-label="Play" onClick={this.togglePlay}>
					<PlayArrowIcon />
				</IconButton>
			);
		}

		return (
			<Card className={classes.card}>
				<CardHeader
					avatar={
						<Avatar aria-label="Recipe" className={classes.avatar}>
							R
						</Avatar>
					}
					action={
						<IconButton>
							<MoreVertIcon />
						</IconButton>
					}
					title={group.name}
					subheader={new Date(group.date).toLocaleDateString(
						'en-GB'
					)}
				/>
				<CardMedia
					className={classes.media}
					image={group.img}
					title="Contemplative Reptile"
				/>
				<CardContent>
					<Typography component="p">{group.description}</Typography>
				</CardContent>
				<CardActions className={classes.actions} disableActionSpacing>
					{cardControls}
					<IconButton
						className={classnames(classes.expand, {
							[classes.expandOpen]: isExpanded
						})}
						onClick={this.handleExpandClick}
						aria-expanded={isExpanded}
						aria-label="Show more"
					>
						<ExpandMoreIcon />
					</IconButton>
				</CardActions>
				<Collapse in={isExpanded} timeout="auto" unmountOnExit>
					<CardContent>
						<Typography paragraph>Items:</Typography>
						<List>
							{group.items.map(item => (
								<ListItem
									onClick={openItem(item.id)}
									key={`group-${item.id}-item-${item.id}`}
								>
									<ListItemIcon>
										<ForwardIcon />
									</ListItemIcon>
									<ListItemText primary={item.name} />
								</ListItem>
							))}
						</List>
					</CardContent>
				</Collapse>
			</Card>
		);
	}
}

GroupCard.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
	group: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(GroupCard);
