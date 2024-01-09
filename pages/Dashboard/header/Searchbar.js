import { styled } from '@mui/material/styles';
import { Box, Autocomplete, TextField, Popper, Paper, alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Search } from '@mui/icons-material';
import { useCallback, useEffect, useRef, useState } from 'react';
import cssStyles from 'utils/cssStyles';
// ----------------------------------------------------------------------
import useAuth from 'hooks/useAuth';
import { pxToRem } from 'utils/getFontValue';
import useResponsive from 'hooks/useResponsive';

const StyledPopper = styled(Popper)(({ theme }) => ({
  '& .MuiAutocomplete-groupLabel': {
    backgroundColor: 'transparent',
    ...cssStyles(theme).bgBlur(),
    color: theme.palette.text.secondary,
    paddingLeft: 12,
  },
  '& .MuiAutocomplete-option': {
    margin: 0,
    fontSize: pxToRem(14),
    height: 39,
  },
}));

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '0px',
  padding: '0px 6px',
  color: theme.palette.primary.contrastText,
  backgroundColor:
    theme.palette.mode === 'light'
      ? alpha(theme.palette.primary.light, 0.85)
      : alpha(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled('ul')({
  padding: 0,
});

const CmdKey = ({ children }) => (
  <Box
    component={Paper}
    elevation={2}
    sx={{
      fontFamily: '"Courier New", monospace',
      backgroundColor: (theme) =>
        theme.palette.mode === 'light' ? 'primary.lighter' : 'primary.main',
      padding: '2px 6px',
      borderRadius: '4px',
    }}
  >
    {children}
  </Box>
);

// ----------------------------------------------------------------------

export default function Searchbar() {
  const searchBarRef = useRef(null);
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isXS = useResponsive('up', 'sm');

  useEffect(() => {
    const handleKeyDown = (event) => {
      const isCtrlKey = event.ctrlKey || event.metaKey; // "metaKey" for Mac

      const isKKey = event.keyCode === 75;

      if (isCtrlKey && isKKey) {
        setOpen(true);

        searchBarRef.current?.focus();
        event.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const getOptions = useCallback((options) => {
    const result = [];
    for (let i = 0; i < options.length; i++) {
      const category = options[i].subheader;
      const items = options[i].items;
      for (let k = 0; k < items.length; k++) {
        const menu = items[k];
        if (menu?.children) {
          for (let j = 0; j < menu.children?.length; j++) {
            const subMenu = menu.children[j];
            if (subMenu) {
              result.push({ ...subMenu, category });
            }
          }
        } else {
          result.push({ ...menu, category });
        }
      }
    }

    return result;
  }, []);

  return (
    <Box sx={{ display: 'flex', width: { xs: 200, sm: 300, md: 600, xl: 700 } }}>
      <Autocomplete
        fullWidth
        size='small'
        groupBy={(option) => option.category}
        options={getOptions(user.menuOption)}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        PopperComponent={StyledPopper}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        getOptionLabel={(option) => option.title}
        onChange={(_, option) => option && navigate(option.path)}
        renderGroup={(params) => (
          <li key={params.key}>
            <GroupHeader>{params.group}</GroupHeader>
            <GroupItems>{params.children}</GroupItems>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            // ref={searchBarRef}
            placeholder='Search...'
            variant='outlined'
            inputRef={searchBarRef}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <Search color='action' />
                  {params.InputProps.startAdornment}
                </>
              ),
              endAdornment: isXS ? (
                <>
                  <CmdKey> ctrl </CmdKey> + <CmdKey>k</CmdKey>
                  {params.InputProps.endAdornment}
                </>
              ) : null,
            }}
          />
        )}
      />
    </Box>
  );
}
