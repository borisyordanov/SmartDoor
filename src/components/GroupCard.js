import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import ForwardIcon from '@material-ui/icons/Forward';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = () => ({
	card: {
		maxWidth: 400
	}
});

const GroupCard = ({ classes, group, openGroup }) => (
	<Card className={classes.card}>
		<CardHeader
			action={
				<IconButton>
					<MoreVertIcon />
				</IconButton>
			}
			title={group.name}
		/>
		<CardContent>
			<Typography paragraph>Tags:</Typography>
			<List>
				{group.tags.map((tag, index) => (
					<ListItem
						onClick={openGroup(tag.id)}
						key={`group-${group.id}-item-${index}`}
					>
						<ListItemIcon>
							<ForwardIcon />
						</ListItemIcon>
						<ListItemText primary={tag.name} />
					</ListItem>
				))}
			</List>
		</CardContent>
	</Card>
);

export default withStyles(styles)(GroupCard);
