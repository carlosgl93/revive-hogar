import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { IconButton, Tooltip } from '@mui/material';

import { Cliente } from '@/types/models';

import { buildPaymentReminderMessage, buildWhatsAppUrl } from '../utils/whatsapp';

interface WhatsAppButtonProps {
  client: Cliente;
}

function WhatsAppButton({ client }: WhatsAppButtonProps) {
  const message = buildPaymentReminderMessage(client.nombre, client.paykuSubscriptionUrl);
  const url = buildWhatsAppUrl(client.telefono, message);

  return (
    <Tooltip title="Enviar mensaje por WhatsApp" arrow>
      <IconButton
        color="success"
        component="a"
        href={url}
        target="_blank"
        rel="noopener"
        size="small"
      >
        <WhatsAppIcon />
      </IconButton>
    </Tooltip>
  );
}

export default WhatsAppButton;
