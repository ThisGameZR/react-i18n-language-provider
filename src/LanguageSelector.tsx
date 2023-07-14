import React from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useLanguageProvider } from './LanguageProvider';

export default function LanguageSelector() {
  const { t, i18n } = useLanguageProvider();
  const [selectLanguage, setSelectLanguage] = React.useState(i18n!.languages[0]);
  React.useEffect(() => {
    i18n!.changeLanguage(selectLanguage)
  }, [selectLanguage])
  return (
    <Autocomplete
      disablePortal
      disableClearable
      size="small"
      value={selectLanguage}
      onChange={(_, v) => setSelectLanguage(v!)}
      //@ts-ignore
      options={i18n?.languages ?? []}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={t!("language-editor:language-selector-label")} />}
    />
  )
}
