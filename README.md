
# Favourite Channel settings
The app is build using `react, javascript, redux, styled-components, eslint, prettier, jest, React Testing Library, create-react-app`

## Setup
```
* git clone
* cd zattoo
* yarn
* yarn start
```

*App will be active and running on http://localhost:8080/*

## Commands
```
* yarn start // To run it locally
* yarn test  To run all tests
* yarn build // To build the app
* yarn lint // For prettier/lint fixes
```

## Code structure
containers/ChannelManager - For the main container which contains the setting screen
components/Channel - For the channel tile component
components/AllChannel - For the current list of unique channels
components/FavouriteChannel - For the list of starred/favourite channels
components/EmptyChannel - Placeholder for favourite channel
components/common - Contains all the common components
components/Icons - Consist of all the icons (Used SVG components)
store/ - Consist of files related to redux which is the state container of the app.
utils - Common utility functions and also I've kept `channels` (consisting of channels data) which on production should be coming from api endpoint.


