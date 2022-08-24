import { createSlice } from '@reduxjs/toolkit';

const generateSlice = (props) => {
  const { name, url, secure } = props;
  
  // Defaults slice name to 'generic'
  if (!name) name = 'generic'
  
  // Defaults to using secure protocol for http
  if (!secure) secure = true;
  
  // Defaults url to localhost:5000
  url = `http${secure ? 's' : ''}://${url ? url : 'localhost:5000'}`;
  
  
  const newSlice = createSlice({
    name,
    initialState: { errors: [] },
    reducers: {
      // setGeneric
      [`set${name[0].toUpperCase() + name.substring(1)}`]:
        (state, action) => {
          if (action.payload.id !== `errors`) {
            state[action.payload.id] = action.payload;
          }
        },
      // removeGeneric
      [`remove${name[0].toUpperCase() + name.substring(1)}`]:
        (state, action) => {
          if (action.payload.id !== `errors`) {
            delete state[action.payload.id];
          }
        },
      // errorGeneric
      [`error${name[0].toUpperCase() + name.substring(1)}`]:
        (state, action) => {
          state.errors = action.payload;
        },
    }
  });

  newSlice.selectors = {};

  newSlice.selectors
      .selectErrors = state => state.errors;

    newSlice.selectors
      .selectAll = state => state[`${name}`];

  if (url) {
    newSlice.thunks = {};

    newSlice
      // getOneGeneric
      .thunks[`getOne${name[0].toUpperCase() + name.substring(1)}`] =
        (thunkProps) => async dispatch => {
          { id, headers } = thunkProps;
          if (!id) return false;
          const result = await fetch(`${url}/${name}/${id}`, {
            method: "GET",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              ...headers,
            }
          });
          const data = await result.json();
          if (!data.errors) {
            dispatch(newSlice
              .actions[`set${name[0].toUpperCase() + name.substring(1)}`]
              (data));
            return true;
          } else {
            dispatch(newSlice
              .actions[`error${name[0].toUpperCase() + name.substring(1)}`]
              (data.errors));
            return false;
          };
        };
    
    newSlice
      // getAllGeneric
      .thunks[`getAll${name[0].toUpperCase() + name.substring(1)}`] =
        (thunkProps) => async dispatch =>  {
          { headers } = thunkProps;
          const result = await fetch(`${url}/${name}`, {
            method: "GET",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              ...headers,
            }
          });
          const data = await result.json();
          if (!data.errors) {
            // EXPECTATION: { data: [...] }
            data.data.forEach(object => {
              dispatch(newSlice
                .actions[`set${name[0].toUpperCase() + name.substring(1)}`]
                (object));
            });
            return true;
          } else {
            // EXPECTATION: { errors: [...] }
            dispatch(newSlice
              .actions[`error${name[0].toUpperCase() + name.substring(1)}`]
              (data.errors));
            return false;
          };
        };

    newSlice
      // createGeneric
      .thunks[`create${name[0].toUpperCase() + name.substring(1)}`] =
        (thunkProps) => async dispatch =>  {
          { body, headers } = thunkProps;
          if (!body) return false;
          const result = await fetch(`${url}/${name}`, {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              ...headers,
            },
            body: JSON.stringify(body)
          });
          const data = await result.json();
          if (!data.errors) {
            dispatch(newSlice
              .actions[`set${name[0].toUpperCase() + name.substring(1)}`]
              (data));
            return true;
          } else {
            // EXPECTATION: { errors: [...] }
            dispatch(newSlice
              .actions[`error${name[0].toUpperCase() + name.substring(1)}`]
              (data.errors));
            return false;
          };
        };

    newSlice
      // updateGeneric
      .thunks[`update${name[0].toUpperCase() + name.substring(1)}`] =
        (thunkProps) => async dispatch =>  {
          { body, headers } = thunkProps;
          if (!body) return false;
          if (!body.id) return false;
          const result = await fetch(`${url}/${name}/${body.id}`, {
            method: "PATCH",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              ...headers,
            },
            body: JSON.stringify(body)
          });
          const data = await result.json();
          if (!data.errors) {
            dispatch(newSlice
              .actions[`set${name[0].toUpperCase() + name.substring(1)}`]
              (data));
            return true;
          } else {
            // EXPECTATION: { errors: [...] }
            dispatch(newSlice
              .actions[`error${name[0].toUpperCase() + name.substring(1)}`]
              (data.errors));
            return false;
          };
        };

    newSlice
      // destroyGeneric
      .thunks[`destroy${name[0].toUpperCase() + name.substring(1)}`] =
        (thunkProps) => async dispatch =>  {
          { id, headers } = thunkProps;
          if (!id) return false;
          const result = await fetch(`${url}/${name}/${id}`, {
            method: "DELETE",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              ...headers,
            }
          });
          const data = await result.json();
          if (!data.errors) {
            dispatch(newSlice
              .actions[`remove${name[0].toUpperCase() + name.substring(1)}`]
              (data));
            return true;
          } else {
            // EXPECTATION: { errors: [...] }
            dispatch(newSlice
              .actions[`error${name[0].toUpperCase() + name.substring(1)}`]
              (data.errors));
            return false;
          };
        };
  }
  return newSlice;
}

export default generateSlice;