import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import { SitemarkIcon } from './CustomIcons';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Uyarlanabilir Performans',
    description:
      'Sistemimiz, ihtiyaçlarınıza kolayca uyum sağlar; işlerinizi hızlandırır ve yönetimi basitleştirir.',
  },
  {
    icon: <ConstructionRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Dayanıklı ve Güvenilir',
    description:
      'Uzun ömürlü yapısı sayesinde size kalıcı bir yatırım sunar, kesintisiz hizmet sağlar.',
  },
  {
    icon: <ThumbUpAltRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Kusursuz Kullanıcı Deneyimi',
    description:
      'Kullanıcı dostu arayüzü sayesinde sistemi hızlıca öğrenip rahatça kullanabilirsiniz.',
  },
  {
    icon: <AutoFixHighRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Yenilikçi Özellikler',
    description:
      'Sürekli gelişen ihtiyaçlarınıza cevap veren modern ve etkili çözümler sunar.',
  },
];


export default function Content() {
  return (
    <Stack
      sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Typography fontSize={30} fontWeight={"bold"}>Admin giriş ekranı</Typography>
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}
