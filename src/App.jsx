import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

// General imports
import _ from 'lodash';
import pluralize from 'pluralize';

// MUI Imports
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import { useTheme, alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';

// Local imports
import { useColorMode } from './ColorModeContext';
import APIDrawer from './APIDocumentation.Drawer.jsx';
import { endpoints, objects } from './APIDocumentation.data.js';

const BASE_URL = (window.location.hostname === 'localhost' ? 'https://localhost:3000' : 'https://app.monada.ai');

function MUIStyledCodeBlock({ code }) {
    return (
        <Box
            component='pre'
            sx={{
                padding: 2,
                borderRadius: 1,
                fontSize: '14px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontFamily: 'Monospace, monospace',
                overflowX: 'auto',
                mt: 1,
                mb: 0,
            }}
        >
            {code}
        </Box>
    );
}

export default function APIDocumentation() {
    const colorMode = useColorMode();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [mobileOpen, setMobileOpen] = useState(false);

    // Add ref for scrolling
    const mainContentRef = React.useRef(null);

    // Replace selectedCategory and selectedEndpoint state with URL params
    const selectedCategory = searchParams.get('category');
    const selectedEndpoint = searchParams.get('endpoint');

    // Update the updateSelection function to include scrolling
    const updateSelection = (category, endpoint) => {
        const newParams = new URLSearchParams();
        if (category) newParams.set('category', category);
        if (!_.isUndefined(endpoint) && !_.isNull(endpoint)) newParams.set('endpoint', endpoint);
        navigate(`${window.location.pathname}?${newParams.toString()}`);
    };

    useEffect(() => {
        // Add scroll behavior
        setTimeout(() => {
            const element = document.getElementById(`${selectedCategory}-${selectedEndpoint || ''}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);

        window.dispatchEvent(new Event('popstate'));
    }, [selectedCategory, selectedEndpoint]);

    // Add popstate event listener to handle browser back/forward
    React.useEffect(() => {
        const handlePopState = () => {
            // Force re-render when navigation occurs
            setSearchTerm(searchTerm); // This is a hack to force re-render
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [searchTerm]);

    const drawerWidth = 280;

    // Filter endpoints based on search
    const filteredDocs = useMemo(() => {
        if (!searchTerm) return endpoints;

        return endpoints.map(category => ({
            ...category,
            endpoints: category.endpoints.filter(ep =>
                ep.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ep.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
        })).filter(category => category.endpoints.length > 0);
    }, [searchTerm]);

    const filteredObjects = useMemo(() => {
        if (!searchTerm) return objects;

        return objects.filter(o => o.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm]);

    const drawer = (
        <APIDrawer
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            selectedEndpoint={selectedEndpoint}
            setSelectedCategory={(category) => updateSelection(category, null)}
            setSelectedEndpoint={(category, endpoint) => updateSelection(category, endpoint)}
            filteredDocs={filteredDocs}
            filteredObjects={filteredObjects}
            colorMode={colorMode}
            setMobileOpen={setMobileOpen}
        />
    );

    return (
        <Box sx={{ display: 'flex' }}>
            {/* App Bar for mobile */}
            <AppBar
                position='fixed'
                sx={{
                    display: { sm: 'none' },
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color='inherit'
                        edge='start'
                        onClick={() => setMobileOpen(!mobileOpen)}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' noWrap component='div'>
                        API Documentation
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Drawer for mobile */}
            <Box
                component='nav'
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant='temporary'
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>

                {/* Permanent drawer for desktop */}
                <Drawer
                    variant='permanent'
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* Main Content */}
            <Box
                component='main'
                ref={mainContentRef}
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mt: { xs: 8, sm: 0 }
                }}
            >
                {filteredDocs.map((category) => (
                    <Box
                        key={category.category}
                        sx={{ mb: 6 }}
                        id={`${category.category}-`}
                    >
                        <Typography variant='h6' sx={{ mb: 1, color: theme.palette.text.primary }}>
                            {category.category}
                        </Typography>

                        <Box sx={{ mb: 5 }}>
                            {category.introduction?.map((intro, idx) => (
                                <Typography variant='body2' key={idx} sx={{ mb: 2, color: theme.palette.text.secondary }}>
                                    {intro}
                                </Typography>
                            ))}
                        </Box>

                        {category.endpoints.map((endpoint, idx) => (
                            <Box
                                key={idx}
                                id={`${category.category}-${endpoint.path}`}
                            >
                                <EndpointCard endpoint={endpoint} id={`${category.category}-${idx}`} updateSelection={updateSelection} />
                            </Box>
                        ))}
                    </Box>
                ))}
                <Box
                    sx={{ mb: 6 }}
                    id={`Object Schemas-`}
                >
                    <Typography variant='h6' sx={{ mb: 1, color: theme.palette.text.primary }}>
                        Object Schemas
                    </Typography>
                    {filteredObjects.map((object, idx) => (
                        <Box
                            key={idx}
                            id={`Object Schemas-${idx}`}
                            sx={{ mb: 5 }}
                        >
                            <ObjectSchemaCard object={object} updateSelection={updateSelection} />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

function EndpointCard({ endpoint, id, updateSelection }) {
    const theme = useTheme();

    const [queryValues, setQueryValues] = useState(endpoint?.query?.map(q => [q.name, q.defaultValue]).reduce((acc, [name, value]) => ({ ...acc, [name]: value }), {}));
    const [urlParamValues, setUrlParamValues] = useState(endpoint?.urlParams?.map(q => [q.name, q.defaultValue]).reduce((acc, [name, value]) => ({ ...acc, [name]: value }), {}));
    const [response, setResponse] = useState('');
    const [fetching, setFetching] = useState(false);
    const [bodyValues, setBodyValues] = useState(objectToValues(endpoint?.body));

    const path = endpoint?.path.replace(/:(\w+)/g, (match, p1) => urlParamValues[p1] || match);
    const code = _.compact(_.flatten([
        `fetch("${BASE_URL}/api${path}?${endpoint?.query?.filter(q => queryValues[q.name]).map(q => `${q.name}=${queryValues[q.name]}`).join('&')}", {`,
        `  method: "${endpoint?.method}",`,
        `  headers: {`,
        `    "Content-Type": "application/json",`,
        `  },`,
        endpoint?.body ? `body: JSON.stringify(${JSON.stringify(bodyValues, null, 2)}),`.split('\n').map(line => `  ${line}`) : null,
        `})`
    ])).join('\n');

    function onExecute() {
        setFetching(true);
        const url = `${BASE_URL}/api${path}?${endpoint?.query?.filter(q => queryValues[q.name]).map(q => `${q.name}=${queryValues[q.name]}`).join('&')}`;
        fetch(url, {
            method: endpoint?.method,
        })
            .then(res => res.json())
            .then(data => {
                if (endpoint?.response?.type === 'string') {
                    setResponse(data);
                } else {
                    setResponse(JSON.stringify(data, null, 2));
                }
                setFetching(false);
            })
            .catch(err => {
                console.error(err);
                setResponse(JSON.stringify(err.response.data || err.message || err, null, 2));
                setFetching(false);
            });
    }

    return (
        <Grid container sx={{ mb: 2 }} spacing={2} id={id}>
            <Grid item size={{ xs: 12, lg: 8 }}>
                <Typography variant='body1' gutterBottom>
                    <Box component='span' sx={{
                        color: 'text.primary',
                        textTransform: 'uppercase',
                    }}>
                        {endpoint.method}
                    </Box>
                    <Box component='span' sx={{
                        color: 'text.primary',
                    }}>
                        &nbsp;{endpoint.path}
                    </Box>
                </Typography>
                <Typography color='text.secondary' variant='body2' gutterBottom>
                    {endpoint.description}
                </Typography>
                {endpoint.urlParams && (
                    <>
                        <Typography color='text.secondary' variant='body2' sx={{ fontWeight: 800, mt: 2 }}>
                            URL Parameters
                        </Typography>
                        <ParameterTable parameters={endpoint.urlParams} values={urlParamValues} setValues={setUrlParamValues} />
                    </>
                )}
                <Typography color='text.secondary' variant='body2' sx={{ fontWeight: 800, mt: 2 }}>
                    Query Parameters
                </Typography>
                <ParameterTable parameters={endpoint.query} values={queryValues} setValues={setQueryValues} />
                {endpoint.body && (
                    <>
                        <Typography color='text.secondary' variant='body2' sx={{ fontWeight: 800, mt: 2, mb: 1 }}>
                            Body
                        </Typography>
                        <ObjectItem object={endpoint.body} updateSelection={updateSelection} />
                    </>
                )}
                <Typography color='text.secondary' variant='body2' sx={{ fontWeight: 800, mt: 2, mb: 1 }}>
                    Response
                </Typography>
                {endpoint.response && (
                    <ObjectItem object={endpoint.response} updateSelection={updateSelection} />
                )}
                {endpoint.note && (
                    <>
                        <Typography color='text.secondary' variant='body2' sx={{ fontWeight: 800, mb: 1 }}>
                            Note
                        </Typography>
                        <Typography color='text.secondary' variant='body2' gutterBottom>
                            {endpoint.note}
                        </Typography>
                    </>
                )}
            </Grid>
            <Grid item size={{ xs: 12, lg: 4 }}>
                <Paper sx={{ backgroundColor: alpha(theme.palette.text.primary, 0.1), mb: 0 }} >
                    <Box sx={{ backgroundColor: alpha(theme.palette.text.primary, 0.1), padding: '3px 6px' }}>
                        <Typography variant='caption' gutterBottom>
                            REQUEST
                        </Typography>
                    </Box>
                    <MUIStyledCodeBlock code={code} />
                </Paper>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 1 }}>
                    <Button size='small' variant='contained' color='primary' onClick={onExecute}>
                        Execute
                    </Button>
                </Box>
                {(response || fetching) && (
                    <Paper sx={{ backgroundColor: alpha(theme.palette.text.primary, 0.1), mb: 0 }} >
                        <Box sx={{ backgroundColor: alpha(theme.palette.text.primary, 0.1), padding: '3px 6px' }}>
                            <Typography variant='caption' gutterBottom>
                                RESPONSE
                            </Typography>
                        </Box>
                        {fetching ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: 2 }}>
                                <CircularProgress size={13} sx={{ color: theme.palette.text.primary }} />
                            </Box>
                        ) : (
                            <MUIStyledCodeBlock code={response} />
                        )}
                    </Paper>
                )}
            </Grid>
        </Grid>
    )
}

function ParameterTable(props) {
    const { parameters, values, setValues } = props;
    const theme = useTheme();
    return (
        <TableContainer fullWidth sx={{ mb: 2 }}>
            <Table fullWidth>
                <TableHead>
                    <TableRow>
                        <TableCell>Parameter</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Optional</TableCell>
                        <TableCell>Example Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {parameters?.map((param, idx) => (
                        <TableRow key={idx}>
                            <TableCell sx={{ color: theme.palette.text.secondary }}>{param.name}</TableCell>
                            <TableCell sx={{ color: theme.palette.text.secondary }}>{param.type}</TableCell>
                            <TableCell sx={{ color: theme.palette.text.secondary }}>{param.description}</TableCell>
                            <TableCell sx={{ textAlign: 'center', color: theme.palette.text.secondary }}>{param.optional ? '✓' : ''}</TableCell>
                            <TableCell sx={{ color: theme.palette.text.secondary }}><TextField value={values[param.name]} onChange={(e) => setValues(prev => ({ ...prev, [param.name]: e.target.value }))} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function ObjectSchemaCard({ object, id, updateSelection }) {
    const theme = useTheme();

    return (
        <Box id={id}>
            <Typography variant='body1' sx={{ mb: 1, color: theme.palette.text.secondary, fontWeight: 800 }}>
                {object.name}
            </Typography>
            {object.description && (
                <Typography variant='body2' sx={{ mb: 1, color: theme.palette.text.secondary }}>
                    {object.description}
                </Typography>
            )}
            {object.properties && (
                <>
                    <Typography color='text.secondary' variant='body2' sx={{ fontWeight: 800, mb: 1 }}>
                        Properties
                    </Typography>
                    {object.properties?.map((property, idx) => (
                        <Paper key={idx} sx={{ mb: 1, backgroundColor: alpha(theme.palette.text.primary, 0.05) }}>
                            <Box sx={{ backgroundColor: alpha(theme.palette.text.primary, 0.05), padding: '3px 12px', display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='caption' gutterBottom>
                                    {property.name}
                                </Typography>
                                <Typography variant='caption' gutterBottom>
                                    {property.type === 'schema' ? (
                                        <Typography
                                            variant='caption'
                                            sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                                            gutterBottom
                                            onClick={() => {
                                                updateSelection('Object Schemas', objects.findIndex(o => o.name === property.schema().name));
                                            }}
                                        >
                                            {property.schema().name} (Schema)
                                        </Typography>
                                    ) : property.type}
                                </Typography>
                            </Box>
                            {property.description && (
                                <Typography variant='body2' sx={{ padding: 2, mb: 1, color: theme.palette.text.secondary }}>
                                    {property.description}
                                </Typography>
                            )}
                            {property.type === 'array' && (
                                <Box sx={{ padding: 2, paddingTop: 0, mb: 1, color: theme.palette.text.secondary }}>
                                    <ArrayItems items={property.items} updateSelection={updateSelection} />
                                </Box>
                            )}
                            {property.type === 'enum' && (
                                <Box sx={{ padding: 2, paddingTop: 0, mb: 1, color: theme.palette.text.secondary }}>
                                    <EnumItems items={property.enum} updateSelection={updateSelection} />
                                </Box>
                            )}
                            {property.type === 'object' && (
                                <Box sx={{ padding: 2, paddingTop: 0, mb: 1, color: theme.palette.text.secondary }}>
                                    <ObjectProperties properties={property.properties} updateSelection={updateSelection} />
                                </Box>
                            )}
                        </Paper>
                    ))}
                </>
            )}
        </Box>
    );
}

function EnumItems({ items }) {
    return (
        <Typography variant='body2' gutterBottom component='div' sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
            Possible values:
            {items.map((item, idx) => (
                <Chip key={idx} label={item} size='small' />
            ))}
        </Typography>
    );
}

function ArrayItems({ items, updateSelection }) {
    if (items.type === 'schema') {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant='body2' gutterBottom component='span'>
                    Array of&nbsp;
                </Typography>
                <Typography
                    variant='body2'
                    gutterBottom
                    component='span'
                    sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                    onClick={() => {
                        updateSelection('Object Schemas', objects.findIndex(o => o.name === items.schema().name));
                    }}
                >
                    {items.schema().name} (Schema)
                </Typography>
            </Box>
        )
    }

    if (items.type === 'string') {
        return (
            <Typography variant='body2' gutterBottom component='span'>
                Array of strings.
            </Typography>
        )
    }

    if (items.type === 'object') {
        return (
            <ObjectProperties properties={items.properties} updateSelection={updateSelection} plural={true} prefix={'Array of'} />
        );
    }
}

function ObjectItem({ object, updateSelection }) {
    return (
        <>
            {object.description && (
                <Typography color='text.secondary' variant='body2' gutterBottom sx={{ mb: 1 }}>
                    {object.description}
                </Typography>
            )}
            {object.type === 'schema' && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography color='text.secondary' variant='body2' gutterBottom>Type:</Typography>
                    <Typography
                        color='text.secondary'
                        variant='body2'
                        gutterBottom
                        sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                        onClick={() => {
                            updateSelection('Object Schemas', objects.findIndex(o => o.name === object.schema().name));
                        }}
                    >
                        {object.schema().name} (Schema)
                    </Typography>
                </Box>
            )}
            {object.type === 'object' && (
                <ObjectProperties properties={object.properties} updateSelection={updateSelection} />
            )}
        </>
    );
}

function ObjectProperties({ properties, updateSelection, plural, prefix }) {
    const theme = useTheme();

    if (!properties) {
        return (
            <Typography color='text.secondary' variant='body2' sx={{ mb: 1 }}>
                JSON object.
            </Typography>
        )
    }

    return (
        <Box sx={{ mb: 2, color: theme.palette.text.secondary }}>
            <Typography color='text.secondary' variant='body2' sx={{ mb: 1 }}>
                {prefix ? prefix + ' ' : ''}JSON {pluralize('object', plural ? 2 : 1)} with the following properties:
            </Typography>
            <TableContainer fullWidth>
                <Table fullWidth>
                    <TableHead>
                        <TableRow>
                            <TableCell>Property</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {properties.map((property, idx) => (
                            <TableRow key={idx}>
                                <TableCell sx={{ color: theme.palette.text.secondary, verticalAlign: 'top' }}>{property.name}</TableCell>
                                <TableCell sx={{ color: theme.palette.text.secondary, verticalAlign: 'top' }}>
                                    {property.type}
                                </TableCell>
                                <TableCell sx={{ color: theme.palette.text.secondary }}>
                                    {property.description}
                                    {property.type === 'array' && (
                                        <ArrayItems items={property.items} updateSelection={updateSelection} />
                                    )}
                                    {property.type === 'enum' && (
                                        <EnumItems items={property.enum} updateSelection={updateSelection} />
                                    )}
                                    {property.type === 'object' && (
                                        <ObjectProperties properties={property.properties} updateSelection={updateSelection} />
                                    )}
                                    {property.type === 'schema' && (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
                                            <Typography variant='body2' gutterBottom>Type:</Typography>
                                            <Typography
                                                variant='body2'
                                                gutterBottom
                                                component='div'
                                                sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                                                onClick={() => {
                                                    updateSelection('Object Schemas', objects.findIndex(o => o.name === property.schema().name));
                                                }}
                                            >
                                                {property.schema().name} (Schema)
                                            </Typography>
                                        </Box>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

function objectToValues(object) {
    if (!object) return null;
    if (object.type === 'string') {
        return object.defaultValue || '';
    }
    if (object.type === 'number') {
        return object.defaultValue || 0;
    }
    if (object.type === 'object') {
        if (!object.properties) return '';
        return object.properties.reduce((acc, property) => ({ ...acc, [property.name]: objectToValues(property) }), {});
    }
    if (object.type === 'schema') {
        return objectToValues(object.schema());
    }
    if (object.type === 'array') {
        return [objectToValues(object.items)];
    }
    return object.defaultValue || null;
}