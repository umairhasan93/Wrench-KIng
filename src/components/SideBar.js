import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { useHistory } from 'react-router';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
    root: {

        display: 'flex',
    },

    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        overflow: 'hidden',

    },
    drawerPaper: {
        width: drawerWidth,
    },


    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },

    userIcon: {
        marginTop: 130,
        marginLeft: 30,
        fontSize: 40,
        color: 'grey'
    },

    header: {
        marginLeft: 95,
        marginTop: -62

    },
    heading: {

    },

    name: {
        fontSize: 18,
        marginTop: -15
    },

    itemlist: {
        marginTop: 50,
        marginLeft: 15,

    },

    items: {

        marginBottom: 20
    },

    itemText: {
        fontSize: 20,
    },

    logoutItem: {
        marginTop: 55,
        marginLeft: 15
    }
}));

const ListItem = withStyles({
    root: {
        "&$selected": {
            backgroundColor: "white",
            color: "green",
            textDecoration: "underline",
            "& .MuiListItemIcon-root": {
                color: "green"
            }
        },
        "&$selected:hover": {
            backgroundColor: "white",
            color: "green",
            "& .MuiListItemIcon-root": {
                color: "green"
            }
        },
        "&:hover": {
            backgroundColor: "lightblue",
            color: "black",
            "& .MuiListItemIcon-root": {
                color: "grey"
            }
        }
    },
    selected: {}
})(MuiListItem);


export default function SideBar() {
    const classes = useStyles();

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };


    const history = useHistory();
    const handleSubmit = () => {
        history.push('/')
    }
    return (
        <div className={classes.root}>

            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <PersonOutlineOutlinedIcon className={classes.userIcon} />
                <div className={classes.header}>
                    <h3 className={classes.heading}>Welcome</h3>
                    <p className={classes.name}>Admin</p>
                </div>


                <List className={classes.itemlist}>

                    <ListItem button
                        selected={selectedIndex === 0}
                        onClick={(event) => {
                            handleListItemClick(event, 0)
                            history.push('/home/Registeration')
                        }} className={classes.items}>
                        <ListItemIcon><AddCircleOutlineOutlinedIcon style={{ fontSize: 30 }} /></ListItemIcon>
                        <ListItemText primary='Registration' />
                    </ListItem>

                    <ListItem button
                        selected={selectedIndex === 1}
                        onClick={(event) => {
                            handleListItemClick(event, 1)
                            history.push('/home/Booking')
                        }} className={classes.items} >
                        <ListItemIcon><EventAvailableOutlinedIcon style={{ fontSize: 30 }} /></ListItemIcon>
                        <ListItemText primary='Booking' />
                    </ListItem>

                    <ListItem button
                        selected={selectedIndex === 2}
                        onClick={(event) => {
                            handleListItemClick(event, 2)
                            history.push('/home/Billing')
                        }} className={classes.items} >
                        <ListItemIcon><ReceiptOutlinedIcon style={{ fontSize: 30 }} /></ListItemIcon>
                        <ListItemText primary='Billing' />
                    </ListItem>

                </List>

                <List className={classes.itemlogout}>

                    <ListItem button key='LogOut' className={classes.logoutItem} onClick={handleSubmit}>
                        <ListItemIcon><ExitToAppOutlinedIcon style={{ fontSize: 30, color: "red" }} /></ListItemIcon>
                        <ListItemText primary='LogOut' style={{ color: "red" }} />
                    </ListItem>

                </List>
            </Drawer>

        </div>
    );
}