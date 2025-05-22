import React from 'react';

// General imports
import _ from 'lodash';

// MUI Imports
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

function APIDrawer({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory,
  selectedEndpoint, 
  setSelectedEndpoint,
  filteredDocs,
  filteredObjects,
  colorMode,
  setMobileOpen 
}) {
  const theme = useTheme();

  const [ collapsed, setCollapsed ] = React.useState([]);

  return (
    <>
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <img src='https://cdn.prod.website-files.com/6474663d54e763b256ada04b/65cf8dfb4807e4189c4168cd_monada_logo%201-p-500.png' alt='Monada Logo' style={{ width: '50%' }} />
            <Typography variant='caption' style={{ fontSize: '9px' }}>
              API Documentation
            </Typography>
          </Box>
          <Switch
            checked={theme.palette.mode === 'dark'}
            onChange={colorMode.toggleColorMode}
            color='primary'
          />
        </Box>

        <TextField
          fullWidth
          size='small'
          placeholder='Search endpoints...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mt: 2 }}
        />
      </Box>

      {/* Navigation Menu */}
      <List dense sx={{ pt: 0 }}>
        {filteredDocs.map((category) => (
          <React.Fragment key={category.category}>
            <ListItemButton
              onClick={() => {
                if (collapsed.includes(category.category)) {
                    setSelectedCategory(category.category);
                    setCollapsed(collapsed.filter(c => c !== category.category));
                } else {
                    setCollapsed([...collapsed, category.category]);
                }
              }}
              selected={selectedCategory === category.category && _.isNull(selectedEndpoint)}
            >
              <ListItemText sx={{ color: theme.palette.text.primary }} primary={category.category} />
            </ListItemButton>

            <Collapse 
                in={!collapsed.includes(category.category)} 
            >
              <List disablePadding dense>
                {category.endpoints.map((endpoint, idx) => (
                  <ListItemButton
                    key={idx}
                    sx={{ pl: 4 }}
                    selected={selectedCategory === category.category && selectedEndpoint === idx.toString()}
                    onClick={() => {
                      setSelectedEndpoint(category.category, idx);
                      setMobileOpen(false);
                    }}
                  >
                    <ListItemText
                      sx={{ color: theme.palette.text.secondary }}
                      primary={endpoint.method + ' ' + endpoint.path}
                      primaryTypographyProps={{ fontSize: '0.7rem' }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
        <React.Fragment>
          <ListItemButton
            onClick={() => {
              if (collapsed.includes('Object Schemas')) {
                setSelectedCategory('Object Schemas');
                setCollapsed(collapsed.filter(c => c !== 'Object Schemas'));
              } else {
                setCollapsed([...collapsed, 'Object Schemas']);
              }
            }}
            selected={selectedCategory === 'Object Schemas' && _.isNull(selectedEndpoint)}
          >
            <ListItemText sx={{ color: theme.palette.text.primary }} primary='Object Schemas' />
          </ListItemButton>

          <Collapse
            in={!collapsed.includes('Object Schemas')}
          >
            <List disablePadding dense>
              {filteredObjects.map((object, idx) => (
                <ListItemButton 
                  key={idx} 
                  sx={{ pl: 4 }}
                  selected={selectedCategory === 'Object Schemas' && selectedEndpoint === idx.toString()}
                  onClick={() => {
                    setSelectedEndpoint('Object Schemas', idx);
                    setMobileOpen(false);
                  }}
                >
                  <ListItemText
                     sx={{ color: theme.palette.text.secondary }}
                    primaryTypographyProps={{ fontSize: '0.7rem' }}
                    primary={object.name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      </List>
    </>
  );
}

export default APIDrawer;