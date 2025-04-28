import { faThumbTack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

export default function TermsOfServiceList() {
  function TermsListItem(text: string) {
    return (
      <ListItem>
        <ListItemIcon>
          <FontAwesomeIcon icon={faThumbTack} />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    );
  }

  return (
    <Box overflow="scroll" sx={{ backgroundColor: 'rgba(1, 1, 1, 0.42)', borderRadius: 4, m: 1 }}>
      <List dense>
        <Divider>
          <Typography variant="h6">Won't Draw</Typography>
        </Divider>
        {TermsListItem('Muscular men, Mecha / Gundam, Western Furry')}
        <Divider>
          <Typography variant="h6">Pricing Info</Typography>
        </Divider>
        {TermsListItem(
          'Prices are flexible and subject to change depending on alternate pieces and additional details. Prices may lower or get higher depending on what is requested.'
        )}
        {TermsListItem(
          'Backgrounds (if requested) and alt images will vary in price depending on complexity.'
        )}
        {TermsListItem(
          'Commercial rights are not included in the prices, consult with me regarding commercial use.'
        )}
        {TermsListItem(
          'There will be additional fees if constant adjustments and edits are wanted after certain phases such as the Linework and Shading phases.'
        )}

        <Divider>
          <Typography variant="h6">Payment Info</Typography>
        </Divider>
        {TermsListItem('Payments are through PayPal only!')}
        {TermsListItem(
          'Unless you are a frequent/trusted commissioner, I will take payment after the cleaned sketch/finished lineart is completed. Otherwise if you are someone who I trust, I will send the invoice after the commission is finished.'
        )}
        {TermsListItem(
          'I do not accept refunds when a draft is completed. Unless something happens on my end which may lead to me being unable to finish the commission, then I will refund fully.'
        )}

        <Divider>
          <Typography variant="h6">Additional Info</Typography>
        </Divider>
        {TermsListItem(
          'Let me know whether you would like me to tag you or not once I post the finished art piece.'
        )}
        {TermsListItem(
          'I usually do not do any hardcore fetishes/kinks, however feel free to let me know if something you’d like to request is something I can or can’t do.'
        )}
        {TermsListItem(
          'I do not consent to the stealing of my work and being used commercially without my contact or used in any AI services.'
        )}
        {TermsListItem(
          'I have the right to refuse service for those who do not comply with my guidelines, and decline commissions I am not comfortable or willing to do.'
        )}

        <Divider>
          <Typography variant="h6">Openings</Typography>
        </Divider>
        {TermsListItem('Commissions are not first come first serve!')}
        {TermsListItem(
          'I don’t open publicly often, but even if I’m not publicly open, sometimes contacting me can get you a commission slot depending on the complexity of the prompts.'
        )}
      </List>
    </Box>
  );
}
