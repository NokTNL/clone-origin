# CloneOrigin

<img width="1419" alt="Screenshot 2022-04-01 at 3 36 24 PM" src="https://user-images.githubusercontent.com/94875599/161285475-1e680d05-1dad-48d8-93e5-95bab86948b4.png">

Live preview: https://noktnl.github.io/clone-origin/

A clone of [KnownOrigin's homepage](https://knownorigin.io) (KnownOrigin is an Ethereum NFT marketplace). All on-chain and off-chain data are fetched from KnownOrigin's servers. It shows real-time artwork info and matches the originl website as close as possible.

## Technical highlights
- **Components and state management:**
  - A single-page application structured with _React_ (the original website uses Vue)
  - Global states are managed with _Redux_ (`src/store/mainStore.js`) but are kept to minimal. Most displayed data are static once fetched from server and are stored in `src/store/fetchDataStore.js`
- **Data requests & processing:**
  - Data are loaded by `src/scripts/dataLoader.js`. Primary `fetch` and GraphQL requests are sent first; depending on the received primary data, secondary `fetch` requests are sent to get artworks' reserve price info . The page is displayed only after all request `Promise`s have been resolved.
- **Styling**:
  - Mobile first, fully responsive design (without using CSS frameworks)
  - created my own UI "framework" (global classes in `src/index.css` and reusable styled componenets in `src/components/UI`)
  - Used _Styled Component_ to scope CSS and fine-tune styling based on the props passed in (e.g. in `src/components/ArtworkCard/AuctionInfo.js`)

I used my own [React boilerplate repo](https://github.com/NokTNL/react-boilerplate) to save me some time on installing libraries and creating files one by one.

## Takeaways
- Making your own UI framework is considerably harder than using ready-to-use frameworks like Bootstrap and Material UI
- *Documentation is a good thing*. The data server's API does not have thorough documentation so I needed to decrypt its usage from individual network requests in Chrome DevTool...

## Features to be added in the future
- Add more pages with routing using React Router
- Probably enable linking to a real crypto wallet! 

## Credits
- All website design's copyright belongs to KnownOrigin and I am copying the design for learning purpose only.
- Some icons are from Bootstrap Icon
