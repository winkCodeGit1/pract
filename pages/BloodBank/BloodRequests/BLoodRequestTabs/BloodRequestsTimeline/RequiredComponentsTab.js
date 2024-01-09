import { WaterDropRounded } from '@mui/icons-material';
import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import Box from '@mui/material/Box';


export default function BloodTimelineTab() {


    return (
        // height: 140, overflowY: 'auto'
        <Box sx={{ mawidth: 400, }}>
            <List >
                <ListItemButton>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <WaterDropRounded />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Whole Blood" secondary="2 Units" />
                    </ListItem>
                </ListItemButton>
                <ListItemButton>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <WaterDropRounded />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Red Blood Cells" secondary="3 Units" />
                    </ListItem>
                </ListItemButton>
                <ListItemButton>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <WaterDropRounded />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Platelets" secondary="5 Units" />
                    </ListItem>
                </ListItemButton>
            </List>
        </Box >
    );
}
