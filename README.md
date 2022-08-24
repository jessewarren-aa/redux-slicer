<a name="readme-top"></a>

[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<br />
<div align="center">
  <a href="https://github.com/jessewarren-aa/redux-slicer">
    <img src="redux-slicer-logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Redux Slicer</h3>

  <p align="center">
    Generate redux slices, reducers, selectors, and thunks quickly
    <br />
    <a href="https://github.com/jessewarren-aa/redux-slicer">View Demo (coming soon)</a>
    ·
    <a href="https://github.com/jessewarren-aa/redux-slicer/issues">Report Bug</a>
  </p>
</div>

### Prerequisites

  ```sh
  npm install npm@latest -g
  ```

### Installation

   ```sh
   npm install redux-slicer
   ```

   ```js
   import generateSlice from "redux-slicer"
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

  * Slice creation
  ```js
  import generateSlice from "redux-slicer"

  export const messagesSlice = generateSlice({
    name: "messages",
    secure: true, // optional, defaults to true
    url: "yourwebsite.com" // optional, defaults to localhost:5000
  })

  // import { configureStore } from '@reduxjs/toolkit'
  export default configureStore({
    reducer: {
      messages: messagesSlice.reducer,
    },
  })
  ```
  
  * generateSlice object
  ```js
  newSlice = {
    reducer: createSliceResult, // thanks Redux Toolkit!
    selectors: {
      selectErrors: [Function],
      selectAll: [Function],
    },
    thunks: {
      // all references to headers are optional
      getOneMessages: [Function], // thunkProps = { id, headers }
      getAllMessages: [Function], // thunkProps = { headers }
      // backend success should return { data: [...] }
      createMessages: [Function], // thunkProps = { body, headers }
      updateMessages: [Function], // thunkProps = { body: { ..., id }, headers }
      destroyMessages: [Function] // thunkProps = { id, headers }
    }
  }
  ```
  ### API Assumptions
  1. if backend failure, returns { errors: [...] }
  2. if backend success, returns { data }

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments
* [Redux Toolkit](https://redux-toolkit.js.org/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


[stars-shield]: https://img.shields.io/github/stars/jessewarren-aa/redux-slicer.svg?style=for-the-badge
[stars-url]: https://github.com/jessewarren-aa/redux-slicer/stargazers
[issues-shield]: https://img.shields.io/github/issues/jessewarren-aa/redux-slicer.svg?style=for-the-badge
[issues-url]: https://github.com/jessewarren-aa/redux-slicer/issues