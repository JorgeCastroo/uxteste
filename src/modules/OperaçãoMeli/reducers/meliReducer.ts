import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TypeTagsRead} from '../services/useScanCode';

type TRoute = {
  idDestiny: number | null;
  idOrigin: number | null;
};

interface State {
  route: TRoute;
  tagsRead: TypeTagsRead[];
  operation: number | null;
  idRomaneioMeli: number | null;
}

const initialState: State = {
  route: {
    idDestiny: null,
    idOrigin: null,
  },
  tagsRead: [],
  operation: null,
  idRomaneioMeli: null,
};

const meliSlice = createSlice({
  name: 'operationMeli',
  initialState,
  reducers: {
    setMeliRoute: (state, action: PayloadAction<TRoute>) => {
      state.route = action.payload;
    },

    setMeliTagsRead: (state, action: PayloadAction<TypeTagsRead[]>) => {
      state.tagsRead = action.payload;
    },
    setMeliOperation: (state, action: PayloadAction<number | null>) => {
      state.operation = action.payload;
    },
    setMeliIdRomaneio: (state, action: PayloadAction<number | null>) => {
      state.idRomaneioMeli = action.payload;
    },
  },
});

export const {
  setMeliOperation,
  setMeliRoute,
  setMeliTagsRead,
  setMeliIdRomaneio,
} = meliSlice.actions;
export default meliSlice.reducer;
