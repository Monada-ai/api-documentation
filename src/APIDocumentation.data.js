const OrganizationSchema = {
    name: 'Organization',
    description: 'The object inside the Monada API that represents an organization signed and using Monada for quotes and orders.',
    properties: [
        {
            name: 'id',
            description: 'The UUID of the organization.',
            type: 'string',
        },
        {
            name: 'alias',
            description: 'The alias of the organization (the name used in the URL).',
            type: 'string',
        },
        {
            name: 'timezone',
            description: 'The timezone of the organization. Used for offers sent to customers.',
            type: 'string',
        },
        {
            name: 'title',
            description: 'The title of the organization.',
            type: 'string',
        },
        {
            name: 'address',
            description: 'The address of the organization.',
            type: 'schema',
            schema: () => objects.find(o => o.name === 'Port')
        },
        {
            name: 'logo',
            description: 'URL to the logo of the organization.',
            type: 'string',
        },
        {
            name: 'solution',
            description: 'The monada version number used by the organization.',
            type: 'number',
        },
        {
            name: 'xmlMailingList',
            description: '[deprecated] When exporting offers to XML, this is the list of email addresses to send the XML to.',
            type: 'array',
            items: {
                type: 'string',
            },
        },
        {
            name: 'users',
            description: 'The list of users in the organization.',
            type: 'array',
            items: {
                type: 'object',
                properties: [
                    {
                        name: 'email',
                        description: 'User\'s email address.',
                        type: 'string',
                    },
                    {
                        name: 'isAdmin',
                        description: 'Whether the user is an admin of the organization.',
                        type: 'boolean',
                    },
                    {
                        name: 'manages',
                        description: 'The list of teams the user manages.',
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                    },
                    {
                        name: 'team',
                        description: 'The team of the user.',
                        type: 'string',
                    },
                ],
            },
        },
        {
            name: 'defaults',
            description: 'The default values for the organization.',
            type: 'object',
            properties: [
                {
                    name: 'transportationMethod',
                    description: 'The default transportation method for the organization.',
                    type: 'enum',
                    enum: ['air', 'sea', 'land'],
                },
            ],
        },
        {
            name: 'headers',
            description: 'The headers for the organization.',
            type: 'schema',
            schema: () => objects.find(o => o.name === 'Headers'),
        },
        {
            name: 'terms',
            description: 'The terms for the organization.',
            type: 'schema',
            schema: () => objects.find(o => o.name === 'Terms'),
        },
    ],
};

const PortSchema = {
    name: 'Port',
    type: 'object',
    properties: [{
        name: 'type',
        description: 'Type of port',
        type: 'enum',
        enum: ['port', 'unlocode', 'city', 'country', 'geocode']
    }, {
        name: 'id',
        type: 'string',
        description: 'An ID of the port - commonly, google maps ID',
    }, {
        name: 'text',
        type: 'string',
        description: 'Textual representation of the port',
    }, {
        name: 'countryCode',
        type: 'string',
        description: 'ISO 3166-1 alpha-2 country code of the port',
    }, {
        name: 'city',
        type: 'string',
        description: 'City of the port',
    }]
};

const HeadersSchema = {
    name: 'Headers',
    type: 'object',
    properties: [
        {
            name: 'agent-query',
            type: 'string',
            description: 'The header to display for RFQ queries'
        }, {
            name: 'agent-query-mobile',
            type: 'string',
            description: 'The header to display for RFQ queries on mobile'
        }, {
            name: 'price-quote',
            type: 'string',
            description: 'The header to display for price quotes'
        }, {
            name: 'price-quote-mobile',
            type: 'string',
            description: 'The header to display for price quotes on mobile'
        }
    ]
};

const TermsSchema = {
    name: 'Terms',
    type: 'object',
};

const AccountSchema = {
    name: 'Account',
    type: 'object',
    properties: [
        {
            name: 'id',
            description: 'The UUID of the account.',
            type: 'string',
        },
        {
            name: 'name',
            description: 'The name of the account.',
            type: 'string',
        },
        {
            name: 'uniqueId',
            description: 'The external unique ID of the account as represented by [Branch Code]:[Branch Name]:[Account ID].',
            type: 'string',
        },
        {
            name: 'organizationId',
            description: 'The UUID of the organization the account belongs to.',
            type: 'string',
        },
        {
            name: 'contacts',
            description: 'The list of contacts for the account.',
            type: 'array',
            items: {
                type: 'object',
                properties: [
                    {
                        name: 'email',
                        description: 'The email address of the contact.',
                        type: 'string',
                    },
                    {
                        name: 'firstName',
                        description: 'The first name of the contact.',
                        type: 'string',
                    },
                    {
                        name: 'lastName',
                        description: 'The last name of the contact.',
                        type: 'string',
                    },
                    {
                        name: 'phone',
                        description: 'The phone number of the contact.',
                        type: 'string',
                    },
                    {
                        name: 'title',
                        description: 'The title of the contact.',
                        type: 'string',
                    },
                ],
            },
        },
        {
            name: 'industry',
            description: 'The industry of the account (eg. "Agriculture", "Automotive", "Aerospace", "Banking and Finance", "Biotechnology", "Chemical Industry", "Construction", "Consumer Goods", "Education", "Electronics", "Energy", "Entertainment and Media", "Fashion and Apparel", "Food and Beverage", "Healthcare and Pharmaceuticals", "Hospitality and Tourism", "Information Technology", "Logistics and Transportation", "Manufacturing", "Mining and Extraction", "Oil and Gas", "Paper and Pulp", "Real Estate", "Retail and E-commerce", "Telecommunications", "Textiles", "Utilities", "Warehousing and Distribution", "Waste Management", "Wholesale Trade").',
            type: 'string',
        },
        {
            name: 'inactive',
            description: 'Whether or not the account is inactive.',
            type: 'boolean',
        },
        {
            name: 'phone',
            description: 'The phone number of the account. [Deprecated. Use contacts[0].phone instead.]',
            type: 'string',
        },
        {
            name: 'email',
            description: 'The email address of the account. [Deprecated. Use contacts[0].email instead.]',
            type: 'string',
        },
        {
            name: 'address',
            description: 'The address of the account.',
            type: 'schema',
            schema: () => objects.find(o => o.name === 'Port'),
        },
        {
            name: 'updates',
            description: 'User generated timeline updates associated with the account.',
            type: 'array',
            items: {
                type: 'object',
                properties: [
                    {
                        name: 'created',
                        description: 'The timestamp of the update.',
                        type: 'number',
                    },
                    {
                        name: 'createdBy',
                        description: 'The email address of the user who created the update.',
                        type: 'string',
                    },
                    {
                        name: 'html',
                        description: 'The HTML content of the update.',
                        type: 'string',
                    },
                    {
                        name: 'tags',
                        description: 'The tags of the update.',
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: [
                                {
                                    name: 'label',
                                    description: 'The label of the tag.',
                                    type: 'string',
                                },
                            ],
                        },
                    },
                    {
                        name: 'deleted',
                        description: 'Whether the update has been deleted. When an update is deleted, the html field will also be replaced with "[deleted]".',
                        type: 'boolean',
                    },
                    {
                        name: 'actionsSuggestions',
                        description: 'The actions suggested for the update (AI generated when a new update is created).',
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: [
                                {
                                    name: 'id',
                                    description: 'The ID of the action.',
                                    type: 'string',
                                },
                                {
                                    name: 'description',
                                    description: 'The description of the action.',
                                    type: 'string',
                                },
                                {
                                    name: 'dueDate',
                                    description: 'The due date of the action.',
                                    type: 'string',
                                },
                            ],
                        },
                    }
                ]
            },
        },
        {
            name: 'tags',
            description: 'The tags of the account.',
            type: 'array',
            items: {
                type: 'object',
                properties: [
                    {
                        name: 'label',
                        description: 'The label of the tag.',
                        type: 'string',
                    },
                ],
            },
        },
        {
            name: 'reminders',
            description: 'User generated reminders associated with the account.',
            type: 'array',
            items: {
                type: 'object',
                properties: [
                    {
                        name: 'id',
                        description: 'The ID of the reminder.',
                        type: 'string',
                    },
                    {
                        name: 'status',
                        description: 'The status of the reminder.',
                        type: 'enum',
                        enum: ['rejected', 'open', 'completed'],
                    },
                    {
                        name: 'description',
                        description: 'The description of the reminder.',
                        type: 'string',
                    },
                    {
                        name: 'dueDate',
                        description: 'The due date of the reminder.',
                        type: 'string',
                    },
                    {
                        name: 'metadata',
                        description: 'The metadata of the reminder.',
                        type: 'array',
                        items: {
                            type: 'object',
                        },
                    },
                ], 
            },
        },
        {
            name: 'transportationMethods',
            description: 'Support transportation methods, routes, and product types for the account.',
            type: 'object',
            properties: [
                {
                    name: 'air',
                    description: 'The air transportation method.',
                    type: 'object',
                    properties: [
                        {
                            name: 'active',
                            description: 'Whether the account supports air transportation method.',
                            type: 'boolean',
                        },
                        {
                            name: 'products',
                            description: 'The products supported by the air transportation method.',
                            type: 'array',
                            items: {
                                type: 'schema',
                                schema: () => objects.find(o => o.name === 'Product'),
                            },
                        },
                        {
                            name: 'routes',
                            description: 'The routes supported by the air transportation method.',
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: [
                                    {
                                        name: 'source',
                                        description: 'The route origin port.',
                                        type: 'schema',
                                        schema: () => objects.find(o => o.name === 'Port'), 
                                    },
                                    {
                                        name: 'destination',
                                        description: 'The route destination port.',
                                        type: 'schema',
                                        schema: () => objects.find(o => o.name === 'Port'),
                                    },
                                ],
                            },
                        },
                    ],
                }, {
                    name: 'sea',
                    description: 'The sea transportation method.',
                    type: 'object',
                    properties: [
                        {
                            name: 'active',
                            description: 'Whether the account supports sea transportation method.',
                            type: 'boolean',
                        },
                        {
                            name: 'products',
                            description: 'The products supported by the sea transportation method.',
                            type: 'array',
                            items: {
                                type: 'schema',
                                schema: () => objects.find(o => o.name === 'Product'),
                            },
                        },
                        {
                            name: 'routes',
                            description: 'The routes supported by the sea transportation method.',
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: [
                                    {
                                        name: 'source',
                                        description: 'The route origin port.',
                                        type: 'schema',
                                        schema: () => objects.find(o => o.name === 'Port'), 
                                    },
                                    {
                                        name: 'destination',
                                        description: 'The route destination port.',
                                        type: 'schema',
                                        schema: () => objects.find(o => o.name === 'Port'),
                                    },
                                ],
                            },
                        },
                    ],
                }, {
                    name: 'land',
                    description: 'The land transportation method.',
                    type: 'object',
                    properties: [
                        {
                            name: 'active',
                            description: 'Whether the account supports land transportation method.',
                            type: 'boolean',
                        },
                        {
                            name: 'products',
                            description: 'The products supported by the land transportation method.',
                            type: 'array',
                            items: {
                                type: 'schema',
                                schema: () => objects.find(o => o.name === 'Product'),
                            },
                        },
                        {
                            name: 'routes',
                            description: 'The routes supported by the land transportation method.',
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: [
                                    {
                                        name: 'source',
                                        description: 'The route origin port.',
                                        type: 'schema',
                                        schema: () => objects.find(o => o.name === 'Port'), 
                                    },
                                    {
                                        name: 'destination',
                                        description: 'The route destination port.',
                                        type: 'schema',
                                        schema: () => objects.find(o => o.name === 'Port'),
                                    },
                                ],
                            },
                        },
                    ],
                },
            ],
        }, {
            name: 'owner',
            description: 'The email address of the owner of the account. This is the email address of the user who created the account (if not transfered to someone else).',
            type: 'string',
        }
    ],
};

const SupplierSchema = {
    name: 'Supplier',
    type: 'object',
    properties: [
        {
            name: 'id',
            description: 'The UUID of the supplier.',
            type: 'string',
        },
        {
            name: 'name',
            description: 'The name of the supplier.',
            type: 'string',
        },
        {
            name: 'uniqueId',
            description: 'The external unique ID of the supplier as represented by [Branch Code]:[Branch Name]:[Supplier ID].',
            type: 'string',
        },
        {
            name: 'organizationId',
            description: 'The UUID of the organization the supplier belongs to.',
            type: 'string',
        },
        {
            name: 'contacts',
            description: 'The list of contacts for the supplier.',
            type: 'array',
            items: {
                type: 'object',
                properties: [
                    {
                        name: 'email',
                        description: 'The email address of the contact.',
                        type: 'string',
                    },
                    {
                        name: 'firstName',
                        description: 'The first name of the contact.',
                        type: 'string',
                    },
                    {
                        name: 'lastName',
                        description: 'The last name of the contact.',
                        type: 'string',
                    },
                    {
                        name: 'phone',
                        description: 'The phone number of the contact.',
                        type: 'string',
                    },
                    {
                        name: 'title',
                        description: 'The title of the contact.',
                        type: 'string',
                    },
                ],
            },
        },
        {
            name: 'industry',
            description: 'The industry of the supplier (eg. "Agriculture", "Automotive", "Aerospace", "Banking and Finance", "Biotechnology", "Chemical Industry", "Construction", "Consumer Goods", "Education", "Electronics", "Energy", "Entertainment and Media", "Fashion and Apparel", "Food and Beverage", "Healthcare and Pharmaceuticals", "Hospitality and Tourism", "Information Technology", "Logistics and Transportation", "Manufacturing", "Mining and Extraction", "Oil and Gas", "Paper and Pulp", "Real Estate", "Retail and E-commerce", "Telecommunications", "Textiles", "Utilities", "Warehousing and Distribution", "Waste Management", "Wholesale Trade").',
            type: 'string',
        },
        {
            name: 'inactive',
            description: 'Whether or not the supplier is inactive.',
            type: 'boolean',
        },
        {
            name: 'phone',
            description: 'The phone number of the supplier. [Deprecated. Use contacts[0].phone instead.]',
            type: 'string',
        },
        {
            name: 'email',
            description: 'The email address of the supplier. [Deprecated. Use contacts[0].email instead.]',
            type: 'string',
        },
        {
            name: 'address',
            description: 'The address of the supplier.',
            type: 'schema',
            schema: () => objects.find(o => o.name === 'Port'),
        },
        {
            name: 'updates',
            description: 'User generated timeline updates associated with the supplier.',
            type: 'array',
            items: {
                type: 'object',
                properties: [
                    {
                        name: 'created',
                        description: 'The timestamp of the update.',
                        type: 'number',
                    },
                    {
                        name: 'createdBy',
                        description: 'The email address of the user who created the update.',
                        type: 'string',
                    },
                    {
                        name: 'html',
                        description: 'The HTML content of the update.',
                        type: 'string',
                    },
                    {
                        name: 'tags',
                        description: 'The tags of the update.',
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: [
                                {
                                    name: 'label',
                                    description: 'The label of the tag.',
                                    type: 'string',
                                },
                            ],
                        },
                    },
                    {
                        name: 'deleted',
                        description: 'Whether the update has been deleted. When an update is deleted, the html field will also be replaced with "[deleted]".',
                        type: 'boolean',
                    },
                    {
                        name: 'actionsSuggestions',
                        description: 'The actions suggested for the update (AI generated when a new update is created).',
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: [
                                {
                                    name: 'id',
                                    description: 'The ID of the action.',
                                    type: 'string',
                                },
                                {
                                    name: 'description',
                                    description: 'The description of the action.',
                                    type: 'string',
                                },
                                {
                                    name: 'dueDate',
                                    description: 'The due date of the action.',
                                    type: 'string',
                                },
                            ],
                        },
                    }
                ]
            },
        },
        {
            name: 'tags',
            description: 'The tags of the supplier.',
            type: 'array',
            items: {
                type: 'object',
                properties: [
                    {
                        name: 'label',
                        description: 'The label of the tag.',
                        type: 'string',
                    },
                ],
            },
        },
        {
            name: 'reminders',
            description: 'User generated reminders associated with the supplier.',
            type: 'array',
            items: {
                type: 'object',
                properties: [
                    {
                        name: 'id',
                        description: 'The ID of the reminder.',
                        type: 'string',
                    },
                    {
                        name: 'status',
                        description: 'The status of the reminder.',
                        type: 'enum',
                        enum: ['rejected', 'open', 'completed'],
                    },
                    {
                        name: 'description',
                        description: 'The description of the reminder.',
                        type: 'string',
                    },
                    {
                        name: 'dueDate',
                        description: 'The due date of the reminder.',
                        type: 'string',
                    },
                    {
                        name: 'metadata',
                        description: 'The metadata of the reminder.',
                        type: 'array',
                        items: {
                            type: 'object',
                        },
                    },
                ], 
            },
        },
        {
            name: 'transportationMethods',
            description: 'Support transportation methods, routes, and product types for the supplier.',
            type: 'object',
            properties: [
                {
                    name: 'air',
                    description: 'The air transportation method.',
                    type: 'object',
                    properties: [
                        {
                            name: 'active',
                            description: 'Whether the supplier supports air transportation method.',
                            type: 'boolean',
                        },
                        {
                            name: 'products',
                            description: 'The products supported by the air transportation method.',
                            type: 'array',
                            items: {
                                type: 'schema',
                                schema: () => objects.find(o => o.name === 'Product'),
                            },
                        },
                        {
                            name: 'routes',
                            description: 'The routes supported by the air transportation method.',
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: [
                                    {
                                        name: 'source',
                                        description: 'The route origin port.',
                                        type: 'schema',
                                        schema: () => objects.find(o => o.name === 'Port'), 
                                    },
                                    {
                                        name: 'destination',
                                        description: 'The route destination port.',
                                        type: 'schema',
                                        schema: () => objects.find(o => o.name === 'Port'),
                                    },
                                ],
                            },
                        },
                    ],
                }, {
                    name: 'sea',
                    description: 'The sea transportation method.',
                    type: 'object',
                    properties: [
                        {
                            name: 'active',
                            description: 'Whether the account supports sea transportation method.',
                            type: 'boolean',
                        },
                        {
                            name: 'products',
                            description: 'The products supported by the sea transportation method.',
                            type: 'array',
                            items: {
                                type: 'schema',
                                schema: () => objects.find(o => o.name === 'Product'),
                            },
                        },
                        {
                            name: 'routes',
                            description: 'The routes supported by the sea transportation method.',
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: [
                                    {
                                        name: 'source',
                                        description: 'The route origin port.',
                                        type: 'schema',
                                        schema: () => objects.find(o => o.name === 'Port'), 
                                    },
                                    {
                                        name: 'destination',
                                        description: 'The route destination port.',
                                        type: 'schema',
                                        schema: () => objects.find(o => o.name === 'Port'),
                                    },
                                ],
                            },
                        },
                    ],
                }, {
                    name: 'land',
                    description: 'The land transportation method.',
                    type: 'object',
                    properties: [
                        {
                            name: 'active',
                            description: 'Whether the account supports land transportation method.',
                            type: 'boolean',
                        },
                        {
                            name: 'products',
                            description: 'The products supported by the land transportation method.',
                            type: 'array',
                            items: {
                                type: 'schema',
                                schema: () => objects.find(o => o.name === 'Product'),
                            },
                        },
                        {
                            name: 'routes',
                            description: 'The routes supported by the land transportation method.',
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: [
                                    {
                                        name: 'source',
                                        description: 'The route origin port.',
                                        type: 'schema',
                                        schema: () => objects.find(o => o.name === 'Port'), 
                                    },
                                    {
                                        name: 'destination',
                                        description: 'The route destination port.',
                                        type: 'schema',
                                        schema: () => objects.find(o => o.name === 'Port'),
                                    },
                                ],
                            },
                        },
                    ],
                },
            ],
        }, {
            name: 'owner',
            description: 'The email address of the owner of the supplier. This is the email address of the user who created the supplier (if not transfered to someone else).',
            type: 'string',
        }
    ],
};

const ProductSchema = {
    name: 'Product',
    type: 'object',
    properties: [
        {
            name: 'type',
            description: 'Type of product (dependent on transportation method)',
            type: 'enum',
            enum: ['Air Freight', '20\' Dry', '20\' Flat', '20\' Open Top', '20\' Reefer', '40\' Dry', '40\' Flat', '40\' Open Top', '40\' Reefer', '40\' HC Dry', '40\' HC Flat', '40\' HC Open Top', '40\' HC Reefer', '45\' HC Dry', '45\' HC Reefer', 'By Dimensions or Weight (sea)', 'By Volume or Weight (sea)', 'Dry', 'Reefer', 'Tent', 'Mega', 'Tilt', 'By Dimensions', 'By Dimensions or Weight (land)'],
        }, {
            name: 'dangerous',
            description: 'Whether the product is dangerous.',
            type: 'boolean',
        }, {
            name: 'dangerousMSDS',
            description: 'When dangerous is true - The MSDS of the product (url link).',
            type: 'string',
        }, {
            name: 'dangerousClass',
            description: 'When dangerous is true - The class of the product.',
            type: 'enum',
            enum: ['Explosives', 'Flammable Gases', 'Flammable Liquids', 'Flammable Solids', 'Oxidizing', 'Toxic & Infectious', 'Radioactive', 'Corrosives', 'Miscellaneous'],
        }, {
            name: 'dangerousUNCode',
            description: 'When dangerous is true - The UN code of the product.',
            type: 'string',
        },
        {
            name: 'weight',
            description: 'The weight of the product.',
            type: 'number',
        }, {
            name: 'chargeableWeight',
            description: 'The chargeable weight of the product. Required and accepted only for Air Freight products.',
            type: 'number',
        }, {
            name: 'kgOrLbs',
            description: 'The unit of the weight. For sea transport using ton, use kg.',
            type: 'enum',
            enum: ['kg', 'lbs'],
        }, {
            name: 'volume',
            description: 'The volume of the product. Required and accepted only for Air Freight and By Volume or Weight (sea) products.',
            type: 'number',
        }, {
            name: 'height',
            description: 'The height of the product. Required and accepted only for Air Freight, By Dimensions, Open Top, and Flat products.',
            type: 'number',
        }, {
            name: 'width',
            description: 'The width of the product. Required and accepted only for Air Freight, By Dimensions, and Flat products.',
            type: 'number',
        }, {
            name: 'length',
            description: 'The length of the product. Required and accepted only for Air Freight, By Dimensions, and Flat products.',
            type: 'number',
        }, {
            name: 'cmOrInches',
            description: 'The unit of the height, width, and length. For sea transport using meters, use cm.',
            type: 'enum',
            enum: ['cm', 'in.'],
        }, {
            name: 'nonstackable',
            description: 'Whether the product is nonstackable.',
            type: 'boolean',
        }, {
            name: 'commodity',
            description: 'The commodity of the product.',
            type: 'string',
        }, {
            name: 'temperature',
            description: 'The temperature of the product. Required and accepted only for Reefer products.',
            type: 'number',
        }, {
            name: 'celsiusOrFahrenheit',
            description: 'The unit of the temperature. For sea transport using celsius, use c. Required and accepted only for Reefer products.',
            type: 'enum',
            enum: ['c', 'f'],
        }
    ]
};

const OpportunitySchema = {
    name: 'Opportunity',
    type: 'object',
    properties: [
        {
            name: 'status',
            description: 'The status of the opportunity.',
            type: 'enum',
            enum: ['deleted', 'sent-to-endcustomer', 'opened-by-customer', 'endcustomer-accepted', 'completed', 'lost', 'endcustomer-rejected'],
        }, {
            name: 'type',
            description: 'The type of the opportunity.',
            type: 'enum',
            enum: ['one-off', 'contract', 'one-off-email'],
        }, {
            name: 'transportationMethod',
            description: 'The transportation method of the opportunity.',
            type: 'enum',
            enum: ['sea', 'air', 'land'],
        }, {
            name: 'routes',
            description: 'The different legs of the journey.',
            type: 'array',
            items: {
                type: 'schema',
                schema: () => objects.find(o => o.name === 'Port'),
            },
        }, {
            name: 'account',
            description: 'The account of the opportunity.',
            type: 'object',
            properties: [
                {
                    name: 'id',
                    description: 'The ID of the account.',
                    type: 'string',
                },
                {
                    name: 'email',
                    description: 'The email of the account (if other than the email defined in the account itself).',
                    type: 'string',
                },
            ],
        }, {
            name: 'description',
            description: 'How should the system describe the opportunity in various places.',
            type: 'object',
            properties: [
                {
                    name: 'type',
                    description: 'Free text - just by the free text supplied. Routes - by the routes supplied.',
                    type: 'enum',
                    enum: ['free-text', 'routes'],
                },
                {
                    name: 'freeText',
                    description: 'The free text of the opportunity.',
                    type: 'string',
                },
            ],
        }, {
            name: 'incoterm',
            description: 'The INCOTERM of the opportunity.',
            type: 'enum',
            enum: ['EXW', 'FCA', 'CPT', 'CIP', 'DAP', 'DPU', 'DDP', 'FAS', 'FOB', 'CFR', 'CIF' ],
        }, {
            name: 'products',
            description: 'The products needed to be transported.',
            type: 'array',
            items: {
                type: 'schema',
                schema: () => objects.find(o => o.name === 'Product'),
            },
        }, {
            name: 'offers',
            description: 'The offers created for this opportunity.',
            type: 'array',
            items: {
                type: 'schema',
                schema: () => objects.find(o => o.name === 'Offer'),
            },
        }, {
            name: 'selected',
            description: 'The offers and section offers selected by the customer when accepting this opportunity (list of ids).',
            type: 'array',
            items: {
                type: 'string',
            },
        }, {
            name: 'buyingRates',
            description: 'The buying rates used to create the offers.',
            type: 'array',
            items: {
                type: 'schema',
                schema: () => objects.find(o => o.name === 'Rate'),
            },
        }, {
            name: 'terms',
            description: 'The terms and conditions of the opportunity.',
            type: 'array',
            items: {
                type: 'object',
                properties: [
                    {
                        name: 'name',
                        description: 'The name of the term & condition.',
                        type: 'string',
                    },
                    {
                        name: 'value',
                        description: 'The term & condition text shown to the customer.',
                        type: 'string',
                    },
                ],  
            },
        }, {
            name: 'tags',
            description: 'The opportunity tags.',
            type: 'array',
            items: {
                type: 'object',
                properties: [
                    {
                        name: 'label',
                        description: 'The label of the tag.',
                        type: 'string',
                    },
                ],
            },
        }, {
            name: 'updates',
            description: 'The opportunity user generated updates for the timeline.',
            type: 'array',
            items: {
                type: 'object',
                properties: [
                    {
                        name: 'created',
                        description: 'The timestamp of the update.',
                        type: 'number',
                    },
                    {
                        name: 'createdBy',
                        description: 'The email of the user who created the update.',
                        type: 'string',
                    },
                    {
                        name: 'html',
                        description: 'The HTML content of the update.',
                        type: 'string',
                    },
                    {
                        name: 'files',
                        description: 'The files of the update.',
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: [
                                {
                                    name: 'name',
                                    description: 'The original file name.',
                                    type: 'string',
                                },
                                {
                                    name: 'url',
                                    description: 'The URL where the file can be downloaded from.',
                                    type: 'string',
                                },
                            ],
                        },
                    },
                    {
                        name: 'deleted',
                        description: 'Whether the update has been deleted. If deleted, the update HTML field will be changed to <deleted> and the files field will be empty.',
                        type: 'boolean',
                    },
                ],
            },
        }, {
            name: 'preface',
            description: 'The preface text shown before the opportunity details.',
            type: 'string',
        }, {
            name: 'epilogue',
            description: 'The epilogue text shown after the opportunity details.',
            type: 'string',
        }, {
            name: 'source',
            description: 'The creation source of the opportunity (for example, created from an email).',
            type: 'object',
            properties: [
                {
                    name: 'type',
                    description: 'The type of the source.',
                    type: 'enum',
                    enum: ['email'],
                },
                {
                    name: 'id',
                    description: 'The ID of the source (email id from the external source, eg. Gmail conversation id).',
                    type: 'string',
                },
            ],
        }, {
            name: 'rateRequests',
            description: 'RFQs sent to suppliers for this opportunity.',
            type: 'array',
            items: {
                type: 'schema',
                schema: () => objects.find(o => o.name === 'RateRequest'),
            },
        }
    ],
};

const RateRequestSchema = {
    name: 'RateRequest',
    type: 'object',
    properties: [
        {
            name: 'id',
            description: 'The UUID of the rate request.',
            type: 'string',
        }, {
            name: 'type',
            description: 'The type of the rate request.',
            type: 'enum',
            enum: ['contract', 'spot', 'live', 'express', 'market', 'promotion', 'rate-request'],
        }, {
            name: 'created',
            description: 'The creation date of the rate request.',
            type: 'number',
        }, {
            name: 'modified',
            description: 'The last modification date of the rate request.', 
            type: 'number',
        }, {
            name: 'transportationMethod',
            description: 'The transportation method of the rate request.',
            type: 'enum',
            enum: ['air', 'sea', 'land'],
        }, {
            name: 'source',
            description: 'The source port of the rate request.',
            type: 'schema',
            schema: () => objects.find(o => o.name === 'Port'),
        }, {
            name: 'destination',
            description: 'The destination port of the rate request.',
            type: 'schema',
            schema: () => objects.find(o => o.name === 'Port'),
        }, {
            name: 'supplier',
            description: 'The supplier of the rate request.',
            type: 'object',
            properties: [
                {
                    name: 'organization',
                    description: 'The organization of the supplier.',
                    type: 'string',
                }, {
                    name: 'uniqueId',
                    description: 'The unique ID of the supplier.',
                    type: 'string',
                }, {
                    name: 'email',
                    description: 'The email of the supplier.',
                    type: 'string',
                },
            ],
        }, {
            name: 'product',
            description: 'The product of the rate request.',
            type: 'schema',
            schema: () => objects.find(o => o.name === 'Product'),
        }, {
            name: 'attributes',
            description: 'The attributes of the rate request.',
            type: 'object',
        }, {
            name: 'comments',
            description: 'The comments of the rate request.',
            type: 'string',
        }, {
            name: 'platform',
            description: 'The platform of the rate request.',
            type: 'string',
        }, {
            name: 'rates',
            description: 'The rates of the rate request.',
            type: 'array',
            items: {
                type: 'schema',
                schema: () => objects.find(o => o.name === 'Rate'),
            },
        }, {
            name: 'notes',
            description: 'The notes of the rate request.',
            type: 'string',
        }  
    ],
};

const RateSchema = {
    name: 'Rate',
    type: 'object',
    properties: [
        {
            name: 'id',
            description: 'The UUID of the rate.',
            type: 'string',
        }, {
            name: 'type',
            description: 'The type of the rate.',
            type: 'enum',
            enum: ['contract', 'spot', 'live', 'express', 'market', 'promotion', 'rate-request'],
        }, {
            name: 'created',
            description: 'The creation date of the rate.',
            type: 'number',
        }, {
            name: 'modified',
            description: 'The last modification date of the rate.',
            type: 'number',
        }, {
            name: 'transportationMethod',
            description: 'The transportation method of the rate.',
            type: 'enum',
            enum: ['air', 'sea', 'land'],
        }, {
            name: 'source',
            description: 'The source port of the rate.',
            type: 'schema',
            schema: () => objects.find(o => o.name === 'Port'),
        }, {
            name: 'destination',
            description: 'The destination port of the rate.',
            type: 'schema',
            schema: () => objects.find(o => o.name === 'Port'),
        }, {
            name: 'supplier',
            description: 'The supplier of the rate.',
            type: 'object',
            properties: [
                {
                    name: 'organization',
                    description: 'The organization of the supplier.',
                    type: 'string',
                }, {
                    name: 'uniqueId',
                    description: 'The unique ID of the supplier.',
                    type: 'string',
                }, {
                    name: 'email',
                    description: 'The email of the supplier.',
                    type: 'string',
                },
            ],
        }, {
            name: 'product',
            description: 'The product of the rate.',
            type: 'schema',
            schema: () => objects.find(o => o.name === 'Product'),
        }, {
            name: 'attributes',
            description: 'The attributes of the rate.',
            type: 'object',
        }, {
            name: 'comments',
            description: 'The comments of the rate.',
            type: 'string',
        }, {
            name: 'platform',
            description: 'The platform of the rate.',
            type: 'string',
        }, {
            name: 'offer',
            description: 'The offer of the rate.',
            type: 'schema',
            schema: () => objects.find(o => o.name === 'Offer'),
        }, {
            name: 'notes',
            description: 'The notes of the rate.',
            type: 'string',
        }
    ],
};

const OfferSchema = {
    name: 'Offer',
    type: 'object',
    properties: [
        {
            name: 'id',
            description: 'The offer UUID.',
            type: 'string',
        }, {
            name: 'created',
            description: 'The creation date of the offer.',
            type: 'number',
        }, {
            name: 'template',
            description: 'The template used to create the offer.',
            type: 'string',
        }, {
            name: 'title',
            description: 'The title of the offer.',
            type: 'string',
        }, {
            name: 'description',
            description: 'The description of the offer.',
            type: 'string',
        }, {
            name: 'transitTime',
            description: 'The transit time (if sea than in days, if air than in hours).',
            type: 'number',
        }, {
            name: 'transitDates',
            description: 'The possible transit dates of the offer.',
            type: 'array',
            items: {
                type: 'object',
                properties: [
                    {
                        name: 'etd',
                        description: 'The estimated departure date.',
                        type: 'string',
                    }, {
                        name: 'eta',
                        description: 'The estimated arrival date.',
                        type: 'string',
                    },
                ],
            },
        }, {
            name: 'validFrom',
            description: 'The date from which the offer is valid (timestamp).',
            type: 'number',
        }, {
            name: 'validUntil',
            description: 'The date until which the offer is valid (timestamp).',
            type: 'number',
        }, {
            name: 'carrier',
            description: 'The carrier used for the offer.',
            type: 'string',
        }, {
            name: 'transshipment',
            description: 'The transshipment port.',
            type: 'string',
        }, {
            name: 'availability',
            description: 'The availability of the offer.',
            type: 'object',
            properties: [
                {
                    name: 'available',
                    description: 'Whether the offer is available.',
                    type: 'boolean',
                }, {
                    name: 'count',
                    description: 'The number of offers available.',
                    type: 'number',
                },
            ],
        }, {
            name: 'routes',
            description: 'The different legs used in this offer.',
            type: 'array',
            items: {
                type: 'object',
                properties: [
                    {
                        name: 'source',
                        description: 'The origin port',
                        type: 'schema',
                        schema: () => objects.find(o => o.name === 'Port'),
                    }, {
                        name: 'destination',
                        description: 'The destination port',
                        type: 'schema',
                        schema: () => objects.find(o => o.name === 'Port'),
                    },
                ],
            },
        }, {
            name: 'sections',
            description: 'The sections composing the offer (eg. Freight, Origin, Destination, etc.)',
            type: 'array',
            items: {
                type: 'object',
                properties: [
                    {
                        name: 'id',
                        description: 'The unique identifier of the section.',
                        type: 'string',
                    },
                    {
                        name: 'title',
                        description: 'The title of the section.',
                        type: 'string',
                    },
                    {
                        name: 'description',
                        description: 'The description of the section.',
                        type: 'string',
                    },
                    {
                        name: 'hideBreakdown',
                        description: 'Whether the breakdown of the section is hidden. If hidden, the section will only show the total amount when rendered to customers.',
                        type: 'boolean',
                    },
                    {
                        name: 'offers',
                        description: 'The different offers for this section (normally only one offer per section).',
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: [
                                {
                                    name: 'id',
                                    description: 'The ID of the offer.',
                                    type: 'string',
                                },
                                {
                                    name: 'title',
                                    description: 'The title of the offer.',
                                    type: 'string',
                                },
                                {
                                    name: 'description',
                                    description: 'The description of the offer.',
                                    type: 'string',
                                },
                                {
                                    name: 'transitTime',
                                    description: 'The transit time of this section offer.',
                                    type: 'number',
                                },
                                {
                                    name: 'validUntil',
                                    description: 'The date until which this section offer is valid (timestamp).',
                                    type: 'number',
                                },
                                {
                                    name: 'carrier',
                                    description: 'The carrier of this section offer.',
                                    type: 'string',
                                },
                                {
                                    name: 'includeProducts',
                                    description: 'Which products (by id) are covered by this section offer.',
                                    type: 'array',
                                    items: {
                                        type: 'string',
                                    },
                                },
                                {
                                    name: 'routes',
                                    description: 'The different legs used in this section offer.',
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: [
                                            {
                                                name: 'source',
                                                description: 'The origin port',
                                                type: 'schema',
                                                schema: () => objects.find(o => o.name === 'Port'),
                                            },
                                            {
                                                name: 'destination',
                                                description: 'The destination port',
                                                type: 'schema',
                                                schema: () => objects.find(o => o.name === 'Port'),
                                            },
                                        ],
                                    },
                                },
                                {
                                    name: 'fields',
                                    description: 'The different pricing lines of this section offer.',
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: [
                                            {
                                                name: 'id',
                                                description: 'The unique identifier of the pricing line.',
                                                type: 'string',
                                            },
                                            {
                                                name: 'template',
                                                description: 'The template used to create the pricing line.',
                                                type: 'string',
                                            },
                                            {
                                                name: 'title',
                                                description: 'The title of the pricing line.',
                                                type: 'string',
                                            },
                                            {
                                                name: 'description',
                                                description: 'The description of the pricing line.',
                                                type: 'string',
                                            }, 
                                            {
                                                name: 'type',
                                                description: 'The type of the pricing line. "rer-unit-type" is for a single price per all same types of products (eg. all 20\' Dry). "per-unit" is for a single price per each product in the opportunity/rate. "per-unit-type-weight" is for a single price per KG weight of each type of product (eg. all 20\' Dry). "per-unit-weight" is for a single price per KG of weight per each product. Flat is for a fixed price. Custom is for a custom price. String is for a text line (no pricing).', 
                                                type: 'enum',
                                                enum: ['per-unit-type', 'per-unit', 'per-unit-type-weight', 'per-unit-weight', 'flat', 'custom', 'string'],
                                            },
                                            {
                                                name: 'hidden',
                                                description: 'Whether the pricing line is hidden.',
                                                type: 'boolean',
                                            },
                                            {
                                                name: 'buyingRates',
                                                description: 'The buying rates of this pricing line.',
                                                type: 'array',
                                                items: {
                                                    type: 'object',
                                                    properties: [
                                                        {
                                                            name: 'rateId',
                                                            description: 'The UUID of the rate (from the buyingRates field).',
                                                            type: 'string',
                                                        },
                                                        {
                                                            name: 'fieldId',
                                                            description: 'The UUID of the field used in the rate for this pricing line.',
                                                            type: 'string',
                                                        },
                                                        {
                                                            name: 'opportunityProductId',
                                                            description: 'The product id used for this buying rate.',
                                                            type: 'string',
                                                        },
                                                    ],
                                                },
                                            }, {
                                                name: 'values',
                                                description: 'The values of the pricing line.',
                                                type: 'array',
                                                items: {
                                                    type: 'object',
                                                    properties: [
                                                        {
                                                            name: 'value',
                                                            description: 'The amount',
                                                            type: 'number',
                                                        },
                                                        {
                                                            name: 'currency',
                                                            description: 'The currency.',
                                                            type: 'string',
                                                        },
                                                        {
                                                            name: 'multiplier',
                                                            description: 'The multiplier of the pricing line. (for custom pricing)',
                                                            type: 'number',
                                                        },
                                                        {
                                                            name: 'multiplierText',
                                                            description: 'The text of the pricing line. (for custom pricing, eg. "3 Documents")',
                                                            type: 'string',
                                                        },
                                                        {
                                                            name: 'formula',
                                                            description: 'A formula (instead of value), when used (for example, "$3 per piece, with a minimum of $100"). Formulas are just equations with X being the amount of products/chargeable weight',
                                                            type: 'string',
                                                        },
                                                    ],
                                                },
                                            }
                                        ],
                                    },
                                },
                            ],
                        },
                    }
                ],
            },
        }
    ],
};

export const objects = [
    AccountSchema,
    HeadersSchema,
    OfferSchema,
    OpportunitySchema,
    OrganizationSchema,
    PortSchema,
    ProductSchema,
    RateSchema,
    RateRequestSchema,
    SupplierSchema,
    TermsSchema,
];

export const endpoints = [
  {
    category: 'Authentication',
    introduction: [
      'The monada API uses a email/password authentication system. These combinations are set up in your organization account by an admin of the account.',
      'The API is stateless and uses a generated token, from the email/password combination, to authenticate requests. The token is passed in the query of the request.',
      'All API requests must be made over HTTPS. Calls made over plain HTTP will fail. API requests without authentication will also fail.'
    ],
    endpoints: [
      {
        method: 'GET',
        path: '/login',
        description: 'Login with email and password.',
        query: [
          {
            name: 'email',
            type: 'string',
            description: 'The email of the user to login.',
            defaultValue: 'test@monada.ai'
          },
          {
            name: 'password',
            type: 'string',
            description: 'The password of the user to login.',
            defaultValue: 'password'
          },
          {
            name: 'organizationId',
            type: 'string',
            description: 'The ID of the organization to login.',
            defaultValue: 'ee95916e-9bef-445a-820f-cf45fed08804'
          },
        ],
        note: 'This request will always return a token. Authentication of the token is handled by each separate future request.',
        response: {
          type: 'string',
          description: 'The access-token for the user.'
        }
      },
    ],
  },
  {
    category: 'Organizations',
    endpoints: [
      {
        method: 'GET',
        path: '/organizations/:organizationId',
        description: 'Retrieve organization by its UUID or by alias.',
        urlParams: [
          {
            name: 'organizationId',
            type: 'string',
            description: 'The ID of the organization to retrieve. Can be alias (the URL param) or UUID.',
            defaultValue: 'ee95916e-9bef-445a-820f-cf45fed08804'
          }
        ],
        query: [
          {
            name: 'accesstoken',
            type: 'string',
            description: 'The Monada API access token.',
            optional: true,
            defaultValue: '',
          }
        ],
        response: {
          type: 'schema',
          description: 'The organization details.',
          schema: () => objects.find(o => o.name === 'Organization')
        },
      },
    ],
  },
  {
    category: 'Accounts',
    introduction: [
      'Accounts are potential customers of the organization, receivable of quotes and orders.',
      'In other systems these will occassionally be called debtors.',
    ],
    endpoints: [
      {
        method: 'GET',
        path: '/accounts',
        description: 'Get all accounts created and managed by Monada for an organization.',
        query: [
          {
            name: 'organizationId',
            type: 'string',
            description: 'The ID of the organization to retrieve accounts for.',
            defaultValue: 'ee95916e-9bef-445a-820f-cf45fed08804'
          },
          {
            name: 'accesstoken',
            type: 'string',
            description: 'The Monada API access token.',
            defaultValue: 'xxxxxxxxx',
          },
          {
            name: 'cursor',
            type: 'string',
            description: 'The cursor to start the pagination from when required.',
            optional: true,
            defaultValue: '',
          },
          {
            name: 'since',
            type: 'number',
            description: 'Filter accounts to only include those modified after the given date (timestamp).',
            optional: true,
          }
        ],
        response: {
          type: 'object',
          description: '',
          properties: [
            {
              name: 'accounts',
              type: 'array',
              description: 'The accounts.',
              items: {
                type: 'schema',
                schema: () => objects.find(o => o.name === 'Account'),
              },
            },
            {
              name: 'cursor',
              type: 'string',
              description: 'The next value to give to the cursor parameter to get the next page of accounts.',
            },
            {
              name: 'count',
              type: 'number',
              description: 'The number of total accounts returned after enumerating until cursor is empty.',
            }
          ]
        },
      },
      {
        method: 'GET',
        path: '/accounts/:accountId',
        description: 'Get a specific account by its UUID.',
        urlParams: [
          {
            name: 'accountId',
            type: 'string',
            description: 'The UUID of the account to retrieve.',
            defaultValue: '446bfc83-145a-4202-afee-482ebfcd8660',
          }
        ],
        query: [
          {
            name: 'organizationId',
            type: 'string',
            description: 'The ID of the organization to retrieve accounts for.',
            defaultValue: 'ee95916e-9bef-445a-820f-cf45fed08804'
          },
          {
            name: 'accesstoken',
            type: 'string',
            description: 'The Monada API access token.',
            defaultValue: 'xxxxxxxxx',
          },
        ],
        response: {
          type: 'schema',
          description: '',
          schema: () => objects.find(o => o.name === 'Account'),
        },
      },
      {
        method: 'POST',
        path: '/accounts',
        description: 'Create a new account.',
        query: [
          {
            name: 'organizationId',
            type: 'string',
            description: 'The ID of the organization to create the account in.',
            defaultValue: 'ee95916e-9bef-445a-820f-cf45fed08804'
          },
          {
            name: 'accesstoken',
            type: 'string',
            description: 'The Monada API access token.',
            defaultValue: 'xxxxxxxxx',
          },
        ],
        body: {
          type: 'object',
          description: '',
          properties: [
            {
              name: 'account',
              type: 'schema',
              description: 'The new account to create.',
              schema: () => objects.find(o => o.name === 'Account'),
            },
          ],
        },
        response: {
          type: 'schema',
          description: 'The account created, with a new UUID, owner and creation date.',
          schema: () => objects.find(o => o.name === 'Account'),
        },
      },
      {
        method: 'PUT',
        path: '/accounts/:accountId',
        description: 'Update an account.',
        urlParams: [
          {
            name: 'accountId',
            type: 'string',
            description: 'The UUID of the account to update.',
          }
        ],
        query: [
          {
            name: 'organizationId',
            type: 'string',
            description: 'The ID of the organization holding the account.',
            defaultValue: 'ee95916e-9bef-445a-820f-cf45fed08804'
          },
          {
            name: 'accesstoken',
            type: 'string',
            description: 'The Monada API access token.',
            defaultValue: 'xxxxxxxxx',
          },
        ],
        body: {
          type: 'object',
          description: '',
          properties: [
            {
              name: 'account',
              type: 'schema',
              description: 'The fields to update (only fields that are provided will be updated).',
              schema: () => objects.find(o => o.name === 'Account'),
            },
          ],
        },
        response: {
          type: 'schema',
          description: 'The updated account (all fields). If there are new updates in the timeline, they will also be filled with suggestions for actions.',
          schema: () => objects.find(o => o.name === 'Account'),
        },
      },
    ],
  },
  {
    category: 'Suppliers',
    introduction: [
      'Suppliers are the companies that can provide quotes for the organization.',
      'In other systems these will occassionally be called creditors.',
    ],
    endpoints: [
      {
        method: 'GET',
        path: '/suppliers',
        description: 'Get all suppliers created and managed by Monada for an organization.',
        query: [
          {
            name: 'organizationId',
            type: 'string',
            description: 'The ID of the organization to retrieve suppliers for.',
            defaultValue: 'ee95916e-9bef-445a-820f-cf45fed08804'
          },
          {
            name: 'accesstoken',
            type: 'string',
            description: 'The Monada API access token.',
            defaultValue: 'xxxxxxxxx',
          },
          {
            name: 'cursor',
            type: 'string',
            description: 'The cursor to start the pagination from when required.',
            optional: true,
            defaultValue: '',
          },
          {
            name: 'since',
            type: 'number',
            description: 'Filter accounts to only include those modified after the given date (timestamp).',
            optional: true,
          }
        ],
        response: {
          type: 'object',
          description: '',
          properties: [
            {
              name: 'suppliers',
              type: 'array',
              description: 'The suppliers.',
              items: {
                type: 'schema',
                schema: () => objects.find(o => o.name === 'Supplier'),
              },
            },
            {
              name: 'cursor',
              type: 'string',
              description: 'The next value to give to the cursor parameter to get the next page of suppliers.',
            },
            {
              name: 'count',
              type: 'number',
              description: 'The number of total suppliers returned after enumerating until cursor is empty.',
            }
          ]
        },
      },
      {
        method: 'GET',
        path: '/suppliers/:supplierId',
        description: 'Get a specific supplier by its UUID.',
        urlParams: [
          {
            name: 'supplierId',
            type: 'string',
            description: 'The UUID of the supplier to retrieve.',
            defaultValue: '446bfc83-145a-4202-afee-482ebfcd8660',
          }
        ],
        query: [
          {
            name: 'organizationId',
            type: 'string',
            description: 'The ID of the organization to retrieve suppliers for.',
            defaultValue: 'ee95916e-9bef-445a-820f-cf45fed08804'
          },
          {
            name: 'accesstoken',
            type: 'string',
            description: 'The Monada API access token.',
            defaultValue: 'xxxxxxxxx',
          },
        ],
        response: {
          type: 'schema',
          description: '',
          schema: () => objects.find(o => o.name === 'Supplier'),
        },
      },
      {
        method: 'POST',
        path: '/suppliers',
        description: 'Create a new supplier.',
        query: [
          {
            name: 'organizationId',
            type: 'string',
            description: 'The ID of the organization to create the supplier in.',
            defaultValue: 'ee95916e-9bef-445a-820f-cf45fed08804'
          },
          {
            name: 'accesstoken',
            type: 'string',
            description: 'The Monada API access token.',
            defaultValue: 'xxxxxxxxx',
          },
        ],
        body: {
          type: 'object',
          description: '',
          properties: [
            {
              name: 'supplier',
              type: 'schema',
              description: 'The new supplier to create.',
              schema: () => objects.find(o => o.name === 'Supplier'),
            },
          ],
        },
        response: {
          type: 'schema',
          description: 'The supplier created, with a new UUID, owner and creation date.',
          schema: () => objects.find(o => o.name === 'Supplier'),
        },
      },
      {
        method: 'PUT',
        path: '/suppliers/:supplierId',
        description: 'Update a supplier.',
        urlParams: [
          {
            name: 'supplierId',
            type: 'string',
            description: 'The UUID of the supplier to update.',
          }
        ],
        query: [
          {
            name: 'organizationId',
            type: 'string',
            description: 'The ID of the organization holding the supplier.',
            defaultValue: 'ee95916e-9bef-445a-820f-cf45fed08804'
          },
          {
            name: 'accesstoken',
            type: 'string',
            description: 'The Monada API access token.',
            defaultValue: 'xxxxxxxxx',
          },
        ],
        body: {
          type: 'object',
          description: '',
          properties: [
            {
              name: 'supplier',
              type: 'schema',
              description: 'The fields to update (only fields that are provided will be updated).',
              schema: () => objects.find(o => o.name === 'Supplier'),
            },
          ],
        },
        response: {
          type: 'schema',
          description: 'The updated supplier (all fields). If there are new updates in the timeline, they will also be filled with suggestions for actions.',
          schema: () => objects.find(o => o.name === 'Supplier'),
        },
      },
    ],
    }, {
        category: 'Opportunities',
        endpoints: [{
            method: 'GET',
            path: '/opportunities',
            description: 'Get all opportunities created and managed by Monada for an organization.',
            query: [
                {
                    name: 'organizationId',
                    type: 'string',
                    description: 'The ID of the organization to retrieve opportunities for.',
                    defaultValue: 'ee95916e-9bef-445a-820f-cf45fed08804'
                },
                {
                    name: 'accesstoken',
                    type: 'string',
                    description: 'The Monada API access token.',
                    defaultValue: 'xxxxxxxxx',
                }
            ],
            response: {
                type: 'object',
                description: '',
                properties: [{
                    name: 'opportunities',
                    type: 'array',
                    description: 'The opportunities.',
                    items: {
                        type: 'schema',
                        schema: () => objects.find(o => o.name === 'Opportunity'),
                    },
                }, {
                    name: 'cursor',
                    type: 'string',
                    description: 'The next value to give to the cursor parameter to get the next page of opportunities.',
                }, {
                    name: 'count',
                    type: 'number',
                    description: 'The number of total opportunities returned after enumerating until cursor is empty.',
                }]
            }
        }]
    }
];