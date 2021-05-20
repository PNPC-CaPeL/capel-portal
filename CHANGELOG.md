
0.4.0 / 2021-05-20
==================

  * Add link on PNPC logo
  * Change map picto
  * Use geojson data for generating structures (virtual) markdown files
  * Add image management for homepage text blocks
  * Add Observations links
  * Add footer links
  * Add social networks proper links
  * Add links for partners logo
  * Hide Informations & Meteo homepage blocks
  * Use regulation text with no yaml text-id
  * Setup social network icons
  * Update forms
  * Display message according dive position
  * Use a reducer instaed of multiple states
  * Add a legend to the Map
  * Add styles to GeoJSON layer
  * Display zones.geojson from remote data on map
  * Create custom gql schema for missing spot field values
  * Fix ref field for spots admin UI
  * Adapt forms enhancement to new structure of remote data
  * Improve NetlifyCMS config file
  * Set proper collections for types, skills & cadres in remote content

0.3.0 / 2021-04-16
==================

  * Improve regulation form "shouldRead" message
  * Move SaveFormState switch above declaration form
  * Adjust some title fontSizes
  * Adjust regulation & declaration columns (grid items) alignments
  * Add title in spots popup
  * Add structures on maps
  * Create admin UI for structures
  * Rename useStructures to useRegStructures
  * Forbit to fill regulation form without having scroll down the regulation text
  * Adjust HomeHero slogan font
  * Fix datetime issue in declaration form
  * Allow to select only Structures having signed
  * Simplify declaration from
  * Enhance "Cadre" form field with remote data
  * Add Cadres to lists admin
  * Update declaration form
  * Update regulation form
  * Add row content to footer
  * Setup favicon
  * Show HomeStats from Airtable aggregated data
  * Manage home blocks from remote contents
  * Add homepage blocks to NetlifyCMS config
  * Cleanup HomeInformations display
  * Cleanup HomeHero buttons (HomeButtons)

0.2.0 / 2021-04-15
==================

  * Adjust ci/cd script
  * Create component for footer social networks
  * Avoid warning about unsafe fs usage
  * Create components for home blocks
  * Adjust headings sizes
  * Split home page in subcomponents
  * Add PNPC logo on home page
  * Use Gatsby-plugin-image for home Hero
  * Setup Gatsby image plugins
  * Add a missing oterator key
  * Change local path of remote contents (from .cache to src/remote-contents)
  * Improve homepage tagline
  * Define default button style
  * Load ans use Raleway font by default
  * Move contents repository to new Github organization
  * Upgrade dependencies (npm update)
  * Display informations on homepage
  * Improve homepage and main Layout
  * Restore cached datetime in datepicker
  * Enable storing declaration form inputs in localstorage
  * Create dedicated component for individual Spots & highlight favorite on map
  * Manage ability to store favorite spots in browser localStorage
  * Add default popup for Spots component
  * Setup Leaflet.Sleep to avoid unexpected map zoom
  * Use M-Ui theme Button component
  * Setup custom spots icon
  * Update form ui translations
  * Update README file
  * Remove conclusion text from tripetto declaration form
  * Extract regulation form conclusion from tripetto
  * Extract regulation page content to a component
  * Use scale block for number of divers
  * Add DateTimePicker for declaration form
  * Add date picker for declaration form
  * Extract definition enhancers & enhance diving types
  * Adjust declaration form schema
  * Add map for choosing diving spot
  * Add ErrorBoundary component around ClassicRunner
  * Enhance regulation form with divings skills (from external data)
  * Upgrade to Gatsby v3
  * Use regulation text from external data
  * Adapt admin config to new remote data structure
  * Show markers from external spots
  * Display spots from external data on map
  * Add minimal map on home page
  * Setup source plugin for getting contents from remote repository
  * Remove homepage background transformation
  * Update default site title
  * Reduce title by a level
  * Setup dependencies and base config file for NetlifyCMS
  * Move authorization file to be publicly available
  * Update form schemas
  * Simplify home page styles for diagonal split
  * Add end message for declaration form
  * Add logo in header
  * Improve home page styles
  * Upgrade dependencies (--legacy-peer-deps)
  * Manage inlining SVG pictures
  * Create custom README file
  * Restore homepage centering
  * Make form fields mandatory
  * Create CI/CD config

0.1.0 / 2021-02-23
==================

  * Add npm command for releases
  * Setup main layout for all pages
  * Manage Tripetto forms locally
  * Setup Tripetto forms
  * Create basic pages
  * Define default theme colors
  * Setup site for markdown & basic layout
  * Install ESlint in place of Prettier
  * Install & setup Material UI & Remark transformer
  * Upgrade Gatsby & React
  * Initial commit from gatsby: (https://github.com/gatsbyjs/gatsby-starter-hello-world.git)
